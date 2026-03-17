# Evaluating AI agents for accuracy and reliability in 2026

**The most effective way to evaluate AI agents in 2026 is through a layered testing pyramid—deterministic unit tests at the base, trajectory-level LLM-as-judge assessment in the middle, and end-to-end integration tests at the top—executed through a combination of open-source eval frameworks like DeepEval, RAGAS, and Langfuse integrated into CI/CD pipelines.** For your LangGraph + Claude + pgvector stack building FF&E procurement agents, this means combining Anthropic's own grader taxonomy (code-based, model-based, human) with LangSmith or Langfuse for trajectory tracing, deterministic validation for all financial calculations and business rules, and domain-specific golden datasets covering spec extraction, product matching, and compliance checking. The field has matured dramatically since 2024: agent-specific metrics (tool call accuracy, trajectory match, goal completion) are now built into every major framework, OpenTelemetry has become the universal tracing standard, and Anthropic's January 2026 "Demystifying Evals" guide has established a canonical methodology that the entire ecosystem follows.

---

## The LangGraph + Claude evaluation architecture your stack needs

Your stack—React/TypeScript + Express/Node.js + PostgreSQL/Hasura + Aurora pgvector, orchestrated with LangGraph and powered by Claude—demands a specific evaluation architecture. LangGraph graphs are LangChain Runnables, which means they integrate directly with LangSmith's `evaluate()` and `aevaluate()` functions (requires `langsmith>=0.2.0`). The output of any LangGraph execution is a state object carrying the full message history, including every tool call, routing decision, and intermediate output, making trajectory evaluation native to the framework.

**Single-step evaluation** should constitute roughly 50% of your test cases, following LangChain's production experience with their own agents. Use LangGraph's `interrupt_before` parameter to pause execution at decision points and verify the agent selected the correct tool with correct arguments:

```python
state = await agent.ainvoke(inputs, interrupt_before=["tools"])
# Inspect state["messages"] for the latest tool call
assert state["messages"][-1].tool_calls[0]["name"] == "extract_specifications"
```

For **full agent turn evaluation** (roughly 30% of tests), run the agent end-to-end and evaluate three dimensions: trajectory correctness (did it call the right tools in a reasonable order?), final output quality (via LLM-as-judge), and state artifacts (POs, comparison tables, compliance reports produced). The remaining 20% should be **multi-turn conversation tests** simulating realistic vendor negotiation flows with conditional branching.

The `agentevals` package (`pip install agentevals`) from LangChain provides purpose-built trajectory evaluators with four matching modes: **strict** (exact order), **unordered** (same tools, any order), **subset** (only reference tools called, no extras), and **superset** (at least the reference tools, extras permitted). For FF&E procurement, `superset` mode is often most appropriate—you want the agent to call the required tools but don't want to penalize it for making additional verification calls.

Anthropic's January 2026 guide "Demystifying Evals for AI Agents" establishes the canonical eval terminology: a **task** is a single test case with defined inputs and success criteria, a **trial** is one attempt at a task (you must run multiple trials due to non-determinism), and a **grader** scores some aspect of performance. Anthropic recommends three grader types used in combination: **code-based** graders (string match, tool call verification, static analysis) for speed and objectivity; **model-based** graders (rubric-scored LLM-as-judge) for flexible quality assessment; and **human** graders for calibration and edge cases. For your procurement agents, the financial calculation and business rule layers should exclusively use code-based graders, while spec extraction quality and vendor communication tone use model-based graders.

Two metrics are critical for handling agent non-determinism: **pass@k** (probability of at least one success in k trials—captures capability) and **pass^k** (probability of all k trials succeeding—captures reliability). For a procurement agent processing purchase orders, pass^k matters more than pass@k: a 75% per-trial success rate translates to only **42% pass^3**, meaning the agent fails at least once in three attempts nearly 60% of the time.

---

## The agent testing pyramid has four distinct layers

The traditional software testing pyramid has been reimagined for AI agents, with multiple authoritative sources converging on a four-layer model adapted for probabilistic systems. Block Engineering (January 2026) and Anthropic's guidance provide the clearest articulation.

**Layer 1: Deterministic unit tests** form the foundation. These test orchestration logic, retry behavior, max turn limits, tool schema validation, and business rules with LLM calls fully mocked. For your FF&E agents, this layer validates that PO amount ceilings trigger escalation, segregation of duties is enforced, budget availability checks are correct, and all financial arithmetic is exact. These tests run in milliseconds, are 100% deterministic, and should execute on every commit. If this layer is flaky, it's a software bug, not an AI problem.

**Layer 2: Component and integration tests** use a record-and-replay pattern. Run real LLM calls once, capture the full interaction (tool calls, responses, state transitions), and replay deterministically in tests. Block Engineering's `TestProvider` operates in recording mode (calls real Claude, saves responses keyed by input hash to JSON) and playback mode (returns recorded responses). Assert on tool call sequences and interaction flow rather than exact text output. Commit fixture files to version control—this gives you regression detection when prompt changes alter behavior. Property-based tests using tools like Hypothesis can generate thousands of random inputs to verify invariants like idempotent normalization.

**Layer 3: Probabilistic benchmarks and LLM-as-judge evals** check task completion, tool selection quality, and output correctness across multiple runs. Run each eval case 3–5 times and aggregate: regression means "success rates dropped" rather than "output changed." LLM-as-judge evaluation with rubrics uses majority vote across 3 runs (with a 4th tiebreaker if all differ). **Do not run live LLM tests in CI** (too expensive, slow, and flaky)—run benchmarks on-demand or on a schedule rather than per-PR.

**Layer 4: End-to-end simulations and human evaluation** test complete workflows like "Can the agent extract specs from a 200-page architectural document, match products against the catalog, generate a comparison table, and produce a compliant PO?" This layer shifts from probabilistic metrics to binary business outcomes. Real-world traffic beats synthetic evaluation: LangChain's State of AI Agents survey (1,300+ respondents, November–December 2025) found that **52.4%** of organizations run offline evaluations while **37.3%** run online production evaluations, with nearly 25% combining both.

---

## Five frameworks dominate the eval landscape, each with distinct strengths

The evaluation tooling ecosystem has matured into a layered market where observability platforms, metric libraries, and CI/CD-integrated eval platforms serve complementary roles. Here is the current state of each major framework.

**Langfuse** (~23,000 GitHub stars, MIT core license) leads as the open-source observability and evaluation platform. Its February 2026 release of observation-level evaluations enables scoring individual spans within agent traces—critical for debugging multi-step LangGraph workflows. Langfuse supports OpenTelemetry natively, integrates with LangGraph via callback handler, and offers versioned datasets, prompt management with A/B testing, and LLM-as-judge scoring. Self-hosting is free and unlimited; cloud pricing starts at **$29/month** for the Core tier. Its primary limitation is evaluation depth—it has fewer built-in metrics than dedicated eval frameworks like DeepEval.

**Braintrust** (proprietary, $36M Series A from Andreessen Horowitz) offers the strongest CI/CD integration with a dedicated GitHub Action that runs eval suites on every PR and posts detailed comparison reports. Its open-source AutoEvals library provides LLM-as-judge scorers for factuality, relevance, and custom criteria. The "Loop" AI agent automatically generates improved prompts and scorers from natural language descriptions—a unique capability. The free tier offers **1M trace spans**, but Pro starts at **$249/month**. Key limitation: no fully self-hosted open-source option.

**RAGAS** (~13,000 GitHub stars, Apache 2.0, now at v0.4.3 under vibrantlabsai) remains the de facto standard for RAG evaluation with reference-free metrics that require no ground truth for core measurements. It has expanded from its original four RAG metrics to **30+ metrics** including agent-specific ones: Tool Call Accuracy, Tool Call F1, Agent Goal Accuracy, and Topic Adherence. For your pgvector-based retrieval pipeline, RAGAS provides context precision, context recall, faithfulness, and answer relevancy metrics out of the box. It integrates with Claude via `llm_factory()`. As a pure metrics library, it has no UI or tracing—pair it with Langfuse or Phoenix.

**DeepEval** (~14,000 GitHub stars, Apache 2.0, v3.x) has the most comprehensive metrics library with **50+ research-backed metrics** including six agent-specific ones introduced in 2025: TaskCompletionMetric, ToolCorrectnessMetric, ToolArgumentCorrectnessMetric, AgentEfficiencyMetric, PlanAdherenceMetric, and PlanQualityMetric. Its pytest-native design (`deepeval test run`) integrates directly into CI/CD pipelines. The DAG Metric provides deterministic, structured decision-tree evaluation, addressing the non-determinism concern with other LLM-as-judge approaches. DeepEval's `@observe()` decorator enables component-level evaluation of individual tools, retrievers, and generators. The companion Confident AI cloud platform adds dataset management and production monitoring.

**Arize Phoenix** (~16,000 GitHub stars, Elastic License 2.0) is the leading vendor-agnostic observability platform, built entirely on OpenTelemetry. It captures complete multi-step agent traces and offers path evaluations, convergence evaluations, and session-level assessments. Phoenix integrates external eval libraries (RAGAS, DeepEval) rather than competing with them, and its auto-instrumentation works with LangGraph, Claude Agent SDK, and the Vercel AI SDK. Self-hosted is free with no feature gates; Cloud Pro starts at **$249/month**.

A notable development: **OpenAI acquired Promptfoo for $86M in March 2026**, raising vendor-neutrality concerns for what was previously the most popular open-source LLM eval and red-teaming CLI (~10,800 stars). **Opik** (by Comet, Apache 2.0) is emerging as the leading open-source alternative with full-featured tracing, automated LLM-as-judge metrics, and CI/CD integration.

| Feature | Langfuse | Braintrust | RAGAS | DeepEval | Phoenix |
|---|---|---|---|---|---|
| License | MIT (core) | Proprietary | Apache 2.0 | Apache 2.0 | ELv2 |
| Agent metrics | Via LLM-as-judge | ~10+ AutoEvals | 30+ metrics | **50+ metrics** | Path/convergence |
| CI/CD integration | Guides | **Native GitHub Action** | Manual | **Pytest native** | Manual |
| Self-hostable | ✅ Free | ❌ Enterprise only | N/A (library) | ✅ Free | ✅ Free |
| LangGraph support | ✅ Callback | ✅ | Via LangChain | ✅ Callback | ✅ Auto-instrument |
| Best for | Full-lifecycle observability | CI/CD quality gates | RAG evaluation | Comprehensive testing | Vendor-neutral tracing |

---

## LLM-as-judge requires careful calibration but scales evaluation dramatically

LLM-as-judge evaluation has become the workhorse of agent assessment, sitting between cheap deterministic checks and expensive human review. Research shows sophisticated judge models can align with human judgment up to **85%**, exceeding human-to-human agreement rates of **81%**. However, domain-specific tasks (law, medicine, construction) show agreement rates dropping to **64–68%**, below inter-expert baselines of ~72–75%.

Two primary patterns dominate. **Direct assessment** (pointwise scoring) has the judge evaluate individual responses on a PASS/FAIL or 1–5 scale with reasoning. **Pairwise comparison** has the judge select the better of two responses, which is more reliable for A/B testing but produces no absolute scores. The G-Eval framework improves correlation with human judgments from **0.51 to 0.66** (Spearman ρ) by using chain-of-thought prompting before scoring.

Known biases require mitigation: **position bias** (preference for first or last response), **length bias** (favoring longer outputs), **self-enhancement bias** (models preferring their own outputs), and **overconfidence** (verbalized confidence imitating human certainty patterns). The practical mitigation is multi-judge evaluation: run the judge 3 times and take majority vote, or use multi-agent debate where multiple "persona" agents argue different positions before a separate agent renders judgment. The MAJ-Eval approach—automatic persona extraction from domain literature with multi-agent group debate—achieves Spearman ρ improvements up to **0.47** versus 0.15–0.36 for standard baselines.

To validate your LLM judge, build **150–250 manually labeled examples** split 60–70% dev / 30–40% held-out test. Iterate on judge prompts using the dev set until accuracy exceeds 80% against human labels, then validate on the held-out set with bootstrap resampling to quantify judge reliability. For FF&E specification quality, this means having certified specifiers label extraction outputs, then calibrating Claude-as-judge against their assessments.

**Confidence-based evaluation** provides a complementary signal. Multi-sample consistency—running the same prompt 5–20 times with temperature > 0—is the most practical approach: consistent answers indicate high confidence, frequent changes indicate uncertainty. The CISC method (ACL 2025) achieves the same accuracy as standard self-consistency using **46% fewer samples** by adding a self-assessment step to each reasoning path. For black-box models like Claude, the P(True) method works well: ask the model "Is the following answer correct?" and use the probability assigned to "True" as a confidence score.

---

## FF&E procurement agents demand domain-specific evaluation across five critical areas

Evaluating AI agents for FF&E procurement requires specialized metrics and golden datasets that reflect construction industry complexity. No existing FF&E/construction AI companies publicly share detailed evaluation methodologies, so the approaches below synthesize AI evaluation best practices with domain-specific requirements.

**Specification extraction accuracy** should be evaluated as a structured information extraction task across three dimensions: field detection (did the agent identify that an attribute exists?), field extraction (did it extract the correct value?), and field normalization (did it standardize units and formats correctly?). Industry benchmarks show well-configured AI systems achieve **90%+ accuracy on structured fields** (quantities, specifications, dates) and **85%+ accuracy on subjective assessments**. Build golden datasets from 200–500 real architectural documents covering hospitality, healthcare, corporate office, education, and retail project types. Use 2–3 domain experts (architects, FF&E procurement specialists) for annotation, targeting Cohen's Kappa ≥ 0.85 for inter-annotator agreement. Key FF&E attribute types each need tailored evaluation: dimensions use numeric tolerance (±0.5"), materials use exact match plus synonym matching, certifications (BIFMA, GREENGUARD, FSC) use set-based F1 scoring, and CSI MasterFormat classification targets **95% accuracy at the 2-digit level** and **85% at the 6-digit level**.

**Product matching quality** against your pgvector catalog should be measured with information retrieval metrics. **NDCG@10 ≥ 0.75** is the production readiness target, with MRR ≥ 0.80 to ensure the best match surfaces quickly. Critically, evaluate the pgvector HNSW index's recall-speed tradeoff explicitly: run exact search as ground truth, then compare ANN search results at different `ef_search` settings (40, 100, 200, 400), targeting **Recall@10 ≥ 0.95**. Create five test categories: exact match cases (specific manufacturer + model), synonym cases ("task seating" matching "task chair"), specification-only cases (no brand, only performance specs), "or equal" cross-references, and negative cases (products that look similar but violate a critical constraint).

**Financial accuracy demands zero tolerance for arithmetic**—never use the LLM for calculations. LLM identifies values and operations; TypeScript/PostgreSQL performs the math deterministically. A 99% accuracy rate in financial calculations yields 0% operational trust. Line item math and PO totals must be exact to the penny ($0.00 tolerance); only shipping estimates permit a ±5% range. Test categories include line item calculations, subtotal aggregation, discount application, tax calculation, and multi-currency handling.

**Compliance checking** must optimize for recall on safety-critical items. For fire codes (CAL TB 133, NFPA 701) and ADA compliance, target **≥ 98% recall** with ≥ 85% precision—missing a non-compliant item carries far greater risk than flagging a compliant one. For cost-optimization compliance (LEED points, Buy America), balance precision and recall at **F1 ≥ 0.90**. Build 200+ test cases: 40% clearly compliant, 30% clearly non-compliant with specific failure reasons, and 30% edge cases (borderline dimensions, partial certifications, ambiguous country of origin).

**Guardrail testing** validates deterministic business rules with traditional unit tests at 100% pass rate: PO amount ceilings trigger VP approval at exactly $50,000.00, requesters cannot approve their own POs, only approved vendors receive POs, and POs cannot exceed remaining budget. Implement a three-layer guardrail architecture: deterministic pre/post-LLM controls (tested with Vitest), LLM-based semantic quality evaluation (tested with LLM-as-judge in CI), and human-in-the-loop review for high-stakes decisions (implemented via LangGraph's `interrupt_before`).

---

## Production evaluation requires continuous monitoring and progressive rollout

The most effective production evaluation strategy combines offline evals during development with online scoring of production traffic, feeding failures back into regression suites. Anthropic's guidance and industry practice converge on a "Swiss Cheese Model" where no single layer catches every issue but multiple methods provide comprehensive coverage.

**Continuous evaluation in production** means running evaluators asynchronously on sampled production traffic (2–5% of transactions). Langfuse and Braintrust both support online scoring with the same scorer library used for development. Set alert thresholds: if success rate drops below 85%, latency exceeds 10 seconds, or costs spike unexpectedly, trigger automated notifications. Track distribution drift—whether production data diverges from test data over time—and convert failed production traces into permanent regression test cases with one click (Braintrust's pattern).

**Progressive rollout with eval gates** follows a four-stage pattern: shadow mode (agent processes requests but responses aren't shown to users), canary deployment (5–10% of traffic routed to the new variant), regional rollout, then full deployment. Ship with feature flags, regional partitions, and a kill switch per agent. Braintrust's GitHub Action implements CI/CD gates that block merges when quality scores drop below configurable thresholds (e.g., context recall > 90%, answer correctness > 80%).

**A/B testing agent changes** requires session consistency (users see the same variant throughout a session) and multi-dimensional measurement. Unlike traditional A/B testing with binary conversion metrics, agent A/B tests must measure relevance, faithfulness, latency, cost, and user satisfaction simultaneously. Langfuse supports prompt-level A/B testing with version labels; Braintrust supports experiment-level comparison.

**Cost-aware evaluation** tracks tokens per task, cost per successful completion, and cache hit rates alongside quality metrics. Langfuse provides granular cost tracking across input, output, cached, and reasoning tokens per generation. The TALE framework (ACL 2025) estimates optimal token budgets per question to avoid overspending on easy tasks. For procurement agents handling hundreds of POs daily, cost per successful PO completion is a critical metric.

**Regression detection** relies on baseline tracking during stable periods. Any greater-than-5% drop in relevance or correctness scores triggers investigation. Anthropic recommends that capability evals with consistently high pass rates "graduate" to regression suites, ensuring that previously solved problems stay solved as the system evolves.

---

## Essential GitHub repositories and open-source tools

The following repositories represent the most important tools for building an agent evaluation pipeline in 2026:

- **`langchain-ai/agentevals`** — Purpose-built trajectory evaluators for LangGraph agents with strict, unordered, subset, and superset matching modes plus LLM-as-judge trajectory scoring. The most directly relevant library for your LangGraph stack.

- **`langchain-ai/openevals`** (~921 stars) — Readymade evaluators including LLM-as-judge with prebuilt prompts, code execution evaluators (E2B sandboxed), and multimodal input support. Works with LangSmith's pytest/Vitest integration.

- **`confident-ai/deepeval`** (~14,000 stars) — The most comprehensive metrics library with 50+ built-in metrics and native pytest integration. Agent-specific metrics (TaskCompletion, ToolCorrectness, AgentEfficiency) are production-ready.

- **`explodinggradients/ragas`** (~13,000 stars) — The standard RAG evaluation library, now with 30+ metrics including agent-specific ones. Essential for evaluating your pgvector retrieval pipeline.

- **`safety-research/bloom`** (Anthropic, December 2025) — Automated behavioral evaluation of frontier models using a 4-stage pipeline: Understanding → Ideation → Rollout → Judgment. Validated on 16 frontier models with **0.86 Spearman correlation** with human judges.

- **`anthropics/evals`** — Anthropic's model-written evaluation datasets for persona, sycophancy, and bias testing. **`anthropics/courses/prompt_evaluations`** provides a comprehensive 9-lesson evaluation course. **`anthropics/anthropic-cookbook/building_evals.ipynb`** offers practical code examples.

- **`UKGovernmentBEIS/inspect_ai`** (~4,000 stars) — The UK AI Security Institute's reproducible evaluation framework with 100+ pre-built evaluations and sandboxed execution. Emerging as the standard for safety evaluations; Anthropic's Bloom exports Inspect-compatible transcripts.

- **`langfuse/langfuse`** (~23,000 stars) — Full-stack open-source observability with tracing, evaluation, and prompt management. TypeScript backend with Python/JS SDKs.

- **`Arize-AI/phoenix`** (~16,000 stars) — OpenTelemetry-native observability with auto-instrumentation for LangGraph and Claude. Free self-hosted option.

- **`langchain-samples/evals-cicd`** — Minimal reference implementation for LangSmith evaluations in CI/CD with GitHub Actions, including automated PR comments with evaluation reports.

- **`philschmid/ai-agent-benchmark-compendium`** — Catalog of 50+ agent benchmarks categorized by function calling, tool use, general reasoning, coding, and computer interaction. Essential reference for finding the right benchmark.

---

## The metrics that matter for procurement agent reliability

Beyond accuracy, agent reliability encompasses consistency, latency, cost, and error recovery. Track these across every evaluation:

**Accuracy metrics** include task completion rate (binary per task), answer correctness (factual accuracy plus completeness), pass@1 (first-attempt success, critical for user-facing agents), pass^k (all-trials success, the true reliability measure), and tool selection accuracy. For your procurement agents, add spec extraction field-level F1 (≥ 0.90), CSI classification accuracy (≥ 95% at 2-digit), product match NDCG@10 (≥ 0.75), and compliance recall (≥ 98% for safety-critical).

**Reliability metrics** include standard deviation of scores across multiple trials on the same task, error recovery rate (percentage of failures where the agent self-corrects), answer drift over time on stable inputs, and guardrail violation rate. The gap between pass@1 and pass^3 directly quantifies consistency: a small gap means reliable behavior.

**Operational metrics** include time-to-first-token, total task completion time including all agent loops, tokens per task, cost per successful completion, and number of agent turns per task (an efficiency indicator Anthropic specifically recommends tracking). For procurement, add PO processing time, vendor response turnaround, and human escalation rate.

**Statistical rigor** is non-negotiable. Always report **confidence intervals**, not just point estimates. For binary pass/fail outcomes, use McNemar's test to compare two agent variants. For continuous scores, use paired t-tests on the same evaluation set to reduce variance. Bootstrap confidence intervals (1,000–10,000 iterations, BCa-corrected) work when CLT assumptions may not hold. To detect a 5% absolute improvement with 80% power at α = 0.05, plan for **200–400 evaluation examples** depending on score variance.

---

## Conclusion

The AI agent evaluation landscape in 2026 has reached a maturity inflection point. Three developments stand out as genuinely transformative for teams building production agents. First, **agent-specific evaluation metrics** (trajectory matching, tool call accuracy, goal completion) are now built into every major framework—DeepEval's 50+ metrics and LangChain's `agentevals` package make trajectory evaluation accessible rather than requiring custom infrastructure. Second, **the testing pyramid pattern** has been validated by organizations shipping real agents: deterministic tests at the base catch software bugs, record-and-replay integration tests catch behavioral regressions, probabilistic benchmarks measure quality trends, and end-to-end simulations validate business outcomes. Third, the **feedback loop from production failures to regression tests** is the single most impactful practice—start with 20–50 test cases drawn from real failures and expand continuously.

For your FF&E procurement stack specifically, the architecture should be: Vitest for deterministic business rule and financial calculation tests (100% pass rate required), LangSmith or Langfuse for LangGraph trajectory tracing and offline evaluation with golden datasets, DeepEval or RAGAS for agent-specific and RAG-specific metrics, Braintrust's GitHub Action for CI/CD eval gates, and a three-layer guardrail system that keeps financial arithmetic entirely deterministic while using LLM-as-judge for semantic quality assessment. The most important insight from Anthropic's evaluation philosophy applies directly: grade outcomes in the environment (the actual database record, the generated PO, the compliance report) rather than just the agent's claims about what it did. For procurement, this means checking the PO in PostgreSQL, not just checking what Claude said it created.