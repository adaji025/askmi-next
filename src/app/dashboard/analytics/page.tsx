import { AgeDistribution } from "@/components/core/dashboard/analytics/age-distribution";
import { VoteCollectionChart } from "@/components/core/dashboard/analytics/vote-collection-chart";
import { InfluencersSVG } from "@/components/core/dashboard/dashboard/layout/svg";
import { ActivityItem } from "@/components/core/dashboard/dashboard/recent-active-item";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import {
  TotalResponseSVG,
  TotalSurveySVG,
} from "@/components/core/dashboard/dashboard/stat-card/svg";
import { activities } from "@/components/core/dashboard/data";

interface ActivityProps {
  id: number;
  title: string;
  metric: number;
  timeAgo: string;
}
const stats = [
  {
    title: "Verified influencers",
    value: "20",
    icon: InfluencersSVG,
    // trend: "+4.2%",
    // trendType: "up",
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
  {
    title: "Avg votes per survey",
    value: "20",
    icon: TotalResponseSVG,
    // trend: "+4.2%",
    // trendType: "up",
    bgColor: "bg-[#F0F2FF]", // Light Lavender
  },
  {
    title: "Total Surveys",
    value: "20",
    icon: TotalSurveySVG,
    // trend: "-0.03%",
    // trendType: "down",
    bgColor: "bg-[#EAF5FF]", // Light Blue
  },
] as const;

const Analytics = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="mt-10">
        <VoteCollectionChart />
      </div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 mt-10">
        <AgeDistribution />
        {/* Recent Activity Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-bold">Recent Activity</h2>
          {activities.length ? (
            <div className="divide-y divide-border">
              {activities.map((activity: ActivityProps) => (
                <ActivityItem
                  key={activity.id}
                  title={activity.title}
                  metric={activity.metric}
                  timeAgo={activity.timeAgo}
                />
              ))}
            </div>
          ) : (
            <div className="min-h-50 text-sm text-[#8E8E8E] flex flex-col justify-center items-center">
              No Recent Activity
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
