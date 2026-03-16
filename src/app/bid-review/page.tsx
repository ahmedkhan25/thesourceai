"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
  vendorBids,
  ritzCarltonProject,
  vendors,
  budgetBreakdown,
} from "@/lib/data";
import type { VendorBid, BidItem } from "@/lib/data";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Award,
  TrendingDown,
  ShieldAlert,
  Star,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
  }),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function complianceColor(score: number): string {
  if (score >= 0.9) return "text-emerald-600";
  if (score >= 0.8) return "text-amber-500";
  return "text-red-500";
}

function complianceBg(score: number): string {
  if (score >= 0.9) return "bg-emerald-500";
  if (score >= 0.8) return "bg-amber-400";
  return "bg-red-500";
}

function complianceBgLight(score: number): string {
  if (score >= 0.9) return "bg-emerald-100";
  if (score >= 0.8) return "bg-amber-100";
  return "bg-red-100";
}

/** Compute per-item average price across all 3 vendor bids */
function getAveragePrices(): Record<string, number> {
  const totals: Record<string, { sum: number; count: number }> = {};
  for (const bid of vendorBids) {
    for (const item of bid.items) {
      if (!totals[item.name]) totals[item.name] = { sum: 0, count: 0 };
      totals[item.name].sum += item.unitPrice;
      totals[item.name].count += 1;
    }
  }
  const averages: Record<string, number> = {};
  for (const [name, { sum, count }] of Object.entries(totals)) {
    averages[name] = sum / count;
  }
  return averages;
}

/** Find the cheapest unit price per item name across all bids */
function getCheapestPerItem(): Record<string, number> {
  const mins: Record<string, number> = {};
  for (const bid of vendorBids) {
    for (const item of bid.items) {
      if (mins[item.name] === undefined || item.unitPrice < mins[item.name]) {
        mins[item.name] = item.unitPrice;
      }
    }
  }
  return mins;
}

function parseLeadTimeWeeks(lt: string): number {
  const match = lt.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ComplianceBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 flex-1 rounded-full ${complianceBgLight(score)}`}>
        <div
          className={`h-2 rounded-full ${complianceBg(score)}`}
          style={{ width: `${Math.round(score * 100)}%` }}
        />
      </div>
      <span className={`text-xs font-semibold ${complianceColor(score)}`}>
        {Math.round(score * 100)}%
      </span>
    </div>
  );
}

interface ItemBadge {
  type: "outlier" | "best-value" | "risk";
  label: string;
}

function ItemBadgeChip({ badge }: { badge: ItemBadge }) {
  if (badge.type === "outlier") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-300">
        <AlertTriangle size={10} />
        {badge.label}
      </span>
    );
  }
  if (badge.type === "best-value") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-300">
        <TrendingDown size={10} />
        {badge.label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600 ring-1 ring-red-300">
      <ShieldAlert size={10} />
      {badge.label}
    </span>
  );
}

function VendorRibbon({
  type,
}: {
  type: "lowest-price" | "best-compliance";
}) {
  if (type === "lowest-price") {
    return (
      <div className="absolute -right-1 top-4 rounded-l-full bg-source-ai px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
        Lowest Price
      </div>
    );
  }
  return (
    <div className="absolute -right-1 top-4 rounded-l-full bg-source-green px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
      Best Compliance
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function BidReviewPage() {
  // State for AI-driven highlighting
  const [flaggedItems, setFlaggedItems] = useState<
    { vendorId: string; itemName: string; reason: string; severity: string }[]
  >([]);

  // Precompute analytics
  const averagePrices = useMemo(() => getAveragePrices(), []);
  const cheapestPerItem = useMemo(() => getCheapestPerItem(), []);

  const cheapestVendorId = useMemo(() => {
    let min = Infinity;
    let id = "";
    for (const bid of vendorBids) {
      if (bid.totalPrice < min) {
        min = bid.totalPrice;
        id = bid.vendorId;
      }
    }
    return id;
  }, []);

  const bestComplianceVendorId = useMemo(() => {
    let max = -1;
    let id = "";
    for (const bid of vendorBids) {
      if (bid.overallCompliance > max) {
        max = bid.overallCompliance;
        id = bid.vendorId;
      }
    }
    return id;
  }, []);

  // -----------------------------------------------------------------------
  // CopilotKit Readables
  // -----------------------------------------------------------------------

  useCopilotReadable({
    description: "All 3 vendor bids for Ritz-Carlton Denver lobby case goods",
    value: vendorBids,
  });

  useCopilotReadable({
    description: "Ritz-Carlton Denver project details",
    value: ritzCarltonProject,
  });

  useCopilotReadable({
    description: "Vendor directory with ratings and certifications",
    value: vendors,
  });

  useCopilotReadable({
    description: "Budget breakdown by category",
    value: budgetBreakdown,
  });

  // -----------------------------------------------------------------------
  // CopilotKit Actions
  // -----------------------------------------------------------------------

  useCopilotAction({
    name: "analyze_bids",
    description:
      "Compare the 3 vendor bids side by side — total prices, per-category breakdown, compliance scores, and delivery timelines.",
    parameters: [],
    handler: async () => {
      const comparison = vendorBids.map((bid) => ({
        vendor: bid.vendorName,
        totalPrice: bid.totalPrice,
        compliance: bid.overallCompliance,
        deliveryDate: bid.deliveryDate,
        itemBreakdown: bid.items.map((item) => ({
          name: item.name,
          unitPrice: item.unitPrice,
          lineTotal: item.lineTotal,
        })),
      }));
      return comparison;
    },
    render: ({ status }) => {
      if (status === "inProgress") {
        return (
          <div className="flex items-center gap-2 rounded-lg bg-source-green/10 px-4 py-3 text-sm text-source-green">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-source-green border-t-transparent" />
            Analyzing bids...
          </div>
        );
      }

      // Build chart data
      const totalData = vendorBids.map((b) => ({
        name: b.vendorName.split(" ")[0],
        total: b.totalPrice,
      }));

      const itemNames = vendorBids[0].items.map((i) => i.name);
      const categoryData = itemNames.map((itemName) => {
        const row: Record<string, string | number> = { name: itemName };
        vendorBids.forEach((bid) => {
          const found = bid.items.find((i) => i.name === itemName);
          row[bid.vendorName.split(" ")[0]] = found ? found.lineTotal : 0;
        });
        return row;
      });

      return (
        <div className="space-y-4 rounded-xl border border-source-border bg-white p-4">
          <h4 className="text-sm font-semibold text-source-black">
            Total Price Comparison
          </h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={totalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) =>
                  `$${(v / 1000).toFixed(0)}k`
                }
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v: number) => [formatCurrency(v), "Total"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E5E5",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="total" fill="#2D8B5E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <h4 className="text-sm font-semibold text-source-black">
            Per-Category Breakdown
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-25}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tickFormatter={(v: number) =>
                  `$${(v / 1000).toFixed(0)}k`
                }
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v: number) => [formatCurrency(v), ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E5E5",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="Global"
                fill="#2D8B5E"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="Bernhardt"
                fill="#4F6EF7"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="Knoll"
                fill="#D97706"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-4 text-[10px] text-source-muted">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#2D8B5E]" />
              Global
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#4F6EF7]" />
              Bernhardt
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#D97706]" />
              Knoll
            </span>
          </div>
        </div>
      );
    },
  });

  useCopilotAction({
    name: "flag_risk",
    description:
      "Identify risk items across vendor bids — low compliance, price outliers, and long lead times. Optionally filter by a specific vendor.",
    parameters: [
      {
        name: "vendorId",
        type: "string",
        description:
          "Optional vendor ID to filter (e.g. v-global, v-bernhardt, v-knoll). Leave empty for all vendors.",
        required: false,
      },
    ],
    handler: async ({ vendorId }: { vendorId?: string }) => {
      const risks: {
        vendorId: string;
        vendorName: string;
        itemName: string;
        reason: string;
        severity: string;
      }[] = [];

      const bidsToCheck = vendorId
        ? vendorBids.filter((b) => b.vendorId === vendorId)
        : vendorBids;

      for (const bid of bidsToCheck) {
        for (const item of bid.items) {
          // Low compliance
          if (item.complianceScore < 0.88) {
            risks.push({
              vendorId: bid.vendorId,
              vendorName: bid.vendorName,
              itemName: item.name,
              reason: `Low compliance score (${Math.round(item.complianceScore * 100)}%)`,
              severity: item.complianceScore < 0.85 ? "high" : "medium",
            });
          }
          // Price outlier (>20% above average)
          const avg = averagePrices[item.name];
          if (avg && item.unitPrice > avg * 1.2) {
            risks.push({
              vendorId: bid.vendorId,
              vendorName: bid.vendorName,
              itemName: item.name,
              reason: `Price outlier — ${formatCurrency(item.unitPrice)} vs avg ${formatCurrency(avg)}`,
              severity: "medium",
            });
          }
          // Long lead time (>10 weeks)
          const weeks = parseLeadTimeWeeks(item.leadTime);
          if (weeks > 10) {
            risks.push({
              vendorId: bid.vendorId,
              vendorName: bid.vendorName,
              itemName: item.name,
              reason: `Long lead time (${item.leadTime})`,
              severity: weeks > 14 ? "high" : "medium",
            });
          }
        }
      }

      // Update page state
      setFlaggedItems(
        risks.map((r) => ({
          vendorId: r.vendorId,
          itemName: r.itemName,
          reason: r.reason,
          severity: r.severity,
        }))
      );

      return risks;
    },
    render: ({ status, result }) => {
      if (status === "inProgress") {
        return (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
            Scanning for risks...
          </div>
        );
      }

      const risks = result as {
        vendorId: string;
        vendorName: string;
        itemName: string;
        reason: string;
        severity: string;
      }[];

      if (!risks || risks.length === 0) {
        return (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            No significant risks detected.
          </div>
        );
      }

      return (
        <div className="space-y-2 rounded-xl border border-red-200 bg-white p-4">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-red-600">
            <ShieldAlert size={14} />
            {risks.length} Risk{risks.length !== 1 ? "s" : ""} Flagged
          </h4>
          <div className="space-y-1.5">
            {risks.map((risk, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg bg-red-50/60 px-3 py-2 text-xs"
              >
                <span
                  className={`mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full ${
                    risk.severity === "high" ? "bg-red-500" : "bg-amber-400"
                  }`}
                />
                <div>
                  <span className="font-semibold text-source-black">
                    {risk.itemName}
                  </span>
                  <span className="text-source-muted"> ({risk.vendorName})</span>
                  <p className="text-source-muted">{risk.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },
  });

  useCopilotAction({
    name: "recommend_vendor",
    description:
      "Provide a structured recommendation for which vendor to select, including weighted scoring on price, compliance, lead time, and warranty.",
    parameters: [],
    handler: async () => {
      // Scoring weights
      const W_PRICE = 0.3;
      const W_COMPLIANCE = 0.35;
      const W_LEADTIME = 0.2;
      const W_WARRANTY = 0.15;

      const scores = vendorBids.map((bid) => {
        // Normalize price (lower = better, scale relative to cheapest)
        const cheapest = Math.min(...vendorBids.map((b) => b.totalPrice));
        const priceScore = cheapest / bid.totalPrice;

        // Compliance is already 0-1
        const complianceScore = bid.overallCompliance;

        // Lead time — earliest delivery date = best
        const dates = vendorBids.map((b) =>
          new Date(b.deliveryDate).getTime()
        );
        const earliest = Math.min(...dates);
        const latest = Math.max(...dates);
        const bidDate = new Date(bid.deliveryDate).getTime();
        const leadTimeScore =
          latest === earliest
            ? 1
            : 1 - (bidDate - earliest) / (latest - earliest);

        // Warranty — rough scoring based on structural warranty years
        const warrantyYears = parseInt(
          bid.warranty.match(/(\d+)-year structural/)?.[1] || "0",
          10
        );
        const maxWarranty = Math.max(
          ...vendorBids.map((b) =>
            parseInt(
              b.warranty.match(/(\d+)-year structural/)?.[1] || "0",
              10
            )
          )
        );
        const warrantyScore = maxWarranty > 0 ? warrantyYears / maxWarranty : 0;

        const total =
          priceScore * W_PRICE +
          complianceScore * W_COMPLIANCE +
          leadTimeScore * W_LEADTIME +
          warrantyScore * W_WARRANTY;

        return {
          vendorId: bid.vendorId,
          vendorName: bid.vendorName,
          totalPrice: bid.totalPrice,
          priceScore: Math.round(priceScore * 100),
          complianceScore: Math.round(complianceScore * 100),
          leadTimeScore: Math.round(leadTimeScore * 100),
          warrantyScore: Math.round(warrantyScore * 100),
          overallScore: Math.round(total * 100),
        };
      });

      scores.sort((a, b) => b.overallScore - a.overallScore);

      return {
        recommended: scores[0],
        alternative: scores[1],
        allScores: scores,
      };
    },
    render: ({ status, result }) => {
      if (status === "inProgress") {
        return (
          <div className="flex items-center gap-2 rounded-lg bg-source-green/10 px-4 py-3 text-sm text-source-green">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-source-green border-t-transparent" />
            Computing recommendation...
          </div>
        );
      }

      const data = result as {
        recommended: {
          vendorName: string;
          totalPrice: number;
          priceScore: number;
          complianceScore: number;
          leadTimeScore: number;
          warrantyScore: number;
          overallScore: number;
        };
        alternative: {
          vendorName: string;
          totalPrice: number;
          overallScore: number;
        };
      };

      if (!data?.recommended) return <div className="text-xs text-source-muted">No recommendation available.</div>;

      const rec = data.recommended;
      const alt = data.alternative;

      return (
        <div className="space-y-3 rounded-xl border border-source-green/30 bg-white p-4">
          {/* Recommended */}
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-source-green" />
            <h4 className="text-sm font-bold text-source-green">
              Recommended: {rec.vendorName}
            </h4>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Price", score: rec.priceScore },
              { label: "Compliance", score: rec.complianceScore },
              { label: "Lead Time", score: rec.leadTimeScore },
              { label: "Warranty", score: rec.warrantyScore },
            ].map(({ label, score }) => (
              <div key={label} className="rounded-lg bg-gray-50 px-3 py-2">
                <div className="text-[10px] text-source-muted">{label}</div>
                <div className="text-sm font-bold text-source-black">
                  {score}%
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-source-green/5 px-3 py-2 text-xs text-source-black">
            <span className="font-semibold">Overall Score: {rec.overallScore}%</span>
            {" | "}
            Total: {formatCurrency(rec.totalPrice)}
          </div>

          <p className="text-xs text-source-muted">
            {rec.vendorName} offers the best balance of spec compliance,
            warranty terms, and value. Their track record on Marriott luxury
            projects and strong compliance scores across all line items make
            them the safest choice for a flagship property.
          </p>

          {/* Alternative */}
          {alt && (
            <div className="border-t border-source-border pt-3">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-source-black">
                  Alternative: {alt.vendorName}
                </span>
                <span className="text-xs text-source-muted">
                  (Score: {alt.overallScore}% | {formatCurrency(alt.totalPrice)})
                </span>
              </div>
              <p className="mt-1 text-xs text-source-muted">
                Consider if budget constraints require a lower total price or
                a faster delivery timeline is the top priority.
              </p>
            </div>
          )}
        </div>
      );
    },
  });

  // -----------------------------------------------------------------------
  // Determine item-level badges
  // -----------------------------------------------------------------------

  function getBadgesForItem(
    bid: VendorBid,
    item: BidItem
  ): ItemBadge[] {
    const badges: ItemBadge[] = [];

    // Price outlier: >20% above average
    const avg = averagePrices[item.name];
    if (avg && item.unitPrice > avg * 1.2) {
      badges.push({ type: "outlier", label: "Price Outlier" });
    }

    // Best value: cheapest for this item
    if (item.unitPrice === cheapestPerItem[item.name]) {
      badges.push({ type: "best-value", label: "Best Value" });
    }

    // Low compliance risk
    if (item.complianceScore < 0.88) {
      badges.push({ type: "risk", label: "Risk" });
    }

    // Check AI-flagged items
    const isFlagged = flaggedItems.some(
      (f) => f.vendorId === bid.vendorId && f.itemName === item.name
    );
    if (isFlagged && !badges.some((b) => b.type === "risk")) {
      badges.push({ type: "risk", label: "Flagged" });
    }

    return badges;
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div className="flex h-[calc(100vh-0px)] min-h-screen">
      {/* ================================================================= */}
      {/* LEFT PANEL — Bid Cards (60%)                                      */}
      {/* ================================================================= */}
      <div className="w-[60%] overflow-y-auto border-r border-source-border bg-[#F7F7F7] p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-source-black">
              Ritz-Carlton Denver — Lobby Case Goods
            </h1>
            <span className="rounded-full bg-source-green/10 px-3 py-1 text-xs font-semibold text-source-green">
              3 Vendor Bids
            </span>
          </div>
          <p className="mt-1 text-sm text-source-muted">
            Compare bids across seating, tables, and bar furniture for the
            lobby and public spaces package.
          </p>
        </motion.div>

        {/* Vendor bid cards */}
        <div className="space-y-6">
          {vendorBids.map((bid, idx) => {
            const isCheapest = bid.vendorId === cheapestVendorId;
            const isBestCompliance = bid.vendorId === bestComplianceVendorId;

            // Determine if any item in this card is flagged for amber glow
            const hasOutlier = bid.items.some((item) => {
              const avg = averagePrices[item.name];
              return avg && item.unitPrice > avg * 1.2;
            });

            return (
              <motion.div
                key={bid.vendorId}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="relative overflow-hidden rounded-xl border border-source-border bg-white p-6 shadow-sm"
              >
                {/* Ribbons */}
                {isCheapest && <VendorRibbon type="lowest-price" />}
                {isBestCompliance && !isCheapest && (
                  <VendorRibbon type="best-compliance" />
                )}
                {isBestCompliance && isCheapest && (
                  <VendorRibbon type="best-compliance" />
                )}

                {/* Card header */}
                <div className="mb-4 flex items-start justify-between pr-24">
                  <div>
                    <h2 className="text-lg font-bold text-source-black">
                      {bid.vendorName}
                    </h2>
                    <div className="mt-1 flex items-center gap-4 text-sm text-source-muted">
                      <span className="font-semibold text-source-black">
                        {formatCurrency(bid.totalPrice)}
                      </span>
                      <span>Delivery: {bid.deliveryDate}</span>
                    </div>
                  </div>
                </div>

                {/* Overall compliance bar */}
                <div className="mb-4">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-medium text-source-muted">
                      Overall Compliance
                    </span>
                    <span
                      className={`text-xs font-bold ${complianceColor(bid.overallCompliance)}`}
                    >
                      {Math.round(bid.overallCompliance * 100)}%
                    </span>
                  </div>
                  <div
                    className={`h-2.5 w-full rounded-full ${complianceBgLight(bid.overallCompliance)}`}
                  >
                    <div
                      className={`h-2.5 rounded-full transition-all ${complianceBg(bid.overallCompliance)}`}
                      style={{
                        width: `${Math.round(bid.overallCompliance * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Item breakdown table */}
                <div className="overflow-hidden rounded-lg border border-source-border">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-source-border bg-gray-50">
                        <th className="px-3 py-2 font-semibold text-source-black">
                          Item
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-source-black">
                          Unit Price
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-source-black">
                          Qty
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-source-black">
                          Line Total
                        </th>
                        <th className="px-3 py-2 text-center font-semibold text-source-black">
                          Lead Time
                        </th>
                        <th className="px-3 py-2 text-center font-semibold text-source-black">
                          Compliance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bid.items.map((item) => {
                        const badges = getBadgesForItem(bid, item);
                        const isOutlier = badges.some(
                          (b) => b.type === "outlier"
                        );
                        const isFlaggedItem = flaggedItems.some(
                          (f) =>
                            f.vendorId === bid.vendorId &&
                            f.itemName === item.name
                        );

                        return (
                          <tr
                            key={item.name}
                            className={`border-b border-source-border last:border-b-0 transition-colors ${
                              isOutlier
                                ? "bg-amber-50/50 ring-1 ring-inset ring-amber-200"
                                : isFlaggedItem
                                  ? "bg-red-50/30"
                                  : ""
                            }`}
                          >
                            <td className="px-3 py-2">
                              <div className="flex flex-wrap items-center gap-1">
                                <span className="font-medium text-source-black">
                                  {item.name}
                                </span>
                                {badges.map((badge, i) => (
                                  <ItemBadgeChip key={i} badge={badge} />
                                ))}
                              </div>
                            </td>
                            <td className="px-3 py-2 text-right text-source-black">
                              {formatCurrency(item.unitPrice)}
                            </td>
                            <td className="px-3 py-2 text-right text-source-muted">
                              {item.quantity}
                            </td>
                            <td className="px-3 py-2 text-right font-medium text-source-black">
                              {formatCurrency(item.lineTotal)}
                            </td>
                            <td className="px-3 py-2 text-center text-source-muted">
                              {item.leadTime}
                            </td>
                            <td className="px-3 py-2">
                              <ComplianceBar score={item.complianceScore} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Warranty and notes */}
                <div className="mt-4 space-y-1 text-xs text-source-muted">
                  <p>
                    <span className="font-semibold text-source-black">
                      Warranty:
                    </span>{" "}
                    {bid.warranty}
                  </p>
                  <p>
                    <span className="font-semibold text-source-black">
                      Notes:
                    </span>{" "}
                    {bid.notes}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================================================================= */}
      {/* RIGHT PANEL — CopilotChat (40%)                                   */}
      {/* ================================================================= */}
      <div className="flex w-[40%] flex-col bg-white">
        <CopilotChat
          className="flex-1"
          labels={{
            title: "Bid Review Assistant",
            initial:
              "I can analyze these 3 vendor bids for the Ritz-Carlton Denver lobby case goods. Ask me to compare prices, flag risks, or recommend a vendor.",
          }}
          instructions="You are a procurement AI assistant for The Source, an FF&E procurement company. You help compare vendor bids, flag risks, and recommend vendors for the Ritz-Carlton Denver lobby case goods package. You have access to 3 vendor bids (Global Furniture Group, Bernhardt Hospitality, Knoll), project details, vendor directory, and budget data. Be concise, data-driven, and use the provided actions to generate visual analysis. Always reference specific numbers and compliance scores."
          suggestions={[
            {
              title: "Which vendor has the best overall value?",
              message: "Which vendor has the best overall value?",
            },
            {
              title: "Flag any compliance risks",
              message: "Flag any compliance risks across all three vendor bids",
            },
            {
              title: "Price difference if we switch vendors for seating?",
              message:
                "What's the price difference if we switch to vendor B for seating?",
            },
            {
              title: "Recommend a vendor",
              message:
                "Recommend a vendor for this project based on price, compliance, lead time, and warranty",
            },
          ]}
        />
      </div>
    </div>
  );
}
