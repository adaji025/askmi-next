import { StatCard } from "@/components/core/dashboard/stat-card";
import {
  ActiveCampaignSVG,
  CompletionRateSVG,
  TotalResponseSVG,
  TotalSurveySVG,
} from "@/components/core/dashboard/stat-card/svg";
import React from "react";

const stats = [
  {
    title: "Active Campaigns",
    value: "20",
    icon: ActiveCampaignSVG,
    trend: "+4.2%",
    trendType: "up",
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
  {
    title: "Total Responses",
    value: "20",
    icon: TotalResponseSVG,
    trend: "+4.2%",
    trendType: "up",
    bgColor: "bg-[#F0F2FF]", // Light Lavender
  },
  {
    title: "Total Surveys",
    value: "20",
    icon: TotalSurveySVG,
    trend: "-0.03%",
    trendType: "down",
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
  {
    title: "Completion Rate",
    value: "20%",
    icon: CompletionRateSVG,
    trend: "+4.2%",
    trendType: "up",
    bgColor: "bg-[#F0F2FF]", // Light Lavender
  },
] as const;
const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
