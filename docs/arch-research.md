# Agentic AI architecture for construction procurement: a technical strategy guide

**The production-ready AI stack for construction procurement in 2026 centers on three pillars: LangGraph-based agent orchestration with deterministic guardrails, hybrid RAG on Aurora pgvector, and a three-layer protocol stack (MCP + A2A + AG-UI) for composable architecture.** This strategy document provides the technical depth needed to build AI agents for FF&E procurement orchestration, RAG systems for construction knowledge bases, and ML/analytics for predictive models at Source. The agentic AI landscape has matured rapidly — **57% of organizations now have agents in production** (LangChain survey, Dec 2025) — but the gap between demo and deployment remains wide. What follows is a production-first technical blueprint grounded in what actually works.

---

## 1. The agentic framework landscape has consolidated around LangGraph

### LangGraph: the production standard

LangGraph reached **v1.0 alpha** in late 2025 and is the most production-deployed open-source agent framework, used by LinkedIn, Uber, Klarna, and Elastic. Its architecture is a directed graph (cycles and loops supported) built on a Pregel execution model that provides deterministic concurrency without data races.

The core primitives that matter for procurement workflows:

- **State machines**: Agents are nodes (Python/TypeScript functions) connected by conditional or unconditional edges. State is a typed dict passed through the graph with reducer logic for concurrent updates. This maps cleanly to procurement stages: `SPEC_EXTRACTION → PRODUCT_MATCHING → VENDOR_RFQ → QUOTE_COMPARISON → PO_GENERATION`.
- **`interrupt()` and human-in-the-loop**: Calling `interrupt()` in any node pauses execution, saves state via a checkpointer, and resumes from the exact point later. For a $50K FF&E purchase order, this enables mandatory human approval gates without losing workflow context.
- **`Command()` for explicit routing**: Agent A's output triggers a condition that routes to Agent B — more reliable than natural-language delegation for financial workflows.
- **Checkpointing with PostgresSaver**: State snapshots persist to Postgres (compatible with Aurora). Enables pause/resume across machines and time, time-travel debugging, and cheaper retries.
- **Streaming**: Multiple modes — token-by-token, key actions, progress bars — all via SSE and async generators. Designed for low perceived latency.

**LangGraph Cloud** provides managed infrastructure with persistence, streaming, and scaling. **Subgraphs** enable modular, reusable agent pipelines — a critical pattern for Source, where the "spec extraction" subgraph can be reused across different procurement workflows.

### Framework comparison: what to use when

 
**Google ADK** (v0.6.0) is uniquely multi-language: Python, TypeScript, Go, and Java. It has native MCP and A2A support, built-in bidirectional audio/video streaming, and deploys to Vertex AI Agent Engine. It powers Google Agentspace and Customer Engagement Suite internally.

| Scenario | Recommended Framework |
|---|---|
| Complex stateful procurement workflows | **LangGraph** |
| Quick prototyping, clear role-based teams | **CrewAI** |
| OpenAI ecosystem, rapid development | **OpenAI Agents SDK** |
| Multi-language (Go + Python + TS) | **Google ADK** |
| No framework needed | Simple single-prompt agents |

### Multi-agent orchestration: start with supervisor, not swarm

The **supervisor/orchestrator-worker pattern** is the dominant production architecture. A central supervisor receives requests, decomposes tasks, delegates to specialist agents, monitors execution, validates results, and synthesizes responses. For Source's procurement orchestration, this means a Procurement Orchestrator agent delegating to Spec Extraction, Product Matching, Vendor Communication, Quote Comparison, and Compliance agents.

**Hierarchical delegation** (supervisor of supervisors) scales to enterprise level — IBM confirms this as the standard for large-scale deployments. The **swarm pattern** (agents operating as a collective without central control) lacks convergence guarantees and is not recommended for financial workflows. **Event-driven patterns** work well for reactive triggers (new submittal arrives → kicks off review pipeline).

The critical production insight: **Level 2-3 autonomy is the sweet spot** — workflow agents with branching and tool use. Fully autonomous multi-agent systems are "fascinating for demos, painful for production." Token costs explode, conversations go in circles, and debugging is extremely difficult. **Start with a single well-instrumented agent before adding multi-agent complexity.**

### Agent memory: what works in production

Agent memory follows a taxonomy inspired by cognitive science. **Short-term memory** is the conversation context within the LLM context window — effectively RAM that disappears when the session ends. **Long-term memory** splits into three types:

**Episodic memory** stores specific past experiences ("Last week, this vendor was late on delivery for Project X"). Implementation: structured records with timestamps in a vector store for semantic retrieval. **Semantic memory** stores factual knowledge and relationships ("Vendor ABC specializes in healthcare FF&E and has LEED certification"). Implementation: knowledge graphs or relational databases. **Procedural memory** stores learned operational workflows — stored as structured workflow definitions in LangGraph state machines.

**Mem0** is the most mature long-term memory solution, supporting user/agent/session/organization scoping. For Source, the practical approach is hierarchical: conversation context (short-term) + pgvector-backed semantic memory (long-term) + Aurora Postgres for structured episodic records.

---

## 2. MCP, A2A, and AG-UI form a three-layer protocol stack

### Model Context Protocol: the foundation layer

MCP, now governed by the **Agentic AI Foundation (AAIF)** under the Linux Foundation (co-founded by Anthropic, Block, and OpenAI), has become the standard for agent-to-tool integration. The latest spec version is **2025-11-25**, with **97M+ monthly SDK downloads** and ~2,000 servers in the MCP Registry.

MCP uses a Host → Client → Server architecture built on JSON-RPC 2.0, inspired by the Language Server Protocol. It solves the "N×M integration problem" with three core primitives: **Tools** (functions the AI can execute), **Resources** (context and data attached to conversations, URI-addressed), and **Prompts** (templated messages and workflows). The November 2025 release added critical enterprise features:

**Tasks** (experimental) enable asynchronous long-running operations with states: `working`, `input_required`, `completed`, `failed`, `cancelled`. This is essential for procurement workflows where an agent might need to wait hours for a vendor response. **Streamable HTTP** (replacing deprecated SSE transport) uses a single HTTP endpoint supporting POST and GET, enabling horizontal scaling behind load balancers. **OAuth 2.1** with Resource Indicators (RFC 8707) provides authentication for remote servers.

For Source's architecture, MCP servers would wrap internal APIs — product catalog, vendor database, ERP system, document store — allowing any MCP-compatible agent to access them through a standardized protocol. SDKs exist for TypeScript, Python, Go, and all other languages in Source's stack.

### A2A protocol: agent-to-agent coordination

Google's **Agent-to-Agent (A2A) protocol** reached **v1.0** with **150+ supporting organizations**. While MCP handles agent-to-tool communication, A2A enables agents to collaborate as peers without exposing internal logic. Each agent publishes an **Agent Card** (`/.well-known/agent.json`) advertising its capabilities, and work flows through **Tasks** with full lifecycle management.

A2A supports JSON-RPC 2.0 over HTTP, gRPC, and REST bindings. Interaction patterns include synchronous (immediate response), streaming (SSE for real-time updates), and asynchronous (push notifications for long-running tasks). For Source, A2A would enable the Spec Extraction Agent to delegate visual document analysis to a specialized Vision Agent running on a different service, without either agent needing to understand the other's internals.

### AG-UI: the user interaction layer

**AG-UI** (created by CopilotKit, May 2025) standardizes how agents connect to user-facing applications. It defines ~16 event types across lifecycle (`RUN_STARTED`, `RUN_FINISHED`), text streaming (`TEXT_MESSAGE_CONTENT`), tool calls (`TOOL_CALL_START`, `TOOL_CALL_ARGS`), state management (`STATE_SNAPSHOT`, `STATE_DELTA` via JSON Patch), and human-in-the-loop (`INTERRUPT`).

The protocol is framework-agnostic with first-party integrations for LangGraph, CrewAI, Google ADK, and AWS Strands Agents. For Source's React/Next.js frontend, AG-UI provides real-time streaming of agent status, tool call progress, and structured state updates — replacing custom WebSocket implementations with a unified event stream.

### The composable architecture

These three protocols compose into a clean stack: **MCP** (tools and data, foundation layer), **A2A** (agent coordination, network layer), **AG-UI** (user interaction, presentation layer). A typical Source workflow would flow: user submits a specification via AG-UI → orchestrator agent accesses the product catalog via MCP → delegates matching to a specialist agent via A2A → results stream back via AG-UI with real-time progress updates. Adoption should be incremental: start with MCP for tool integration, add AG-UI for frontend streaming, layer in A2A for multi-agent coordination as complexity grows.

---

## 3. RAG architecture in 2026 revolves around contextual retrieval and hybrid search

### Chunking: contextual enrichment is the single biggest improvement

The **Anthropic contextual retrieval** technique delivers a **67% reduction in retrieval failure** when combined with hybrid search and reranking. The approach: use an LLM to prepend 50-100 tokens of document-level context to each chunk before embedding. For construction specs, this transforms `"The compressive strength shall not be less than 4,000 psi at 28 days"` into a self-contained chunk with section, division, project, and document context.

For chunking strategy, the recommended progression for Source is: start with **recursive chunking** (256-512 tokens, 15% overlap) as the production default. Add **structure-aware splitting** (respecting CSI MasterFormat section boundaries) for specifications and contracts. Apply **contextual enrichment** to all chunks using Claude Haiku (fast, cheap) with prompt caching. For high-value contracts, consider **agentic chunking** where an LLM dynamically decides chunk boundaries. For visual documents like floor plans, use **ColPali/ColQwen 2.5**, which treats document pages as images and generates visual embeddings capturing text, tables, figures, and spatial relationships without OCR.

### Hybrid search: the production-proven pipeline

The proven architecture retrieves **top 100 candidates each from dense (embedding) and sparse (BM25) retrieval**, fuses results with Reciprocal Rank Fusion (k=60), then **reranks to top 20** with Cohere `rerank-v3.5`. Benchmarked performance shows this full pipeline achieves **NDCG@10 of 0.93** — a 29% improvement over dense retrieval alone — within a **500ms total latency budget**.

For pgvector on Aurora Postgres, dense retrieval uses `text-embedding-3-small` (1536 dimensions) with HNSW indexing, while sparse retrieval leverages PostgreSQL's native `tsvector` + `ts_rank` full-text search. The hybrid can be computed in a single SQL query combining cosine similarity and text rank scores with configurable weights (0.7 dense + 0.3 sparse). This is critical for construction: exact matches on spec numbers, material codes, and contractor names require sparse retrieval, while semantic understanding of requirements needs dense retrieval.

### pgvector 0.8.0 on Aurora: production configuration

pgvector 0.8.0 (available on Aurora PostgreSQL 16.3+) introduced **iterative index scans** that solve the overfiltering problem — queries continue scanning until enough filtered results are found, delivering up to **9x faster filtered queries**. HNSW is the clear winner over IVFFlat for production RAG: at 1M vectors, HNSW delivers **~8ms p95 latency at 0.98 recall@10** versus IVFFlat's 12ms at 0.92 recall.

The recommended HNSW configuration: `m=16` (connections per node), `ef_construction=200` (build-time candidate list), `ef_search=40` (runtime, increase for better recall), with `hnsw.iterative_scan='relaxed_order'` enabled. For scaling, use **PgBouncer in transaction mode** (~50K req/s vs ~8K without), batch upserts via `unnest`, and `halfvec` scalar quantization for 50% memory savings. Aurora supports up to 15 read replicas for scaling reads.

**pgvector is the right choice for Source's scale.** For under 10M vectors (typical for a construction document corpus), pgvector with HNSW delivers adequate performance while keeping embeddings co-located with projects, contractors, materials, and compliance data. JOINs are JOINs, not network hops. A dedicated vector database becomes justified only above 10M vectors or for sub-10ms p99 requirements.

### GraphRAG for cross-document reasoning

Microsoft's **GraphRAG** solves the inability to answer questions requiring understanding across an entire dataset — queries like "Which contractors have submitted materials meeting ASTM C150 for projects with LEED Gold certification?" Traditional vector RAG retrieves single chunks; GraphRAG extracts entities and relationships into a knowledge graph, performs community detection, and generates hierarchical summaries. It achieves **72-83% comprehensiveness improvement** over traditional RAG.

For Source, GraphRAG is ideal for building a knowledge graph linking contractors → submittals → materials → specifications → compliance codes → projects. Start with vector RAG for point queries, and add GraphRAG for cross-project knowledge and compliance reasoning as the system matures. Use Neo4j or FalkorDB (sub-50ms queries) for the graph store.

---

## 4. Financial-grade agent patterns: deterministic shell, probabilistic core

### Confidence-based routing with calibrated thresholds

The dominant production pattern is **bounded autonomy with tiered routing**. Every agent decision produces a confidence score that routes through three tiers: **auto-approve** (≥0.95 confidence, amount within limits, all fields validated), **review-required** (0.70-0.95, minor discrepancies), and **escalate/reject** (<0.70, new vendors, missing critical fields, policy conflicts).

Confidence scoring techniques in order of reliability: **logit-based confidence** (extracting token-level log probabilities, best for structured extraction like PO fields), **multi-sample consistency** (sample 3-5 responses at temperature >0, measure agreement), and **self-evaluation** (prompting the model to rate its own confidence). A critical finding: prompted confidence scores have ECE values of 0.108-0.427, making them **insufficient alone for high-stakes financial decisions**. Always combine with deterministic validation.

### Deterministic guardrails are non-negotiable

The consensus architecture wraps non-deterministic AI in four defensive layers. **Layer 1** (deterministic input validation): regex PII detection, schema validation, rate limiting, domain allowlists. **Layer 2** (deterministic business rules): amount ceilings by role/category, approved vendor lists, required field checks, duplicate PO detection, budget remaining validation. **Layer 3** (structured output validation): Pydantic/Zod models enforce schema at parse time. **Layer 4** (LLM-based safety): content safety and hallucination detection via grounding checks.

For procurement, critical guardrails include: agents cannot both create and approve POs (segregation of duties), hard dollar limits per category, and every extracted amount must trace back to a specific location in the source document. **NVIDIA NeMo Guardrails** provides Colang 2.0 for defining dialog rails; **Guardrails AI** offers a Hub of pre-built validators. These should complement custom deterministic rules, not replace them.

### Durable execution with Temporal

**Temporal** is recommended for financial workflows — it's used by **OpenAI for Codex** handling millions of agent requests. Its workflow/activity separation is perfectly suited to procurement: workflows are deterministic orchestration code; activities are non-deterministic LLM calls. The event history provides a complete append-only audit log for replay and recovery.

The killer feature for procurement: **"sleep for a week" pattern**. A PO approval workflow can pause for days waiting for human approval, then resume exactly where it left off without losing state. Temporal supports Python, TypeScript, and Go — matching Source's stack. For simpler serverless workflows, **Inngest** offers event-driven durable execution with `step.run()` providing code-level transactions and `step.ai.infer()` for proxied LLM calls with built-in telemetry.

Every financial operation needs an **idempotency key**: `po-create-{vendor_id}-{po_number}-{amount}-{timestamp_hash}`. Before execution, check if the key exists in the database; if so, return the cached result. After execution, record the key and result. This prevents duplicate PO creation during retries.

### Observability and cost optimization

**Langfuse** (open-source, MIT license) is recommended for primary observability — self-hostable for full data control, with OpenTelemetry support, prompt management, and evaluation pipelines. Complement with **Helicone** as an AI gateway for cost tracking and provider failover. Every agent decision must be logged immutably: inputs, outputs, confidence scores, routing decisions, business rules applied, guardrails triggered, approval chains, tokens consumed, and cost.

For cost optimization, **model routing delivers the highest ROI** (40-70% cost reduction). Route simple extraction tasks to GPT-4o-mini ($0.40/1M tokens) or Claude Haiku ($0.25/1M), reserve Claude Sonnet ($3/1M) for complex analysis. **Prompt caching** (both Anthropic and OpenAI support automatic caching of repeated system prompts) adds up to 90% cost reduction on cached portions. **Semantic caching** catches the 31% of enterprise queries that are semantically similar. For Source's procurement pipeline, estimated cost per invoice is **$0.03-0.05** (vs. $25-50 manual), and per PO is **$0.08-0.15**.

### Testing agents requires a dedicated pyramid

The agent testing pyramid starts with deterministic **unit tests** for all tool functions, guardrail validators, and business rules (standard pytest, every commit). Then **component/prompt tests** with golden datasets and snapshot testing — detecting regressions when prompts change. Then **LLM-as-judge evaluations** for subjective quality using PASS/FAIL judgments with required reasoning. Then **agent trajectory evaluation** via Langfuse, assessing final response quality, trajectory correctness, and individual step quality. **Braintrust GitHub Actions** integrate evaluations into CI/CD, blocking deployments when scores regress below thresholds.

---

## 5. Production engineering patterns for the Source tech stack

### Streaming and real-time agent updates with Vercel AI SDK

**Vercel AI SDK 5** is the primary recommendation for Source's React/Next.js frontend. It uses SSE as its standard streaming protocol with `useChat` and `useObject` hooks that handle all event streaming automatically. Key features include custom message types, typed tool invocations with input streaming, message metadata (model ID, token count), and decoupled state management (compatible with Zustand/Redux). The `streamText` function on the server returns a `UIMessageStreamResponse` that the client consumes transparently.

For agent status updates beyond text, stream structured JSON events: `tool_start`, `tool_result`, `delta` (partial state updates), and `final`. Production hardening requires heartbeat pings every 15-20s to prevent proxy timeout, AbortController for user cancellation, and batch token rendering every 30-60ms to avoid reflow storms. Target **TTFT (Time to First Token) under 300-700ms** for perceived responsiveness.

### Structured output: Zod for TypeScript, Pydantic for Python

OpenAI's Structured Outputs guarantee **100% schema adherence** via constrained decoding. In TypeScript, combine Zod schemas with `zodResponseFormat` for fully typed parse results. In Python, the **Instructor library** (3M+ monthly downloads) wraps 15+ LLM providers with automatic retries on validation failure and streaming partial objects. For Anthropic (which lacks native `json_schema` response_format), use Instructor's tool-use pattern.

Schema design best practices: keep schemas flat where possible, use `.describe()` liberally to guide the model, make all fields required (use `z.nullable()` for optional semantics), include a `reasoning` field for chain-of-thought before the answer, and validate on the application side even with guaranteed structured outputs.

### Model routing through AI gateways

**Bifrost** (Maxim AI, Go-based, open-source) achieves **11µs overhead at 5K RPS** — 54× faster than LiteLLM — making it ideal for self-hosted high-performance routing. **Portkey** is the leading managed gateway with Gartner Cool Vendor recognition, supporting 1,600+ LLMs with guardrails, RBAC, and prompt management. **LiteLLM** provides the widest provider coverage with an OpenAI-compatible API.

Model selection heuristics for early 2026: **Claude Sonnet 4** for complex reasoning, code generation, and long-context tasks. **GPT-4o** for general-purpose multimodal work and structured output reliability. **GPT-4o-mini** for high-volume classification and simple extraction. **Gemini 2.0 Flash** for cost-effective multimodal with large context windows. Implement fallback chains (Claude → GPT → Gemini) with circuit breaker patterns to automatically remove unhealthy providers.

### Background jobs and feature flags

**Inngest** is the top recommendation for TypeScript serverless AI workflows, handling 100M+ daily runs with durable execution, `step.ai.infer()` for proxied LLM calls, and AgentKit for multi-agent networks. **BullMQ** serves simpler Redis-backed queue needs with priority queues, rate limiting, and progress tracking. For complex enterprise workflows, **Temporal** provides industrial-strength durability. AWS's new **Lambda Durable Functions** (Dec 2025) offer auto-checkpointing and up to 1-year suspension without compute cost.

For feature flags, **LaunchDarkly AI Configs** provides purpose-built controls for LLM behavior: completion and agent modes, model switching without redeployment, guarded rollouts with automatic regression detection, and MCP server integration. Progressive rollout should follow: shadow mode → internal dogfood (1%) → beta users (5-10%) → canary (10-25%) → full rollout, with kill switches on every AI feature.

---

## 6. Construction AI is ripe for disruption, especially in FF&E procurement

### The competitive landscape reveals Source's opportunity

**Parspec** ($31.5M raised, July 2025 Series A) is the closest technical analogue to Source's mission. It uses ML/LLM models to extract product requirements from unstructured specs, match products from a database of **6M+ products** crawled from ~4,000 manufacturer websites daily, and reports **50-100% labor productivity improvement**. However, Parspec focuses on MEP (mechanical, electrical, plumbing) — not FF&E.

**BuildVision.io** ($13.8M, Series A 2025) connects contractors directly with manufacturers using AI that reads construction documents and extracts equipment specs. **BuildSync** achieves 95%+ accuracy on submittal compliance checking, reducing rejection rates from 35% to under 5%. **Programa** and **Techstyles.ai** are FF&E-specific platforms but with limited AI depth. **The FF&E procurement niche lacks a Parspec-equivalent with deep AI automation** — this is Source's strategic opening.

### Document AI pipeline for construction

The technical pipeline for Source's document processing: **parse** PDFs with layout-aware extraction using **Docling** (IBM, open-source, MIT license) which preserves tables, headers, and document hierarchy. Convert to Markdown, then apply structure-aware chunking respecting CSI MasterFormat section boundaries. For visual documents (floor plans, product images, finish schedules), use **ColPali/ColQwen 2.5** to generate visual embeddings that capture spatial relationships without OCR.

For FF&E specification extraction, the pipeline is: ingest spec documents → classify by CSI division → extract product attributes (dimensions, materials, finishes, certifications) using structured output with Pydantic/Zod schemas → match against a continuously updated product catalog using hybrid search → surface ranked, spec-compliant alternatives with confidence scores.

### Predictive models for procurement intelligence

Deep learning models achieve **85-90% accuracy** in construction cost estimation (systematic review of 39 studies). For Source's predictive analytics: **XGBoost/LightGBM** for FF&E cost estimation trained on historical procurement data. **LSTM/Prophet** for material price time-series forecasting (wood, fabric, metal, glass). **Vendor reliability scoring** as a composite of delivery timeliness, quality incidents, communication responsiveness, and pricing consistency. **Budget risk models** that flag projects at risk of overrun based on spec complexity, vendor mix, and historical patterns.

The market context reinforces urgency: **80% of CPOs plan to deploy generative AI within 3 years** but only 4% have meaningful deployments. **74% of executives deploying AI agents report ROI within the first year.** The autonomous AI agent market is projected at $8.5B by 2026 and $35B by 2030.

---

## Conclusion: a phased implementation roadmap

The technical landscape as of early 2026 supports building production-grade AI for construction procurement, but the architecture must be opinionated and phased. Three non-obvious insights emerge from this research:

**First, the "deterministic shell, probabilistic core" pattern is the only viable architecture for financial workflows.** Every procurement agent decision must pass through hard-coded business rules (amount limits, approved vendor lists, segregation of duties) before any LLM output reaches a downstream system. Temporal's durable execution with idempotency keys provides the transaction safety net.

**Second, contextual retrieval is the single highest-ROI investment for RAG quality.** Anthropic's technique of prepending document context to chunks before embedding delivers a 67% reduction in retrieval failure — far more impactful than switching embedding models or vector databases. Combined with hybrid search on pgvector (already in Source's stack), this eliminates the need for a separate vector database while delivering production-grade retrieval.

**Third, Source's competitive moat lies at the intersection of FF&E domain expertise and Parspec-style AI automation.** No existing platform combines deep FF&E procurement knowledge with specification extraction, multi-agent orchestration, and predictive analytics. The recommended phased rollout: **Phase 1** — RAG system for construction knowledge with contextual retrieval on Aurora pgvector. **Phase 2** — Single-agent procurement workflows with LangGraph (spec extraction → product matching → confidence-based routing). **Phase 3** — Multi-agent orchestration with supervisor pattern, MCP for tool integration, and AG-UI for real-time frontend streaming. **Phase 4** — Predictive models for cost estimation, vendor scoring, and lead time forecasting. Each phase should ship behind feature flags with kill switches, measured by domain-specific RAGAS evaluations augmented with construction accuracy metrics (spec number correctness, compliance reference accuracy).
