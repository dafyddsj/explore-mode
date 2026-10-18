#!/usr/bin/env node
// EXplore scholarly search: a small MCP server (stdio) for OpenAlex and Semantic Scholar.
// No dependencies; needs Node.js 18 or later. Search metadata only: nothing it returns
// has been read or verified (see skills/search and playbooks/verify-sources.md).
//
// API keys are optional. They are read, in order, from:
//   1. OPENALEX_API_KEY and SEMANTIC_SCHOLAR_API_KEY in the environment
//      (Claude Code passes the values entered when the plugin was enabled);
//   2. the JSON file named by EXPLORE_KEYS_FILE, or ~/.config/explore-mode/keys.json:
//      { "openalex_api_key": "...", "semantic_scholar_api_key": "..." }
// Keys are sent only to their own service and never appear in tool results.

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";

const VERSION = "0.1.0";
const USER_AGENT = `explore-mode/${VERSION} (+https://github.com/dafyddsj/explore-mode)`;
const PROTOCOL_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const ABSTRACT_LIMIT = 1500;

// ---------- keys ----------

function keysFilePath() {
  if (process.env.EXPLORE_KEYS_FILE) return process.env.EXPLORE_KEYS_FILE;
  const configHome = process.env.XDG_CONFIG_HOME || join(homedir(), ".config");
  return join(configHome, "explore-mode", "keys.json");
}

// An unset optional value can arrive as "" or as an unexpanded "${...}" placeholder.
function usable(value) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || /^\$\{[^}]*\}$/.test(trimmed)) return undefined;
  return trimmed;
}

function loadKeys() {
  let file = {};
  let fileStatus = "not found";
  try {
    file = JSON.parse(readFileSync(keysFilePath(), "utf8"));
    fileStatus = "read";
  } catch (error) {
    if (error.code !== "ENOENT") fileStatus = `unreadable (${error.message})`;
  }
  const pick = (envName, fileName) => {
    const fromEnv = usable(process.env[envName]);
    if (fromEnv) return { value: fromEnv, source: "plugin settings or environment" };
    const fromFile = usable(file[fileName]);
    if (fromFile) return { value: fromFile, source: "keys file" };
    return { value: undefined, source: "none" };
  };
  return {
    openalex: pick("OPENALEX_API_KEY", "openalex_api_key"),
    semanticScholar: pick("SEMANTIC_SCHOLAR_API_KEY", "semantic_scholar_api_key"),
    fileStatus,
  };
}

const keys = loadKeys();

// ---------- HTTP ----------

function scrub(text) {
  let out = String(text);
  for (const key of [keys.openalex.value, keys.semanticScholar.value]) {
    if (key) out = out.split(key).join("[key]");
  }
  return out;
}

async function getJson(url, headers = {}) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json", ...headers },
      signal: AbortSignal.timeout(20000),
    });
    if (response.status === 429 && attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }
    const body = await response.text();
    if (!response.ok) {
      const hint =
        response.status === 429
          ? " Rate limit or daily allowance reached. A free API key raises the limit (see scholarly_status)."
          : response.status === 404
            ? " Not found."
            : "";
      throw new Error(`HTTP ${response.status}.${hint} ${scrub(body).slice(0, 300)}`);
    }
    return JSON.parse(body);
  }
}

function clampLimit(value, fallback = 10, max = 25) {
  const n = Number.isFinite(Number(value)) ? Math.floor(Number(value)) : fallback;
  return Math.min(Math.max(n, 1), max);
}

function truncate(text) {
  if (!text) return null;
  return text.length > ABSTRACT_LIMIT ? `${text.slice(0, ABSTRACT_LIMIT)}… [truncated]` : text;
}

function provenance(service, publicUrl, extra = {}) {
  return {
    service,
    request: publicUrl,
    retrieved_at: new Date().toISOString(),
    api_key_used: service === "OpenAlex" ? Boolean(keys.openalex.value) : Boolean(keys.semanticScholar.value),
    status: "search metadata only: not read or verified",
    ...extra,
  };
}

// ---------- OpenAlex ----------

const OPENALEX = "https://api.openalex.org";
const OPENALEX_SELECT = [
  "id", "doi", "title", "publication_year", "publication_date", "type", "authorships",
  "primary_location", "open_access", "cited_by_count", "abstract_inverted_index", "language",
].join(",");

function openalexUrl(path, params) {
  const url = new URL(path, OPENALEX);
  for (const [name, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(name, value);
  }
  const publicUrl = url.toString();
  if (keys.openalex.value) url.searchParams.set("api_key", keys.openalex.value);
  return { url: url.toString(), publicUrl };
}

function rebuildAbstract(index) {
  if (!index) return null;
  const words = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const position of positions) words[position] = word;
  }
  return words.filter(Boolean).join(" ");
}

function openalexWork(work) {
  const source = work.primary_location?.source;
  return {
    title: work.title,
    authors: (work.authorships || []).slice(0, 12).map((a) => a.author?.display_name).filter(Boolean),
    more_authors: Math.max((work.authorships || []).length - 12, 0) || undefined,
    year: work.publication_year,
    date: work.publication_date,
    type: work.type,
    venue: source?.display_name || null,
    doi: work.doi || null,
    openalex_id: work.id,
    landing_page: work.primary_location?.landing_page_url || null,
    open_access: work.open_access
      ? { is_oa: work.open_access.is_oa, status: work.open_access.oa_status, url: work.open_access.oa_url || null }
      : null,
    cited_by_count: work.cited_by_count,
    language: work.language || null,
    abstract: truncate(rebuildAbstract(work.abstract_inverted_index)),
  };
}

function openalexWorkId(raw) {
  const id = String(raw).trim();
  if (/^https?:\/\/(dx\.)?doi\.org\//i.test(id)) return `doi:${id.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}`;
  if (/^10\.\d{4,9}\//.test(id)) return `doi:${id}`;
  if (/^doi:/i.test(id)) return `doi:${id.slice(4)}`;
  const match = id.match(/W\d+$/i);
  if (match) return match[0].toUpperCase();
  return id;
}

async function openalexSearchWorks(args) {
  const filters = [];
  if (args.from_year) filters.push(`from_publication_date:${Number(args.from_year)}-01-01`);
  if (args.to_year) filters.push(`to_publication_date:${Number(args.to_year)}-12-31`);
  if (args.type) filters.push(`type:${String(args.type).replace(/[^a-z-]/gi, "")}`);
  if (args.open_access_only) filters.push("is_oa:true");
  const sort = { cited_by_count: "cited_by_count:desc", publication_date: "publication_date:desc" }[args.sort];
  const { url, publicUrl } = openalexUrl("/works", {
    search: args.query,
    filter: filters.join(",") || undefined,
    sort,
    "per-page": clampLimit(args.limit),
    page: args.page ? clampLimit(args.page, 1, 50) : undefined,
    select: OPENALEX_SELECT,
  });
  const data = await getJson(url);
  return {
    provenance: provenance("OpenAlex", publicUrl, {
      total_results: data.meta?.count,
      page: data.meta?.page,
      cost_usd: data.meta?.cost_usd,
    }),
    results: (data.results || []).map(openalexWork),
  };
}

async function openalexGetWork(args) {
  const { url, publicUrl } = openalexUrl(`/works/${encodeURIComponent(openalexWorkId(args.id))}`, {
    select: OPENALEX_SELECT,
  });
  const data = await getJson(url);
  return { provenance: provenance("OpenAlex", publicUrl), result: openalexWork(data) };
}

// ---------- Semantic Scholar ----------

const S2 = "https://api.semanticscholar.org/graph/v1";
const S2_FIELDS = [
  "title", "authors", "year", "publicationDate", "venue", "publicationTypes", "externalIds",
  "url", "abstract", "tldr", "citationCount", "isOpenAccess", "openAccessPdf",
].join(",");
const S2_LINK_FIELDS = ["title", "authors", "year", "venue", "externalIds", "url", "citationCount", "isOpenAccess"].join(",");

// Semantic Scholar allows about one request per second, so its calls go out one at a time.
let s2Queue = Promise.resolve();
function s2Get(url) {
  const run = s2Queue.then(() => getJson(url, s2Headers()));
  s2Queue = run.catch(() => {}).then(() => new Promise((resolve) => setTimeout(resolve, 1100)));
  return run;
}

function s2Headers() {
  return keys.semanticScholar.value ? { "x-api-key": keys.semanticScholar.value } : {};
}

function s2Url(path, params) {
  const url = new URL(`${S2}${path}`);
  for (const [name, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(name, value);
  }
  return url.toString();
}

function s2PaperId(raw) {
  const id = String(raw).trim();
  if (/^https?:\/\/(dx\.)?doi\.org\//i.test(id)) return `DOI:${id.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}`;
  if (/^10\.\d{4,9}\//.test(id)) return `DOI:${id}`;
  if (/^https?:\/\//i.test(id)) return `URL:${id}`;
  return id;
}

function s2Paper(paper) {
  if (!paper) return null;
  return {
    title: paper.title,
    authors: (paper.authors || []).slice(0, 12).map((a) => a.name).filter(Boolean),
    more_authors: Math.max((paper.authors || []).length - 12, 0) || undefined,
    year: paper.year,
    date: paper.publicationDate,
    types: paper.publicationTypes,
    venue: paper.venue || null,
    doi: paper.externalIds?.DOI ? `https://doi.org/${paper.externalIds.DOI}` : null,
    external_ids: paper.externalIds,
    semantic_scholar_id: paper.paperId,
    url: paper.url,
    open_access: paper.isOpenAccess === undefined ? undefined : { is_oa: paper.isOpenAccess, pdf: paper.openAccessPdf?.url || null },
    citation_count: paper.citationCount,
    abstract: truncate(paper.abstract),
    tldr: paper.tldr?.text ? `${paper.tldr.text} [machine-generated summary]` : undefined,
  };
}

async function s2SearchPapers(args) {
  const url = s2Url("/paper/search", {
    query: args.query,
    year: args.year ? String(args.year).replace(/[^0-9-]/g, "") : undefined,
    fieldsOfStudy: args.fields_of_study,
    limit: clampLimit(args.limit),
    offset: args.offset ? Math.max(0, Math.floor(Number(args.offset))) : undefined,
    fields: S2_FIELDS,
  });
  // openAccessPdf is a flag that takes no value.
  const finalUrl = args.open_access_only ? `${url}&openAccessPdf` : url;
  const data = await s2Get(finalUrl);
  return {
    provenance: provenance("Semantic Scholar", finalUrl, { total_results: data.total, offset: data.offset }),
    results: (data.data || []).map(s2Paper),
  };
}

async function s2GetPaper(args) {
  const url = s2Url(`/paper/${encodeURIComponent(s2PaperId(args.id))}`, { fields: S2_FIELDS });
  const data = await s2Get(url);
  return { provenance: provenance("Semantic Scholar", url), result: s2Paper(data) };
}

async function s2PaperLinks(args) {
  const direction = args.direction === "references" ? "references" : "citations";
  const url = s2Url(`/paper/${encodeURIComponent(s2PaperId(args.id))}/${direction}`, {
    fields: S2_LINK_FIELDS,
    limit: clampLimit(args.limit, 20, 100),
    offset: args.offset ? Math.max(0, Math.floor(Number(args.offset))) : undefined,
  });
  const data = await s2Get(url);
  const key = direction === "citations" ? "citingPaper" : "citedPaper";
  return {
    provenance: provenance("Semantic Scholar", url, { direction, offset: data.offset, next: data.next }),
    results: (data.data || []).map((link) => s2Paper(link[key])).filter(Boolean),
  };
}

// ---------- status ----------

function status() {
  return {
    server: `explore-scholarly ${VERSION}`,
    openalex: {
      api_key: keys.openalex.value ? `configured (${keys.openalex.source})` : "not configured",
      without_key: "works on a small daily allowance (about a tenth of a free key's)",
      get_a_free_key: "https://openalex.org/settings/api-key",
    },
    semantic_scholar: {
      api_key: keys.semanticScholar.value ? `configured (${keys.semanticScholar.source})` : "not configured",
      without_key: "works on a rate limit shared with all unauthenticated users, so requests may be refused when busy",
      request_a_free_key: "https://www.semanticscholar.org/product/api#api-key-form",
    },
    keys_file: { path: keysFilePath(), status: keys.fileStatus },
    how_to_add_keys:
      "In Claude Code, enter keys in the plugin's settings (/plugin, then EXplore, then configure). " +
      "Elsewhere, the learner saves them in the keys file themselves, in a text editor: " +
      '{ "openalex_api_key": "...", "semantic_scholar_api_key": "..." }. ' +
      "Never ask the learner to paste a key into the conversation. Restart the app afterwards.",
    data_note:
      "Search terms and identifiers are sent to OpenAlex or Semantic Scholar. Don't include personal, confidential, or community-owned information in queries.",
  };
}

// ---------- MCP ----------

const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true };

const TOOLS = [
  {
    name: "scholarly_status",
    title: "Scholarly search status",
    description:
      "Report which scholarly APIs are available, whether optional API keys are configured (never the keys themselves), where keys can be saved, and what data leaves the device. Use when searches fail, are rate-limited, or the learner asks about keys.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
    handler: async () => status(),
  },
  {
    name: "openalex_search_works",
    title: "Search OpenAlex",
    description:
      "Search OpenAlex, an open index of scholarly works across all disciplines, by keywords. Returns candidate works with authors, year, venue, DOI, open-access status, citation count, and abstract where available, plus the request made. Results are leads found by search, not sources read or verified.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keywords. Supports AND, OR, NOT, and quoted phrases." },
        from_year: { type: "integer", description: "Earliest publication year." },
        to_year: { type: "integer", description: "Latest publication year." },
        type: { type: "string", description: "Work type, for example article, review, book, book-chapter, dissertation, preprint, report." },
        open_access_only: { type: "boolean", description: "Only open-access works." },
        sort: { type: "string", enum: ["relevance", "cited_by_count", "publication_date"], description: "Default relevance." },
        limit: { type: "integer", minimum: 1, maximum: 25, description: "Results per page (default 10)." },
        page: { type: "integer", minimum: 1, description: "Page of results (default 1)." },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    handler: openalexSearchWorks,
  },
  {
    name: "openalex_get_work",
    title: "Look up an OpenAlex work",
    description:
      "Look up one work in OpenAlex by DOI (10.xxxx/..., doi:..., or https://doi.org/...) or OpenAlex ID (W123...). Use to check that a cited work exists and to get its metadata and open-access link. Metadata only: the work itself still needs to be read.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", description: "DOI or OpenAlex work ID." } },
      required: ["id"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    handler: openalexGetWork,
  },
  {
    name: "semantic_scholar_search_papers",
    title: "Search Semantic Scholar",
    description:
      "Search Semantic Scholar's academic graph by keywords. Returns candidate papers with authors, year, venue, identifiers, citation count, open-access PDF link, and abstract where available. Any TLDR is machine-generated and is not evidence. Results are leads, not sources read or verified.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Plain-text keywords." },
        year: { type: "string", description: "A year or range, for example 2020 or 2018-2024 or 2015-." },
        fields_of_study: { type: "string", description: "Comma-separated, for example Education,Psychology,Computer Science." },
        open_access_only: { type: "boolean", description: "Only papers with a public PDF." },
        limit: { type: "integer", minimum: 1, maximum: 25, description: "Results (default 10)." },
        offset: { type: "integer", minimum: 0, description: "Skip this many results." },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    handler: s2SearchPapers,
  },
  {
    name: "semantic_scholar_get_paper",
    title: "Look up a Semantic Scholar paper",
    description:
      "Look up one paper in Semantic Scholar by DOI, arXiv ID (ARXIV:2101.00001), PubMed ID (PMID:...), Semantic Scholar ID, or URL. Use to check that a cited paper exists and to get its metadata. Metadata only: the paper itself still needs to be read.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", description: "DOI, prefixed ID (ARXIV:, PMID:, CorpusId:), Semantic Scholar ID, or URL." } },
      required: ["id"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    handler: s2GetPaper,
  },
  {
    name: "semantic_scholar_paper_links",
    title: "Follow citations or references",
    description:
      "List the papers that cite a given paper (citations, for later work) or that it cites (references, for earlier work). Use for snowballing from a strong source. Results are leads, not sources read or verified.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "DOI, prefixed ID, Semantic Scholar ID, or URL." },
        direction: { type: "string", enum: ["citations", "references"], description: "Default citations." },
        limit: { type: "integer", minimum: 1, maximum: 100, description: "Results (default 20)." },
        offset: { type: "integer", minimum: 0 },
      },
      required: ["id"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
    handler: s2PaperLinks,
  },
];

const INSTRUCTIONS =
  "Scholarly search for EXplore. Results are search metadata: candidates to screen, save, and read, never evidence in themselves. " +
  "Record each result's service and request in the search log. API keys are optional; if a call is rate-limited, call scholarly_status and tell the learner how to add a free key. " +
  "Never ask the learner to paste a key into the conversation.";

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

async function handle(message) {
  const { id, method, params } = message;
  const isRequest = id !== undefined && id !== null;
  try {
    let result;
    switch (method) {
      case "initialize": {
        const requested = params?.protocolVersion;
        result = {
          protocolVersion: PROTOCOL_VERSIONS.includes(requested) ? requested : PROTOCOL_VERSIONS[1],
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: "explore-scholarly", title: "EXplore scholarly search", version: VERSION },
          instructions: INSTRUCTIONS,
        };
        break;
      }
      case "ping":
        result = {};
        break;
      case "tools/list":
        result = { tools: TOOLS.map(({ handler, ...tool }) => tool) };
        break;
      case "tools/call": {
        const tool = TOOLS.find((t) => t.name === params?.name);
        if (!tool) throw Object.assign(new Error(`Unknown tool: ${params?.name}`), { code: -32602 });
        try {
          const output = await tool.handler(params.arguments || {});
          result = { content: [{ type: "text", text: JSON.stringify(output, null, 2) }], isError: false };
        } catch (error) {
          result = { content: [{ type: "text", text: `${tool.title} failed: ${scrub(error.message)}` }], isError: true };
        }
        break;
      }
      default:
        if (!isRequest) return; // notifications such as notifications/initialized
        throw Object.assign(new Error(`Method not found: ${method}`), { code: -32601 });
    }
    if (isRequest) send({ jsonrpc: "2.0", id, result });
  } catch (error) {
    if (isRequest) send({ jsonrpc: "2.0", id, error: { code: error.code || -32603, message: scrub(error.message) } });
  }
}

const lines = createInterface({ input: process.stdin });
lines.on("line", (line) => {
  if (!line.trim()) return;
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    send({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    return;
  }
  for (const item of Array.isArray(message) ? message : [message]) handle(item);
});
