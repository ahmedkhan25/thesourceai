# Speaker Notes — The Source AI Explorer Demo

Walkthrough notes for presenting the demo. Each section maps to a page in the app.

---

## Home (/)

**Open with the numbers.** $6.5B procured, 1,225+ projects, 97% on-time. These aren't aspirational — this is Source's actual track record. The demo shows what happens when you layer AI on top of that foundation.

**Key talking point:** "This entire demo was built in one day. That's the kind of velocity AI-assisted development enables — and it's exactly what I'd bring to Source's engineering team."

---

## AI Landscape (/landscape)

**Frame the market.** Construction AI is a $2.47B market growing at 28.6% CAGR. Source isn't entering a crowded space — it's sitting on a data moat ($6.5B in procurement history) that no pure-software competitor can replicate.

**Framework comparison.** Walk through why CopilotKit was chosen for this demo, but note the proposed production stack uses Claude Agent SDK + Vercel AI SDK. The framework landscape is evolving fast — the right choice depends on Source's actual codebase and team preferences.

**Protocol stack.** MCP (tools), A2A (agent-to-agent), AG-UI (streaming to frontend). These are the three open protocols that make agent architectures composable rather than locked-in.

---

## Agent Strategy (/strategy)

**Intelligence vs Judgment — this is the slide that matters most.** Not everything should be automated. The left column (automate) is where AI creates leverage: spec extraction, vendor matching, price comparison. The right column (human judgment) is where Source's team creates value: final vendor selection on $100K+ POs, design intent interpretation, relationship-based negotiations.

**Confidence-based routing.** When the agent is ≥85% confident, it auto-executes. Below that, it routes to a human. This is progressive autonomy — start conservative, increase as confidence grows.

**What is an Agent?** Use the animated agent loop diagram to explain the core concept. An agent is just an LLM in a loop: prompt → think → use tools → observe results → repeat until done. The key insight from Anthropic: workflows (predefined paths) are different from agents (dynamic control). Source should start with workflows, graduate to agents.

**Agent Orchestration.** One orchestrator, six specialist agents. Each agent has specific tools and data sources. The Finance Agent is special — it uses a Daytona Python sandbox so all calculations run as deterministic code, not LLM inference. Zero tolerance for arithmetic errors on a $2.4M PO.

**Data Flywheel.** Source's competitive moat isn't the AI model — it's the data. Every procurement transaction feeds back into better models. Competitors without this history start from zero.

**Roadmap.** Four phases from RAG Foundation (Month 1-3) to Predictive Intelligence (Month 12+). Phase 1 is current focus — document intelligence over procurement specs, contracts, and vendor data.

---

## Interactive Demos (/demos)

**This is the "show, don't tell" section.** Five tabs, each demonstrating a real capability:

1. **Spec Extraction** — Drop a design doc, AI extracts structured line items with confidence scores. Point out how it handles ambiguous specs and flags uncertainty.
2. **Vendor Match** — Given extracted specs, find matching vendors from catalog. Show price and lead time comparison.
3. **Procurement Chat** — Natural language interface for procurement questions. Powered by CopilotKit actions.
4. **Bid Pipeline** — Visualize how bids flow through processing stages.
5. **Agent Canvas** — Real-time agent execution logs. Show the tool calls happening live.

**Pro tip:** Start with Spec Extraction, then Vendor Match, then Procurement Chat. This tells the natural story of a procurement workflow.

---

## Bid Review (/bid-review)

**This is the most detailed demo.** Three real vendor bids for the Ritz-Carlton Denver lobby project ($2.4M budget).

Walk through:
- **Price comparison** across vendors (Global, Bernhardt, Knoll)
- **Compliance scoring** — fire code, ADA, certifications
- **AI actions** — click "analyze_bids" to see the agent compare across all dimensions
- **Risk flags** — the agent identifies price outliers, long lead times, missing certifications
- **Recommendation** — weighted scoring across price, compliance, and timeline

**Key point:** The agent does the analysis, but a human makes the final vendor selection. This is the Intelligence vs Judgment framework in action.

---

## Architecture (/architecture)

**Before/After diagram.** Left side is today: email, spreadsheets, manual comparison, paper approvals, phone follow-up. Right side is the AI-native vision: React frontend, Claude Agent SDK orchestration, specialist agents, Aurora pgvector RAG, human-in-the-loop gates.

**Proposed tech stack.** Emphasize this is proposed and subject to discovery of Source's actual codebase:
- **Frontend:** React/Next.js monorepo with component library — incrementally replacing legacy internal tool
- **Orchestration:** Claude Agent SDK + Vercel AI SDK for model garden flexibility
- **RAG:** Amazon Aurora pgvector — vectors co-located with relational procurement data
- **Models:** Claude Opus 4.6+ primary, Amazon Bedrock model garden for specialized tasks
- **Infrastructure:** AWS — ECS, Aurora, S3, CloudFront, EC2 devboxes
- **Observability:** Langfuse (self-hosted on AWS) + CloudWatch + Sentry

**Deterministic Shell, Probabilistic Core.** Reliable infrastructure (validation, routing, audit logging, financial safeguards) wrapping intelligent inference (LLM, spec extraction, vendor matching). The shell never changes; the core gets smarter over time.

**Three key decisions:** Financial Safety (saga pattern), Data Co-location (pgvector), Progressive Autonomy (feature flags).

---

## Evals (/evals)

**Testing Pyramid.** Four layers — click each to see real code examples:
1. Unit tests (~50%) — PO amount ceilings, financial arithmetic. Runs every commit.
2. Integration tests (~30%) — Record-replay of tool call sequences.
3. LLM-as-judge (~15%) — Rubric-scored quality evaluation, majority vote across 3 runs.
4. E2E simulations (~5%) — Full procurement workflow, binary business outcome.

**Grader Types.** Anthropic's canonical taxonomy: code-based (deterministic, fast), model-based (flexible, 85% human alignment), human (gold standard for calibration).

**Live Eval Examples.** Four expandable cards with real procurement scenarios. The compliance check FAILS — this is intentional. Show that the eval system catches when the agent misses a safety-critical code (BIFMA X5.4). Recall must be ≥98% for safety items.

**Reliability section.** "Can it do it?" vs "Can you trust it?" A 75% agent sounds good until you run it 3 times — it fails at least once 58% of the time. This is why financial calculations must be deterministic code, not LLM output.

**Framework recommendation for Source:** Langfuse for observability + DeepEval for metrics + Braintrust GitHub Action for CI/CD gates.

---

## AI Coding (/ai-coding)

**Stripe's Minions as a case study.** 1,300+ PRs/week, zero human-written code, every line reviewed by humans. The key insight: the model is commodity, the infrastructure is everything.

**Source doesn't need Stripe's scale.** It needs the same patterns, radically simplified:
- **CLI** for daily dev work (claude -p with budget cap)
- **API** for automated triggers (GitHub Actions, flaky test detection)
- **Web dashboard** for visibility and cost tracking
- **Docker sandboxes** locally, **EC2 warm pool** for parallel cloud runs

**Blueprint Pattern.** Alternating deterministic and agentic steps. Git operations, linting, testing = deterministic. Understanding the task, writing code, debugging = agentic. Deterministic walls between agentic steps compound into system-wide reliability.

**2-round CI cap.** If the agent can't fix CI failures in 2 attempts, escalate to human. 80% correctness is a feature — a partially correct PR that an engineer polishes in 20 minutes is a win.

**8-week roadmap** from foundation (CLAUDE.md + shell scripts) to full orchestration (LangGraph.js + web dashboard).

---

## About (/about)

**Keep it brief.** Name, title, one-line on what the demo proves. Links to LinkedIn and personal site are there for follow-up.

**Closing line:** "The model is nearly commodity. The infrastructure around it is everything. Source already has the hardest part — the data, the domain expertise, and the customer relationships. The AI layer is what I'd help build."

---

## General Presentation Tips

- **Password:** source
- **Start on Home**, then follow the nav order — it tells a story from landscape → strategy → demos → architecture → evals → AI coding
- **Don't read the cards.** Click to expand, point out the key insight, move on.
- **The bid review page is your showstopper.** Spend the most time here.
- **If asked "how long did this take?"** — One day for the initial scaffold, iterated from there. That's the power of AI-assisted development.
- **If asked about the tech stack** — Everything proposed is subject to actual discovery of Source's codebase. The patterns matter more than the specific tools.
