"use client";

import { useEffect, useState } from "react";
import { ActivityItem } from "@/components/core/dashboard/dashboard/recent-active-item";
import { CampaignCard } from "@/components/core/dashboard/dashboard/campaign-card";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import {
  ActiveCampaignSVG,
  CompletionRateSVG,
  TotalResponseSVG,
  TotalSurveySVG,
} from "@/components/core/dashboard/dashboard/stat-card/svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGetBrandStatistics } from "@/features/dashboard/use-get-stat";
import type {
  BrandStats,
  ActiveCampaign,
  RecentActivity,
} from "@/features/dashboard/use-get-stat";

const Dashboard = () => {
  const t = useTranslations("dashboard.stats");
  const tSections = useTranslations("dashboard.sections");
  const tEmpty = useTranslations("dashboard.emptyStates");
  const { getStatistics, isLoading, error } = useGetBrandStatistics();
  const [stats, setStats] = useState<BrandStats | null>(null);
  const [activeCampaigns, setActiveCampaigns] = useState<ActiveCampaign[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    getStatistics()
      .then((res) => {
        setStats(res.stats);
        setActiveCampaigns(res.activeCampaigns ?? []);
        setRecentActivity(res.recentActivity ?? []);
      })
      .catch(() => {});
  }, [getStatistics]);

  const statCards = stats
    ? [
        {
          title: t("activeCampaigns"),
          value: stats.activeCampaigns.toLocaleString(),
          icon: ActiveCampaignSVG,
          trend: "+4.2%",
          trendType: "up" as const,
          bgColor: "bg-[#EAF5FF]",
        },
        {
          title: t("totalResponses"),
          value: stats.totalResponses.toLocaleString(),
          icon: TotalResponseSVG,
          trend: "+4.2%",
          trendType: "up" as const,
          bgColor: "bg-[#F0F2FF]",
        },
        {
          title: t("totalSurveys"),
          value: stats.totalSurveys.toLocaleString(),
          icon: TotalSurveySVG,
          trend: "-0.03%",
          trendType: "down" as const,
          bgColor: "bg-[#EAF5FF]",
        },
        {
          title: t("completionRate"),
          value: `${stats.completionRate}%`,
          icon: CompletionRateSVG,
          trend: "+4.2%",
          trendType: "up" as const,
          bgColor: "bg-[#F0F2FF]",
        },
      ]
    : [];

  return (
    <div>
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Loading...
          </div>
        ) : (
          statCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 mt-4">
        {/* Active Campaigns Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-semibold">{tSections("activeCampaigns")}</h2>
          <div className="space-y-4">
            {activeCampaigns.length ? (
              activeCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  title={campaign.campaignName}
                  responses={campaign.responseCount}
                  totalResponses={campaign.totalVoteNeeded}
                  status={campaign.status === "completed" ? "inactive" : "active"}
                />
              ))
            ) : (
              !isLoading && (
                <div className="min-h-50 gap-2 text-[#8E8E8E] text-sm flex flex-col justify-center items-center">
                  <Image
                    src={"/images/svgs/campaign-filled.svg"}
                    width={20}
                    height={20}
                    alt="No Active Campaigns"
                  />
                  {tEmpty("noActiveCampaigns")}
                </div>
              )
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-bold">{tSections("recentActivity")}</h2>
          {recentActivity.length ? (
            <div className="divide-y divide-border">
              {recentActivity.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  title={activity.campaignName}
                  metric={activity.responseCount}
                  timeAgo={activity.timeAgo}
                  campaignId={activity.campaignId}
                />
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="min-h-50 text-sm text-[#8E8E8E] flex flex-col justify-center items-center">
                {tEmpty("noRecentActivity")}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
