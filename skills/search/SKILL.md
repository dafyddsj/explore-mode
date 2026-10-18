---
name: search
description: "Use for /search or when the learner wants to find sources or information: 'find papers on X', 'what's out there about Y', 'search for Z'. Builds and runs queries across suitable sources (in parallel where available), and returns candidates with how they were found and whether they were accessed, plus a search log. Discovery only: finding a source is not verifying or reading it."
metadata:
  author: Dafydd Jones
  version: "0.1"
---

# Search

Find candidate sources for a stated need, and say exactly how they were found and what state they're in. A search result is a lead, not a finding.

**Boundary:** Discovery is not verification or synthesis. Distinguish a search result from a source actually read.

## Start

Follow [Start every task](../explore-mode/SKILL.md#start-every-task). Clarify what the search is for (a sub-question, background, a specific claim), the scope (period, place, population, source types), and how many candidates are useful.

## Steps

1. **Build the queries.** Identify the key concepts, synonyms, alternative and discipline-specific terms, and other languages where relevant. Plan a few angles rather than one query.
2. **Choose where to look.** Match the sources to the need:
   - scholarly indexes and databases for research literature;
   - library catalogues;
   - policy and grey literature;
   - practitioner sources;
   - sources authored by the communities concerned ([Cultural Awareness](../principle-cultural-awareness/SKILL.md)).

   Prefer scholarly search tools over a model's recall ([Purposeful Use](../principle-purposeful-use/SKILL.md)). See [Scholarly search tools](#scholarly-search-tools).
3. **Run the searches.**
   - **Delegate:** where the environment allows, run angles or source types in parallel, each with its own query set and results file.
   - Snowball from strong sources: follow their references, and look for later work that cites them.
   - Query terms leave the workspace. Keep personal, confidential, and community-owned details out of them ([Protect Data](../principle-protect-data/SKILL.md)).
4. **De-duplicate and screen.** Merge duplicates and versions (a preprint and its published version). Screen on title and abstract for relevance, and label candidates as `screened on abstract`.
5. **Record each candidate:**
   - its citation and link;
   - how it was found (query and source);
   - its type;
   - its access status: open, library access, paywalled, or unknown;
   - why it looks relevant.

   Add candidates to `library/SOURCES.md` only when they are about to be used ([show-me-your-work](../../playbooks/show-me-your-work.md)).
6. **Keep a search log:** the queries, where they were run, the date, rough result counts, and what couldn't be reached. This is the coverage statement later steps depend on ([Preserve Uncertainty](../principle-preserve-uncertainty/SKILL.md)).
7. **Return the candidates.** Present a manageable, relevant set, grouped by angle, with what's missing. Suggest [verify-sources](../../playbooks/verify-sources.md) for any the learner will rely on.

## Scholarly search tools

EXplore includes an optional scholarly search server. Where the host has loaded it, these tools are available:

- `openalex_search_works` and `semantic_scholar_search_papers`: keyword searches of two large open scholarly indexes, with year, type, field, and open-access filters;
- `openalex_get_work` and `semantic_scholar_get_paper`: look up one item by DOI or other identifier;
- `semantic_scholar_paper_links`: the papers that cite an item, or that it cites, for snowballing;
- `scholarly_status`: which services are reachable and whether API keys are configured.

Use them alongside web search and library databases, not instead of them. Both indexes lean towards English-language, journal-based literature, so check community, grey, and non-English sources separately ([Cultural Awareness](../principle-cultural-awareness/SKILL.md)). Each result carries the service and the request made; copy these into the search log. Abstracts and any machine-generated TLDR are for screening only. A TLDR is a model's summary, not the paper ([AI Is Not Evidence](../principle-ai-is-not-evidence/SKILL.md)).

API keys are optional. Without them the tools still work, on smaller allowances. If a search is refused for rate limits, call `scholarly_status` and tell the learner how to add a free key. Never ask the learner to paste a key into the conversation.

If the tools aren't available, search the services' websites or other indexes, and say which you used.

## Output

A candidate list (citation, link, how found, type, access status, relevance note) and a search log. Nothing in it is described as read or verified.

## Done when

- The candidates answer the stated need, or the gap is reported.
- Each candidate's discovery route and access status are recorded.
- The search log states the coverage.
- No candidate is described beyond what was actually seen.
