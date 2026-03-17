"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Target,
  Play,
  FileSearch,
  Layers,
  User,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const navCards = [
  {
    href: "/landscape",
    icon: Globe,
    title: "AI Landscape",
    description: "Industry trends, protocol stack, framework analysis",
  },
  {
    href: "/strategy",
    icon: Target,
    title: "Strategy",
    description: "Intelligence vs judgment, agent orchestration, roadmap",
  },
  {
    href: "/demos",
    icon: Play,
    title: "Interactive Demos",
    description:
      "Live AI demos — spec extraction, vendor matching, procurement chat",
  },
  {
    href: "/bid-review",
    icon: FileSearch,
    title: "Bid Review",
    description: "Deep dive into AI-powered bid comparison",
  },
  {
    href: "/architecture",
    icon: Layers,
    title: "Architecture",
    description: "Technical architecture and infrastructure vision",
  },
  {
    href: "/about",
    icon: User,
    title: "About",
    description: "About the engineer behind this demo",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Green gradient header bar */}
      <div className="bg-gradient-to-r from-source-green/10 via-source-green/5 to-transparent px-8 py-4">
        <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-medium text-source-muted shadow-sm">
          Built by Ahmed Khan
        </span>
      </div>

      <div className="mx-auto max-w-5xl px-8 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <Image
            src="/source-logo.png"
            alt="The Source Logo"
            width={200}
            height={50}
            className="mb-6 h-12 w-auto"
          />
          <h1 className="text-4xl font-bold text-source-black">
            The Source AI Explorer
          </h1>
          <p className="mt-3 text-xl text-source-muted">
            An AI-Native Vision for FF&E Procurement
          </p>
        </motion.div>

        {/* Animated stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-source-border bg-white p-6 text-center">
            <AnimatedCounter target={6.5} prefix="$" suffix="B" duration={2} />
            <p className="mt-2 text-sm font-medium text-source-muted">
              Procured
            </p>
          </div>
          <div className="rounded-xl border border-source-border bg-white p-6 text-center">
            <AnimatedCounter target={1225} suffix="+" duration={2} />
            <p className="mt-2 text-sm font-medium text-source-muted">
              Projects
            </p>
          </div>
          <div className="rounded-xl border border-source-border bg-white p-6 text-center">
            <AnimatedCounter target={97} suffix="%" duration={2} />
            <p className="mt-2 text-sm font-medium text-source-muted">
              On-Time
            </p>
          </div>
        </motion.div>

        {/* Navigation cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {navCards.map(({ href, icon: Icon, title, description }) => (
            <motion.div key={href} variants={itemVariants}>
              <Link href={href} className="group block">
                <div className="rounded-xl border border-source-border bg-white p-6 transition-shadow duration-200 hover:shadow-lg">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-source-green/10 text-source-green transition-colors group-hover:bg-source-green group-hover:text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-source-black">{title}</h3>
                  <p className="mt-1 text-sm text-source-muted">
                    {description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 text-center text-xs text-source-muted"
        >
          Built with Next.js, CopilotKit, GPT-4o, framer-motion
        </motion.p>
      </div>
    </div>
  );
}
