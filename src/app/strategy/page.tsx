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
  Calculator,
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
// Section 2 — What is an Agent?
// =============================================================================

function WhatIsAnAgent() {
  return (
    <section>
      <SectionHeader
        title="What is an Agent?"
        subtitle={
          <>
            Building blocks from simple workflows to autonomous agents —{" "}
            <a
              href="https://www.anthropic.com/engineering/building-effective-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-source-ai hover:underline"
            >
              via Anthropic
            </a>
          </>
        }
      />

      {/* Key distinction */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-source-border bg-white p-5"
          style={{ borderLeftWidth: 4, borderLeftColor: "#4F6EF7" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-source-ai" />
            <h4 className="text-sm font-semibold text-source-black">Workflows</h4>
          </div>
          <p className="text-sm text-source-muted">
            LLMs and tools orchestrated through <strong>predefined code paths</strong>.
            Predictable, reliable, and easier to reason about.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-source-border bg-white p-5"
          style={{ borderLeftWidth: 4, borderLeftColor: "#C74B2A" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain size={16} className="text-[#C74B2A]" />
            <h4 className="text-sm font-semibold text-source-black">Agents</h4>
          </div>
          <p className="text-sm text-source-muted">
            LLMs <strong>dynamically direct their own processes</strong> and tool usage,
            maintaining control over how they accomplish tasks.
          </p>
        </motion.div>
      </div>

      {/* Animated Agent Loop Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 rounded-xl border border-source-border bg-white p-6"
      >
        <h4 className="mb-4 text-center text-sm font-semibold text-source-muted uppercase tracking-wider">
          The Agent Loop
        </h4>
        <div className="relative flex flex-col items-center gap-0">
          {/* Row 1: Prompt → LLM */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-lg border border-source-border bg-source-gray px-4 py-2.5"
            >
              <span className="text-xs font-semibold text-source-black">Your Prompt</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="text-source-green"
            >
              <ArrowRight size={20} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="rounded-xl border-2 border-source-green bg-source-green/5 px-6 py-3"
            >
              <div className="flex items-center gap-2">
                <Brain size={18} className="text-source-green" />
                <span className="text-sm font-bold text-source-green">LLM Evaluates</span>
              </div>
            </motion.div>
          </div>

          {/* Arrow down from LLM */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="my-1 text-source-green"
          >
            <ChevronDown size={20} />
          </motion.div>

          {/* Row 2: Tool Calls Loop */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="relative rounded-xl border-2 border-dashed border-source-ai/30 bg-source-ai/5 px-8 py-4"
          >
            <span className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-semibold uppercase tracking-wider text-source-ai">
              Agentic Loop
            </span>
            <div className="flex items-center gap-4">
              <div className="rounded-lg border border-source-border bg-white px-4 py-2.5 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <Search size={14} className="text-source-ai" />
                  <span className="text-xs font-semibold text-source-black">Tool Call(s)</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] text-source-muted">tool results</span>
                <motion.div
                  animate={{ x: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={16} className="rotate-180 text-source-ai" />
                </motion.div>
              </div>
              <div className="rounded-lg border border-source-border bg-white px-4 py-2.5 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <Brain size={14} className="text-source-green" />
                  <span className="text-xs font-semibold text-source-black">Evaluate</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] text-source-muted">tool calls</span>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={16} className="text-source-ai" />
                </motion.div>
              </div>
            </div>
            {/* Animated pulse ring */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -inset-1 rounded-xl border-2 border-source-ai/20 pointer-events-none"
            />
          </motion.div>

          {/* Arrow down: no tool calls */}
          <div className="flex items-center gap-2 my-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 }}
              className="text-source-muted"
            >
              <ChevronDown size={20} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 }}
              className="text-[10px] text-source-muted"
            >
              no tool calls
            </motion.span>
          </div>

          {/* Row 3: Final Answer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.5 }}
            className="rounded-lg border-2 border-source-green bg-source-green/10 px-5 py-2.5"
          >
            <span className="text-sm font-bold text-source-green">Final Answer</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Pattern cards — animated stagger */}
      <h4 className="mb-4 text-sm font-semibold text-source-muted uppercase tracking-wider">
        Common Patterns
      </h4>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {[
          {
            title: "Prompt Chaining",
            description: "Sequential LLM calls, each processing the previous output",
            icon: ArrowRight,
            color: "#4F6EF7",
            tag: "Workflow",
            diagram: "LLM → LLM → LLM → Output",
          },
          {
            title: "Routing",
            description: "Classify input and direct to specialized handlers",
            icon: ArrowRight,
            color: "#4F6EF7",
            tag: "Workflow",
            diagram: "Input → Router → Handler A | B | C",
          },
          {
            title: "Parallelization",
            description: "Run independent subtasks simultaneously, then aggregate",
            icon: Zap,
            color: "#4F6EF7",
            tag: "Workflow",
            diagram: "Task → LLM ∥ LLM ∥ LLM → Merge",
          },
          {
            title: "Orchestrator-Workers",
            description: "Central LLM delegates dynamically to specialist workers",
            icon: Bot,
            color: "#2D8B5E",
            tag: "Source's Approach",
            diagram: "Orchestrator → Worker A | B | C → Synthesize",
          },
          {
            title: "Evaluator-Optimizer",
            description: "One LLM generates, another provides iterative feedback",
            icon: TrendingUp,
            color: "#C74B2A",
            tag: "Advanced",
            diagram: "Generate → Evaluate → Refine ↻",
          },
          {
            title: "Autonomous Agent",
            description: "LLM uses tools in a loop, guided by environment feedback",
            icon: Brain,
            color: "#C74B2A",
            tag: "Agent",
            diagram: "Prompt → LLM → Tool → Observe ↻",
          },
        ].map((pattern) => {
          const Icon = pattern.icon;
          return (
            <motion.div
              key={pattern.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-xl border border-source-border bg-white p-5 cursor-default"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    backgroundColor: `${pattern.color}15`,
                    color: pattern.color,
                  }}
                >
                  {pattern.tag}
                </span>
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${pattern.color}10`, color: pattern.color }}
                >
                  <Icon size={14} />
                </div>
              </div>

              {/* Animated diagram */}
              <div
                className="mb-3 overflow-hidden rounded-lg px-3 py-2"
                style={{ backgroundColor: `${pattern.color}08` }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-[11px] font-mono tracking-wide"
                  style={{ color: pattern.color }}
                >
                  {pattern.diagram}
                </motion.p>
              </div>

              <h4 className="text-sm font-semibold text-source-black">{pattern.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-source-muted">
                {pattern.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Source's approach callout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6 rounded-xl border border-source-green/30 bg-source-green/5 p-5"
      >
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-source-green/10 text-source-green"
          >
            <Bot size={16} />
          </motion.div>
          <div>
            <h4 className="text-sm font-semibold text-source-black">
              Source&apos;s Approach: Orchestrator-Workers
            </h4>
            <p className="mt-1 text-sm text-source-muted">
              A central Procurement Orchestrator delegates to specialist agents (spec extraction,
              vendor matching, bid comparison) with human-in-the-loop gates for high-value decisions.
              Start with workflows, graduate to autonomous agents as confidence grows.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 3 — Agent Orchestration (React Flow)
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
  Calculator,
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
  {
    name: "Finance Agent",
    icon: Calculator,
    tools: ["Daytona Python sandbox", "Line item calculator", "Tax engine", "Budget validator"],
    data: ["PO history", "Tax rate tables", "Budget allocations", "Vendor payment terms"],
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
        position: { x: 700, y: 160 },
        data: { label: "Compliance", subtitle: "Codes & certifications", icon: "ShieldCheck" },
        draggable: false,
      },
      {
        id: "finance",
        type: "agentNode",
        position: { x: 880, y: 200 },
        data: { label: "Finance Agent", subtitle: "Deterministic calculations", icon: "Calculator" },
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
      { id: "e-o-finance", source: "orchestrator", target: "finance", animated: true, style: { stroke: "#C74B2A" } },
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

      {/* Orchestration Types */}
      <div className="mt-8">
        <h4 className="mb-4 text-sm font-semibold text-source-muted uppercase tracking-wider">
          Types of Agent Orchestration
        </h4>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {[
            {
              title: "Centralized",
              description: "A single orchestrator controls all agents, assigning tasks and managing data flow. Predictable and easy to debug.",
              color: "#2D8B5E",
              diagram: (
                <svg width="120" height="80" viewBox="0 0 120 80">
                  <circle cx="60" cy="15" r="10" fill="#2D8B5E" opacity={0.2} stroke="#2D8B5E" strokeWidth={1.5} />
                  <text x="60" y="18" textAnchor="middle" fill="#2D8B5E" fontSize="7" fontWeight="bold">O</text>
                  {[20, 50, 80, 100].map((x, i) => (
                    <g key={i}>
                      <line x1="60" y1="25" x2={x} y2="55" stroke="#2D8B5E" strokeWidth={1} opacity={0.5} />
                      <circle cx={x} cy="65" r="8" fill="#4F6EF7" opacity={0.15} stroke="#4F6EF7" strokeWidth={1} />
                      <text x={x} y="68" textAnchor="middle" fill="#4F6EF7" fontSize="6">A{i + 1}</text>
                    </g>
                  ))}
                </svg>
              ),
              isSource: true,
            },
            {
              title: "Decentralized",
              description: "No master agent — each agent acts independently, communicating peer-to-peer. More flexible and resilient to failures.",
              color: "#4F6EF7",
              diagram: (
                <svg width="120" height="80" viewBox="0 0 120 80">
                  {[
                    { x: 30, y: 20 }, { x: 90, y: 20 }, { x: 20, y: 60 }, { x: 60, y: 65 }, { x: 100, y: 60 },
                  ].map((pos, i, arr) => (
                    <g key={i}>
                      {arr.slice(i + 1).map((other, j) => (
                        <line key={j} x1={pos.x} y1={pos.y} x2={other.x} y2={other.y} stroke="#4F6EF7" strokeWidth={0.8} opacity={0.3} />
                      ))}
                      <circle cx={pos.x} cy={pos.y} r="8" fill="#4F6EF7" opacity={0.15} stroke="#4F6EF7" strokeWidth={1} />
                      <text x={pos.x} y={pos.y + 3} textAnchor="middle" fill="#4F6EF7" fontSize="6">A{i + 1}</text>
                    </g>
                  ))}
                </svg>
              ),
            },
            {
              title: "Hierarchical",
              description: "Agents arranged in layers — higher-level agents guide lower-level ones. Balances control with flexibility.",
              color: "#C74B2A",
              diagram: (
                <svg width="120" height="80" viewBox="0 0 120 80">
                  <circle cx="60" cy="12" r="8" fill="#C74B2A" opacity={0.2} stroke="#C74B2A" strokeWidth={1.5} />
                  <text x="60" y="15" textAnchor="middle" fill="#C74B2A" fontSize="6" fontWeight="bold">L1</text>
                  {[35, 85].map((x, i) => (
                    <g key={i}>
                      <line x1="60" y1="20" x2={x} y2="35" stroke="#C74B2A" strokeWidth={1} opacity={0.4} />
                      <circle cx={x} cy="40" r="8" fill="#C74B2A" opacity={0.15} stroke="#C74B2A" strokeWidth={1} />
                      <text x={x} y="43" textAnchor="middle" fill="#C74B2A" fontSize="6">L2</text>
                    </g>
                  ))}
                  {[15, 55, 65, 105].map((x, i) => (
                    <g key={i}>
                      <line x1={i < 2 ? 35 : 85} y1="48" x2={x} y2="60" stroke="#C74B2A" strokeWidth={0.8} opacity={0.3} />
                      <circle cx={x} cy="67" r="7" fill="#C74B2A" opacity={0.1} stroke="#C74B2A" strokeWidth={1} />
                      <text x={x} y="70" textAnchor="middle" fill="#C74B2A" fontSize="5">L3</text>
                    </g>
                  ))}
                </svg>
              ),
            },
            {
              title: "Federated",
              description: "Independent systems collaborate via shared protocols. Each retains autonomy while agents coordinate across boundaries.",
              color: "#7C3AED",
              diagram: (
                <svg width="120" height="80" viewBox="0 0 120 80">
                  {[
                    { cx: 30, cy: 35, label: "Sys A" },
                    { cx: 90, cy: 35, label: "Sys B" },
                    { cx: 60, cy: 65, label: "Sys C" },
                  ].map((sys, i) => (
                    <g key={i}>
                      <rect x={sys.cx - 18} y={sys.cy - 12} width={36} height={24} rx={4} fill={`${"#7C3AED"}10`} stroke="#7C3AED" strokeWidth={1} strokeDasharray="3 2" />
                      <text x={sys.cx} y={sys.cy + 3} textAnchor="middle" fill="#7C3AED" fontSize="6">{sys.label}</text>
                    </g>
                  ))}
                  <line x1="48" y1="35" x2="72" y2="35" stroke="#7C3AED" strokeWidth={1} opacity={0.4} strokeDasharray="2 2" />
                  <line x1="30" y1="47" x2="50" y2="55" stroke="#7C3AED" strokeWidth={1} opacity={0.4} strokeDasharray="2 2" />
                  <line x1="90" y1="47" x2="70" y2="55" stroke="#7C3AED" strokeWidth={1} opacity={0.4} strokeDasharray="2 2" />
                </svg>
              ),
            },
          ].map((type) => (
            <motion.div
              key={type.title}
              variants={staggerItem}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`rounded-xl border bg-white p-5 ${
                "isSource" in type && type.isSource
                  ? "border-source-green/40 ring-1 ring-source-green/20"
                  : "border-source-border"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">{type.diagram}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-source-black">{type.title}</h4>
                    {"isSource" in type && type.isSource && (
                      <span className="rounded-full bg-source-green/10 px-2 py-0.5 text-[10px] font-semibold text-source-green">
                        Source&apos;s Model
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed text-source-muted">{type.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Finance Agent — Daytona Sandbox */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 rounded-xl border border-[#C74B2A]/30 bg-white p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C74B2A]/10 text-[#C74B2A]">
            <Calculator size={20} />
          </div>
          <div>
            <h4 className="text-base font-semibold text-source-black">
              Finance Agent: Deterministic Calculations via Daytona Sandbox
            </h4>
            <p className="text-xs text-source-muted">
              The LLM identifies values and operations — Python code does the math in an isolated sandbox
            </p>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-source-muted">
          Financial calculations in procurement demand <strong>zero tolerance for error</strong>.
          A 99% accuracy rate on a $2.4M PO means $24,000 in potential mistakes. The Finance Agent
          uses a{" "}
          <a
            href="https://www.daytona.io/dotfiles/run-ai-generated-code-safely-with-daytona-sandboxes-part-1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-source-ai hover:underline"
          >
            Daytona Python sandbox
          </a>{" "}
          to execute all arithmetic deterministically — the LLM writes the calculation logic,
          but actual math runs as real Python code in an isolated environment.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* How it works */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-source-muted">
              How it works
            </p>
            <div className="space-y-2">
              {[
                { step: "1", label: "LLM extracts values", detail: "Qty: 24, Unit price: $4,850, Tax rate: 8.31%" },
                { step: "2", label: "LLM generates Python code", detail: "Writes calculation logic as executable code" },
                { step: "3", label: "Daytona sandbox executes", detail: "Runs Python in isolated container — deterministic result" },
                { step: "4", label: "Result verified", detail: "Output compared against business rules before use" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C74B2A]/10 text-[10px] font-bold text-[#C74B2A]">
                    {s.step}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-source-black">{s.label}</p>
                    <p className="text-[11px] text-source-muted">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code example */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-source-muted">
              Example: PO Line Item Calculation
            </p>
            <div className="rounded-lg bg-[#1A1A1A] p-4">
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-white/90">
{`from daytona_sdk import Daytona

daytona = Daytona()
workspace = daytona.create()

# LLM generates this code, sandbox executes it
calc_code = """
qty = 24
unit_price = 4850.00
subtotal = qty * unit_price     # $116,400.00
tax = subtotal * 0.0831         # $9,672.84
shipping = 2400.00
total = subtotal + tax + shipping
print(f"{total:.2f}")           # $128,472.84
"""

result = workspace.process.code_run(calc_code)
# result.result → "128472.84"
# Deterministic. Every. Single. Time.`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-[#C74B2A]/5 border border-[#C74B2A]/15 p-3">
          <p className="text-xs text-source-muted">
            <strong className="text-source-black">Why a sandbox?</strong>{" "}
            The LLM-generated Python runs in a Daytona container with no network access,
            no filesystem access, and automatic cleanup. If the code is malformed,
            the sandbox catches it safely. Spin-up takes &lt;90ms. The agent never does
            math itself — it only writes the code that does the math.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// =============================================================================
// Section 4 — Data Flywheel
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
          <h1 className="text-3xl font-bold text-source-black">Agent Strategy</h1>
          <p className="mt-2 text-source-muted">
            How Source should approach AI agents — what to automate, what to keep human, and how to build compounding advantages
          </p>
        </motion.div>

        <IntelligenceVsJudgment />
        <WhatIsAnAgent />
        <AgentOrchestration />
        <DataFlywheel />
        <PhasedRoadmap />

        {/* Footer spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
