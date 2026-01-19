"use client";

import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsHeaderProps {
  subtitle?: string;
  title: string;
  status: "Active" | "Completed";
  responses: number;
  confidence: "High" | "Medium" | "Low";
}

export function AnalyticsHeader({
  subtitle = "Deeper analytic insights to",
  title,
  status,
  responses,
  confidence,
}: AnalyticsHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6 mt-5">
      {/* Left side - Text content */}
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground mb-1">{subtitle}</p>
        <h1 className="text-3xl text-foreground">{title}</h1>
      </div>

      {/* Right side - Metrics */}
      <div className="flex items-center gap-4">
        {/* Status Badge */}
        <Badge
          variant="outline"
          className={cn(
            "px-3 py-1 rounded-md text-sm font-medium border",
            status === "Active"
              ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-50"
              : "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50",
          )}
        >
          {status}
        </Badge>

        {/* Responses */}
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground font-medium">
            {responses.toLocaleString()}
          </span>
        </div>

        {/* Confidence */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              confidence === "High"
                ? "bg-green-500"
                : confidence === "Medium"
                  ? "bg-orange-500"
                  : "bg-red-500",
            )}
          />
          <span className="text-sm font-medium text-green-600">
            Confidence: {confidence}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsHeader;
