"use client";

import { Card, CardContent } from "@/components/ui/card";
import AnalyticsInsight from "./analytics-insight";
import AudienceDemographics from "./audience-demogragh";
import InsightOverview from "./insight-overview";

interface MetricCardProps {
  value: string | number;
  label: string;
  bgColor: string;
}

const MetricCard = ({ value, label, bgColor }: MetricCardProps) => {
  return (
    <Card className={`${bgColor} border-none shadow-none p-0`}>
      <CardContent className="p-6 flex flex-col">
        <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
          {label}
        </div>
      </CardContent>
    </Card>
  );
};

interface AnalyticsDetailsProps {
  totalQuestions?: number;
  responses?: number;
  completionRate?: number;
  daysLeft?: number;
}

export function AnalyticsDetails({
  totalQuestions = 4,
  responses = 500,
  completionRate = 78,
  daysLeft = 7,
}: AnalyticsDetailsProps) {
  const metrics = [
    {
      value: totalQuestions,
      label: "TOTAL QUESTIONS",
      bgColor: "bg-slate-100", // Light blue-grey
    },
    {
      value: responses.toLocaleString(),
      label: "RESPONSES / VOTES",
      bgColor: "bg-purple-50", // Light purple
    },
    {
      value: `${completionRate}%`,
      label: "COMPLETE",
      bgColor: "bg-green-50", // Light green
    },
    {
      value: `${daysLeft} days`,
      label: "LEFT",
      bgColor: "bg-yellow-50", // Light yellow
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      <AnalyticsInsight />
      <AudienceDemographics />
      <InsightOverview />
    </div>
  );
}

export default AnalyticsDetails;
