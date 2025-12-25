import { activities, campaigns } from "@/components/core/dashboard/data";
import { ActivityItem } from "@/components/core/dashboard/recent-active-item";
import { CampaignCard } from "@/components/core/dashboard/campaign-card";
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

      <div className="grid gap-4 lg:grid-cols-2 mt-4">
        {/* Active Campaigns Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-semibold">Active Campaigns</h2>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                title={campaign.title}
                responses={campaign.responses}
                totalResponses={campaign.totalResponses}
                status={campaign.status}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-bold">Recent Activity</h2>
          <div className="divide-y divide-border">
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                metric={activity.metric}
                timeAgo={activity.timeAgo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
