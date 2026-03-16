"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import ReactFlow, {
  Node,
  Edge,
  Position,
  Handle,
  NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";

import SectionHeader from "@/components/SectionHeader";
import { roadmapPhases } from "@/lib/data";
import {
  Bot,
  FileSearch,
  Search,
  MessageSquare,
  Scale,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Zap,
  Brain,
  Database,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

// =============================================================================
// Section 1 — Intelligence vs Judgment
// =============================================================================

const automateItems = [
  "Spec extraction from documents",
  "Vendor database search & matching",
  "Price normalization & comparison",
  "Compliance checklist verification",
  "RFQ document generation",
  "Delivery timeline tracking",
];

const judgmentItems = [
  "Final vendor selection for $100K+ POs",
  "Design intent interpretation",
  "Relationship-based negotiations",
  "Budget reallocation decisions",
  "Exception handling & escalations",
  "Quality standard sign-off",
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function IntelligenceVsJudgment() {
  return (
    <section>
      <SectionHeader
        title="Intelligence vs Judgment"
        subtitle="The key to AI in procurement: automate intelligence, preserve human judgment"
      />

      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* LEFT — Automate */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-3"
        >
          <div className="mb-4 flex items-center gap-2">
            <Zap size={18} className="text-source-green" />
            <h3 className="text-lg font-semibold text-source-black">Automate</h3>
            <span className="rounded-full bg-source-green/10 px-2.5 py-0.5 text-xs font-medium text-source-green">
              AI-Powered
            </span>
          </div>
          {automateItems.map((task) => (
            <motion.div
              key={task}
              variants={staggerItem}
              className="rounded-xl border border-source-border bg-white p-4"
              style={{ borderLeftWidth: 4, borderLeftColor: "#2D8B5E" }}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 rounded-full bg-source-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-source-green">
                  Automate
                </span>
                <span className="text-sm text-source-black">{task}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CENTER — Confidence Connector */}
        <div className="hidden items-center lg:flex">
          <div className="relative flex flex-col items-center">
            <div className="h-full w-px bg-gradient-to-b from-source-green via-source-muted to-source-ai" style={{ minHeight: 360 }} />
            <div className="absolute top-1/2 -translate-y-1/2 rounded-lg border border-source-border bg-white px-3 py-2 shadow-sm">
              <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-source-muted">
                Confidence-Based
                <br />
                Routing
              </p>
              <div className="mt-2 space-y-1 text-[10px]">
                <div className="flex items-center gap-1.5 text-source-green">
                  <ArrowRight size={10} /> <span>&ge; 0.85 → Auto</span>
                </div>
                <div className="flex items-center gap-1.5 text-source-ai">
                  <ArrowRight size={10} /> <span>&lt; 0.85 → Human</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Human Judgment */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-3"
        >
          <div className="mb-4 flex items-center gap-2">
            <Brain size={18} className="text-source-ai" />
            <h3 className="text-lg font-semibold text-source-black">Human Judgment</h3>
            <span className="rounded-full bg-source-ai/10 px-2.5 py-0.5 text-xs font-medium text-source-ai">
              Expert Review
            </span>
          </div>
          {judgmentItems.map((task) => (
            <motion.div
              key={task}
              variants={staggerItem}
              className="rounded-xl border border-source-border bg-white p-4"
              style={{ borderLeftWidth: 4, borderLeftColor: "#4F6EF7" }}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 rounded-full bg-source-ai/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-source-ai">
                  Expert
                </span>
                <span className="text-sm text-source-black">{task}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Section 2 — Agent Orchestration (React Flow)
// =============================================================================

interface AgentNodeData {
  label: string;
  subtitle: string;
  icon: string;
  isOrchestrator?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  Bot,
  FileSearch,
  Search,
  MessageSquare,
  Scale,
  ShieldCheck,
};

function AgentNode({ data }: NodeProps<AgentNodeData>) {
  const Icon = iconMap[data.icon] || Bot;
  const isOrch = data.isOrchestrator;

  return (
    <div
      className={`rounded-xl border px-4 py-3 shadow-sm ${
        isOrch
          ? "border-source-green bg-source-green text-white"
          : "border-source-border bg-white text-source-black"
      }`}
      style={{ minWidth: isOrch ? 220 : 180 }}
    >
      <Handle type="target" position={Position.Top} className="!bg-source-green !border-none !w-2 !h-2" />
      <div className="flex items-center gap-2">
        <Icon size={isOrch ? 20 : 16} className={isOrch ? "text-white" : "text-source-green"} />
        <div>
          <p className={`text-sm font-semibold ${isOrch ? "text-white" : "text-source-black"}`}>
            {data.label}
          </p>
          <p className={`text-[11px] leading-tight ${isOrch ? "text-white/80" : "text-source-muted"}`}>
            {data.subtitle}
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-source-green !border-none !w-2 !h-2" />
    </div>
  );
}

const agentDetails = [
  {
    name: "Spec Extraction Agent",
    icon: FileSearch,
    tools: ["PDF parser", "CSI division classifier", "NER model for materials/dims"],
    data: ["Design documents", "CSI MasterFormat DB", "Historical spec library"],
  },
  {
    name: "Product Matching Agent",
    icon: Search,
    tools: ["Semantic search", "Image similarity", "Attribute filter engine"],
    data: ["Vendor product catalogs", "Past PO history", "Pricing database"],
  },
  {
    name: "Vendor Communication Agent",
    icon: MessageSquare,
    tools: ["RFQ template engine", "Email parser", "Follow-up scheduler"],
    data: ["Vendor contact database", "RFQ templates", "Response history"],
  },
  {
    name: "Quote Comparison Agent",
    icon: Scale,
    tools: ["Price normalizer", "Lead-time scorer", "TCO calculator"],
    data: ["Incoming bids", "Historical pricing", "Market benchmarks"],
  },
  {
    name: "Compliance Agent",
    icon: ShieldCheck,
    tools: ["Code checker (ADA/fire)", "Cert validator", "Warranty parser"],
    data: ["Building codes DB", "Certification registries", "Project requirements"],
  },
];

function AgentOrchestration() {
  const [expandedAgent, setExpandedAgent] = useState<number | null>(null);

  const nodeTypes = useMemo(() => ({ agentNode: AgentNode }), []);

  const nodes: Node<AgentNodeData>[] = useMemo(
    () => [
      {
        id: "orchestrator",
        type: "agentNode",
        position: { x: 310, y: 20 },
        data: {
          label: "Procurement Orchestrator",
          subtitle: "Coordinates specialist agents",
          icon: "Bot",
          isOrchestrator: true,
        },
        draggable: false,
      },
      {
        id: "spec",
        type: "agentNode",
        position: { x: 0, y: 160 },
        data: { label: "Spec Extraction", subtitle: "Parses design documents", icon: "FileSearch" },
        draggable: false,
      },
      {
        id: "match",
        type: "agentNode",
        position: { x: 200, y: 200 },
        data: { label: "Product Matching", subtitle: "Searches vendor catalogs", icon: "Search" },
        draggable: false,
      },
      {
        id: "comms",
        type: "agentNode",
        position: { x: 400, y: 220 },
        data: { label: "Vendor Comms", subtitle: "RFQs & responses", icon: "MessageSquare" },
        draggable: false,
      },
      {
        id: "quote",
        type: "agentNode",
        position: { x: 600, y: 200 },
        data: { label: "Quote Comparison", subtitle: "Normalizes & ranks bids", icon: "Scale" },
        draggable: false,
      },
      {
        id: "compliance",
        type: "agentNode",
        position: { x: 780, y: 160 },
        data: { label: "Compliance", subtitle: "Codes & certifications", icon: "ShieldCheck" },
        draggable: false,
      },
    ],
    []
  );

  const edges: Edge[] = useMemo(
    () => [
      { id: "e-o-spec", source: "orchestrator", target: "spec", animated: true, style: { stroke: "#2D8B5E" } },
      { id: "e-o-match", source: "orchestrator", target: "match", animated: true, style: { stroke: "#2D8B5E" } },
      { id: "e-o-comms", source: "orchestrator", target: "comms", animated: true, style: { stroke: "#2D8B5E" } },
      { id: "e-o-quote", source: "orchestrator", target: "quote", animated: true, style: { stroke: "#2D8B5E" } },
      { id: "e-o-compliance", source: "orchestrator", target: "compliance", animated: true, style: { stroke: "#2D8B5E" } },
    ],
    []
  );

  const onNodeClick = useCallback(() => {}, []);

  return (
    <section>
      <SectionHeader
        title="Agent Orchestration"
        subtitle="Specialist agents coordinated by a procurement orchestrator"
      />

      {/* React Flow diagram */}
      <div className="h-[400px] overflow-hidden rounded-xl border border-source-border bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        />
      </div>

      {/* Expandable agent detail cards */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {agentDetails.map((agent, i) => {
          const Icon = agent.icon;
          const isExpanded = expandedAgent === i;
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="rounded-xl border border-source-border bg-white"
            >
              <button
                onClick={() => setExpandedAgent(isExpanded ? null : i)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-source-green/10 text-source-green">
                  <Icon size={16} />
                </div>
                <span className="flex-1 text-sm font-semibold text-source-black">{agent.name}</span>
                {isExpanded ? (
                  <ChevronUp size={14} className="text-source-muted" />
                ) : (
                  <ChevronDown size={14} className="text-source-muted" />
                )}
              </button>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-source-border px-4 pb-4 pt-3"
                >
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-source-muted">
                    Tools
                  </p>
                  <ul className="mb-3 space-y-1">
                    {agent.tools.map((t) => (
                      <li key={t} className="text-xs text-source-black">
                        &bull; {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-source-muted">
                    Data Sources
                  </p>
                  <ul className="space-y-1">
                    {agent.data.map((d) => (
                      <li key={d} className="text-xs text-source-black">
                        &bull; {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// =============================================================================
// Section 3 — Data Flywheel
// =============================================================================

function DataFlywheel() {
  const stages = [
    { label: "Services", angle: 270, desc: "Procurement execution" },
    { label: "Data", angle: 0, desc: "Every transaction captured" },
    { label: "Better AI", angle: 90, desc: "Models improve continuously" },
    { label: "Better Services", angle: 180, desc: "Higher accuracy & speed" },
  ];

  const r = 130; // radius
  const cx = 180;
  const cy = 180;

  return (
    <section>
      <SectionHeader
        title="The Data Flywheel"
        subtitle="Source's $6.5B procurement history becomes an unassailable competitive moat"
      />

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
        {/* SVG Flywheel */}
        <div className="shrink-0">
          <svg width={360} height={360} viewBox="0 0 360 360" className="drop-shadow-sm">
            {/* Outer ring — animated rotation */}
            <g className="animate-rotate-slow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
              <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke="#E5E5E5" strokeWidth={2} />
              {/* Arrow arcs between stages */}
              {[0, 1, 2, 3].map((i) => {
                const startAngle = i * 90 + 10;
                const endAngle = i * 90 + 80;
                const toRad = (deg: number) => (deg * Math.PI) / 180;
                const outerR = r + 20;
                const x1 = cx + outerR * Math.cos(toRad(startAngle));
                const y1 = cy + outerR * Math.sin(toRad(startAngle));
                const x2 = cx + outerR * Math.cos(toRad(endAngle));
                const y2 = cy + outerR * Math.sin(toRad(endAngle));
                return (
                  <path
                    key={i}
                    d={`M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2}`}
                    fill="none"
                    stroke="#2D8B5E"
                    strokeWidth={3}
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
            </g>

            {/* Arrowhead marker */}
            <defs>
              <marker id="arrowhead" markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#2D8B5E" />
              </marker>
            </defs>

            {/* Center text */}
            <text x={cx} y={cy - 8} textAnchor="middle" className="fill-source-green text-xs font-bold">
              $6.5B
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" className="fill-source-muted text-[10px]">
              Procurement Data
            </text>

            {/* Stage labels (static, not rotating) */}
            {stages.map((stage) => {
              const toRad = (deg: number) => (deg * Math.PI) / 180;
              const labelR = r - 30;
              const x = cx + labelR * Math.cos(toRad(stage.angle));
              const y = cy + labelR * Math.sin(toRad(stage.angle));
              return (
                <g key={stage.label}>
                  <circle cx={x} cy={y} r={28} fill="white" stroke="#E5E5E5" strokeWidth={1} />
                  <text x={x} y={y - 2} textAnchor="middle" className="fill-source-black text-[9px] font-semibold">
                    {stage.label}
                  </text>
                  <text x={x} y={y + 10} textAnchor="middle" className="fill-source-muted text-[7px]">
                    {stage.label === "Services" ? "Execute" : stage.label === "Data" ? "Capture" : stage.label === "Better AI" ? "Train" : "Improve"}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Explanation bullets */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {[
            {
              icon: Database,
              title: "Data compounds over time",
              text: "Every procurement transaction — specs parsed, vendors evaluated, bids compared — feeds back into Source's AI models. Competitors without this history start from zero.",
            },
            {
              icon: TrendingUp,
              title: "Accuracy improves with scale",
              text: "More data means better price predictions, faster vendor matching, and higher confidence scores. The AI gets measurably better with each project completed.",
            },
            {
              icon: Zap,
              title: "Speed becomes the moat",
              text: "As AI handles more routine decisions autonomously, Source's team focuses on high-value judgment calls — creating a service advantage that is difficult to replicate.",
            },
          ].map((bullet) => {
            const Icon = bullet.icon;
            return (
              <div key={bullet.title} className="rounded-xl border border-source-border bg-white p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-source-green/10 text-source-green">
                    <Icon size={14} />
                  </div>
                  <h4 className="text-sm font-semibold text-source-black">{bullet.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-source-muted">{bullet.text}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// Section 4 — Phased Roadmap
// =============================================================================

function PhasedRoadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  return (
    <section>
      <SectionHeader
        title="Implementation Roadmap"
        subtitle="Progressive autonomy — start with RAG, end with predictive intelligence"
      />

      <div className="relative">
        {/* Connecting vertical line */}
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-source-green via-source-mint to-source-border lg:block" />

        <div className="space-y-4">
          {roadmapPhases.map((phase, i) => {
            const isExpanded = expandedPhase === phase.phase;
            const isCurrent = phase.phase === 1;

            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative"
              >
                {/* Phase number circle */}
                <div className="flex items-start gap-4 lg:ml-0">
                  <div
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                      isCurrent
                        ? "border-source-green bg-source-green text-white animate-pulse-glow"
                        : "border-source-border bg-white text-source-muted"
                    }`}
                  >
                    {phase.phase}
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 rounded-xl border bg-white ${
                      isCurrent ? "border-source-green/40 shadow-md" : "border-source-border"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-source-black">
                            {phase.title}
                          </h3>
                          <span className="rounded-full bg-source-gray px-2.5 py-0.5 text-[11px] font-medium text-source-muted">
                            {phase.timeline}
                          </span>
                          {isCurrent && (
                            <span className="rounded-full bg-source-green/10 px-2.5 py-0.5 text-[11px] font-semibold text-source-green">
                              Current Focus
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-source-muted">{phase.description}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={16} className="ml-4 shrink-0 text-source-muted" />
                      ) : (
                        <ChevronDown size={16} className="ml-4 shrink-0 text-source-muted" />
                      )}
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-source-border px-5 pb-5 pt-4"
                      >
                        <ul className="space-y-2">
                          {phase.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-source-black">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-source-green" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
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
// Page Root
// =============================================================================

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto max-w-6xl p-8 space-y-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-source-black">Strategy</h1>
          <p className="mt-2 text-source-muted">
            How Source should approach AI — what to automate, what to keep human, and how to build compounding advantages
          </p>
        </motion.div>

        <IntelligenceVsJudgment />
        <AgentOrchestration />
        <DataFlywheel />
        <PhasedRoadmap />

        {/* Footer spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
