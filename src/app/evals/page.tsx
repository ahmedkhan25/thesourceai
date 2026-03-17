"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Code2,
  Brain,
  User,
  ChevronDown,
  ChevronUp,
  FileSearch,
  Calculator,
  ShieldCheck,
  GitBranch,
  Check,
  X,
  ArrowRight,
  Target,
  TrendingUp,
  Activity,
  Eye,
  Rocket,
  Zap,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import AnimatedCounter from "@/components/AnimatedCounter";

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
// Section 1 — Testing Pyramid
// =============================================================================

const pyramidLayers = [
  {
    label: "E2E Simulations & Human Review",
    width: "35%",
    color: "#C74B2A",
    count: "~5%",
    description:
      "Full procurement workflow: extract specs → match products → generate PO. Binary business outcome.",
    example: {
      title: "Full Procurement Workflow",
      code: `Input: 200-page Ritz-Carlton spec document
Expected: 18 line items extracted, matched,
  PO generated with correct totals ($2.4M budget)
Result: 17/18 items correct, 1 flagged for review
Verdict: CONDITIONAL PASS — human review required`,
    },
  },
  {
    label: "Probabilistic Benchmarks / LLM-as-Judge",
    width: "55%",
    color: "#4F6EF7",
    count: "~15%",
    description:
      "Multi-trial evaluation. Run 3-5 times, aggregate. Regression = rate drops, not output changes.",
    example: {
      title: "Spec Extraction Quality Scoring",
      code: `Rubric: { field_detection: 5, value_accuracy: 5,
  unit_normalization: 5, completeness: 5 }

Trial 1: 17/20 → PASS
Trial 2: 18/20 → PASS
Trial 3: 16/20 → PASS

Majority verdict: PASS (threshold: 15/20)`,
    },
  },
  {
    label: "Component / Integration Tests",
    width: "75%",
    color: "#4ECBA0",
    count: "~30%",
    description:
      "Record-and-replay pattern. Capture real LLM calls, replay deterministically in tests.",
    example: {
      title: "Spec Extraction Tool Call Sequence",
      code: `// Recorded fixture: spec-extraction-lobby-chair.json
assertToolSequence(replay, [
  "parse_pdf",
  "extract_specifications",
  "classify_csi_division",
  "normalize_dimensions"
]);
// ✓ All 4 tools called in correct order`,
    },
  },
  {
    label: "Deterministic Unit Tests",
    width: "100%",
    color: "#2D8B5E",
    count: "~50%",
    description:
      "Business rules, financial arithmetic, schema validation. 100% deterministic, runs on every commit.",
    example: {
      title: "PO Amount Ceiling Check",
      code: `// Vitest — runs in milliseconds, every commit
expect(requiresVPApproval(49_999.99)).toBe(false);
expect(requiresVPApproval(50_000.00)).toBe(true);

expect(calculateLineTotal(24, 4850.00)).toBe(116_400.00);
expect(canApproveOwnPO("ahmed", "ahmed")).toBe(false);`,
    },
  },
];

function TestingPyramid() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);

  return (
    <section>
      <SectionHeader
        title="The Agent Testing Pyramid"
        subtitle="Four layers — from millisecond unit tests to full procurement simulations"
      />

      <div className="space-y-3">
        {pyramidLayers.map((layer, i) => {
          const isExpanded = expandedLayer === i;
          return (
            <div key={layer.label} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{ width: layer.width }}
                className="origin-center"
              >
                <button
                  onClick={() => setExpandedLayer(isExpanded ? null : i)}
                  className="w-full rounded-xl border bg-white p-4 text-left transition-shadow hover:shadow-md"
                  style={{
                    borderLeftWidth: 4,
                    borderLeftColor: layer.color,
                    borderColor: isExpanded ? layer.color : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${layer.color}15`,
                          color: layer.color,
                        }}
                      >
                        {layer.count}
                      </span>
                      <span className="text-sm font-semibold text-source-black">
                        {layer.label}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={14} className="text-source-muted" />
                    ) : (
                      <ChevronDown size={14} className="text-source-muted" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-source-muted">
                    {layer.description}
                  </p>
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
                      <div className="mt-2 rounded-xl bg-[#1A1A1A] p-4">
                        <p
                          className="mb-2 text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: layer.color }}
                        >
                          {layer.example.title}
                        </p>
                        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-white/90">
                          {layer.example.code}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Pyramid label */}
      <div className="mt-4 flex items-center justify-center gap-6 text-[10px] text-source-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-source-green" /> Fast &
          Cheap
        </span>
        <ArrowRight size={10} className="text-source-muted" />
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#C74B2A]" /> Slow &
          Expensive
        </span>
      </div>
    </section>
  );
}

// =============================================================================
// Section 2 — Grader Types
// =============================================================================

const graderTypes = [
  {
    icon: Code2,
    title: "Code-Based Graders",
    color: "#2D8B5E",
    description:
      "Deterministic. String match, regex, tool call verification. Fast, objective, zero ambiguity.",
    examples: [
      { label: "Financial", code: "assert total === 24_750.00" },
      {
        label: "Tool Call",
        code: 'assert lastToolCall.name\n  === "extract_specifications"',
      },
      {
        label: "Business Rule",
        code: "assert po.amount < 50_000\n  || po.approver === 'VP'",
      },
    ],
    bestFor: "Financial calculations, business rules, schema validation",
  },
  {
    icon: Brain,
    title: "Model-Based Graders",
    color: "#4F6EF7",
    description:
      "Flexible. LLM-as-judge with rubric scoring. Run 3x with majority vote. 85% alignment with human judgment.",
    examples: [
      {
        label: "Rubric Score",
        code: "Completeness:  5/5\nAccuracy:      4/5\nFormatting:    5/5\n─────────────────\nTotal: 14/15 → PASS",
      },
    ],
    bestFor:
      "Spec extraction quality, vendor communication tone, output completeness",
  },
  {
    icon: User,
    title: "Human Graders",
    color: "#C74B2A",
    description:
      "Gold standard for calibration. Build 150-250 labeled examples. Validate LLM judge against expert assessments.",
    examples: [
      {
        label: "Calibration",
        code: "Certified specifier reviews\n50 extraction outputs.\n\nCohen's Kappa vs LLM judge:\n  κ = 0.87 → Judge reliable",
      },
    ],
    bestFor: "Edge cases, ambiguous specs, design intent interpretation",
  },
];

function GraderTypes() {
  return (
    <section>
      <SectionHeader
        title="Three Grader Types"
        subtitle={
          <>
            Anthropic&apos;s canonical taxonomy — combine all three for
            comprehensive coverage
          </>
        }
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {graderTypes.map((grader) => {
          const Icon = grader.icon;
          return (
            <motion.div
              key={grader.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-xl border border-source-border bg-white p-5"
              style={{ borderTopWidth: 4, borderTopColor: grader.color }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${grader.color}15`,
                    color: grader.color,
                  }}
                >
                  <Icon size={16} />
                </div>
                <h4 className="text-sm font-semibold text-source-black">
                  {grader.title}
                </h4>
              </div>

              <p className="mb-4 text-xs leading-relaxed text-source-muted">
                {grader.description}
              </p>

              <div className="space-y-2">
                {grader.examples.map((ex) => (
                  <div key={ex.label}>
                    <p
                      className="mb-1 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: grader.color }}
                    >
                      {ex.label}
                    </p>
                    <div className="rounded-lg bg-[#1A1A1A] p-3">
                      <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/90">
                        {ex.code}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-source-gray p-2.5">
                <p className="text-[10px] text-source-muted">
                  <span className="font-semibold">Best for:</span>{" "}
                  {grader.bestFor}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 3 — Live Eval Examples
// =============================================================================

const evalExamples = [
  {
    icon: FileSearch,
    title: "Spec Extraction Eval",
    color: "#2D8B5E",
    summary: "Extract structured fields from architectural spec document",
    input:
      'Item SE-001: Lobby lounge chair, fully upholstered, high-back wing profile. COM Grade III fabric. Dims: 32"W x 34"D x 44"H. Seat height: 18". Qty: 24.',
    fields: [
      { field: "Item Code", value: "SE-001", correct: true },
      { field: "Category", value: "Seating — Lounge", correct: true },
      {
        field: "Material",
        value: "COM Grade III, fully upholstered",
        correct: true,
      },
      { field: "Dimensions", value: '32"W x 34"D x 44"H', correct: true },
      { field: "Quantity", value: "24", correct: true },
      { field: "Seat Height", value: '18"', correct: true },
    ],
    grading: {
      method: "Code-based + LLM-as-judge",
      score: "6/6 fields correct",
      pass: true,
    },
  },
  {
    icon: Calculator,
    title: "Financial Accuracy Eval",
    color: "#4F6EF7",
    summary: "Zero-tolerance arithmetic check on PO line items",
    input: "Lobby Lounge Chair: qty 24 × $4,850.00/ea",
    fields: [
      { field: "Line Total", value: "$116,400.00", correct: true },
      { field: "Tax (8.31%)", value: "$9,672.84", correct: true },
      {
        field: "Shipping",
        value: "$2,400.00 (est. ±5%)",
        correct: true,
      },
      { field: "Grand Total", value: "$128,472.84", correct: true },
    ],
    grading: {
      method: "Code-based (assert exact match)",
      score: "$0.00 variance",
      pass: true,
    },
  },
  {
    icon: ShieldCheck,
    title: "Compliance Check Eval",
    color: "#C74B2A",
    summary: "Fire code & ADA compliance recall on seating items",
    input:
      "24 lobby chairs + 64 dining chairs + 18 bar stools — Ritz-Carlton Denver",
    fields: [
      { field: "CAL TB 133 (lobby)", value: "Required — checked", correct: true },
      { field: "NFPA 701 (dining fabric)", value: "Required — checked", correct: true },
      { field: 'ADA clearance (bar)', value: '36" min path — checked', correct: true },
      { field: "BIFMA X5.4 (lounge)", value: "NOT CHECKED", correct: false },
    ],
    grading: {
      method: "Set-based recall (code-based)",
      score: "Recall: 75% (3/4) — below 98% threshold",
      pass: false,
    },
  },
  {
    icon: GitBranch,
    title: "Tool Trajectory Eval",
    color: "#4ECBA0",
    summary: "Verify agent calls correct tools in valid order",
    input: '"Extract specs from the Ritz-Carlton lobby seating section"',
    fields: [
      {
        field: "Expected",
        value: "parse_pdf → extract_specs → classify_csi → normalize_dims",
        correct: true,
      },
      {
        field: "Actual",
        value:
          "parse_pdf → extract_specs → classify_csi → normalize_dims → validate_quantities",
        correct: true,
      },
    ],
    grading: {
      method: "Superset trajectory match",
      score: "All required tools called (+1 extra: validate_quantities)",
      pass: true,
    },
  },
];

function LiveEvalExamples() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section>
      <SectionHeader
        title="Live Eval Examples"
        subtitle="Real procurement evaluation scenarios with practical grading"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {evalExamples.map((ex, i) => {
          const Icon = ex.icon;
          const isExpanded = expanded === i;
          return (
            <motion.div
              key={ex.title}
              variants={staggerItem}
              className="rounded-xl border border-source-border bg-white overflow-hidden"
              style={{ borderLeftWidth: 4, borderLeftColor: ex.color }}
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="flex w-full items-center gap-3 p-5 text-left"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${ex.color}15`,
                    color: ex.color,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-source-black">
                    {ex.title}
                  </h4>
                  <p className="text-xs text-source-muted">{ex.summary}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      ex.grading.pass
                        ? "bg-source-green/10 text-source-green"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {ex.grading.pass ? "PASS" : "FAIL"}
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={14} className="text-source-muted" />
                  ) : (
                    <ChevronDown size={14} className="text-source-muted" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-source-border"
                  >
                    <div className="p-5 space-y-4">
                      {/* Input */}
                      <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-source-muted">
                          Input
                        </p>
                        <div className="rounded-lg bg-source-gray p-3">
                          <p className="font-mono text-xs text-source-black">
                            {ex.input}
                          </p>
                        </div>
                      </div>

                      {/* Fields */}
                      <div>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-source-muted">
                          Results
                        </p>
                        <div className="space-y-1.5">
                          {ex.fields.map((f) => (
                            <div
                              key={f.field}
                              className="flex items-center gap-2 text-xs"
                            >
                              {f.correct ? (
                                <Check
                                  size={14}
                                  className="shrink-0 text-source-green"
                                />
                              ) : (
                                <X
                                  size={14}
                                  className="shrink-0 text-red-500"
                                />
                              )}
                              <span className="w-36 shrink-0 font-medium text-source-black">
                                {f.field}
                              </span>
                              <span
                                className={
                                  f.correct
                                    ? "text-source-muted"
                                    : "font-semibold text-red-600"
                                }
                              >
                                {f.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Grading */}
                      <div
                        className={`rounded-lg p-3 ${
                          ex.grading.pass
                            ? "bg-source-green/5 border border-source-green/20"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-source-muted">
                              {ex.grading.method}
                            </p>
                            <p className="mt-0.5 text-xs font-medium text-source-black">
                              {ex.grading.score}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              ex.grading.pass
                                ? "bg-source-green text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {ex.grading.pass ? "PASS" : "FAIL"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 4 — Framework Landscape
// =============================================================================

const evalFrameworks = [
  {
    name: "Langfuse",
    stars: "~23K",
    license: "MIT",
    agentMetrics: false,
    cicd: false,
    selfHosted: true,
    langGraph: true,
    bestFor: "Full-lifecycle observability",
  },
  {
    name: "Braintrust",
    stars: "Proprietary",
    license: "Proprietary",
    agentMetrics: true,
    cicd: true,
    selfHosted: false,
    langGraph: true,
    bestFor: "CI/CD quality gates",
  },
  {
    name: "RAGAS",
    stars: "~13K",
    license: "Apache 2.0",
    agentMetrics: true,
    cicd: false,
    selfHosted: true,
    langGraph: true,
    bestFor: "RAG evaluation (30+ metrics)",
  },
  {
    name: "DeepEval",
    stars: "~14K",
    license: "Apache 2.0",
    agentMetrics: true,
    cicd: true,
    selfHosted: true,
    langGraph: true,
    bestFor: "Comprehensive testing (50+ metrics)",
  },
  {
    name: "Phoenix",
    stars: "~16K",
    license: "ELv2",
    agentMetrics: true,
    cicd: false,
    selfHosted: true,
    langGraph: true,
    bestFor: "Vendor-neutral OTel tracing",
  },
];

function BoolCell({ value }: { value: boolean }) {
  return value ? (
    <Check size={14} className="text-source-green" />
  ) : (
    <X size={14} className="text-source-muted/40" />
  );
}

function FrameworkLandscape() {
  return (
    <section>
      <SectionHeader
        title="Eval Framework Landscape"
        subtitle="The five tools that matter for agent evaluation in 2026"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="overflow-x-auto rounded-xl border border-source-border bg-white"
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-source-border bg-source-gray text-[11px] font-semibold uppercase tracking-wider text-source-muted">
              <th className="px-4 py-3">Framework</th>
              <th className="px-4 py-3">Stars</th>
              <th className="px-4 py-3">License</th>
              <th className="px-4 py-3 text-center">Agent Metrics</th>
              <th className="px-4 py-3 text-center">CI/CD</th>
              <th className="px-4 py-3 text-center">Self-Hosted</th>
              <th className="px-4 py-3 text-center">LangGraph</th>
              <th className="px-4 py-3">Best For</th>
            </tr>
          </thead>
          <tbody>
            {evalFrameworks.map((fw) => (
              <tr
                key={fw.name}
                className="border-b border-source-border last:border-0 hover:bg-source-gray/50 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-source-black">
                  {fw.name}
                </td>
                <td className="px-4 py-3 text-xs text-source-muted">
                  {fw.stars}
                </td>
                <td className="px-4 py-3 text-xs text-source-muted">
                  {fw.license}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">
                    <BoolCell value={fw.agentMetrics} />
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">
                    <BoolCell value={fw.cicd} />
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">
                    <BoolCell value={fw.selfHosted} />
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">
                    <BoolCell value={fw.langGraph} />
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-source-muted">
                  {fw.bestFor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Recommendation callout */}
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
              Recommended Stack for Source
            </h4>
            <p className="mt-1 text-sm text-source-muted">
              <strong>Langfuse</strong> for observability & tracing +{" "}
              <strong>DeepEval</strong> for 50+ agent metrics +{" "}
              <strong>Braintrust GitHub Action</strong> for CI/CD eval gates.
              Use RAGAS specifically for the pgvector retrieval pipeline.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 5 — Reliability Metrics (pass@k vs pass^k)
// =============================================================================

const reliabilityData = [
  { k: "k=1", passAtK: 75, passExpK: 75 },
  { k: "k=2", passAtK: 93.75, passExpK: 56.25 },
  { k: "k=3", passAtK: 98.44, passExpK: 42.19 },
  { k: "k=5", passAtK: 99.9, passExpK: 23.73 },
  { k: "k=10", passAtK: 99.99, passExpK: 5.63 },
];

function ReliabilityMetrics() {
  return (
    <section>
      <SectionHeader
        title="Can It Do It? vs. Can You Trust It?"
        subtitle="An AI agent that works 75% of the time sounds good — until you run it 3 times"
      />

      {/* Plain-English intro */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 rounded-xl border border-source-border bg-white p-6"
      >
        <p className="text-sm leading-relaxed text-source-black">
          AI agents are non-deterministic — they can give different results each time you run them.
          So we need two different ways to measure how good an agent is:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-source-green/5 p-3 border border-source-green/20">
            <p className="text-xs font-semibold text-source-green">
              &quot;Can it do it at all?&quot;
            </p>
            <p className="mt-1 text-xs text-source-muted">
              If I give the agent 3 chances, does it get it right <strong>at least once</strong>? This measures capability.
            </p>
          </div>
          <div className="rounded-lg bg-red-50 p-3 border border-red-200">
            <p className="text-xs font-semibold text-[#C74B2A]">
              &quot;Can I trust it every time?&quot;
            </p>
            <p className="mt-1 text-xs text-source-muted">
              If I give the agent 3 chances, does it get it right <strong>every single time</strong>? This measures reliability.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Metric cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-source-border bg-white p-6 text-center"
          style={{ borderTopWidth: 4, borderTopColor: "#2D8B5E" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-source-green">
            Capability Score
          </p>
          <div className="my-3">
            <AnimatedCounter target={98.4} suffix="%" duration={2} />
          </div>
          <p className="text-sm text-source-black font-medium">
            &quot;It works at least once in 3 tries&quot;
          </p>
          <p className="mt-1 text-xs text-source-muted">
            Even a 75%-accurate agent will succeed at least once 98% of the time if you give it 3 attempts
          </p>
          <div className="mt-3 rounded-lg bg-source-green/5 p-2">
            <p className="font-mono text-xs text-source-green">
              75% accuracy → 98.4% chance of at least 1 success in 3 tries
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-source-border bg-white p-6 text-center"
          style={{ borderTopWidth: 4, borderTopColor: "#C74B2A" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C74B2A]">
            Reliability Score
          </p>
          <div className="my-3">
            <AnimatedCounter target={42.2} suffix="%" duration={2} />
          </div>
          <p className="text-sm text-source-black font-medium">
            &quot;It works every single time&quot;
          </p>
          <p className="mt-1 text-xs text-source-muted">
            That same 75%-accurate agent only succeeds on ALL 3 attempts 42% of the time — it fails at least once 58% of the time
          </p>
          <div className="mt-3 rounded-lg bg-red-50 p-2">
            <p className="font-mono text-xs text-[#C74B2A]">
              75% accuracy → only 42.2% chance of 3/3 successes
            </p>
          </div>
        </motion.div>
      </div>

      {/* Warning callout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 rounded-xl border border-[#C74B2A]/30 bg-[#C74B2A]/5 p-5"
      >
        <p className="text-sm text-source-black">
          <strong>Why this matters for procurement:</strong> When processing a $2.4M purchase order,
          &quot;it usually works&quot; isn&apos;t good enough. A 75% agent will produce at least one
          wrong result in 3 attempts <strong>58% of the time</strong>. This is exactly why
          financial calculations (totals, tax, discounts) must use deterministic code,
          not the AI — the LLM identifies the values, but TypeScript does the math.
        </p>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-xl border border-source-border bg-white p-6"
      >
        <h4 className="mb-1 text-sm font-semibold text-source-black">
          The more you need it to work, the less you can trust it
        </h4>
        <p className="mb-4 text-xs text-source-muted">
          As you require more consecutive successes (k), the reliability score drops dramatically
        </p>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={reliabilityData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="k"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={{ stroke: "#E5E5E5" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}%`]}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E5E5E5",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="passAtK"
                name="Works at least once"
                fill="#2D8B5E"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="passExpK"
                name="Works every time"
                fill="#C74B2A"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-source-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-source-green" /> Works at
            least once (capability)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-[#C74B2A]" /> Works every
            time (reliability)
          </span>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 6 — Production Eval Pipeline
// =============================================================================

const pipelineStages = [
  {
    stage: "Shadow Mode",
    icon: Eye,
    color: "#6B7280",
    description:
      "Agent processes requests but responses aren't shown to users. Full evaluation against production data.",
    gate: "Success rate > 85%",
    metrics: ["Latency < 10s", "Cost per task tracked", "Error rate < 5%"],
  },
  {
    stage: "Canary Deploy",
    icon: Activity,
    color: "#4F6EF7",
    description:
      "5-10% of traffic routed to new agent variant. Real users, limited blast radius.",
    gate: "No quality regression",
    metrics: ["A/B comparison active", "Session consistency", "Rollback ready"],
  },
  {
    stage: "Regional Rollout",
    icon: Target,
    color: "#4ECBA0",
    description:
      "Expand to full regions. Monitor for distribution drift between test and production data.",
    gate: "Recall > 90%, Accuracy > 80%",
    metrics: ["Drift monitoring", "Regional partitions", "Failure → regression"],
  },
  {
    stage: "Full Deploy",
    icon: Rocket,
    color: "#2D8B5E",
    description:
      "100% of traffic. Continuous 2-5% sampling for ongoing evaluation. Kill switch per agent.",
    gate: "Stable 48+ hours",
    metrics: [
      "Ongoing 2-5% sampling",
      "Cost per PO tracked",
      "Capability → regression",
    ],
  },
];

function ProductionPipeline() {
  return (
    <section>
      <SectionHeader
        title="Production Eval Pipeline"
        subtitle="Progressive rollout with eval gates — shadow to full deployment"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-4 lg:grid-cols-4"
      >
        {pipelineStages.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.div key={stage.stage} variants={staggerItem} className="relative">
              {/* Connector arrow (hidden on mobile and last item) */}
              {i < pipelineStages.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={16} className="text-source-muted" />
                </div>
              )}

              <div
                className="h-full rounded-xl border border-source-border bg-white p-5"
                style={{ borderTopWidth: 4, borderTopColor: stage.color }}
              >
                {/* Header */}
                <div className="mb-3 flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `${stage.color}15`,
                      color: stage.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-source-muted">
                      Stage {i + 1}
                    </p>
                    <h4 className="text-sm font-semibold text-source-black">
                      {stage.stage}
                    </h4>
                  </div>
                </div>

                <p className="mb-3 text-xs leading-relaxed text-source-muted">
                  {stage.description}
                </p>

                {/* Gate */}
                <div
                  className="mb-3 rounded-lg px-3 py-2"
                  style={{ backgroundColor: `${stage.color}10` }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-source-muted">
                    Eval Gate
                  </p>
                  <p
                    className="mt-0.5 text-xs font-semibold"
                    style={{ color: stage.color }}
                  >
                    {stage.gate}
                  </p>
                </div>

                {/* Metrics */}
                <ul className="space-y-1">
                  {stage.metrics.map((m) => (
                    <li
                      key={m}
                      className="flex items-center gap-1.5 text-[11px] text-source-muted"
                    >
                      <span
                        className="h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom callout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 rounded-xl border border-source-green/30 bg-source-green/5 p-5"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-source-green/10 text-source-green">
            <TrendingUp size={16} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-source-black">
              The Feedback Loop
            </h4>
            <p className="mt-1 text-sm text-source-muted">
              Failed production traces become permanent regression tests.
              Start with 20-50 test cases drawn from real failures and expand
              continuously. Grade outcomes in the environment — check the PO
              in PostgreSQL, not just what the agent said it created.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// Page Root
// =============================================================================

export default function EvalsPage() {
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
            Evaluating AI Agents
          </h1>
          <p className="mt-2 text-source-muted">
            A practical guide to testing, grading, and monitoring AI agents in
            production — with real FF&E procurement examples
          </p>

          {/* Hero stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <div className="rounded-xl border border-source-border bg-white p-6 text-center">
              <AnimatedCounter target={75} suffix="%" duration={2} />
              <p className="mt-2 text-sm font-medium text-source-muted">
                Typical Per-Trial Success
              </p>
            </div>
            <div className="rounded-xl border border-source-border bg-white p-6 text-center">
              <AnimatedCounter target={42} suffix="%" duration={2} />
              <p className="mt-2 text-sm font-medium text-source-muted">
                pass^3 Reliability
              </p>
            </div>
            <div className="rounded-xl border border-source-border bg-white p-6 text-center">
              <AnimatedCounter target={52} suffix="%" duration={2} />
              <p className="mt-2 text-sm font-medium text-source-muted">
                Orgs Running Offline Evals
              </p>
            </div>
          </motion.div>
        </motion.div>

        <TestingPyramid />
        <GraderTypes />
        <LiveEvalExamples />
        <FrameworkLandscape />
        <ReliabilityMetrics />
        <ProductionPipeline />

        <div className="h-8" />
      </div>
    </div>
  );
}
