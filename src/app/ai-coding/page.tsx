"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Globe,
  Server,
  GitPullRequest,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowDown,
  Shield,
  Cpu,
  Code2,
  MessageSquare,
  Container,
  Eye,
  Zap,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Wrench,
  Layers,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// =============================================================================
// Animation variants
// =============================================================================

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// =============================================================================
// Section 1 — The Pipeline (5 layers)
// =============================================================================

const pipelineLayers = [
  {
    step: 1,
    label: "Trigger",
    subtitle: "How a task enters the system",
    icon: MessageSquare,
    color: "#4F6EF7",
    description:
      "An engineer describes the task via CLI, API call, or web interface. The system accepts natural language — no special syntax needed.",
    sourceImpl: [
      {
        surface: "CLI",
        icon: Terminal,
        example: 'claude -p "Add vendor rating column to suppliers table with Hasura migration" --allowedTools Read,Write,Edit,Bash --max-turns 15',
        when: "Daily dev work — fastest for engineers already in the terminal",
      },
      {
        surface: "API",
        icon: Code2,
        example: 'POST /api/agent/run\n{ "task": "Generate CRUD endpoints for bid-comparison", "budget_cap": "$2.00" }',
        when: "Automated triggers — GitHub Actions, flaky test detectors, scheduled migrations",
      },
      {
        surface: "Web",
        icon: Globe,
        example: "Internal dashboard with task input, live agent logs, and PR link on completion",
        when: "Non-technical stakeholders or quick one-off tasks with visible progress",
      },
    ],
  },
  {
    step: 2,
    label: "Devbox",
    subtitle: "Isolated cloud sandbox spins up",
    icon: Container,
    color: "#2D8B5E",
    description:
      "An isolated container launches with the full repo, warm caches, and all dependencies. The agent gets full shell access because the blast radius is zero — it can't touch production.",
    sourceImpl: [
      {
        surface: "Docker Sandbox",
        icon: Container,
        example: "docker sandbox run claude ~/source-app\n# Agent gets its own VM with private Docker daemon",
        when: "Local development — free, fast, runs on any Mac/Linux machine",
      },
      {
        surface: "AWS EC2 (Cloud)",
        icon: Server,
        example: "Pre-warmed EC2 pool with repo cloned, node_modules installed,\nPostgreSQL + Hasura running. Spin-up: ~15 seconds.",
        when: "Parallel runs — spin up 5 agents on 5 tasks simultaneously",
      },
    ],
  },
  {
    step: 3,
    label: "Agent Execution",
    subtitle: "Blueprint pattern: deterministic + agentic steps",
    icon: Cpu,
    color: "#C74B2A",
    description:
      "The agent runs inside a Blueprint — alternating between deterministic steps (git, lint, compile) and agentic steps (understand task, write code, fix errors). This hybrid approach is what makes agents reliable.",
    sourceImpl: [
      {
        surface: "Blueprint Flow",
        icon: Layers,
        example: "[Deterministic] Clone repo, checkout branch\n[Agentic]     Read context, understand task, plan\n[Agentic]     Write code implementation\n[Deterministic] tsc --noEmit && eslint\n[Deterministic] npm test -- --relevant\n[Agentic]     Fix any failures (max 2 rounds)\n[Deterministic] git push, create PR",
        when: "Every agent run follows this pattern — the deterministic walls contain unreliability",
      },
    ],
  },
  {
    step: 4,
    label: "Quality Gates",
    subtitle: "Automated checks before any human sees the code",
    icon: Shield,
    color: "#4ECBA0",
    description:
      "TypeScript compilation, ESLint, Jest tests, and Semgrep security scanning run automatically. If checks fail, the agent gets one retry. After 2 total CI rounds, it escalates to a human.",
    sourceImpl: [
      {
        surface: "Gate Stack",
        icon: CheckCircle2,
        example: "Gate 1: tsc --strict          (type safety)\nGate 2: eslint --fix           (code style)\nGate 3: jest --coverage        (no regression)\nGate 4: semgrep               (security scan)\n\n❌ Failure → agent retries (max 2 rounds)\n❌ Still failing → escalate to human",
        when: "Every PR — these gates are non-negotiable, same for human and AI code",
      },
    ],
  },
  {
    step: 5,
    label: "PR for Review",
    subtitle: "Templated PR delivered to a human engineer",
    icon: GitPullRequest,
    color: "#7C3AED",
    description:
      "The agent creates a PR using a standard template with summary, changes list, test results, and context. A human engineer must review and approve — this is load-bearing architecture, not ceremony.",
    sourceImpl: [
      {
        surface: "PR Template",
        icon: GitPullRequest,
        example: "## What this PR does\nAdds vendor rating column to suppliers table\n\n## Changes\n- Migration: 20260316_add_vendor_rating.sql\n- Model: updated Supplier type\n- API: new rating endpoint\n\n## Tests\n✅ 14 passing, 0 failing, +3 new\n\n## Agent metadata\nModel: Claude Sonnet · Tokens: 12,400 · Cost: $0.84\nCI rounds: 1/2 · Duration: 3m 42s",
        when: "Every agent PR — human review is mandatory before merge",
      },
    ],
  },
];

function Pipeline() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section>
      <SectionHeader
        title="The 5-Layer Pipeline"
        subtitle="From task description to reviewed PR — how Source's AI coding agents work"
      />

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-source-ai via-source-green to-[#7C3AED] lg:block" />

        <div className="space-y-4">
          {pipelineLayers.map((layer) => {
            const Icon = layer.icon;
            const isExpanded = expandedStep === layer.step;

            return (
              <motion.div
                key={layer.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: layer.step * 0.08, duration: 0.4 }}
                className="relative"
              >
                <div className="flex items-start gap-4 lg:ml-0">
                  {/* Step circle */}
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-white"
                    style={{
                      backgroundColor: layer.color,
                      borderColor: layer.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-xl border border-source-border bg-white">
                    <button
                      onClick={() =>
                        setExpandedStep(isExpanded ? null : layer.step)
                      }
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: `${layer.color}15`,
                              color: layer.color,
                            }}
                          >
                            Step {layer.step}
                          </span>
                          <h3 className="text-base font-semibold text-source-black">
                            {layer.label}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-source-muted">
                          {layer.description}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp
                          size={16}
                          className="ml-4 shrink-0 text-source-muted"
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="ml-4 shrink-0 text-source-muted"
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-source-border px-5 pb-5 pt-4 space-y-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-source-muted">
                              Source Implementation
                            </p>
                            {layer.sourceImpl.map((impl) => {
                              const ImplIcon = impl.icon;
                              return (
                                <div
                                  key={impl.surface}
                                  className="rounded-xl border border-source-border bg-source-gray p-4"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <ImplIcon
                                      size={14}
                                      style={{ color: layer.color }}
                                    />
                                    <span className="text-sm font-semibold text-source-black">
                                      {impl.surface}
                                    </span>
                                    <span className="ml-auto text-[10px] text-source-muted">
                                      {impl.when}
                                    </span>
                                  </div>
                                  <div className="rounded-lg bg-[#1A1A1A] p-3">
                                    <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/90">
                                      {impl.example}
                                    </pre>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Section 2 — Three Surfaces
// =============================================================================

function ThreeSurfaces() {
  return (
    <section>
      <SectionHeader
        title="Three Ways to Trigger an Agent"
        subtitle="CLI for speed, API for automation, Web for visibility"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {[
          {
            icon: Terminal,
            title: "CLI",
            color: "#2D8B5E",
            description:
              "Run from terminal with Claude Code headless mode. Fastest path for engineers.",
            code: '$ claude -p "Add vendor rating\ncolumn to suppliers" \\\n  --allowedTools Read,Write,Edit,Bash \\\n  --max-turns 15 \\\n  --budget 2.00',
            useCases: [
              "Quick bug fixes",
              "CRUD endpoint generation",
              "Database migration scaffolding",
              "Test generation for existing code",
            ],
          },
          {
            icon: Code2,
            title: "API",
            color: "#4F6EF7",
            description:
              "REST endpoint for programmatic triggers. Powers automated workflows and integrations.",
            code: "POST /api/agent/run\n{\n  task: \"Fix flaky test in\n    bid-comparison.spec.ts\",\n  context: { pr: 142 },\n  budget_cap: 2.00,\n  notify: \"slack\"\n}",
            useCases: [
              "GitHub Action on PR review",
              "Flaky test auto-fix",
              "Scheduled migration runs",
              "Webhook-triggered tasks",
            ],
          },
          {
            icon: Globe,
            title: "Web Dashboard",
            color: "#C74B2A",
            description:
              "Internal UI showing task input, live agent logs, and PR link when done.",
            code: "┌─────────────────────────┐\n│ Task: Add vendor rating  │\n│ Status: ██████░░ 75%     │\n│ Step: Running tests...   │\n│ Cost: $0.62 / $2.00 cap  │\n│                          │\n│ [View PR] [View Logs]    │\n└─────────────────────────┘",
            useCases: [
              "Non-technical stakeholders",
              "Monitoring parallel runs",
              "Cost tracking dashboard",
              "Team-wide task visibility",
            ],
          },
        ].map((surface) => {
          const Icon = surface.icon;
          return (
            <motion.div
              key={surface.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-xl border border-source-border bg-white p-5"
              style={{ borderTopWidth: 4, borderTopColor: surface.color }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${surface.color}15`,
                    color: surface.color,
                  }}
                >
                  <Icon size={16} />
                </div>
                <h4 className="text-sm font-semibold text-source-black">
                  {surface.title}
                </h4>
              </div>

              <p className="mb-4 text-xs leading-relaxed text-source-muted">
                {surface.description}
              </p>

              <div className="mb-4 rounded-lg bg-[#1A1A1A] p-3">
                <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/90">
                  {surface.code}
                </pre>
              </div>

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-source-muted">
                Best for
              </p>
              <ul className="space-y-1">
                {surface.useCases.map((uc) => (
                  <li
                    key={uc}
                    className="flex items-center gap-1.5 text-xs text-source-black"
                  >
                    <span
                      className="h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: surface.color }}
                    />
                    {uc}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 3 — Devbox Architecture
// =============================================================================

function DevboxArchitecture() {
  return (
    <section>
      <SectionHeader
        title="Cloud Devboxes"
        subtitle="Every agent runs in an isolated container — mistakes can't touch production"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Why isolation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-source-border bg-white p-6"
        >
          <h4 className="mb-4 text-sm font-semibold text-source-black">
            Three Properties of a Good Devbox
          </h4>
          {[
            {
              title: "Isolation",
              description:
                "No production access, no real user data, no network egress. Agent gets full shell permissions because the blast radius is zero.",
              color: "#C74B2A",
            },
            {
              title: "Parallelism",
              description:
                "Spin up 5 devboxes for 5 tasks simultaneously. Each engineer can run multiple agents while doing other work.",
              color: "#4F6EF7",
            },
            {
              title: "Predictability",
              description:
                "Every agent starts from a clean, identical state. No leftover files, no stale caches, no environment drift.",
              color: "#2D8B5E",
            },
          ].map((prop) => (
            <div
              key={prop.title}
              className="mb-3 last:mb-0 rounded-lg p-3"
              style={{
                backgroundColor: `${prop.color}08`,
                borderLeft: `3px solid ${prop.color}`,
              }}
            >
              <h5
                className="text-xs font-semibold"
                style={{ color: prop.color }}
              >
                {prop.title}
              </h5>
              <p className="mt-0.5 text-xs text-source-muted">
                {prop.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Implementation options */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {[
            {
              title: "Local: Docker Sandbox",
              color: "#2D8B5E",
              code: "# One command to start\ndocker sandbox run claude ~/source-app\n\n# Agent gets its own VM with:\n# - Private Docker daemon\n# - Full repo clone\n# - All deps installed\n# - PostgreSQL + Hasura running",
              cost: "Free",
              spinUp: "~30 seconds",
            },
            {
              title: "Cloud: AWS EC2 Warm Pool",
              color: "#4F6EF7",
              code: "# Pre-warmed pool of EC2 instances\n# Repo cloned, node_modules cached,\n# services running BEFORE task arrives\n\naws ec2 run-instances \\\n  --launch-template SourceDevbox \\\n  --tag-specifications \\\n    Key=task,Value=$TASK_ID",
              cost: "~$0.10/hour (t3.medium)",
              spinUp: "~15 seconds (warm pool)",
            },
          ].map((opt) => (
            <div
              key={opt.title}
              className="rounded-xl border border-source-border bg-white p-5"
              style={{ borderTopWidth: 3, borderTopColor: opt.color }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-source-black">
                  {opt.title}
                </h4>
                <div className="flex gap-3 text-[10px] text-source-muted">
                  <span>
                    Cost: <strong style={{ color: opt.color }}>{opt.cost}</strong>
                  </span>
                  <span>
                    Spin-up:{" "}
                    <strong style={{ color: opt.color }}>{opt.spinUp}</strong>
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-[#1A1A1A] p-3">
                <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/90">
                  {opt.code}
                </pre>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Section 4 — Blueprint Pattern
// =============================================================================

function BlueprintPattern() {
  const steps = [
    { type: "deterministic", label: "Clone repo, checkout branch", icon: "git" },
    { type: "agentic", label: "Read context, understand task, plan", icon: "brain" },
    { type: "agentic", label: "Write code implementation", icon: "code" },
    { type: "deterministic", label: "tsc --noEmit && eslint --fix", icon: "check" },
    { type: "deterministic", label: "npm test -- --relevant", icon: "test" },
    { type: "agentic", label: "Fix failures (max 2 rounds)", icon: "fix" },
    { type: "deterministic", label: "git push, create PR from template", icon: "pr" },
  ];

  return (
    <section>
      <SectionHeader
        title="The Blueprint Pattern"
        subtitle="Deterministic walls between agentic steps — this is what makes agents reliable"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-source-border bg-white p-6"
      >
        <div className="space-y-2">
          {steps.map((step, i) => {
            const isDeterministic = step.type === "deterministic";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isDeterministic ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                {i > 0 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown size={14} className="text-source-muted/40" />
                  </div>
                )}
                <div
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                    isDeterministic
                      ? "bg-source-green/5 border border-source-green/20"
                      : "bg-source-ai/5 border border-source-ai/20"
                  }`}
                >
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      isDeterministic
                        ? "bg-source-green/10 text-source-green"
                        : "bg-source-ai/10 text-source-ai"
                    }`}
                  >
                    {isDeterministic ? "Deterministic" : "Agentic"}
                  </span>
                  <span className="text-sm text-source-black">{step.label}</span>
                  {isDeterministic && (
                    <span className="ml-auto text-[10px] text-source-green">
                      100% predictable
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs text-source-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-source-green/20 border border-source-green/30" />{" "}
            Deterministic — never varies, always correct
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-source-ai/20 border border-source-ai/30" />{" "}
            Agentic — LLM reasoning, may need retries
          </span>
        </div>
      </motion.div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-4 rounded-xl border border-source-green/30 bg-source-green/5 p-5"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-source-green/10 text-source-green">
            <Zap size={16} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-source-black">
              Why this works
            </h4>
            <p className="mt-1 text-sm text-source-muted">
              Deterministic steps handle things that should never vary — git
              operations, running linters, following the PR template. Agentic
              steps handle things requiring judgment — understanding requirements,
              writing code, debugging failures. The deterministic walls between
              agentic steps compound into system-wide reliability.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 5 — MCP Tools for Source
// =============================================================================

function MCPTools() {
  const tools = [
    {
      name: "GitHub MCP",
      description: "Repo access, PR creation, issue reading, branch management",
      builtIn: true,
    },
    {
      name: "PostgreSQL MCP",
      description: "Schema inspection, query execution, migration validation",
      builtIn: true,
    },
    {
      name: "Hasura MCP",
      description: "Migration patterns, metadata inspection, permission rules",
      builtIn: false,
    },
    {
      name: "Sourcegraph MCP",
      description: "Codebase search, cross-reference lookup, symbol navigation",
      builtIn: true,
    },
    {
      name: "Playwright MCP",
      description: "UI test generation and execution, screenshot capture",
      builtIn: true,
    },
    {
      name: "pgvector MCP",
      description: "Embedding inspection, similarity search debugging, index tuning",
      builtIn: false,
    },
  ];

  return (
    <section>
      <SectionHeader
        title="MCP Tools for Source"
        subtitle={
          <>
            Stripe uses ~500 tools. Source needs 6-10. Keep it under 15 per
            agent run to avoid token waste.
          </>
        }
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.name}
            variants={staggerItem}
            className="rounded-xl border border-source-border bg-white p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wrench size={14} className="text-source-green" />
                <h4 className="text-sm font-semibold text-source-black">
                  {tool.name}
                </h4>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                  tool.builtIn
                    ? "bg-source-green/10 text-source-green"
                    : "bg-source-ai/10 text-source-ai"
                }`}
              >
                {tool.builtIn ? "Pre-built" : "Custom"}
              </span>
            </div>
            <p className="text-xs text-source-muted">{tool.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 6 — Implementation Roadmap
// =============================================================================

function ImplementationRoadmap() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const weeks = [
    {
      id: 1,
      label: "Weeks 1-2",
      title: "Foundation",
      color: "#2D8B5E",
      items: [
        "Write comprehensive CLAUDE.md with all coding conventions, architecture patterns, and stack guidance",
        "Create 3-5 shell scripts wrapping claude -p for common tasks (CRUD, tests, migrations)",
        "Set budget caps at $2 per agent run",
        "Establish baseline metrics for current PR velocity",
      ],
    },
    {
      id: 2,
      label: "Weeks 3-4",
      title: "Safety & Isolation",
      color: "#4F6EF7",
      items: [
        "Configure Docker sandboxes for all agent runs",
        "Set up quality gates: tsc strict, ESLint, Jest coverage regression, Semgrep",
        "Train team on reviewing AI-generated code (different mindset than human code)",
        "Enforce 2-round CI cap — escalate to human after 2 failures",
      ],
    },
    {
      id: 3,
      label: "Weeks 5-6",
      title: "MCP Integration",
      color: "#4ECBA0",
      items: [
        "Configure GitHub and PostgreSQL MCP servers",
        "Build custom Hasura MCP server for schema inspection and migrations",
        "Use bunx add-mcp@latest for consistent tool config across Claude Code and Cursor",
        "Begin tracking AI-generated vs human-generated code metrics",
      ],
    },
    {
      id: 4,
      label: "Weeks 7-8",
      title: "Orchestration",
      color: "#C74B2A",
      items: [
        "Build LangGraph.js workflow implementing the Blueprint pattern",
        "Implement for top 3 task types: CRUD generation, database migration, test generation",
        "Set up LangSmith for agent observability and tracing",
        "Launch web dashboard for task visibility and cost tracking",
      ],
    },
  ];

  return (
    <section>
      <SectionHeader
        title="8-Week Implementation Roadmap"
        subtitle="From zero to production-grade AI coding agents"
      />

      <div className="space-y-3">
        {weeks.map((week) => {
          const isExpanded = expandedWeek === week.id;
          return (
            <motion.div
              key={week.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: week.id * 0.08, duration: 0.35 }}
              className="rounded-xl border border-source-border bg-white"
            >
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: week.color }}
                >
                  {week.id}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-source-black">
                      {week.title}
                    </span>
                    <span className="rounded-full bg-source-gray px-2 py-0.5 text-[10px] text-source-muted">
                      {week.label}
                    </span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={14} className="text-source-muted" />
                ) : (
                  <ChevronDown size={14} className="text-source-muted" />
                )}
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="border-t border-source-border px-5 pb-4 pt-3 space-y-2">
                      {week.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-source-black"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: week.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// =============================================================================
// Page Root
// =============================================================================

export default function AICodingPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto max-w-6xl p-8 space-y-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-source-black">
            AI Coding at Scale
          </h1>
          <p className="mt-2 text-source-muted">
            How Source can implement production-grade AI coding agents — adapted
            from{" "}
            <a
              href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-source-ai hover:underline"
            >
              Stripe&apos;s Minions architecture
            </a>
          </p>

          {/* Stripe context card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 rounded-xl border border-source-border bg-white p-6"
          >
            <p className="text-sm leading-relaxed text-source-muted">
              Stripe&apos;s Minions merge <strong>1,300+ PRs per week</strong>,
              every line written by AI, every line reviewed by humans. The key
              insight:{" "}
              <strong>
                the model is nearly commodity — the infrastructure around it is
                everything
              </strong>
              . Source doesn&apos;t need Stripe&apos;s scale. It needs the same
              patterns, radically simplified.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-source-ai hover:underline"
              >
                Part 1: One-Shot Agents
                <ExternalLink size={12} />
              </a>
              <a
                href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-source-ai hover:underline"
              >
                Part 2: Blueprints & Scale
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>

          {/* Key stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "1,300+", label: "PRs/week at Stripe" },
              { value: "0%", label: "Human-written code" },
              { value: "~10s", label: "Devbox spin-up" },
              { value: "2 max", label: "CI retry rounds" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-source-border bg-white p-4 text-center"
              >
                <p className="text-xl font-bold text-source-green">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-source-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <Pipeline />
        <ThreeSurfaces />
        <DevboxArchitecture />
        <BlueprintPattern />
        <MCPTools />
        <ImplementationRoadmap />

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-source-green/30 bg-source-green/5 p-6"
        >
          <h4 className="text-base font-semibold text-source-black">
            The starting point is simple
          </h4>
          <p className="mt-2 text-sm text-source-muted">
            Write a great CLAUDE.md. Run{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs font-mono text-source-green border border-source-border">
              claude -p
            </code>{" "}
            with a $2 budget cap. Review what comes back. Everything else —
            devboxes, MCP tools, orchestration — is optimization on top of this
            core loop. What&apos;s good for human developers is good for AI
            developers.
          </p>
        </motion.div>

        <div className="h-8" />
      </div>
    </div>
  );
}
