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
    >
      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-source-muted mb-2">
        Problem {number}
      </p>
      <h2 className="text-2xl font-bold text-source-black mb-2">{title}</h2>
      <p className="text-sm leading-relaxed text-source-muted max-w-2xl mb-8">
        {description}
      </p>

      {/* Diagram */}
      <div className="rounded-xl bg-[#1E1E1E] p-8 overflow-x-auto">
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
// Diagram 1 — Lost in System Awareness (Pyramid)
// =============================================================================

function SystemAwarenessDiagram() {
  return (
    <div className="flex flex-col items-center gap-0">
      {/* NASA callout */}
      <div className="self-start mb-6 rounded-lg border border-white/30 bg-white/10 px-4 py-3 max-w-xs">
        <p className="text-xs text-white/90 leading-relaxed">
          Astronauts at ISS faced this from mission control below.
        </p>
        <p className="text-xs text-white/70 italic mt-1">
          Now you face it from AI above.
        </p>
      </div>

      {/* You — apex */}
      <div className="rounded-lg border-2 border-amber-500/70 bg-amber-500/15 px-8 py-3 text-center mb-4">
        <p className="text-sm font-semibold text-amber-400">You</p>
        <p className="text-[11px] text-amber-400/70">decision maker</p>
      </div>

      {/* Arrow */}
      <div className="h-6 w-px bg-white/20 mb-2" />

      {/* Layer 1 */}
      <div className="w-full max-w-sm rounded-md border border-white/30 bg-white/10 px-6 py-3 text-center mb-3">
        <p className="text-xs text-white/90">AI assistants · agents · tools</p>
      </div>

      {/* Arrow */}
      <div className="h-4 w-px bg-white/15 mb-2" />

      {/* Layer 2 */}
      <div className="w-full max-w-md rounded-md border border-white/30 bg-white/10 px-6 py-3 text-center mb-3">
        <p className="text-xs text-white/90">emails · code · docs · plans · summaries</p>
      </div>

      {/* Arrow */}
      <div className="h-4 w-px bg-white/15 mb-2" />

      {/* Layer 3 */}
      <div className="w-full max-w-lg rounded-md border border-white/30 bg-white/10 px-6 py-3 text-center mb-4">
        <p className="text-xs text-white/90">
          pipelines · integrations · scheduled agents · background tasks · APIs
        </p>
      </div>

      {/* Caption */}
      <p className="text-[11px] text-white/70 text-center">
        the pyramid grows automatically — you didn&apos;t ask for most of it
      </p>
    </div>
  );
}

// =============================================================================
// Diagram 2 — Semantic Drift (Diverging Paths)
// =============================================================================

function SemanticDriftDiagram() {
  const interpretations = [
    { action: "Automate deploys", outcome: "CI/CD overhaul · 6 months", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/50" },
    { action: "Cut review cycles", outcome: "Full org restructure", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/50" },
    { action: "Reduce headcount", outcome: "Hiring freeze", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/50" },
  ];

  return (
    <div>
      {/* Column headers */}
      <div className="grid grid-cols-[140px_1fr_1fr] gap-4 mb-4 items-end">
        <div />
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70 text-center">
          3 people + AI infer it
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70 text-center">
          3 divergent outcomes
        </p>
      </div>

      {/* Goal node + rows */}
      <div className="grid grid-cols-[140px_1fr_1fr] gap-4 items-center">
        {/* Goal — spans 3 rows */}
        <div className="row-span-3 flex items-center">
          <div className="rounded-lg border-2 border-amber-500/70 bg-amber-500/15 px-5 py-4 text-center w-full">
            <p className="text-sm font-semibold text-amber-400">Goal:</p>
            <p className="text-xs text-amber-400/80">&quot;ship faster&quot;</p>
          </div>
        </div>

        {/* Row 1 */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 border-t border-dashed border-source-border" />
          <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-1.5">
            <p className="text-xs text-amber-400">{interpretations[0].action}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-6 border-t border-dashed border-source-border dash-animated" />
          <div className="rounded-md border border-white/30 bg-white/10 px-3 py-1.5 flex-1 text-center">
            <p className="text-xs text-white/90">{interpretations[0].outcome}</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 border-t border-dashed border-source-border" />
          <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-1.5">
            <p className="text-xs text-amber-400">{interpretations[1].action}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-6 border-t border-dashed border-source-border dash-animated" />
          <div className="rounded-md border border-white/30 bg-white/10 px-3 py-1.5 flex-1 text-center">
            <p className="text-xs text-white/90">{interpretations[1].outcome}</p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 border-t border-dashed border-source-border" />
          <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-1.5">
            <p className="text-xs text-amber-400">{interpretations[2].action}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-6 border-t border-dashed border-source-border dash-animated" />
          <div className="rounded-md border border-[#C74B2A]/40 bg-[#C74B2A]/10 px-3 py-1.5 flex-1 text-center">
            <p className="text-xs text-[#C74B2A]">{interpretations[2].outcome}</p>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="mt-6 text-[11px] text-white/70 text-center">
        semantic distance from original intent grows with every AI inference cycle
      </p>
    </div>
  );
}

// =============================================================================
// Diagram 3 — Lost in AI Slop (Voices → AI Layer → Flat Output)
// =============================================================================

function AISlopDiagram() {
  const voices = [
    { label: "Your breakthrough idea", color: "border-amber-500/60 bg-amber-500/15 text-amber-400" },
    { label: "Colleague's challenge", color: "border-amber-500/60 bg-amber-500/15 text-amber-400" },
    { label: "Client's real need", color: "border-teal-500/60 bg-teal-500/15 text-teal-400" },
    { label: "Domain expertise", color: "border-teal-500/60 bg-teal-500/15 text-teal-400" },
    { label: "Hard-won context", color: "border-teal-500/60 bg-teal-500/15 text-teal-400" },
  ];

  return (
    <div>
      {/* Column headers */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-6 mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
          Distinct voices entering
        </p>
        <div />
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
          What people receive
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
        {/* Left — voices */}
        <div className="space-y-2">
          {voices.map((v) => (
            <div
              key={v.label}
              className={`rounded-md border px-3 py-2 ${v.color}`}
            >
              <p className="text-xs font-medium">{v.label}</p>
            </div>
          ))}
        </div>

        {/* Center — AI content layer */}
        <div className="flex flex-col items-center gap-2">
          {/* Arrows in */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-px w-6 border-t border-dashed border-source-border dash-animated" />
            ))}
          </div>
          <div className="rounded-lg border border-white/30 bg-white/10 px-6 py-6 text-center">
            <p className="text-sm font-semibold text-white">AI content</p>
            <p className="text-[11px] text-white/80">layer</p>
          </div>
          {/* Arrows out */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-px w-6 border-t border-dashed border-source-border dash-animated" />
            ))}
          </div>
        </div>

        {/* Right — flat output */}
        <div className="rounded-lg border border-white/30 bg-white/10 p-4 space-y-2">
          <p className="text-[11px] text-white/70 mb-3">
            AI slop — confident, fluent, flat
          </p>
          {/* Gray placeholder lines */}
          <div className="h-2 w-4/5 rounded bg-source-border" />
          <div className="h-2 w-3/5 rounded bg-source-border" />
          <div className="h-2 w-full rounded bg-source-border" />
          {/* The buried insight */}
          <div className="rounded border border-teal-500/40 bg-teal-500/10 px-3 py-1.5 my-1">
            <p className="text-[11px] font-medium text-teal-400">
              real insight + innovation
            </p>
          </div>
          <div className="h-2 w-4/5 rounded bg-source-border" />
          <div className="h-2 w-2/3 rounded bg-source-border" />
        </div>
      </div>

      {/* Caption */}
      <p className="mt-6 text-[11px] text-white/70 text-center">
        original voices and insight → absorbed, flattened, indistinguishable from filler
      </p>
    </div>
  );
}

// =============================================================================
// Page Root
// =============================================================================

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto max-w-4xl p-8 space-y-20">
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
          description='Your intent is clear. But when 3 people and their AI tools each interpret "ship faster," the goal splinters into 3 divergent actions. Small drifts compound into wrong outcomes.'
          insight='This is why deterministic walls matter. Financial calculations run as real Python code in a sandbox, not LLM inference. Business rules are hard-coded, not "understood." The agent writes the code — the sandbox runs it exactly.'
          linkTo="/strategy"
          linkLabel="See Finance Agent: Daytona Sandbox"
        >
          <SemanticDriftDiagram />
        </ProblemSection>

        <ProblemSection
          number="03"
          title="Lost in AI Slop"
          description="Distinct voices — your breakthrough idea, a colleague's challenge, a client's real need — enter an AI content layer and come out the other side as confident, fluent, flat text. The real insight is buried in filler."
          insight="This is why Stripe caps agent CI at 2 rounds and enforces mandatory human review on every PR. Volume without quality gates is noise. Source's Blueprint pattern ensures what reaches a human is worth reviewing."
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
