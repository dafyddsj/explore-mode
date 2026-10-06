# EXplore Foundations

**Status:** draft 0.1, for expansion and amendment. The principles, workflows, and playbooks say what EXplore does. This document says why.

EXplore starts from a simple observation: a learner who inquires with AI is no longer thinking alone. Models, agents, search tools, and sources all shape what the learner finds and how they read it. EXplore doesn't try to stop that, and it doesn't pretend the AI is a neutral instrument. It makes the shared work visible, uses AI as a genuine contributor without letting it become the authority, keeps responsibility with people, and helps the learner get better at sharing the work well.

The clearest philosophical statement of this position is Jho, Park, and Ahn's (2026) account of *ensemble cognition*. EXplore's core principles weren't built from that paper. They reached many of the same commitments independently, which is what makes the paper useful: it gives EXplore's practice a philosophical vocabulary, and EXplore gives some of the paper's ideas a working form. Some later additions, such as [Learner Agency](skills/principle-learner-agency/SKILL.md) and the AI questions in [4e-plus](playbooks/4e-plus.md), draw on it directly. EXplore draws on the paper and responds to it. It doesn't implement it, and it departs from it in places (see [Where EXplore departs from the paper](#where-explore-departs-from-the-paper)).

## In short

- Learning with AI is a shared effort between the learner, models, agents, tools, and sources: an **ensemble**.
- AI influences the work but can't be responsible for it. Responsibility, judgement, and authority stay with people.
- What makes AI a real contributor is also what makes it unreliable as evidence. EXplore uses AI's contributions and never lets them be what a claim rests on.
- The model's working is hidden, so EXplore keeps the work itself on the record and rests claims on sources the learner can read.
- Describing how thinking is shared doesn't say whether the arrangement helps learning. EXplore's principles are standards for one situation: a learner inquiring with AI.
- EXplore gives the learner three roles in the ensemble: **judge**, **participant**, and **orchestrator**.
- The aim is a learner who can work well with AI, with or without EXplore.

## Learning with AI is an ensemble

Theories of mind have long argued that thinking isn't confined to the head. The 4E tradition (embodied, embedded, enacted, extended) traces how thinking runs through bodies, settings, actions, and tools; the [4e-plus](playbooks/4e-plus.md) playbook applies a version of it. Distributed cognition studies how thinking is spread across people and artefacts. Generative AI adds something these theories weren't built for: a participant that adapts to what it's given, answers differently in different contexts, and produces combinations of material that nobody wrote.

Jho et al. call the resulting arrangement an *ensemble*: thinking that emerges from the interaction of human and artificial participants rather than residing in any one mind. In an EXplore inquiry, the ensemble is the learner, the assistant, any delegated agents or other models, the search tools, and the sources.

Who leads shifts from task to task, which the paper calls *dynamic centrality*. The learner frames a question, an agent searches, a second model challenges the findings, and the learner judges. The paper also suggests that learners steer an AI through their framing and tone more than they realise.

Seeing inquiry this way changes the question EXplore asks. It isn't "should the learner use AI?" It's "how is this work shared, who leads each part, and does that arrangement serve what the learner is trying to learn?"

## AI influences the work but can't be responsible for it

The central distinction in ensemble cognition is between *functional agency* and *moral responsibility*. AI has functional agency: it genuinely shapes outcomes. It doesn't have moral responsibility: it can't answer for those outcomes, reflect on what learning is for, or hold obligations to anyone. Responsibility stays with the people who use, design, deploy, and oversee it.

That places AI between two mistakes:
- **Treating it as a neutral tool.** Its influence then goes unexamined: the framing it suggested, the sources it happened to reach, the confident summary that quietly became the learner's view.
- **Treating it as a colleague or a mind.** That invites misplaced trust and hands it responsibility it can't carry. "The AI decided" is never an answer.

EXplore treats AI's contributions as real and manages them as real. It traces them ([Transparency](skills/principle-transparency/SKILL.md)), tests them ([challenge](skills/challenge/SKILL.md), [panel](skills/panel/SKILL.md)), and keeps the decisions with people ([Human Judgement](skills/principle-human-judgement/SKILL.md), [Learner Authorship](skills/principle-learner-authorship/SKILL.md)). Some decisions don't belong to the learner either. They belong to institutions, participants, or communities, and EXplore says so ([Follow Applicable Rules](skills/principle-follow-applicable-rules/SKILL.md), [Stop When Unclear](skills/principle-stop-when-unclear/SKILL.md), [kaupapa-maori](playbooks/kaupapa-maori.md)).

The asymmetry is deliberate. Actor-network theory, for example, treats human and non-human participants as equals. Education can't. Learners, teachers, and communities have responsibilities, vulnerabilities, and obligations that a system doesn't share.

## Why AI output is never what a claim rests on

The paper gives three reasons to treat AI as more than a tool:
- it adapts to its input;
- the same question gets different answers in different contexts;
- it generates combinations nobody wrote.

Those same properties make its output unreliable as evidence. An answer that adapts to the asker, varies with context and between runs, and recombines its training data can be useful to think with. It can't show that something is true.

That one observation explains both halves of EXplore:
- **Use AI as a genuine contributor.** It searches, breaks questions down, analyses, asks questions, challenges, and offers perspectives the learner wouldn't have reached alone. Delegation, panels, and swarms exist because these contributions are real.
- **Never let it be what a claim rests on.** A claim rests on a source that has been found, saved, and read ([AI Is Not Evidence](skills/principle-ai-is-not-evidence/SKILL.md), [verify-sources](playbooks/verify-sources.md)). When models agree, that's a finding about the models, not the world.

## The model's working is hidden, so the record isn't

The paper names a *transparency problem*: AI contributes through processes learners can't inspect. If understanding how to think matters as much as knowing what to think, an opaque partner is a real difficulty.

EXplore can't make a model's internal process visible, and it doesn't pretend to. It never requests, reconstructs, or invents a model's hidden chain of thought. It gives an observable account of what was done and why, and it treats a model's explanation of its own output as more output, not a window into the process. Instead of relying on that process, it shifts the burden:
- **Claims rest on sources the learner can read,** not on the model's hidden process.
- **The work is on the record:** which tools and models were used, what they produced, what was checked, and who decided what ([show-me-your-work](playbooks/show-me-your-work.md)).
- **The learner is told how a contribution was produced:** retrieved from sources that were read, or generated from a model's training; under which instructions; and with what limits ([Transparency](skills/principle-transparency/SKILL.md)).

The paper also points out that textbooks, curricula, and institutions embed values that often go unexamined. EXplore applies the same scrutiny to every source, human or machine ([Positionality](skills/principle-positionality/SKILL.md)).

## Making the voice from nowhere come from somewhere

In a passage that cites Sidorkin (2025), the paper describes a *voice from nowhere*. A single AI assistant sounds neutral, as if it were the voice of knowledge itself, and learners may come to prefer it to their own. But it isn't neutral. It carries the values of its training and design, which the paper characterises as efficiency and analytic, systematic thinking.

Citing Jackson, the paper argues that AI tends to reward forceful, concise communication over communication that is careful, cautious, contextual, and kind. That shapes which ways of reasoning count as intelligent, not only what content is offered.

EXplore makes the voice come from somewhere:
- **Attribute every output** to a model, a provider, and the instructions it worked under ([Positionality](skills/principle-positionality/SKILL.md)).
- **Show several voices.** Different providers' models lean differently. Comparing them, and keeping their disagreements visible, shows the learner that "what the AI says" was always one system's output ([Preserve Disagreement](skills/principle-preserve-disagreement/SKILL.md), [panel](skills/panel/SKILL.md)).
- **Name the defaults.** Notice when an answer reflects a dominant culture or a narrow idea of good communication. Protect the learner's own ways of reasoning and expressing ([Cultural Awareness](skills/principle-cultural-awareness/SKILL.md), [academic-writing](playbooks/academic-writing.md)).
- **Keep the learner's own voice first** ([Learner Authorship](skills/principle-learner-authorship/SKILL.md), [Learner Agency](skills/principle-learner-agency/SKILL.md)).

## Describing the ensemble isn't enough

Distributed cognition can describe in great detail how thinking is spread across people and tools. As the paper argues, it can't say whether a particular arrangement serves learning or creates problematic dependence. That needs standards.

EXplore's principles are those standards for one situation: a learner inquiring with AI. They don't describe the ensemble; they say what a good one looks like:
- evidence stays traceable;
- uncertainty and disagreement survive;
- rules travel with every delegated task;
- data and cultural authority are protected;
- AI is used on purpose;
- no learner is disadvantaged by cost or access;
- learners' own ways of reasoning and expressing are respected;
- the learner stays the author and decision-maker, and a participant in the work.

The paper's own principles correspond to these: preserve human agency, respect diverse forms of intelligence, be transparent, and make access fair. See [Terms](#terms).

## Three roles for the learner

Reading the paper alongside EXplore suggests three roles for the learner. The paper casts teachers as the main orchestrators of AI-mediated learning, and says students must also learn to orchestrate. EXplore, working with one learner at a time, gives the orchestrator role to the learner as well:

| Role | What it means | Where EXplore supports it |
| --- | --- | --- |
| **Judge** | Decides what contributions mean, whether to rely on them, and what to conclude | [Human Judgement](skills/principle-human-judgement/SKILL.md), [Preserve Uncertainty](skills/principle-preserve-uncertainty/SKILL.md), [Preserve Disagreement](skills/principle-preserve-disagreement/SKILL.md) |
| **Participant** | Contributes their own reading, observations, and ideas, and the contextual, bodily, and lived knowledge AI can't supply | [Learner Agency](skills/principle-learner-agency/SKILL.md), [Learner Authorship](skills/principle-learner-authorship/SKILL.md) |
| **Orchestrator** | Decides how the work is shared: what to hand to AI, what to do themselves, and which arrangement fits the task | [Learner Agency](skills/principle-learner-agency/SKILL.md), [Purposeful Use](skills/principle-purposeful-use/SKILL.md) |

One rule holds the roles together: **who leads can change for doing the work, never for judging it.** An agent may lead a search or break a question into parts. The learner leads the framing and the judgement. Some of the paper's examples give AI the lead in evaluation and grading. EXplore doesn't.

A system that does the work and hands it back at checkpoints leaves the learner a critical reviewer of someone else's thinking. That's better than an uncritical one, but it isn't participation. [Learner Agency](skills/principle-learner-agency/SKILL.md) exists to keep the learner inside the work:
- forming their own view first;
- contributing what only they know;
- making the delegation choices that affect what they learn.

## Orchestrated inquiry, individually authored work

The paper suggests that authorship might be reconceptualised as *orchestrated authorship*. When work is produced with AI, the student's responsibility lies not in working alone but in managing the process transparently, judging what AI contributes, and owning the result.

EXplore accepts those responsibilities but narrows the scope:
- **The ensemble contributes to the inquiry:** searches, evidence maps, analyses, challenges, and questions.
- **The learner authors the work:** the argument, the prose, and the reflection.

EXplore doesn't write submission prose, even transparently, because assessment exists to show the learner's own thinking and the learning it took ([Learner Authorship](skills/principle-learner-authorship/SKILL.md)). What the learner does manage is the record of how the inquiry was shared, so that they can acknowledge it accurately ([Transparency](skills/principle-transparency/SKILL.md)).

## Fair access and open rules

The paper raises two concerns about power:
- **Access.** If sophisticated AI collaboration becomes essential but only some learners can afford it, it may widen inequality.
- **Control.** If AI systems increasingly decide what and how people learn, authority may concentrate in systems built by particular groups with particular interests.

EXplore responds to both:
- **No feature is a hidden prerequisite.** Every workflow runs with a single model. Work across several providers adds independence. It's offered, never assumed, and when it isn't available EXplore says what's missing ([Inclusive Use](skills/principle-inclusive-use/SKILL.md)).
- **The rules are open.** EXplore's principles, workflows, and playbooks are readable Markdown that learners and educators can inspect, question, and change. The learner chooses the question, the criteria, and the conclusion. Course and assessment rules come from the people responsible for them, not from EXplore ([Follow Applicable Rules](skills/principle-follow-applicable-rules/SKILL.md)).
- **No single provider.** EXplore works across applications and models, and encourages comparing them.

## The aim: a learner who can do this without EXplore

The paper argues that working with AI changes what metacognition has to cover. Metacognition, thinking about one's own thinking, now has to include how the thinking is shared. Learners need to understand how each participant contributes, when to rely on AI and when on their own judgement, and how to divide the work. The paper calls this *distributed metacognitive awareness*.

It also argues that choices about what to hand to AI carry ethical weight. Learners therefore need *collaborative ethical literacy*: the ability to handle the moral side of thinking with AI, including representing their work honestly.

The paper leaves open whether such arrangements strengthen learners or hollow them out. EXplore's working assumption is that they strengthen learners only if the learner keeps doing, and getting better at, the parts that matter. So EXplore:
- offers the learner the chance to form their own view before seeing the AI's, where that serves the learning;
- shows who led each part of the work, and returns delegation choices that affect learning;
- asks reflective questions about how the work was shared ([reflexive-thinking](playbooks/reflexive-thinking.md), [reflect](skills/reflect/SKILL.md));
- offers to step back as the learner shows they can arrange the work themselves;
- explains the reasons behind its principles, so learners can apply them in any tool, not only inside EXplore.

Success should be judged by what the learner can do next time, with or without EXplore, not by how much EXplore did this time.

## Where EXplore departs from the paper

- **AI doesn't lead evaluation.** The paper's examples include AI grading work and leading evaluation. EXplore evaluates only when asked, as located feedback against the learner's criteria, and never signs off or declares work ready ([Human Judgement](skills/principle-human-judgement/SKILL.md), [review](skills/review/SKILL.md)).
- **No "objective" AI measures.** The paper says AI can provide objective measures of confidence and performance to complement learners' own judgements. EXplore presents no AI-generated confidence or performance score as objective, whether about a claim or about the learner. A model's confidence is no guide to its reliability ([Preserve Uncertainty](skills/principle-preserve-uncertainty/SKILL.md)).
- **No switching by surveillance.** One of the paper's examples detects a learner's frustration from performance data or biometric signals and adjusts support. EXplore changes its role only according to the applicable rules, the kind of task recorded in the work item, and what the learner tells it ([Learner Agency](skills/principle-learner-agency/SKILL.md), [Protect Data](skills/principle-protect-data/SKILL.md)).
- **Authorship is narrower,** as described above.
- **Indigenous worldviews aren't EXplore's to borrow.** The paper suggests its framework could learn from Indigenous philosophies that recognise more-than-human agency and relational ways of knowing. EXplore doesn't take that up on its own. Such work belongs with the people who hold that knowledge and authority, under their guidance, as the [kaupapa-maori](playbooks/kaupapa-maori.md) playbook sets out for Māori knowledge.
- **Human-responsible, not post-anthropocentric.** The paper cautiously calls its direction post-anthropocentric, while keeping moral responsibility with people. EXplore goes further on authority: the lead can pass to AI for doing the work, but judging it stays with people. It's better described as ensemble-aware and human-responsible.

## EXplore's own position

EXplore was developed in Aotearoa New Zealand as an open methodology for learners. Its principles draw on:
- Western traditions in cognitive science, philosophy of education, and research integrity;
- practice from open-source agent skills;
- published Māori data-sovereignty and governance frameworks, in the [kaupapa-maori](playbooks/kaupapa-maori.md) playbook.

Drawing on those frameworks doesn't give EXplore Māori authority, and loading a playbook doesn't make output culturally safe.

By its authors' own account, ensemble cognition comes from Western cognitive science and philosophy. It may not fit every educational culture, particularly where learning is communal rather than individual. EXplore shares that limit, because it's built around one learner's work items and decisions. Its values are written down so that they can be examined and contested, including by people who see the relationship between learners and AI differently.

## What we don't know yet

- **Whether EXplore works.** The paper is conceptual, and its authors say its fit with reality has yet to be tested. Nothing here shows that EXplore improves learning, protects integrity, or builds metacognition.
- **Whether friction teaches.** EXplore adds deliberate friction: checkpoints, first passes by the learner, and reflective questions. Whether these build the learner's awareness and capability, or only add steps, is an open question.
- **How much is too much.** Every pause has a cost. [Stop When Unclear](skills/principle-stop-when-unclear/SKILL.md), [Purposeful Use](skills/principle-purposeful-use/SKILL.md), and [Learner Agency](skills/principle-learner-agency/SKILL.md) keep pauses proportionate, but the right balance is untested.
- **Whether the paper's factual claims hold.** Some of its statements about how learners and AI systems already behave have no citation or thin support (see [Sources](#sources)). EXplore relies on the paper for its concepts, not for evidence.

## Terms

EXplore's skills use plain language. This table gives the paper's terms, the wording EXplore uses for each, and where each idea lives, so that later documentation can refer back to the source.

| Ensemble cognition term | EXplore's wording | Where it lives |
| --- | --- | --- |
| Ensemble cognition | the ensemble: the learner, models, agents, tools, and sources working on an inquiry | this document; [router](skills/explore-mode/SKILL.md) |
| Functional agency and moral responsibility | AI influences the work but can't be responsible for it | [Human Judgement](skills/principle-human-judgement/SKILL.md) |
| Distributed agency | the work is shared | [router](skills/explore-mode/SKILL.md) |
| Dynamic centrality | who leads | [router](skills/explore-mode/SKILL.md), [Learner Agency](skills/principle-learner-agency/SKILL.md) |
| Cognitive orchestration | arranging the work; deciding how it's shared | [Learner Agency](skills/principle-learner-agency/SKILL.md), [Purposeful Use](skills/principle-purposeful-use/SKILL.md) |
| Multi-representational integration | what only the learner can bring (a narrowing: EXplore keeps the learner's contextual, bodily, and lived contribution, not the paper's wider point about combining formats) | [Learner Agency](skills/principle-learner-agency/SKILL.md), [analyse](skills/analyse/SKILL.md), [research](skills/research/SKILL.md) |
| Context-sensitive switching | changing EXplore's role | [Learner Agency](skills/principle-learner-agency/SKILL.md), [Purposeful Use](skills/principle-purposeful-use/SKILL.md), [setup](skills/setup/SKILL.md) |
| Distributed metacognitive awareness | awareness of how the thinking is shared | [Learner Agency](skills/principle-learner-agency/SKILL.md), [reflexive-thinking](playbooks/reflexive-thinking.md), [reflect](skills/reflect/SKILL.md) |
| Orchestrated authorship | orchestrated inquiry, individually authored work | this document; in substance, [Learner Authorship](skills/principle-learner-authorship/SKILL.md) |
| Collaborative ethical literacy | judging what to hand to AI, representing the work honestly, and knowing why the principles exist | [Learner Agency](skills/principle-learner-agency/SKILL.md), [Transparency](skills/principle-transparency/SKILL.md), [setup](skills/setup/SKILL.md) |
| Voice from nowhere | the voice from nowhere | [Positionality](skills/principle-positionality/SKILL.md) |
| Transparency problem | the model's working is hidden, so claims rest on sources | [Transparency](skills/principle-transparency/SKILL.md), [AI Is Not Evidence](skills/principle-ai-is-not-evidence/SKILL.md) |
| Preserving and enhancing human agency | learner agency | [Learner Agency](skills/principle-learner-agency/SKILL.md) |
| Diverse forms of intelligence | protecting the learner's ways of reasoning and expressing | [Cultural Awareness](skills/principle-cultural-awareness/SKILL.md), [academic-writing](playbooks/academic-writing.md) |
| Educational justice | fair access (a narrowing of the paper's wider concern with equity and inclusion) | [Inclusive Use](skills/principle-inclusive-use/SKILL.md) |

## Sources

Jho, H., Park, C., & Ahn, D. (2026). Towards a philosophy of ensemble cognition: Reconceptualising agency and mind in AI-mediated educational environments. *Educational Philosophy and Theory, 58*(11), 1035–1054. https://doi.org/10.1080/00131857.2026.2654678
- **Access:** full text read from the open-access EPUB.
- **Licence:** CC BY 4.0, which permits quotation and adaptation with attribution. This document paraphrases.
- **Type:** a conceptual article, with no empirical data.
- **Standpoint:** written by education and cognitive-science researchers in Korea, one of whom develops AI tools for feedback and learning. The authors present their framework as a middle path between technological determinism and keeping traditional education unchanged.

**Leads, not yet read.** These works are cited by Jho et al. and bear on EXplore's foundations. Their details are as the paper gives them and haven't been verified ([AI Is Not Evidence](skills/principle-ai-is-not-evidence/SKILL.md)).
- Sidorkin, A. M. (2025). Artificial intelligence: Why is it our problem? *Educational Philosophy and Theory, 57*(14), 1215–1220. On AI as a problem for educational philosophy; possibly the source of the voice from nowhere (the paper's attribution is unclear).
- Jackson, L. (2025). The manliness of artificial intelligence. *Educational Philosophy and Theory, 57*(7), 645–649. On AI and which ways of communicating are valued.
- Floridi, L., Cowls, J., Beltrametti, M., Chatila, R., Chazerand, P., Dignum, V., Luetge, C., Madelin, R., Pagallo, U., Rossi, F., Schafer, B., Valcke, P., & Vayena, E. (2018). AI4People—An ethical framework for a good AI society: Opportunities, risks, principles, and recommendations. *Minds and Machines, 28*(4), 689–707. On responsibility.
- Burrell, J. (2016). How the machine 'thinks': Understanding opacity in machine learning algorithms. *Big Data & Society, 3*(1), 1–12. On opacity.
- Hutchins, E. (1995). *Cognition in the wild.* MIT Press. On distributed cognition.
- Clark, A., & Chalmers, D. (1998). The extended mind. *Analysis, 58*(1), 7–19. On extended cognition.
- Flavell, J. H. (1979). Metacognition and cognitive monitoring: A new area of cognitive-developmental inquiry. *American Psychologist, 34*(10), 906–911. On metacognition.
- Zimmerman, B. J. (2002). Becoming a self-regulated learner: An overview. *Theory Into Practice, 41*(2), 64–70. On self-regulated learning.

**Claims to trace before relying on them:**
- The paper's statement that offloading thinking to external systems can reduce competence cites Kim et al. (2025). By its title and journal, that's a philosophy paper, not a study.
- Its statement that prompt tone and assertiveness steer AI responses cites White et al. (2023), an arXiv preprint whose title describes a catalogue of prompt patterns.

Evidence for EXplore's concerns about dependence should come from studies read at source ([verify-sources](playbooks/verify-sources.md)).

## To develop this draft

- Expand and amend in the author's own framing.
- Add sources beyond Jho et al., read at source, especially empirical work on learning and cognitive offloading with generative AI.
- Revisit this document whenever the principles change.
