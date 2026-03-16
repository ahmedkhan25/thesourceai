"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSearch,
  Users,
  MessageSquare,
  GitBranch,
  Bot,
  Loader2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  ChevronRight,
  Search,
  DollarSign,
  FileCheck,
  Scale,
  ShieldCheck,
  Truck,
  FileInput,
  FileOutput,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import {
  hotelSpec,
  extractedLineItems,
  vendors,
  vendorMatches,
  vendorBids,
  budgetBreakdown,
  pipelineStages,
  agentCards as initialAgentCards,
  ritzCarltonProject,
} from "@/lib/data";
import type {
  ExtractedLineItem,
  VendorMatch,
  AgentCard,
  PipelineStage,
} from "@/lib/data";

// =============================================================================
// Tab definitions
// =============================================================================

const tabs = [
  { id: "spec", label: "Spec Extraction", icon: FileSearch },
  { id: "vendor", label: "Vendor Match", icon: Users },
  { id: "chat", label: "Procurement Chat", icon: MessageSquare },
  { id: "pipeline", label: "Bid Pipeline", icon: GitBranch },
  { id: "canvas", label: "Agent Canvas", icon: Bot },
] as const;

type TabId = (typeof tabs)[number]["id"];

// =============================================================================
// Helper: Category badge color
// =============================================================================

function categoryColor(cat: string): string {
  switch (cat) {
    case "FF&E":
      return "bg-source-coral text-white";
    case "OFCI":
      return "bg-source-green text-white";
    case "OS&E":
      return "bg-source-ai text-white";
    default:
      return "bg-gray-200 text-gray-700";
  }
}

// =============================================================================
// Helper: Confidence gauge (small SVG radial)
// =============================================================================

function ConfidenceGauge({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - value * circumference;
  const color = value >= 0.8 ? "#2D8B5E" : "#D97706";

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="48" height="48" className="-rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth="4"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xs font-semibold" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

// =============================================================================
// Tab 1: Spec Extraction
// =============================================================================

function SpecTab() {
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedLineItem[] | null>(null);

  const handleExtract = useCallback(() => {
    setExtracting(true);
    setExtracted(null);
    setTimeout(() => {
      setExtracted(extractedLineItems);
      setExtracting(false);
    }, 2000);
  }, []);

  useCopilotAction({
    name: "extract_specification",
    description:
      "Extract structured line items from hotel specification document",
    handler: async () => {
      setExtracted(extractedLineItems);
      return extractedLineItems;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-source-black">
          Specification Extraction
        </h2>
        <button
          onClick={handleExtract}
          disabled={extracting}
          className="flex items-center gap-2 rounded-lg bg-source-green px-6 py-3 text-white font-semibold hover:bg-source-green/90 transition disabled:opacity-60"
        >
          {extracting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Extracting...
            </>
          ) : (
            <>
              <FileSearch className="h-5 w-5" />
              Extract Specifications
            </>
          )}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Left: Spec Document */}
        <div className="w-[60%] flex-shrink-0">
          <div className="rounded-xl border border-source-border bg-source-gray p-1">
            <div className="px-4 py-2 text-xs font-semibold text-source-muted uppercase tracking-wider border-b border-source-border">
              Source Document
            </div>
            <pre className="p-4 overflow-auto max-h-[600px] text-xs leading-relaxed font-mono text-source-black whitespace-pre-wrap">
              {hotelSpec}
            </pre>
          </div>
        </div>

        {/* Right: Extracted Items */}
        <div className="w-[40%]">
          {!extracted && !extracting && (
            <div className="flex items-center justify-center h-[600px] rounded-xl border border-dashed border-source-border bg-source-gray/50">
              <p className="text-source-muted text-sm">
                Click Extract to analyze specifications
              </p>
            </div>
          )}

          {extracting && (
            <div className="flex flex-col items-center justify-center h-[600px] rounded-xl border border-source-border bg-white gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-source-green" />
              <p className="text-source-muted text-sm">
                AI is analyzing the specification document...
              </p>
            </div>
          )}

          {extracted && (
            <div className="space-y-3 overflow-auto max-h-[600px] pr-1">
              {extracted.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border border-source-border bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColor(item.category)}`}
                        >
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-source-black">
                          {item.code}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-source-black truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-source-muted mt-0.5 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-source-muted">
                        <span>
                          <strong>Material:</strong> {item.material}
                        </span>
                        <span>
                          <strong>Dims:</strong> {item.dimensions}
                        </span>
                        <span>
                          <strong>Qty:</strong> {item.quantity}
                        </span>
                        <span>
                          <strong>Unit:</strong> $
                          {item.unitPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <ConfidenceGauge value={item.confidence} />
                      {item.confidence < 0.8 && (
                        <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                          NEEDS REVIEW
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    {item.status === "APPROVED" || item.status === "ORDERED" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-source-green bg-source-green/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        {item.status}
                      </span>
                    ) : item.status === "NEEDS REVIEW" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="h-3 w-3" />
                        {item.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-source-muted bg-gray-100 px-2 py-0.5 rounded-full">
                        <Clock className="h-3 w-3" />
                        {item.status}
                      </span>
                    )}
                    {item.vendor && (
                      <span className="text-[10px] text-source-muted">
                        {item.vendor}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Tab 2: Vendor Match
// =============================================================================

function VendorTab() {
  const [selectedItem, setSelectedItem] = useState<ExtractedLineItem>(
    extractedLineItems[0]
  );
  const [matching, setMatching] = useState(false);
  const [matches, setMatches] = useState<VendorMatch[] | null>(null);

  const handleMatch = useCallback(() => {
    setMatching(true);
    setMatches(null);
    setTimeout(() => {
      setMatches(vendorMatches(selectedItem.name));
      setMatching(false);
    }, 1500);
  }, [selectedItem]);

  useCopilotAction({
    name: "match_vendors",
    description: "Find matching vendors for a line item",
    parameters: [
      {
        name: "itemName",
        type: "string",
        description: "The name of the line item to match",
      },
    ],
    handler: async ({ itemName }: { itemName: string }) => {
      const result = vendorMatches(itemName || selectedItem.name);
      setMatches(result);
      return result;
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-source-black">
        Vendor Matching
      </h2>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-source-muted mb-1">
            Select Line Item
          </label>
          <select
            value={selectedItem.id}
            onChange={(e) => {
              const item = extractedLineItems.find(
                (li) => li.id === e.target.value
              );
              if (item) {
                setSelectedItem(item);
                setMatches(null);
              }
            }}
            className="w-full rounded-lg border border-source-border bg-white px-4 py-3 text-sm text-source-black focus:outline-none focus:ring-2 focus:ring-source-green"
          >
            {extractedLineItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.code} — {item.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleMatch}
          disabled={matching}
          className="flex items-center gap-2 rounded-lg bg-source-green px-6 py-3 text-white font-semibold hover:bg-source-green/90 transition disabled:opacity-60"
        >
          {matching ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Matching...
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              Find Matches
            </>
          )}
        </button>
      </div>

      {/* Selected item preview */}
      <div className="rounded-xl border border-source-border bg-source-gray p-4">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColor(selectedItem.category)}`}
          >
            {selectedItem.category}
          </span>
          <span className="text-sm font-bold text-source-black">
            {selectedItem.name}
          </span>
        </div>
        <p className="text-xs text-source-muted">{selectedItem.description}</p>
        <div className="flex gap-4 mt-2 text-xs text-source-muted">
          <span>Qty: {selectedItem.quantity}</span>
          <span>Unit: ${selectedItem.unitPrice.toLocaleString()}</span>
          <span>
            Total: $
            {(selectedItem.quantity * selectedItem.unitPrice).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Loading */}
      {matching && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-source-green" />
        </div>
      )}

      {/* Match results */}
      {matches && !matching && (
        <div className="space-y-3">
          {matches.map((match, idx) => (
            <motion.div
              key={match.vendorName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl border border-source-border bg-white p-5"
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm flex-shrink-0 ${
                    match.bestMatch ? "bg-source-green" : "bg-source-muted"
                  }`}
                >
                  #{idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-source-black">
                      {match.vendorName}
                    </h4>
                    {match.bestMatch && (
                      <span className="text-[10px] font-bold bg-source-green/10 text-source-green px-2 py-0.5 rounded-full">
                        Best Match
                      </span>
                    )}
                  </div>

                  {/* Score bar */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-source-green"
                        initial={{ width: 0 }}
                        animate={{ width: `${match.score * 100}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 + 0.2 }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-source-green w-12 text-right">
                      {Math.round(match.score * 100)}%
                    </span>
                  </div>

                  <div className="flex gap-6 text-xs text-source-muted">
                    <span>
                      <strong>Price:</strong> ${match.price.toLocaleString()}
                    </span>
                    <span>
                      <strong>Lead Time:</strong> {match.leadTime}
                    </span>
                  </div>
                  <p className="text-xs text-source-muted mt-1">
                    {match.notes}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Tab 3: Procurement Chat
// =============================================================================

function ChatTab() {
  useCopilotReadable({
    description: "Current project context for procurement assistant",
    value: {
      project: ritzCarltonProject,
      vendors: vendors,
      budgetBreakdown: budgetBreakdown,
    },
  });

  useCopilotAction({
    name: "search_procurement_data",
    description: "Search procurement specs, vendor data, and project documents",
    parameters: [
      {
        name: "query",
        type: "string",
        description: "Search query",
      },
    ],
    handler: async ({ query }: { query: string }) => {
      return [
        {
          content: `Found 3 results for "${query}" in Ritz-Carlton Denver project specs. Key items include lobby furniture specifications (Section 12 52 00), vendor compliance data, and budget allocation details.`,
          source: "Project Specs DB",
        },
        {
          content: `Historical data shows similar items procured across 12 comparable luxury hotel projects in the Source portfolio.`,
          source: "Source Historical Data",
        },
        {
          content: `Current market pricing for related items shows 8-12% increase over 2024 benchmarks. Recommend early procurement lock-in.`,
          source: "Market Intelligence",
        },
      ];
    },
    render: ({ status, result }) => {
      if (status === "executing") {
        return (
          <div className="flex items-center gap-2 text-sm text-source-muted py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Searching procurement data...
          </div>
        );
      }
      if (status === "complete" && result) {
        const results = result as Array<{
          content: string;
          source: string;
        }>;
        return (
          <div className="space-y-2 py-2">
            {results.map(
              (r: { content: string; source: string }, i: number) => (
                <div
                  key={i}
                  className="rounded-lg border border-source-border bg-source-gray p-3 text-xs"
                >
                  <p className="text-source-black">{r.content}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold">
                    {r.source}
                  </span>
                </div>
              )
            )}
          </div>
        );
      }
      return <></>;
    },
  });

  useCopilotAction({
    name: "analyze_budget",
    description:
      "Analyze project budget showing allocated vs spent per category",
    parameters: [],
    handler: async () => {
      return budgetBreakdown;
    },
    render: ({ status, result }) => {
      if (status === "executing") {
        return (
          <div className="flex items-center gap-2 text-sm text-source-muted py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing budget...
          </div>
        );
      }
      if (status === "complete" && result) {
        return (
          <div className="py-2">
            <div className="rounded-xl border border-source-border bg-white p-4">
              <h4 className="text-sm font-semibold text-source-black mb-3">
                Budget: Allocated vs Spent
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={budgetBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11 }}
                    stroke="#6B7280"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="#6B7280"
                    tickFormatter={(v: number) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value: number) =>
                      `$${value.toLocaleString()}`
                    }
                  />
                  <Bar
                    dataKey="allocated"
                    fill="#2D8B5E"
                    name="Allocated"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="spent"
                    fill="#4ECBA0"
                    name="Spent"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      }
      return <></>;
    },
  });

  useCopilotAction({
    name: "compare_vendors",
    description: "Compare vendors side by side for a given category",
    parameters: [
      {
        name: "category",
        type: "string",
        description: "Product category to compare vendors for",
      },
    ],
    handler: async ({ category }: { category: string }) => {
      return vendors.map((v) => ({
        name: v.name,
        rating: v.rating,
        leadTime: v.avgLeadTime,
        onTimeRate: `${v.onTimeRate}%`,
        location: v.location,
        category,
      }));
    },
    render: ({ status, result }) => {
      if (status === "executing") {
        return (
          <div className="flex items-center gap-2 text-sm text-source-muted py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Comparing vendors...
          </div>
        );
      }
      if (status === "complete" && result) {
        const vendorData = result as Array<{
          name: string;
          rating: number;
          leadTime: string;
          onTimeRate: string;
          location: string;
        }>;
        return (
          <div className="py-2 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-source-border">
                  <th className="text-left py-2 px-2 text-source-muted font-semibold">
                    Metric
                  </th>
                  {vendorData.map((v) => (
                    <th
                      key={v.name}
                      className="text-left py-2 px-2 text-source-black font-semibold"
                    >
                      {v.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-source-border/50">
                  <td className="py-2 px-2 text-source-muted font-medium">
                    Rating
                  </td>
                  {vendorData.map((v) => (
                    <td key={v.name} className="py-2 px-2 text-source-black">
                      {v.rating}/5.0
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-source-border/50">
                  <td className="py-2 px-2 text-source-muted font-medium">
                    Lead Time
                  </td>
                  {vendorData.map((v) => (
                    <td key={v.name} className="py-2 px-2 text-source-black">
                      {v.leadTime}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-source-border/50">
                  <td className="py-2 px-2 text-source-muted font-medium">
                    On-Time Rate
                  </td>
                  {vendorData.map((v) => (
                    <td key={v.name} className="py-2 px-2 text-source-black">
                      {v.onTimeRate}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 px-2 text-source-muted font-medium">
                    Location
                  </td>
                  {vendorData.map((v) => (
                    <td key={v.name} className="py-2 px-2 text-source-black">
                      {v.location}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
      return <></>;
    },
  });

  const suggestions = [
    "What's our budget status?",
    "Compare vendors for seating",
    "Search for lobby furniture specs",
    "Which vendor has the best on-time rate?",
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-source-black">
        Procurement Assistant
      </h2>

      <div className="rounded-xl border border-source-border overflow-hidden bg-white">
        <CopilotChat
          className="h-[600px]"
          labels={{
            title: "Procurement Assistant",
            initial:
              "I'm your AI procurement assistant for the Ritz-Carlton Denver project. I can search procurement data, analyze the budget, or compare vendors. What would you like to know?",
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            className="rounded-full border border-source-border bg-white px-4 py-2 text-xs text-source-muted hover:border-source-green hover:text-source-green transition"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Tab 4: Bid Pipeline
// =============================================================================

interface AgUiEvent {
  id: number;
  timestamp: string;
  type: string;
  payload: string;
  color: string;
}

const eventTypes: { type: string; color: string; payload: string }[] = [
  {
    type: "RUN_STARTED",
    color: "#2D8B5E",
    payload: '{ "runId": "run_abc123" }',
  },
  {
    type: "TOOL_CALL_START",
    color: "#4F6EF7",
    payload: '{ "tool": "parse_spec", "args": {...} }',
  },
  {
    type: "STATE_DELTA",
    color: "#D97706",
    payload: '{ "status": "processing", "progress": 0.45 }',
  },
  {
    type: "TEXT_MESSAGE_CONTENT",
    color: "#6B7280",
    payload: '{ "delta": "Extracting line items..." }',
  },
  {
    type: "TOOL_CALL_END",
    color: "#4F6EF7",
    payload: '{ "result": "8 items extracted" }',
  },
  {
    type: "STATE_DELTA",
    color: "#D97706",
    payload: '{ "status": "complete", "progress": 1.0 }',
  },
  {
    type: "RUN_FINISHED",
    color: "#2D8B5E",
    payload: '{ "runId": "run_abc123", "success": true }',
  },
];

const stageIcons: Record<string, React.ComponentType<{ className?: string }>> =
  {
    FileInput,
    FileSearch,
    FileOutput,
    BarChart3,
    ShieldCheck,
    Truck,
  };

function PipelineTab() {
  const [stageStates, setStageStates] = useState<
    Record<number, "pending" | "processing" | "complete">
  >(() => {
    const initial: Record<number, "pending" | "processing" | "complete"> = {};
    pipelineStages.forEach((s) => {
      initial[s.id] = "pending";
    });
    return initial;
  });
  const [events, setEvents] = useState<AgUiEvent[]>([]);
  const [running, setRunning] = useState(false);
  const eventPanelRef = useRef<HTMLDivElement>(null);
  const eventIdRef = useRef(0);

  useEffect(() => {
    if (eventPanelRef.current) {
      eventPanelRef.current.scrollTop = eventPanelRef.current.scrollHeight;
    }
  }, [events]);

  const addEvents = useCallback((stageTitle: string) => {
    const now = new Date();
    const eventsToAdd = eventTypes.map((e, i) => ({
      id: ++eventIdRef.current,
      timestamp: new Date(now.getTime() + i * 300).toLocaleTimeString(),
      type: e.type,
      payload: e.payload.replace("parse_spec", stageTitle.toLowerCase().replace(/\s+/g, "_")),
      color: e.color,
    }));

    eventsToAdd.forEach((evt, i) => {
      setTimeout(() => {
        setEvents((prev) => [...prev, evt]);
      }, i * 300);
    });
  }, []);

  const runStage = useCallback(
    (stage: PipelineStage) => {
      setStageStates((prev) => ({ ...prev, [stage.id]: "processing" }));
      addEvents(stage.title);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setStageStates((prev) => ({ ...prev, [stage.id]: "complete" }));
          resolve();
        }, stage.duration);
      });
    },
    [addEvents]
  );

  const runFullPipeline = useCallback(async () => {
    setRunning(true);
    setEvents([]);
    const reset: Record<number, "pending" | "processing" | "complete"> = {};
    pipelineStages.forEach((s) => {
      reset[s.id] = "pending";
    });
    setStageStates(reset);

    for (const stage of pipelineStages) {
      await runStage(stage);
    }
    setRunning(false);
  }, [runStage]);

  useCopilotAction({
    name: "run_pipeline_stage",
    description: "Run a specific pipeline stage by ID",
    parameters: [
      { name: "stageId", type: "number", description: "Stage ID (1-6)" },
    ],
    handler: async ({ stageId }: { stageId: number }) => {
      const stage = pipelineStages.find((s) => s.id === stageId);
      if (stage) {
        await runStage(stage);
        return { stage: stage.title, status: "complete" };
      }
      return { error: "Stage not found" };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-source-black">
          Bid Pipeline
        </h2>
        <button
          onClick={runFullPipeline}
          disabled={running}
          className="flex items-center gap-2 rounded-lg bg-source-green px-6 py-3 text-white font-semibold hover:bg-source-green/90 transition disabled:opacity-60"
        >
          {running ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Running Pipeline...
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Run Full Pipeline
            </>
          )}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Pipeline stages — left 70% */}
        <div className="w-[70%] space-y-3">
          {pipelineStages.map((stage) => {
            const state = stageStates[stage.id];
            const Icon = stageIcons[stage.icon] || FileSearch;
            return (
              <motion.div
                key={stage.id}
                className={`rounded-xl border p-5 transition-colors ${
                  state === "processing"
                    ? "border-source-green bg-source-green/5"
                    : state === "complete"
                      ? "border-source-green/40 bg-white"
                      : "border-source-border bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Step indicator */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm flex-shrink-0 ${
                      state === "complete"
                        ? "bg-source-green"
                        : state === "processing"
                          ? "bg-source-green animate-pulse"
                          : "bg-gray-300"
                    }`}
                  >
                    {state === "complete" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      stage.id
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-source-muted" />
                      <h4 className="text-sm font-semibold text-source-black">
                        {stage.title}
                      </h4>
                    </div>
                    <p className="text-xs text-source-muted mt-0.5">
                      {stage.description}
                    </p>
                    <p className="text-xs text-source-ai mt-0.5 italic">
                      AI: {stage.aiAction}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Status */}
                    {state === "pending" && (
                      <span className="text-xs text-source-muted">
                        Pending
                      </span>
                    )}
                    {state === "processing" && (
                      <span className="flex items-center gap-1 text-xs text-source-green font-medium">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processing...
                      </span>
                    )}
                    {state === "complete" && (
                      <span className="flex items-center gap-1 text-xs text-source-green font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        Complete
                      </span>
                    )}

                    {/* Individual play button */}
                    <button
                      onClick={() => runStage(stage)}
                      disabled={running || state === "processing"}
                      className="p-1.5 rounded-lg hover:bg-source-gray transition disabled:opacity-30"
                      title={`Run ${stage.title}`}
                    >
                      <Play className="h-4 w-4 text-source-muted" />
                    </button>
                  </div>
                </div>

                {/* Connector line to next stage */}
                {stage.id < pipelineStages.length && (
                  <div className="ml-5 mt-2 mb-[-12px]">
                    <div
                      className={`w-0.5 h-4 mx-auto ${
                        state === "complete"
                          ? "bg-source-green"
                          : "bg-gray-200"
                      }`}
                    />
                    <ChevronRight
                      className={`h-3 w-3 mx-auto rotate-90 ${
                        state === "complete"
                          ? "text-source-green"
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* AG-UI Event Stream — right 30% */}
        <div className="w-[30%]">
          <div className="rounded-xl border border-source-border bg-source-black text-white sticky top-0">
            <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-source-green animate-pulse" />
              <span className="text-xs font-semibold">
                AG-UI Event Stream
              </span>
            </div>
            <div
              ref={eventPanelRef}
              className="p-3 overflow-auto max-h-[520px] space-y-1.5 font-mono text-[10px]"
            >
              {events.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Run pipeline to see events...
                </p>
              )}
              <AnimatePresence>
                {events.map((evt) => (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{evt.timestamp}</span>
                      <span
                        className="font-bold px-1.5 py-0.5 rounded text-[9px]"
                        style={{
                          backgroundColor: evt.color + "22",
                          color: evt.color,
                        }}
                      >
                        {evt.type}
                      </span>
                    </div>
                    <span className="text-gray-400 pl-2 truncate">
                      {evt.payload}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Tab 5: Agent Canvas
// =============================================================================

const agentIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  FileCheck,
  Scale,
  ShieldCheck,
  DollarSign,
};

// Updated agent fields after processing
const updatedAgentFields: Record<
  string,
  { label: string; value: string; confidence: number }[]
> = {
  "invoice-reviewer": [
    { label: "Vendor", value: "Bernhardt Hospitality", confidence: 0.98 },
    { label: "Amount", value: "$142,500.00", confidence: 0.99 },
    { label: "PO Number", value: "PO-2025-4521", confidence: 0.97 },
    { label: "Line Items", value: "12/12 matched", confidence: 0.96 },
  ],
  "bid-analyzer": [
    { label: "Bids Compared", value: "3 vendors", confidence: 0.98 },
    { label: "Best Value", value: "Bernhardt Hospitality", confidence: 0.94 },
    { label: "Price Spread", value: "$130K range", confidence: 0.97 },
    {
      label: "Recommendation",
      value: "Bernhardt — best compliance",
      confidence: 0.92,
    },
  ],
  "compliance-checker": [
    { label: "ADA Compliance", value: "PASS", confidence: 0.99 },
    { label: "Fire Rating", value: "Class A — PASS", confidence: 0.95 },
    { label: "LEED Credits", value: "4 credits eligible", confidence: 0.88 },
    {
      label: "Warranty Terms",
      value: "10yr struct / 5yr fabric",
      confidence: 0.97,
    },
  ],
  "budget-monitor": [
    { label: "Total Budget", value: "$2,400,000", confidence: 1.0 },
    { label: "Committed", value: "$1,962,500", confidence: 0.99 },
    { label: "Remaining", value: "$437,500", confidence: 0.99 },
    { label: "Risk Level", value: "Medium — 82% committed", confidence: 0.91 },
  ],
};

const agentLogs: Record<string, string[]> = {
  "invoice-reviewer": [
    "Scanning invoice PDF...",
    "OCR extraction complete — 99.2% confidence",
    "Matching line items to PO-2025-4521",
    "12/12 line items matched successfully",
    "Flagged: Unit price variance on item SE-003 (+2.1%)",
    "Invoice APPROVED — forwarding to Budget Monitor",
  ],
  "bid-analyzer": [
    "Loading 3 vendor bids for comparison...",
    "Normalizing pricing across vendors",
    "Global: $368K | Bernhardt: $453K | Knoll: $499K",
    "Compliance scoring: Bernhardt leads at 96%",
    "Best value analysis: Bernhardt (price + compliance)",
    "Recommendation generated — awaiting approval",
  ],
  "compliance-checker": [
    "Running ADA compliance checks...",
    "Reception desk: 34\" ADA section — PASS",
    "Fire rating: All fabrics CAL 117 compliant",
    "LEED analysis: 4 potential credits identified",
    "FSC certification verified for wood products",
    "Full compliance report generated",
  ],
  "budget-monitor": [
    "Recalculating committed spend...",
    "Adding Bernhardt PO: $142,500",
    "Total committed: $1,962,500 (82% of budget)",
    "Remaining contingency: $437,500",
    "Risk upgraded to MEDIUM — approaching 85% threshold",
    "Budget alert sent to project manager",
  ],
};

function AgentCanvasTab() {
  const [agents, setAgents] = useState<AgentCard[]>(
    () => JSON.parse(JSON.stringify(initialAgentCards)) as AgentCard[]
  );
  const [processing, setProcessing] = useState(false);
  const [canvasEvents, setCanvasEvents] = useState<AgUiEvent[]>([]);
  const [showEventPanel, setShowEventPanel] = useState(true);
  const canvasEventRef = useRef<HTMLDivElement>(null);
  const canvasEventIdRef = useRef(0);

  useEffect(() => {
    if (canvasEventRef.current) {
      canvasEventRef.current.scrollTop = canvasEventRef.current.scrollHeight;
    }
  }, [canvasEvents]);

  const processAgents = useCallback(async () => {
    setProcessing(true);
    setCanvasEvents([]);
    // Reset agents
    setAgents(
      JSON.parse(JSON.stringify(initialAgentCards)) as AgentCard[]
    );

    const agentOrder = [
      "invoice-reviewer",
      "bid-analyzer",
      "compliance-checker",
      "budget-monitor",
    ];

    for (let ai = 0; ai < agentOrder.length; ai++) {
      const agentId = agentOrder[ai];
      const logs = agentLogs[agentId];
      const fields = updatedAgentFields[agentId];

      // Set active
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId ? { ...a, status: "active", logs: [] } : a
        )
      );

      // Add AG-UI event
      const now = new Date();
      setCanvasEvents((prev) => [
        ...prev,
        {
          id: ++canvasEventIdRef.current,
          timestamp: now.toLocaleTimeString(),
          type: "AGENT_STARTED",
          color: "#2D8B5E",
          payload: `{ "agent": "${agentId}" }`,
        },
      ]);

      // Stream logs one by one
      for (let li = 0; li < logs.length; li++) {
        await new Promise((r) => setTimeout(r, 400));
        const logEntry = logs[li];
        setAgents((prev) =>
          prev.map((a) =>
            a.id === agentId ? { ...a, logs: [...a.logs, logEntry] } : a
          )
        );

        // Emit some events
        if (li === 0 || li === 2 || li === logs.length - 1) {
          setCanvasEvents((prev) => [
            ...prev,
            {
              id: ++canvasEventIdRef.current,
              timestamp: new Date().toLocaleTimeString(),
              type:
                li === 0
                  ? "TOOL_CALL_START"
                  : li === logs.length - 1
                    ? "TOOL_CALL_END"
                    : "STATE_DELTA",
              color:
                li === 0
                  ? "#4F6EF7"
                  : li === logs.length - 1
                    ? "#4F6EF7"
                    : "#D97706",
              payload: `{ "agent": "${agentId}", "log": "${logEntry.substring(0, 40)}..." }`,
            },
          ]);
        }
      }

      // Update fields and mark complete
      await new Promise((r) => setTimeout(r, 300));
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId
            ? { ...a, status: "complete", fields: fields }
            : a
        )
      );

      setCanvasEvents((prev) => [
        ...prev,
        {
          id: ++canvasEventIdRef.current,
          timestamp: new Date().toLocaleTimeString(),
          type: "AGENT_COMPLETED",
          color: "#2D8B5E",
          payload: `{ "agent": "${agentId}", "success": true }`,
        },
      ]);

      // Slight pause between agents
      if (ai < agentOrder.length - 1) {
        await new Promise((r) => setTimeout(r, 600));
      }
    }

    setProcessing(false);
  }, []);

  useCopilotAction({
    name: "process_agent_canvas",
    description: "Start the multi-agent processing canvas",
    handler: async () => {
      await processAgents();
      return { status: "all agents completed" };
    },
  });

  // Grid positions for 2x2
  const positions = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  // SVG connections
  const connections = [
    { from: 0, to: 3, label: "Invoice -> Budget" },
    { from: 1, to: 2, label: "Bid -> Compliance" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-source-black">
          Agent Canvas
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowEventPanel(!showEventPanel)}
            className="text-xs text-source-muted hover:text-source-black transition"
          >
            {showEventPanel ? "Hide" : "Show"} Events
          </button>
          <button
            onClick={processAgents}
            disabled={processing}
            className="flex items-center gap-2 rounded-lg bg-source-green px-6 py-3 text-white font-semibold hover:bg-source-green/90 transition disabled:opacity-60"
          >
            {processing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Start Processing
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Canvas area */}
        <div
          className={`${showEventPanel ? "w-[70%]" : "w-full"} transition-all`}
        >
          <div
            className="relative rounded-xl p-6 min-h-[600px]"
            style={{
              backgroundColor: "#1A1A1A",
              backgroundImage:
                "radial-gradient(circle, #333 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            {/* SVG connection lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              {connections.map((conn, ci) => {
                // Approximate positions based on 2x2 grid within the container
                const fromX = positions[conn.from].x * 50 + 25;
                const fromY = positions[conn.from].y * 50 + 25;
                const toX = positions[conn.to].x * 50 + 25;
                const toY = positions[conn.to].y * 50 + 25;
                return (
                  <line
                    key={ci}
                    x1={`${fromX}%`}
                    y1={`${fromY}%`}
                    x2={`${toX}%`}
                    y2={`${toY}%`}
                    stroke="#4ECBA0"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-20"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}
              {/* Lines from each agent to center (orchestrator concept) */}
              {positions.map((pos, i) => {
                const cx = pos.x * 50 + 25;
                const cy = pos.y * 50 + 25;
                return (
                  <line
                    key={`center-${i}`}
                    x1={`${cx}%`}
                    y1={`${cy}%`}
                    x2="50%"
                    y2="50%"
                    stroke="#6B7280"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    opacity="0.25"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-20"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}
            </svg>

            {/* Center orchestrator dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-8 h-8 rounded-full bg-source-green/20 border border-source-green/40 flex items-center justify-center">
                <Bot className="h-4 w-4 text-source-green" />
              </div>
            </div>

            {/* Agent cards in 2x2 grid */}
            <div className="relative z-10 grid grid-cols-2 gap-6">
              {agents.map((agent, idx) => {
                const Icon = agentIconMap[agent.icon] || Bot;
                const statusColor =
                  agent.status === "active"
                    ? "bg-source-green"
                    : agent.status === "complete"
                      ? "bg-source-green"
                      : agent.status === "waiting"
                        ? "bg-amber-400"
                        : "bg-gray-400";
                const borderColor =
                  agent.status === "active"
                    ? "border-source-green"
                    : agent.status === "complete"
                      ? "border-source-green/50"
                      : "border-gray-600";

                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-72 mx-auto rounded-xl bg-white border-2 ${borderColor} overflow-hidden transition-colors`}
                  >
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                      <Icon className="h-5 w-5 text-source-black" />
                      <h4 className="text-sm font-semibold text-source-black flex-1">
                        {agent.name}
                      </h4>
                      <div className="relative">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${statusColor}`}
                        />
                        {agent.status === "active" && (
                          <div
                            className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${statusColor} animate-ping`}
                          />
                        )}
                      </div>
                    </div>

                    {/* Fields */}
                    <div className="px-4 py-2 space-y-1.5">
                      {agent.fields.map((f, fi) => (
                        <div
                          key={fi}
                          className="flex items-center justify-between text-[11px]"
                        >
                          <span className="text-source-muted">{f.label}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-source-black font-medium truncate max-w-[120px]">
                              {f.value}
                            </span>
                            {f.confidence > 0 && (
                              <span
                                className={`text-[9px] font-bold px-1 rounded ${
                                  f.confidence >= 0.9
                                    ? "text-source-green bg-source-green/10"
                                    : f.confidence >= 0.7
                                      ? "text-amber-600 bg-amber-50"
                                      : "text-gray-400 bg-gray-100"
                                }`}
                              >
                                {Math.round(f.confidence * 100)}%
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Logs */}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <div className="text-[10px] text-source-muted font-semibold mb-1">
                        Activity Log
                      </div>
                      <div className="h-20 overflow-auto space-y-0.5">
                        {agent.logs.length === 0 ? (
                          <p className="text-[10px] text-gray-300 italic">
                            Awaiting activation...
                          </p>
                        ) : (
                          agent.logs.map((log, li) => (
                            <motion.p
                              key={li}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[10px] text-source-muted leading-tight"
                            >
                              <span className="text-source-green mr-1">
                                &gt;
                              </span>
                              {log}
                            </motion.p>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Progress bar when processing */}
                    {agent.status === "active" && (
                      <div className="h-1 bg-gray-100">
                        <motion.div
                          className="h-full bg-source-green"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: 2.5,
                            ease: "linear",
                          }}
                        />
                      </div>
                    )}
                    {agent.status === "complete" && (
                      <div className="h-1 bg-source-green" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AG-UI Event sidebar */}
        {showEventPanel && (
          <div className="w-[30%]">
            <div className="rounded-xl border border-source-border bg-source-black text-white sticky top-0">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-source-green animate-pulse" />
                <span className="text-xs font-semibold">
                  AG-UI Protocol Events
                </span>
              </div>
              <div
                ref={canvasEventRef}
                className="p-3 overflow-auto max-h-[540px] space-y-1.5 font-mono text-[10px]"
              >
                {canvasEvents.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    Start processing to see agent events...
                  </p>
                )}
                <AnimatePresence>
                  {canvasEvents.map((evt) => (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{evt.timestamp}</span>
                        <span
                          className="font-bold px-1.5 py-0.5 rounded text-[9px]"
                          style={{
                            backgroundColor: evt.color + "22",
                            color: evt.color,
                          }}
                        >
                          {evt.type}
                        </span>
                      </div>
                      <span className="text-gray-400 pl-2 truncate">
                        {evt.payload}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Main Page Component
// =============================================================================

export default function DemosPage() {
  const [activeTab, setActiveTab] = useState<TabId>("spec");

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-source-black">
          Interactive Demos
        </h1>
        <p className="text-source-muted mt-1">
          Live AI capabilities for construction procurement
        </p>
      </motion.div>

      {/* Tab bar */}
      <div className="flex border-b border-source-border mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "border-b-2 border-source-green text-source-green font-semibold"
                  : "text-source-muted hover:text-source-black"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "spec" && <SpecTab />}
            {activeTab === "vendor" && <VendorTab />}
            {activeTab === "chat" && <ChatTab />}
            {activeTab === "pipeline" && <PipelineTab />}
            {activeTab === "canvas" && <AgentCanvasTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
