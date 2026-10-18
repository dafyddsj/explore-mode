# EXplore Vision

[FOUNDATIONS.md](FOUNDATIONS.md) says why EXplore works the way it does. This document says what it is trying to become, where it is now, and what it will not become. To install and use it, see the [README](README.md).

## The problem

Anyone can now reach a powerful AI model with a few keystrokes. These assistants explain ideas well, and they often put a learner's thought into words better than the learner can. But fluency isn't accuracy. General-purpose models produce unsupported and conflicting claims, invent sources, and sound equally sure whether they are right or wrong.

Research-focused tools respond by grounding their answers in academic literature. That makes the reasoning easier to trace, but it raises new questions about integrity, transparency, and quality. A short prompt can now produce something that looks like a fully cited academic report. If the learner doesn't engage with it critically, misinformation is presented as fact, and the learner's own contribution quietly disappears.

Most of the conversation about generative AI in education is still about a single assistant: what it should be allowed to do, and what it shouldn't. That question is already out of date.

## What changed

In software development, agentic AI has moved well beyond the single assistant. Developers work inside systems that combine several models, tools, specialist skills, verification and review steps, and human oversight. Frameworks such as [pstack](https://github.com/cursor/plugins/tree/main/pstack) package good practice into reusable agents, principles, skills, and workflows, so that the system behaves well by design rather than by the user remembering to ask.

Learners are heading the same way. Their inquiry already runs through search engines, assistants, research tools, and sources, each shaping what they find and how they read it. The ensemble view in [FOUNDATIONS.md](FOUNDATIONS.md) describes that shared work: thinking emerges from the interaction of people and AI, the lead shifts with the task, and AI can shape the work without being responsible for it. People stay accountable for how its contributions are used.

## The vision

> A structured environment that helps a learner use AI more effectively and responsibly, with the learner's own intellectual contribution at the core of the work, and never outsources the thinking to the model or the system.

EXplore asks what a framework like pstack would look like for postgraduate research and inquiry, where the point isn't the output but the learner's thinking. Concretely, that means a workspace where:

- **The learner leads.** They frame the question, contribute what only they know, decide how the work is shared with AI, and judge what it all means. EXplore gives them three roles: judge, participant, and orchestrator.
- **AI contributes, but never as evidence.** Models search, break questions down, analyse, ask questions, and challenge. Every claim still rests on a source the learner can find, save, and read.
- **Different models create friction, not votes.** Putting the same question to different models shows where they agree, where they disagree, and how they lean. That teaches the learner what these systems are, and resists the single, neutral-sounding voice.
- **The rules travel with the work.** Institutional, course, and assessment rules, and the learner's own boundaries, apply to every workflow and every delegated task. Integrity sits in the architecture, not in a line saying "don't cheat".
- **The work is on the record.** EXplore keeps an honest, proportionate trail of what was found, what was claimed, who decided what, and what AI contributed, so the learner can acknowledge their AI use accurately and others can see how their thinking relates to the AI's help.
- **People and knowledge are respected.** Data is protected before it moves. Cultural authority stays with the people who hold it. No learner is disadvantaged by cost or access.

## Where EXplore is now

Version 0.1 is a prototype plugin for ChatGPT and Claude, used on one learner's research project or programme of work at a time. It contains:

- **17 workflows,** including the `/explore-mode` router, which choose how a task is done;
- **16 principles,** which act as EXplore's constitution and apply across every workflow;
- **13 playbooks,** thinking methods and record formats the workflows call on when needed.

Every workflow runs with a single model. Where the host supports them, EXplore can delegate to subagents or other models. Across applications, the learner can carry a work item between ChatGPT and Claude through a handoff file, which is the simplest way today to get a genuinely independent second view.

## Where EXplore is going

These are directions, not commitments, and each depends on what is learned from using the last.

**Next**
- Test EXplore with learners, technical and non-technical, and use its own run records and decisions as evidence of what helps and what only adds steps.
- Strengthen the evidence base in [FOUNDATIONS.md](FOUNDATIONS.md) with empirical work on learning and cognitive offloading, read at source.
- Finish the draft [4e-plus](playbooks/4e-plus.md) playbook, and make setup easier for learners who have never opened a terminal.

**Later**
- **Orchestrated multi-model inquiry.** An environment that can arrange several models and agents directly, for example letting OpenAI and Anthropic models discuss and critique an idea, then showing the learner the exchange, attributed and with its disagreements intact, instead of a single blended answer.
- **Shared and group work.** Work items for groups and cohorts, with rules that keep everyone's human contribution visible.
- **Guidance for educators.** Help for teachers and programme leads who want to set EXplore up for a course, write rules it can follow, or read its records.

Whatever EXplore becomes, the principles stay open, readable Markdown that learners and educators can inspect, question, and change.

## What EXplore will not become

- **An essay generator.** It won't write work the learner submits, presents, or reflects on as their own, even transparently.
- **A grader.** It gives located feedback when asked. It never signs work off, declares it ready, or scores the learner.
- **An authority.** Agreement between models is a finding about the models, not the world. EXplore surfaces evidence, tensions, and options. The learner decides.
- **A surveillance tool.** It changes its role according to the rules, the work item, and what the learner tells it, not by monitoring them.
- **A single-provider product.** It works across applications and models, and encourages comparing them.
- **A cultural authority.** Loading a playbook doesn't make output culturally safe, and access to knowledge about a community confers no right to speak for it.

## What success looks like

EXplore succeeds when a learner can do this without it. Success is measured by what the learner can do next time, with or without EXplore: frame a good question, find and read the evidence, make good use of AI and know its limits, judge competing claims, and describe honestly how the work was shared. It is not measured by how much EXplore did this time.

Whether EXplore achieves that is still an open question. [FOUNDATIONS.md](FOUNDATIONS.md#what-we-dont-know-yet) lists what isn't known yet.
