"use client";
import { AgeDistribution } from "@/components/core/dashboard/analytics/age-distribution";
import {
  CampaignsSVG,
  InfluencersSVG,
  SurveysSVG,
} from "@/components/core/dashboard/dashboard/layout/svg";
import { ActivityItem } from "@/components/core/dashboard/dashboard/recent-active-item";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { activities } from "@/components/core/dashboard/data";
import { ExportSVG, WadOfMoneySVG } from "@/components/core/dashboard/svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { useTranslations } from "next-intl";

interface ActivityProps {
  id: number;
  title: string;
  metric: number;
  timeAgo: string;
}

const Analytics = () => {
  const t = useTranslations("analytics");
  const tDashboard = useTranslations("dashboard");
  const [time, setTime] = React.useState(t("page.allTime"));

  const timeItems = [
    t("page.allTime"),
    t("page.lastMonth"),
    t("page.thisMonth"),
    t("page.lastYear"),
    t("page.thisYear"),
  ];

  const stats = [
    {
      title: t("stats.totalVotes"),
      value: "20, 000",
      icon: InfluencersSVG,
      bgColor: "bg-[#EAF5FF]", // Light Blue
    },
    {
      title: t("stats.activeCampaigns"),
      value: "4",
      icon: CampaignsSVG,
      bgColor: "bg-[#EAF5FF]", // Light Blue
    },
    {
      title: t("stats.avgResponseRate"),
      value: "78%",
      icon: SurveysSVG,
      bgColor: "bg-[#F0F2FF]", // Light Lavender
    },
    {
      title: t("stats.totalSpend"),
      value: "$63,771",
      icon: WadOfMoneySVG,
      bgColor: "bg-[#EAF5FF]", // Light Blue
    },
  ];
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h2>{t("page.title")}</h2>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="">{t("page.allTime")}</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border border-[#E2E8F0]">
                  {time}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  {timeItems.map((item, index) => (
                    <DropdownMenuItem key={index} onClick={() => setTime(item)}>
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            size="sm"
            className="bg-[#2563EB] cursor-pointer rounded-md text-sm font-medium px-3 text-white hover:bg-blue-700 border-none shadow-none"
          >
            <ExportSVG />
            {t("page.exportReport")}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 mt-10">
        <AgeDistribution />
        {/* Recent Activity Section */}
        <div className="space-y-4 bg-white p-2 sm:p-5 shadow-xs rounded">
          <h2 className="text-base font-bold">
            {tDashboard("sections.recentActivity")}
          </h2>
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
              {tDashboard("emptyStates.noRecentActivity")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
