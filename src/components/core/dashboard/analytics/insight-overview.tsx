"use client";

import { Card, CardContent } from "@/components/ui/card";

interface InsightOverviewProps {
  methodology?: string[];
  keyInsights?: string[];
}

const defaultMethodology = [
  "Data collected via Instagram polls",
  "Responses filtered for duplicates",
  "Sample size meets confidence threshold",
  "Quality verification: 94% of responses include complete demographic data",
  "Margin of error: ±2.1% at 95% confidence level",
];

const defaultKeyInsights = [
  "Strong purchase intent among 18-24 age group",
  "Higher engagement when polls were posted after 6pm",
  "Influencer @ella.style delivered the highest response quality",
  "Price sensitivity is the primary barrier to purchase",
];

export function InsightOverview({
  methodology = defaultMethodology,
  keyInsights = defaultKeyInsights,
}: InsightOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Methodology & Data Quality Card */}
      <Card className="bg-white rounded-lg border border-[#E2E8F0] shadow-none py-3">
        <CardContent className="p-4 text-black">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-4 rounded-full bg-black border-2 border-[#ACC8FF]" />
            <h3 className="text-base font-semibold text-foreground">
              Methodology & Data Quality
            </h3>
          </div>
          <ul className="space-y-3">
            {methodology.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-black">•</span>
                <span className="text-sm leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key Insights Card */}
      <Card className="bg-[#2563EB0D] rounded-lg border border-[#E2E8F0] shadow-none">
        <CardContent className="p-4 text-[#162E6A">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-4 rounded-full border-2 border-[#ACC8FF] bg-blue-600" />
            <h3 className="text-base font-semibold text-foreground">
              Key Insights
            </h3>
          </div>
          <ul className="space-y-3">
            {keyInsights.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-[#162E6A]">•</span>
                <span className="text-sm leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default InsightOverview;
