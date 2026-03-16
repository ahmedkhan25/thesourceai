"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Network,
  Database,
  Brain,
  Cloud,
  Eye,
  ChevronDown,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Zap,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { architectureLayers } from "@/lib/data";

// ---------------------------------------------------------------------------
// Icon map for architecture layers
// ---------------------------------------------------------------------------

const iconMap: Record<string, React.ElementType> = {
  frontend: Monitor,
  orchestration: Network,
  rag: Database,
  models: Brain,
  infra: Cloud,
  observability: Eye,
};

// ---------------------------------------------------------------------------
// Current State blocks
// ---------------------------------------------------------------------------

const currentStateBlocks = [
  {
    label: "Email / Phone",
    description: "Vendor outreach via scattered channels",
  },
  {
    label: "Spreadsheets",
    description: "Manual tracking across dozens of tabs",
  },
  {
    label: "Manual Comparison",
    description: "Side-by-side bid evaluation by hand",
  },
  {
    label: "Paper Approvals",
    description: "Physical sign-offs and routing delays",
  },
  {
    label: "Phone Follow-up",
    description: "Chasing vendors for delivery updates",
  },
];

const currentStateIndicators = ["Slow", "Error-prone", "No visibility"];

// ---------------------------------------------------------------------------
// AI-Native Vision blocks
// ---------------------------------------------------------------------------

const aiVisionBlocks = [
  {
    label: "AG-UI Frontend",
    description: "Real-time streaming agent interface",
    color: "#4F6EF7",
  },
  {
    label: "Procurement Orchestrator",
    description: "Stateful workflow coordination",
    color: "#2D8B5E",
  },
  {
    label: "Specialist Agents",
    description: "Spec, vendor, bid, compliance agents",
    color: "#4ECBA0",
  },
  {
    label: "RAG + Vector DB",
    description: "Semantic search over procurement data",
    color: "#C74B2A",
  },
  {
    label: "HITL Gates",
    description: "Human-in-the-loop approval checkpoints",
    color: "#6B7280",
  },
];

const aiVisionIndicators = ["Real-time", "Automated", "Auditable"];

// ---------------------------------------------------------------------------
// Key decision cards
// ---------------------------------------------------------------------------

const keyDecisions = [
  {
    icon: ShieldCheck,
    title: "Financial Safety",
    description:
      "Saga pattern: every PO is a compensatable transaction. If any step fails, previous steps roll back. No orphaned purchase orders, no lost money.",
    color: "#C74B2A",
  },
  {
    icon: Database,
    title: "Data Co-location",
    description:
      "pgvector: vectors live alongside relational procurement data. One DB, no sync issues. Vendor profiles, embeddings, and PO history in a single query.",
    color: "#4F6EF7",
  },
  {
    icon: Zap,
    title: "Progressive Autonomy",
    description:
      "Feature flags: gradually increase AI autonomy as confidence grows. Start conservative. Low-confidence decisions route to humans; high-confidence ones auto-execute.",
    color: "#2D8B5E",
  },
];

// ---------------------------------------------------------------------------
// Deterministic shell labels
// ---------------------------------------------------------------------------

const shellLabels = [
  "Validation",
  "Routing",
  "Audit Logging",
  "Financial Safeguards",
];
const coreLabels = [
  "LLM Inference",
  "Spec Extraction",
  "Vendor Matching",
  "Natural Language",
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function ArchitecturePage() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const toggleLayer = (id: string) => {
    setExpandedLayer((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8 space-y-16">
      {/* ================================================================= */}
      {/* Section 1: Side-by-side Architecture Diagrams                     */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <SectionHeader
          title="Architecture Vision"
          subtitle="From manual procurement to AI-native orchestration"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT: Current State */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate="visible"
            className="rounded-xl bg-[#1A1A1A] p-6"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Current State
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">
                Manual Procurement
              </h3>
            </div>

            <div className="space-y-0">
              {currentStateBlocks.map((block, i) => (
                <div key={block.label}>
                  <div className="rounded-lg border border-white/10 bg-[#2a2a2a] px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      {block.label}
                    </p>
                    <p className="mt-0.5 text-xs text-white/50">
                      {block.description}
                    </p>
                  </div>
                  {i < currentStateBlocks.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown size={16} className="text-white/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {currentStateIndicators.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400"
                >
                  <AlertTriangle size={12} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: AI-Native Vision */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            className="rounded-xl bg-[#1A1A1A] p-6"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                AI-Native Vision
              </p>
              <h3 className="mt-1 text-xl font-bold text-white">
                Agent-Orchestrated Procurement
              </h3>
            </div>

            <div className="space-y-0">
              {aiVisionBlocks.map((block, i) => (
                <div key={block.label}>
                  <div
                    className="rounded-lg border px-4 py-3"
                    style={{
                      borderColor: `${block.color}40`,
                      backgroundColor: `${block.color}15`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: block.color }}
                      />
                      <p className="text-sm font-semibold text-white">
                        {block.label}
                      </p>
                    </div>
                    <p className="mt-0.5 pl-4 text-xs text-white/50">
                      {block.description}
                    </p>
                  </div>
                  {i < aiVisionBlocks.length - 1 && (
                    <div className="flex items-center justify-center gap-2 py-1">
                      <ArrowDown size={16} className="text-white/20" />
                      {/* Show HITL interrupt icon between Specialist Agents and RAG */}
                      {i === 2 && (
                        <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
                          HITL
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {aiVisionIndicators.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 rounded-full bg-source-green/10 px-3 py-1 text-xs font-medium text-source-green"
                >
                  <Zap size={12} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* Section 2: Technology Stack — Expandable Cards                     */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionHeader
          title="Technology Stack"
          subtitle="Every layer chosen for procurement-specific requirements"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {architectureLayers.map((layer) => {
            const isOpen = expandedLayer === layer.id;
            const Icon = iconMap[layer.id] || Monitor;

            return (
              <motion.div
                key={layer.id}
                variants={cardVariants}
                className="overflow-hidden rounded-xl border border-source-border bg-white"
              >
                <button
                  onClick={() => toggleLayer(layer.id)}
                  className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-gray-50"
                >
                  {/* Color bar */}
                  <div
                    className="mt-0.5 h-full min-h-[3rem] w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />

                  {/* Icon */}
                  <div
                    className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${layer.color}15`,
                      color: layer.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-source-black">
                      {layer.label}
                    </h3>
                    <p className="mt-0.5 text-xs text-source-muted">
                      {layer.sub}
                    </p>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 flex-shrink-0 text-source-muted"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-source-border px-5 pb-5 pt-4 space-y-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-source-muted">
                            Detail
                          </p>
                          <p className="mt-1 text-sm text-source-black">
                            {layer.detail}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-source-muted">
                            Alternatives Considered
                          </p>
                          <p className="mt-1 text-sm text-source-black">
                            {layer.alternatives}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-source-muted">
                            Trade-off Reasoning
                          </p>
                          <p className="mt-1 text-sm text-source-black">
                            {layer.tradeoff}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ================================================================= */}
      {/* Section 3: Deterministic Shell, Probabilistic Core                */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionHeader
          title="Deterministic Shell, Probabilistic Core"
          subtitle="Reliable infrastructure wrapping intelligent inference"
        />

        {/* Nested rectangles visual */}
        <div className="rounded-xl border border-source-border bg-white p-8">
          <div className="relative mx-auto max-w-3xl">
            {/* Outer shell */}
            <div className="rounded-2xl border-2 border-dashed border-source-muted/30 bg-gray-50 p-8">
              {/* Shell label */}
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-source-muted" />
                <span className="text-sm font-bold text-source-black">
                  Deterministic Shell
                </span>
              </div>

              {/* Shell tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                {shellLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-source-border bg-white px-3 py-1 text-xs font-medium text-source-muted"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Input arrows */}
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="text-xs text-source-muted">Inputs</span>
                <ArrowDown size={16} className="text-source-muted" />
              </div>

              {/* Inner core */}
              <div className="relative overflow-hidden rounded-xl border border-source-green/30 bg-gradient-to-br from-source-green/5 via-source-ai/5 to-source-mint/10 p-6">
                {/* Subtle glow */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-source-green/10 via-transparent to-source-ai/10 blur-xl" />

                <div className="relative">
                  <div className="mb-3 flex items-center gap-2">
                    <Brain size={18} className="text-source-green" />
                    <span className="text-sm font-bold text-source-black">
                      Probabilistic Core
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {coreLabels.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-source-green/20 bg-source-green/10 px-3 py-1 text-xs font-medium text-source-green"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output arrows */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <ArrowDown size={16} className="text-source-muted" />
                <span className="text-xs text-source-muted">Outputs</span>
                <ArrowRight size={16} className="text-source-muted" />
                <span className="text-xs text-source-muted">
                  Back through shell
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Decision Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {keyDecisions.map((decision) => {
            const Icon = decision.icon;
            return (
              <motion.div
                key={decision.title}
                variants={cardVariants}
                className="rounded-xl border border-source-border bg-white p-6"
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${decision.color}15`,
                    color: decision.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <h4 className="text-sm font-bold text-source-black">
                  {decision.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-source-muted">
                  {decision.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
