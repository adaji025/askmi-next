"use client";

import { useEffect, useState } from "react";
import {
  CampaignsSVG,
  InfluencersSVG,
  SurveysSVG,
} from "@/components/core/dashboard/dashboard/layout/svg";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { ExportSVG, WadOfMoneySVG } from "@/components/core/dashboard/svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { VoteCollectionChart } from "@/components/core/dashboard/analytics/vote-collection-chart";
import CampaignTable from "@/components/core/dashboard/analytics/campign-table";
import { useGetAnalytics } from "@/features/analytics/use-get-analytics";
import type { AnalyticsStats, VoteCollectionOverTime, AnalyticsCampaign } from "@/features/analytics/use-get-analytics";

const Analytics = () => {
  const t = useTranslations("analytics");
  const [time, setTime] = useState(t("page.allTime"));
  const { getAnalytics, isLoading, error } = useGetAnalytics();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [voteCollectionOverTime, setVoteCollectionOverTime] = useState<
    VoteCollectionOverTime[]
  >([]);
  const [campaigns, setCampaigns] = useState<AnalyticsCampaign[]>([]);

  useEffect(() => {
    getAnalytics()
      .then((res) => {
        setStats(res.stats);
        setVoteCollectionOverTime(res.voteCollectionOverTime ?? []);
        setCampaigns(res.campaigns ?? []);
      })
      .catch(() => {});
  }, [getAnalytics]);

  const timeItems = [
    t("page.allTime"),
    t("page.lastMonth"),
    t("page.thisMonth"),
    t("page.lastYear"),
    t("page.thisYear"),
  ];

  const statCards = stats
    ? [
        {
          title: t("stats.totalVotes"),
          value: stats.totalVotes.toLocaleString(),
          icon: InfluencersSVG,
          bgColor: "bg-[#EAF5FF]",
        },
        {
          title: t("stats.activeCampaigns"),
          value: stats.activeCampaigns.toLocaleString(),
          icon: CampaignsSVG,
          bgColor: "bg-[#EAF5FF]",
        },
        {
          title: t("stats.avgResponseRate"),
          value: `${stats.avgResponseRate}%`,
          icon: SurveysSVG,
          bgColor: "bg-[#F0F2FF]",
        },
        {
          title: t("stats.totalSpend"),
          value: `$${stats.totalSpend.toLocaleString()}`,
          icon: WadOfMoneySVG,
          bgColor: "bg-[#EAF5FF]",
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

      <div className="mt-10">
        <VoteCollectionChart data={voteCollectionOverTime} />
      </div>

      <CampaignTable campaigns={campaigns} />
    </div>
  );
};

export default Analytics;
