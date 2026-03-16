"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SectionHeader from "@/components/SectionHeader";
import {
  landscapeStats,
  protocolLayers,
  frameworkComparison,
  marketData,
} from "@/lib/data";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

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

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function LandscapePage() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const toggleLayer = (name: string) => {
    setExpandedLayer((prev) => (prev === name ? null : name));
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8 space-y-12">
      {/* ================================================================= */}
      {/* Section 1: Header + Stat Cards                                    */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <SectionHeader
          title="AI Landscape"
          subtitle="The industry shift toward agentic AI in enterprise procurement"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {landscapeStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="rounded-xl border border-source-border bg-white p-6 text-center"
            >
              <p className="text-3xl font-bold text-source-green">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-source-black">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-source-muted">{stat.source}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ================================================================= */}
      {/* Section 2: Protocol Stack                                         */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionHeader title="The Agent Protocol Stack" />

        <div className="space-y-4">
          {protocolLayers.map((layer) => {
            const isOpen = expandedLayer === layer.name;

            return (
              <motion.div
                key={layer.name}
                variants={cardVariants}
                className="overflow-hidden rounded-xl border border-source-border bg-white"
              >
                <button
                  onClick={() => toggleLayer(layer.name)}
                  className="flex w-full items-start gap-4 p-6 text-left transition-colors hover:bg-gray-50"
                >
                  {/* Color bar */}
                  <div
                    className="mt-1 h-12 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-source-black">
                        {layer.name}
                      </h3>
                      <span className="text-sm text-source-muted">
                        {layer.full}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-source-muted">
                      {layer.description}
                    </p>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 flex-shrink-0 text-source-muted"
                  >
                    <ChevronDown size={20} />
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
                      <div className="border-t border-source-border px-6 pb-6 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-source-muted">
                          Source Mapping
                        </p>
                        <p className="mt-2 text-sm text-source-black">
                          {layer.sourceMapping}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* Section 3: Framework Comparison                                    */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionHeader title="Agent Framework Comparison" />

        <div className="overflow-hidden rounded-xl border border-source-border bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-source-border bg-gray-50">
                <th className="px-5 py-3 font-semibold text-source-black">
                  Framework
                </th>
                <th className="px-5 py-3 font-semibold text-source-black">
                  Company
                </th>
                <th className="px-5 py-3 text-center font-semibold text-source-black">
                  State Mgmt
                </th>
                <th className="px-5 py-3 text-center font-semibold text-source-black">
                  Human-in-Loop
                </th>
                <th className="px-5 py-3 text-center font-semibold text-source-black">
                  Multi-Agent
                </th>
                <th className="px-5 py-3 text-center font-semibold text-source-black">
                  Streaming
                </th>
                <th className="px-5 py-3 text-center font-semibold text-source-black">
                  Tool Use
                </th>
              </tr>
            </thead>
            <tbody>
              {frameworkComparison.map((fw) => (
                <tr
                  key={fw.name}
                  className={`border-b border-source-border last:border-b-0 ${
                    fw.recommended ? "bg-source-green/5" : ""
                  }`}
                >
                  <td className="px-5 py-3 font-medium text-source-black">
                    <span className="flex items-center gap-2">
                      {fw.name}
                      {fw.recommended && (
                        <span className="rounded-full bg-source-green/10 px-2 py-0.5 text-[10px] font-semibold text-source-green">
                          Recommended
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-source-muted">{fw.company}</td>
                  <BoolCell value={fw.stateManagement} />
                  <BoolCell value={fw.humanInLoop} />
                  <BoolCell value={fw.multiAgent} />
                  <BoolCell value={fw.streaming} />
                  <BoolCell value={fw.toolUse} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* Section 4: Market Opportunity                                      */}
      {/* ================================================================= */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <SectionHeader
          title="Construction AI Market Growth"
          subtitle="$4.86B → $22.68B by 2028"
        />

        <div className="rounded-xl border border-source-border bg-white p-6">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData}>
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D8B5E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2D8B5E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={{ stroke: "#E5E5E5" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => `$${v}b`}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E5E5",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`$${value}B`, "Market Size"]}
                labelFormatter={(label: number) => `Year: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2D8B5E"
                strokeWidth={2}
                fill="url(#greenGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>

          <p className="mt-4 text-xs text-source-muted">
            Source: MarketsandMarkets 2024
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: Boolean cell renderer
// ---------------------------------------------------------------------------

function BoolCell({ value }: { value: boolean }) {
  return (
    <td className="px-5 py-3 text-center">
      {value ? (
        <Check size={16} className="mx-auto text-source-green" />
      ) : (
        <X size={16} className="mx-auto text-gray-300" />
      )}
    </td>
  );
}
