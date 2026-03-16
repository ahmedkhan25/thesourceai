"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface InsightCardProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  expandedContent?: string;
  delay?: number;
}

export default function InsightCard({
  title,
  content,
  icon,
  expandedContent,
  delay = 0,
}: InsightCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="animate-fade-slide-in cursor-pointer rounded-xl border border-source-border bg-white p-6 transition-shadow hover:shadow-md"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => expandedContent && setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="mt-0.5 flex-shrink-0 text-source-green">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-source-black">{title}</h3>
            <p className="mt-1 text-sm text-source-muted">{content}</p>
          </div>
        </div>

        {expandedContent && (
          <ChevronDown
            size={18}
            className={`flex-shrink-0 text-source-muted transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {expanded && expandedContent && (
        <div className="mt-4 border-t border-source-border pt-4 text-sm text-source-muted">
          {expandedContent}
        </div>
      )}
    </div>
  );
}
