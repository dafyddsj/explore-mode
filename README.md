# EXplore

**AI-supported inquiry that keeps the thinking yours.**

EXplore is a plugin for ChatGPT and Claude that turns your assistant into a workspace for critical academic research and thinking. It doesn't hide the important parts of the research process behind a single polished answer. It keeps your own critical thinking at the centre of everything it produces, and it keeps an honest record of how AI was used, so you can acknowledge it accurately later.

EXplore is for learners at any level who want to use AI well: from people who have never opened a terminal to people who will rewrite its agents.

- **Why it works this way:** [FOUNDATIONS.md](FOUNDATIONS.md)
- **Where it's going:** [VISION.md](VISION.md)

> **Status:** version 0.1, a working prototype. EXplore hasn't yet been evaluated with learners, so treat it as a methodology under development, and tell us what helps and what gets in the way.

## What's inside

EXplore is built from three kinds of component:

| Component | What it is | How many |
| --- | --- | --- |
| **Workflows** | Reusable packages of instructions that make the assistant carry out a task in a specific way, such as research, review, or reflect. | 17 |
| **Principles** | EXplore's constitution. Rules for how the assistant thinks and behaves in particular situations, including the limits it must keep. They apply across every workflow. | 16 |
| **Playbooks** | Broader methods and ideas the workflows call on when they're needed, such as critical thinking, design thinking, or kaupapa Māori. | 13 |

You don't need to learn them. The `/explore-mode` router picks what a task needs.

## Install

EXplore installs from this repository as a plugin marketplace: `dafyddsj/explore-mode`. The same repository works in both apps. Claude reads its Claude plugin manifest, and ChatGPT and Codex read its [Agent Plugins](https://agent-plugins.org) manifest.

### ChatGPT and Codex

In the ChatGPT or Codex desktop app, add a plugin marketplace with the source `dafyddsj/explore-mode`, then install **EXplore**. This installs all of its workflows, principles, and playbooks.

In the Codex CLI:

```bash
codex plugin marketplace add dafyddsj/explore-mode
```

```bash
codex plugin add explore-mode@explore-plugin
```

### Claude

In Claude Code, add the marketplace and install the plugin:

```text
/plugin marketplace add dafyddsj/explore-mode
/plugin install explore-mode@explore-plugin
```

When the plugin is enabled, Claude Code asks for two optional API keys for scholarly search (see below). Leave them blank if you don't have them.

In the Claude desktop app, add the same marketplace (`dafyddsj/explore-mode`) from the app's plugin settings, then install **EXplore**.

### Scholarly search (optional keys)

EXplore includes a small search server for two open academic indexes, [OpenAlex](https://openalex.org) and [Semantic Scholar](https://www.semanticscholar.org). It lets the assistant search for papers, look up a DOI, and follow citations, instead of relying on what a model remembers. It needs [Node.js](https://nodejs.org) 18 or later on your computer, and an app that can run local tools, such as Claude Code or Codex. Where it can't run, EXplore falls back to ordinary web search.

It works without keys, but on small shared allowances, so searches may be refused when the services are busy. Free keys give you your own allowance:

- **OpenAlex:** make an account at [openalex.org](https://openalex.org/signup), then copy the key from **Settings → API key**.
- **Semantic Scholar:** request a key through the [Semantic Scholar API page](https://www.semanticscholar.org/product/api#api-key-form). Approval can take a few days.

To add them:

- **Claude Code:** enter them when Claude Code asks, or later from `/plugin` by opening EXplore and configuring it. They're kept in your system's secure storage.
- **ChatGPT, Codex, and other apps:** create the file `~/.config/explore-mode/keys.json` in a text editor, with either key left out if you don't have it, then restart the app:

  ```json
  { "openalex_api_key": "your-openalex-key", "semantic_scholar_api_key": "your-semantic-scholar-key" }
  ```

Never paste a key into a chat. Keys go only to their own service and never appear in EXplore's output. Your search terms go to OpenAlex or Semantic Scholar whether or not you use a key, so keep personal or confidential details out of them. Ask EXplore to check scholarly search status if you want to confirm what it can see.

## Get started

The easiest way in is `/explore-mode` at the start of your prompt. It reads your request, works out what you're trying to do, and uses the right workflow and playbooks for the task.

```text
/explore-mode Research the impact of AI in the financial sector on the New Zealand economy.
```

If you already know what you want, call a workflow directly:

```text
/suggest I'm working on a project about quantum computing and the impact it could have on the world. Suggest some academic literature that may be useful to my research.
```

Some apps show plugin commands with the plugin's name in front, for example `/explore-mode:research`. Either way, you can also just describe the task in your own words.

Expect EXplore to ask you things: what the work is for, what you think before it offers its view, and what you make of the evidence. That friction is deliberate. The decisions that matter stay with you.

## Set up your project

EXplore works in an ordinary chat, but it works best when your research lives in one place.

1. **Create a project** (a ChatGPT Project, or a Claude Project) for your research.
2. **Turn on project-only memory** if your app offers it. This stops the assistant drawing on your other conversations, which can add a confusing lens, especially if you also use the same account for work or personal things.
3. **Add your rules.** Upload the rules that apply to your work: your institution's AI policy, your course or assessment brief, a marking rubric, or a framework your course uses. Markdown files work best, but other documents are fine. EXplore checks every task against the rules you give it, and asks when they're unclear rather than guessing.
4. **Add your own boundaries,** if you have them. Anything you want to do yourself, or not have AI do, goes in a file in the project, and EXplore works within it.

If your app works directly with a folder on your computer, run `/setup` instead. It creates an EXplore workspace, with each assessment or project kept as its own work item, and places for your rules (`AI-POLICY.md`), your boundaries (`MY-BOUNDARIES.md`), sources, notes, drafts, and the record of AI use. It only creates files that are missing and never overwrites your content.

## Workflows

| Workflow | What it does |
| --- | --- |
| [explore-mode](skills/explore-mode/SKILL.md) | The main entry point. Establishes your goal and work item, reads the rules that apply, chooses a workflow and only the methods it needs, coordinates any delegation, hands consequential decisions back to you, and records material AI assistance. |
| [analyse](skills/analyse/SKILL.md) | Examines material, data, or an issue closely: what's actually there, what patterns and assumptions appear, and what follows. Keeps what was observed apart from what was interpreted. |
| [challenge](skills/challenge/SKILL.md) | Stress-tests a position constructively. Finds its strongest version, then the strongest reasons it might be wrong, and reports honestly which of those hold up. |
| [compare](skills/compare/SKILL.md) | Compares technologies, approaches, policies, cases, or methods against criteria you choose, showing the evidence, trade-offs, and unknowns, and how the answer depends on what matters to you. |
| [explain](skills/explain/SKILL.md) | Helps a specific audience understand a concept, mechanism, or relationship at the right level, and checks that understanding happened. |
| [interrogate](skills/interrogate/SKILL.md) | Helps you examine your own idea by asking questions about its framing, terms, assumptions, evidence, reasoning, values, or standpoint. You do the answering. |
| [panel](skills/panel/SKILL.md) | Puts one question to several participants with different perspectives and, where possible, different models, then shows side by side where they agree, disagree, and differ in approach. |
| [preflight](skills/preflight/SKILL.md) | Supports your final checks. Lists what the work must satisfy, checks each item, and reports what passed, failed, or couldn't be determined. You decide whether it's ready. |
| [proofread](skills/proofread/SKILL.md) | Finds and explains, but never rewrites, mechanical errors in your writing: spelling, grammar, punctuation, and consistency. |
| [reflect](skills/reflect/SKILL.md) | Helps you look back at what you did, what happened, what you assumed, and what you learned, in your own words. |
| [research](skills/research/SKILL.md) | Investigates a scoped question: gathers, evaluates, analyses, and synthesises evidence, then challenges the result. Produces research notes you can judge and build on, not an essay. |
| [review](skills/review/SKILL.md) | Helps you evaluate your work against its purpose or criteria, with located observations, questions, and prioritised feedback. You decide what to accept. |
| [search](skills/search/SKILL.md) | Finds candidate sources for a stated need, and says exactly how they were found and whether they were accessed. A search result is a lead, not a finding. |
| [setup](skills/setup/SKILL.md) | Creates, checks, or extends an EXplore workspace, with each assessment or project as its own work item. Everything it creates belongs to you. |
| [suggest](skills/suggest/SKILL.md) | Recommends a small, well-chosen set of things to read, watch, or do next, and says why each is worth your time. |
| [summarise](skills/summarise/SKILL.md) | Condenses material for a purpose, keeping who said what, how confidently, and under what conditions. Adds nothing the source doesn't say. |
| [swarm](skills/swarm/SKILL.md) | Splits a big question into bounded parts, works the independent parts in parallel, and integrates the results into one picture without hiding gaps or contradictions. |

## Principles

| Principle | In short |
| --- | --- |
| [AI Is Not Evidence](skills/principle-ai-is-not-evidence/SKILL.md) | A model's output shows what a model produced, not what is true. Only a source that has been found, saved, and read can support a claim. |
| [Contextual Adaptation](skills/principle-contextual-adaptation/SKILL.md) | Fit depth, language, and method to you and your audience, without lowering evidence standards or disclosure. |
| [Cultural Awareness](skills/principle-cultural-awareness/SKILL.md) | Counter AI's dominant-culture defaults. Ask whose knowledge frames the work and who is missing, and never fill a gap with a generated perspective. |
| [Do No Harm](skills/principle-do-no-harm/SKILL.md) | Don't produce work that claims others' work, misleads people, or harms those it depicts, studies, or reaches. |
| [Follow Applicable Rules](skills/principle-follow-applicable-rules/SKILL.md) | Institution, course, assessment, and your own rules bind every agent and workflow. Nothing exempts itself. |
| [Human Judgement](skills/principle-human-judgement/SKILL.md) | EXplore surfaces evidence, tensions, and options. You decide what they mean and whether to rely on them. |
| [Inclusive Use](skills/principle-inclusive-use/SKILL.md) | Use AI in ways that include others. Don't assume paid access, and keep human contributions human in shared work. |
| [Learner Agency](skills/principle-learner-agency/SKILL.md) | Keep you inside the work and the one who arranges it, so that over time you need EXplore less. |
| [Learner Authorship](skills/principle-learner-authorship/SKILL.md) | The finished work is yours: your thinking, your voice, and content you could explain to someone else. EXplore doesn't write it for you. |
| [Positionality](skills/principle-positionality/SKILL.md) | Every claim comes from somewhere. Make the standpoint visible: yours, each source's, and the model's. |
| [Preserve Disagreement](skills/principle-preserve-disagreement/SKILL.md) | Disagreement is part of the result. Keep it visible and attributed rather than smoothing it away. |
| [Preserve Uncertainty](skills/principle-preserve-uncertainty/SKILL.md) | Say how something is known, how well, and where that knowledge stops. |
| [Protect Data](skills/principle-protect-data/SKILL.md) | Before data moves, ask whose it is, where it's going, and who decided it could go. |
| [Purposeful Use](skills/principle-purposeful-use/SKILL.md) | Start from the learning goal, ask whether AI helps at all, and use the smallest arrangement that does. |
| [Stop When Unclear](skills/principle-stop-when-unclear/SKILL.md) | When permission, consent, or the rules are unclear, pause only that action, say what's missing, and carry on with the rest. |
| [Transparency](skills/principle-transparency/SKILL.md) | Say accurately what was done, by which tool and model, with which sources, and within what limits. |

## Playbooks

| Playbook | What it's for |
| --- | --- |
| [4e-plus](playbooks/4e-plus.md) | *Draft.* How people think and feel with a solution, through their bodies, settings, actions, tools, and emotions, and whether it can stay meaningful over time. |
| [academic-writing](playbooks/academic-writing.md) | Help to write better in your own words: diagnosing what isn't working, asking questions that unlock revision, and never writing the work for you. |
| [critical-thinking](playbooks/critical-thinking.md) | Taking a claim apart carefully enough to see what holds it up, then handing the judgement back. |
| [design-thinking](playbooks/design-thinking.md) | Working on a problem from the perspective of the people who live with it. EXplore can structure the process, but it can't supply real human understanding. |
| [evidence-synthesis](playbooks/evidence-synthesis.md) | Mapping what a body of evidence supports together: established, tentative, contested, and missing. |
| [five-whys](playbooks/five-whys.md) | Walking back from a problem to its causes, one "why" at a time, with you supplying the answers. |
| [kaupapa-maori](playbooks/kaupapa-maori.md) | Recognising when work engages Māori people, knowledge, data, or rights, and responding in ways that respect Māori authority, relationships, and appropriate limits. |
| [question-framing](playbooks/question-framing.md) | Turning an interest into a question you can actually investigate. EXplore offers framings and trade-offs; you choose. |
| [reflexive-thinking](playbooks/reflexive-thinking.md) | Turning the inquiry back on yourself: how who you are, what you expected, and how you used AI shaped what you found. |
| [second-order-thinking](playbooks/second-order-thinking.md) | Following consequences past the first one, with every step labelled as evidenced, plausible, or speculative. |
| [show-me-your-work](playbooks/show-me-your-work.md) | The record formats for sources, claims, decisions, AI use, and handoffs, so your work can be inspected and your AI use acknowledged accurately. |
| [systems-thinking](playbooks/systems-thinking.md) | Mapping the structure behind a behaviour: who's involved, how they affect each other, and where effects loop back. |
| [verify-sources](playbooks/verify-sources.md) | Checking that a source has been found, saved, and read, and actually says what the claim needs it to say. |

## Tips

- **Use one folder across apps.** If you work on the same project in both ChatGPT and Claude, point both at the same project folder. The assistant can then see your earlier work and build on it instead of starting again.
- **Get a second opinion from another model.** At natural checkpoints, EXplore may suggest taking the work to the other app for an independent view. It writes a handoff file and gives you a short request to paste in. Different models lean differently, and comparing them is one of the quickest ways to learn what these tools can and can't do.
- **State your boundaries and preferences.** Put them in a file in your project folder (in a workspace, `MY-BOUNDARIES.md`) and EXplore factors them in. You can say what you want to do yourself, and what role you want EXplore to play.
- **Check before you cite.** Anything a model tells you is a lead. Read the source before you rely on it.
- **Acknowledge your AI use.** EXplore keeps a record of what AI contributed, but you remain responsible for your work and for describing your AI use under your institution's rules.

## What EXplore won't do

- Write work you'll submit, present, or reflect on as your own.
- Treat a model's answer, or several models agreeing, as evidence.
- Decide your argument, your conclusions, or whether your work is ready.
- Grade you, or run reviews you didn't ask for.
- Send your data somewhere without checking whether it may go there.
- Speak for a community or claim cultural authority it doesn't have.

## Repository layout

```text
skills/          workflows (including the explore-mode router) and principle-* skills
playbooks/       methods the workflows call on when needed
mcp/scholarly/   optional OpenAlex and Semantic Scholar search server
FOUNDATIONS.md   why EXplore works the way it does
VISION.md        where EXplore is going
plugin.json      Agent Plugins manifest (ChatGPT, Codex, and other compatible apps)
mcp.json         Agent Plugins MCP server declaration
.agents/         ChatGPT and Codex marketplace
.claude-plugin/  Claude plugin and marketplace manifests
```

Every workflow, principle, and playbook is plain Markdown. Read them, question them, and adapt them to your own context.

## Author

Created by [Dafydd Jones](https://github.com/dafyddsj) in Aotearoa New Zealand.
