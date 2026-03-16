"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Database,
  Layers,
  Sparkles,
  Mail,
  Linkedin,
  Globe,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// ---------------------------------------------------------------------------
// Why The Source cards
// ---------------------------------------------------------------------------

const whyCards = [
  {
    icon: Database,
    title: "Domain Data Moat",
    description:
      "$6.5B in procurement data is an extraordinary foundation for AI. The Source isn't starting from scratch — it's sitting on the training data that would take competitors years to accumulate.",
    color: "#4F6EF7",
  },
  {
    icon: Layers,
    title: "Full-Stack AI Opportunity",
    description:
      "From spec extraction to predictive pricing, every step of procurement can be enhanced with AI. This isn't about bolting ChatGPT onto a form — it's about building AI-native workflows.",
    color: "#2D8B5E",
  },
  {
    icon: Sparkles,
    title: "Minimum Awesome Product",
    description:
      "Christian's philosophy resonates. Ship something that works beautifully and iterate. This demo is proof of that approach — built fast, focused on impact, designed to impress.",
    color: "#C74B2A",
  },
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
    transition: { staggerChildren: 0.12 },
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

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8 space-y-12">
      {/* ================================================================= */}
      {/* Header                                                            */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <SectionHeader
          title="About"
          subtitle="The engineer behind this demo"
        />

        {/* Professional intro card */}
        <div className="rounded-xl border border-source-border bg-white p-8">
          <div className="mb-6">
            <Image
              src="/source-logo.png"
              alt="The Source Logo"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <h3 className="text-2xl font-bold text-source-black">Ahmed Khan</h3>
          <p className="mt-1 text-sm font-medium text-source-green">
            Senior AI Engineer
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-source-muted">
            I build AI-powered products that solve real business problems. This
            demo was built in one day to demonstrate how AI can transform
            procurement workflows at The Source — from document intelligence to
            multi-agent orchestration.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/ahmedkhan25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-source-ai hover:underline"
            >
              <Linkedin size={14} />
              LinkedIn
              <ExternalLink size={12} />
            </a>
            <a
              href="https://www.ahmedkhan-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-source-ai hover:underline"
            >
              <Globe size={14} />
              ahmedkhan-ai.com
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* Key Work                                                          */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionHeader title="Key Work" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4"
        >
          {/* This Demo */}
          <motion.div
            variants={cardVariants}
            className="rounded-xl border border-source-border bg-white p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-source-green/10 text-source-green">
              <Layers size={20} />
            </div>
            <h4 className="text-sm font-bold text-source-black">
              The Source AI Explorer
            </h4>
            <p className="mt-1 text-xs font-medium text-source-green">
              AI-Native Procurement Vision Demo
            </p>
            <p className="mt-2 text-sm leading-relaxed text-source-muted">
              The demo you are looking at right now. An interactive exploration
              of how AI can transform every step of construction procurement at
              The Source.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-source-green/10 px-3 py-1 text-xs font-medium text-source-green">
              You are here
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ================================================================= */}
      {/* Why The Source                                                     */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionHeader title="Why The Source" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {whyCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="rounded-xl border border-source-border bg-white p-6"
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${card.color}15`,
                    color: card.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <h4 className="text-sm font-bold text-source-black">
                  {card.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-source-muted">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ================================================================= */}
      {/* Contact                                                           */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="flex items-center gap-2 text-sm text-source-muted">
          <Mail size={14} />
          <span>
            Get in touch:{" "}
            <a
              href="mailto:ahmedkhan25@gmail.com"
              className="text-source-ai hover:underline"
            >
              ahmedkhan25@gmail.com
            </a>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
