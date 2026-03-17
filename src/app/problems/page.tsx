"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

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

// =============================================================================
// Problem Section Wrapper
// =============================================================================

function ProblemSection({
  number,
  title,
  description,
  children,
  insight,
  linkTo,
  linkLabel,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
  insight: string;
  linkTo?: string;
  linkLabel?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={sectionVariants}
      className="border-t border-source-border pt-10"
    >
      <p className="text-xs font-semibold tracking-widest uppercase text-source-muted mb-1">
        Problem {number}
      </p>
      <h2 className="text-2xl font-bold text-source-black mb-2">{title}</h2>
      <p className="text-sm leading-relaxed text-source-muted max-w-2xl mb-8">
        {description}
      </p>

      {/* Diagram */}
      <div className="rounded-xl border border-source-border bg-[#1A1A1A] p-6 overflow-x-auto">
        {children}
      </div>

      {/* Insight card */}
      <div className="mt-4 rounded-xl border border-source-border bg-white p-5">
        <p className="text-sm leading-relaxed text-source-muted">
          <span className="font-semibold text-source-black">So what? </span>
          {insight}
        </p>
        {linkTo && linkLabel && (
          <Link
            href={linkTo}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-source-ai hover:underline"
          >
            {linkLabel}
            <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// =============================================================================
// Diagram 1 — System Awareness Pyramid
// =============================================================================

function SystemAwarenessDiagram() {
  const layers = [
    { y: 84, w: 200, x: 240, label: "AI assistants · agents · tools" },
    { y: 134, w: 320, x: 180, label: "emails · code · docs · plans · summaries" },
    { y: 184, w: 520, x: 80, label: "pipelines · integrations · scheduled agents · background tasks" },
  ];

  return (
    <svg
      width="100%"
      viewBox="0 0 680 250"
      className="overflow-visible"
      aria-label="System awareness pyramid diagram"
    >
      <defs>
        <marker
          id="arr-sa"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* NASA callout */}
      <rect x="20" y="10" width="200" height="60" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <text x="30" y="30" fontSize="11" fill="rgba(255,255,255,0.6)">Astronauts at ISS faced this</text>
      <text x="30" y="45" fontSize="11" fill="rgba(255,255,255,0.6)">from mission control below.</text>
      <text x="30" y="60" fontSize="11" fill="rgba(255,255,255,0.3)" fontStyle="italic">Now you face it from AI above.</text>

      {/* You — apex */}
      <rect x="290" y="16" width="100" height="42" rx="8" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" />
      <text x="340" y="33" textAnchor="middle" fontSize="14" fontWeight="600" fill="rgb(251,191,36)">You</text>
      <text x="340" y="49" textAnchor="middle" fontSize="10" fill="rgba(251,191,36,0.7)">decision maker</text>

      {/* Connecting lines */}
      <line x1="340" y1="58" x2="340" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" markerEnd="url(#arr-sa)" />
      <line x1="340" y1="114" x2="340" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" markerEnd="url(#arr-sa)" />
      <line x1="340" y1="164" x2="340" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" markerEnd="url(#arr-sa)" />

      {/* Layers */}
      {layers.map((layer) => (
        <g key={layer.y}>
          <rect x={layer.x} y={layer.y} width={layer.w} height="30" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          <text x="340" y={layer.y + 15} textAnchor="middle" dominantBaseline="central" fontSize="11" fill="rgba(255,255,255,0.6)">
            {layer.label}
          </text>
        </g>
      ))}

      {/* Caption */}
      <text x="340" y="235" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.3)">
        the pyramid grows automatically — you didn&apos;t ask for most of it
      </text>
    </svg>
  );
}

// =============================================================================
// Diagram 2 — Semantic Drift
// =============================================================================

function SemanticDriftDiagram() {
  const stages = [
    { x: 20, label: "Your Intent", sub: '"Cut vendor costs\nby 15% this quarter"', color: "rgb(45,139,94)", bgColor: "rgba(45,139,94,0.15)", borderColor: "rgba(45,139,94,0.7)" },
    { x: 170, label: "AI Interprets", sub: '"Reduce unit prices\nacross all categories"', color: "rgb(79,110,247)", bgColor: "rgba(79,110,247,0.15)", borderColor: "rgba(79,110,247,0.7)" },
    { x: 320, label: "Agent Executes", sub: '"Switch to cheapest\nvendor per line item"', color: "rgb(245,158,11)", bgColor: "rgba(245,158,11,0.15)", borderColor: "rgba(245,158,11,0.7)" },
    { x: 470, label: "Outcome", sub: '"Lowest-quality vendor\nselected for lobby chairs"', color: "rgb(199,75,42)", bgColor: "rgba(199,75,42,0.15)", borderColor: "rgba(199,75,42,0.7)" },
  ];

  return (
    <svg
      width="100%"
      viewBox="0 0 660 160"
      className="overflow-visible"
      aria-label="Semantic drift diagram"
    >
      <defs>
        <marker id="arr-sd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {stages.map((stage, i) => (
        <g key={stage.label}>
          {/* Connector */}
          {i > 0 && (
            <line
              x1={stage.x - 20}
              y1="55"
              x2={stage.x}
              y2="55"
              className="dash-animated"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              markerEnd="url(#arr-sd)"
            />
          )}
          {/* Card */}
          <rect x={stage.x} y="20" width="140" height="70" rx="8" fill={stage.bgColor} stroke={stage.borderColor} strokeWidth="1.2" />
          <text x={stage.x + 70} y="40" textAnchor="middle" fontSize="11" fontWeight="600" fill={stage.color}>
            {stage.label}
          </text>
          {stage.sub.split("\n").map((line, j) => (
            <text key={j} x={stage.x + 70} y={55 + j * 14} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.5)">
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* Drift indicator */}
      <line x1="90" y1="110" x2="540" y2="110" stroke="rgba(199,75,42,0.3)" strokeWidth="1" strokeDasharray="4 3" />
      <text x="20" y="115" fontSize="10" fill="rgba(199,75,42,0.6)">original intent</text>
      <line x1="90" y1="130" x2="540" y2="130" stroke="rgba(199,75,42,0.5)" strokeWidth="2" />
      <text x="20" y="135" fontSize="10" fill="rgba(199,75,42,0.8)">actual execution</text>
      <text x="330" y="152" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)">
        meaning shifts at every handoff — small drift compounds into wrong outcomes
      </text>
    </svg>
  );
}

// =============================================================================
// Diagram 3 — AI Slop
// =============================================================================

function AISlopDiagram() {
  const items = [
    { x: 30, y: 20, w: 120, h: 55, label: "AI-generated\nemail draft", color: "rgba(79,110,247,0.15)", border: "rgba(79,110,247,0.5)" },
    { x: 170, y: 30, w: 120, h: 55, label: "Auto-summarized\nmeeting notes", color: "rgba(78,203,160,0.15)", border: "rgba(78,203,160,0.5)" },
    { x: 310, y: 15, w: 120, h: 55, label: "Agent-written\ncode PR", color: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.5)" },
    { x: 450, y: 35, w: 120, h: 55, label: "Generated\nspec analysis", color: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.5)" },
    { x: 90, y: 90, w: 120, h: 55, label: "Auto-created\nJira tickets", color: "rgba(199,75,42,0.15)", border: "rgba(199,75,42,0.5)" },
    { x: 240, y: 100, w: 120, h: 55, label: "AI status\nupdates", color: "rgba(79,110,247,0.15)", border: "rgba(79,110,247,0.5)" },
    { x: 380, y: 95, w: 120, h: 55, label: "Suggested\nfollow-ups", color: "rgba(78,203,160,0.15)", border: "rgba(78,203,160,0.5)" },
    { x: 520, y: 85, w: 110, h: 55, label: "Compliance\nreport draft", color: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.5)" },
  ];

  return (
    <svg
      width="100%"
      viewBox="0 0 660 220"
      className="overflow-visible"
      aria-label="AI slop volume diagram"
    >
      {/* Scattered items */}
      {items.map((item, i) => (
        <g key={i}>
          <rect x={item.x} y={item.y} width={item.w} height={item.h} rx="6" fill={item.color} stroke={item.border} strokeWidth="0.8" />
          {item.label.split("\n").map((line, j) => (
            <text key={j} x={item.x + item.w / 2} y={item.y + 22 + j * 14} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.55)">
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* You — overwhelmed in the center */}
      <rect x="260" y="155" width="140" height="40" rx="8" fill="rgba(199,75,42,0.15)" stroke="rgba(199,75,42,0.7)" strokeWidth="1.5" />
      <text x="330" y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="rgb(199,75,42)">
        You — buried in output
      </text>
      <text x="330" y="210" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)">
        volume ≠ value — most of this is noise you now have to triage
      </text>

      {/* Animated dashed lines from items to you */}
      {items.map((item, i) => (
        <line
          key={i}
          x1={item.x + item.w / 2}
          y1={item.y + item.h}
          x2="330"
          y2="155"
          className="dash-animated"
          stroke="rgba(199,75,42,0.15)"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

// =============================================================================
// Page Root
// =============================================================================

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto max-w-4xl p-8 space-y-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-source-black">
            Three Problems With AI at Scale
          </h1>
          <p className="mt-2 max-w-2xl text-source-muted">
            Every team using AI tools runs into the same structural traps — not
            because the tools are bad, but because the system around them
            wasn&apos;t designed for the person at the top.
          </p>
        </motion.div>

        <ProblemSection
          number="01"
          title="Lost in System Awareness"
          description="As AI tools multiply, the volume of activity happening beneath you grows exponentially. You didn't ask for most of it. But you're responsible for all of it."
          insight="This is why Source needs a central orchestrator with human-in-the-loop gates — not a dozen disconnected AI tools each doing their own thing. One system, one place to see what's happening, confidence-based routing to decide what reaches you."
          linkTo="/strategy"
          linkLabel="See Agent Strategy: Intelligence vs Judgment"
        >
          <SystemAwarenessDiagram />
        </ProblemSection>

        <ProblemSection
          number="02"
          title="Semantic Drift"
          description='Your intent is clear in your head. But by the time it passes through an AI assistant, gets interpreted by an agent, and turns into executed actions — the meaning has shifted. Each handoff introduces a small distortion. Small drifts compound into wrong outcomes.'
          insight='This is why deterministic walls matter. Financial calculations run as real Python code in a Daytona sandbox, not LLM inference. Business rules are hard-coded, not "understood." The agent writes the code — the sandbox runs it exactly.'
          linkTo="/strategy"
          linkLabel="See Finance Agent: Daytona Sandbox"
        >
          <SemanticDriftDiagram />
        </ProblemSection>

        <ProblemSection
          number="03"
          title="Lost in AI Slop"
          description="AI doesn't just help you work — it generates work. Auto-drafted emails, summarized meetings, agent-written PRs, generated reports, suggested follow-ups. The output volume grows faster than your ability to review it."
          insight="This is why Stripe caps agent CI at 2 rounds and enforces mandatory human review on every PR. Volume without quality gates is noise. Source's Blueprint pattern — deterministic walls between agentic steps — ensures that what reaches a human is worth reviewing."
          linkTo="/ai-coding"
          linkLabel="See AI Coding: The Blueprint Pattern"
        >
          <AISlopDiagram />
        </ProblemSection>

        <div className="h-8" />
      </div>
    </div>
  );
}
