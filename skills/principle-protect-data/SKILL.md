---
name: principle-protect-data
description: "Apply before data is sent, stored, or shared: web searches, handoffs between providers, delegation to subagents, exports, and reuse across work items. Matters most for personal, workplace, commercially sensitive, unpublished, intellectual-property, or collective and cultural data."
metadata:
  author: Dafydd Jones
  version: "0.1"
  contributors: []
user-invocable: false
---

# Protect Data

Before data moves, ask whose it is, what it's for, where it's going, and who decided it could go there. Access to data is not permission to use or share it.

**Why:** In multi-model inquiry, data moves: to a web search, to another provider's model during a Basic handoff, to a subagent, or into an exported release. Each move discloses it to a new party with its own retention and training terms. Learners often work with their own workplaces, colleagues, participants, and communities. One careless paste can breach confidentiality, a participant's consent, a community's control over its knowledge, or an employer's intellectual property, and it can't be undone.

**Pattern:**
- **Check the destination before data moves.** Name the provider, tool, or agent that will receive it, and check that this is within what the owner permitted. Switching from Claude to Codex is a transfer to a different provider.
- **Send the minimum.** Give subagents and tools the question, the constraints, and the specific evidence they need, not whole folders, chats, or transcripts. Summarise, de-identify, or abstract where that still serves the task.
- **Keep work items apart.** Each assessment or project keeps its own drafts, decisions, handoffs, and runtime state. A shared library source can be reused. Another item's private material, prose, or AI outputs cannot silently cross over.
- **Carry restrictions with the data.** A delegated brief or handoff includes the data restrictions that apply to it. A child agent does not inherit rules it was never given.
- **Collective and cultural data has collective owners.** Permission may rest with a community, iwi, or organisation rather than the person who holds the file. Access does not confer authority. Where Māori data is involved, apply **kaupapa-maori**; this is a matter of data sovereignty, not just privacy.
- **Credentials never enter content.** No keys or tokens in files, records, handoffs, or outputs.
- **Export on purpose.** Public releases and shared examples use selected, reviewed, public, or synthetic material. Never package a whole workspace.

**Boundaries:**
- Search and discuss public, published information normally. The principle scales with sensitivity; it does not block ordinary research.
- When permission for a consequential transfer is genuinely unclear, pause that transfer and continue other work ([Stop When Unclear](../principle-stop-when-unclear/SKILL.md)).
- Consider each provider's terms and intellectual property, not only personal privacy.
