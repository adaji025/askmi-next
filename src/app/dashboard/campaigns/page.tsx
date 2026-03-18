"use client";

import { useEffect, useState } from "react";
import CampaignComp from "@/components/core/dashboard/campaign";
import { SurveyCard } from "@/components/core/dashboard/campaign/survey-card";
import { useTranslations } from "next-intl";
import { useGetCampaigns } from "@/features/campaign/hooks/use-get-campaigns";
import type { Campaign } from "@/features/campaign/types";
import { differenceInDays } from "date-fns";

const Campaigns = () => {
  const t = useTranslations("campaign.page");
  const { getCampaigns, isLoading, error } = useGetCampaigns();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    getCampaigns()
      .then((res) => setCampaigns(res.campaigns))
      .catch(() => {});
  }, [getCampaigns]);

  return (
    <div>
      <div className="mb-4">{t("description")}</div>
      <CampaignComp />

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive mt-6">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6">
        {isLoading && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Loading campaigns...
          </div>
        )}
        {!isLoading &&
          campaigns.map((campaign) => (
            <SurveyCard
              key={campaign.id}
              href={`/dashboard/campaigns/${campaign.id}`}
              title={campaign.campaignName}
              description={campaign.description}
              status={campaign.isActive ? "active" : "paused"}
              daysAgo={
                campaign.createdAt
                  ? differenceInDays(new Date(), new Date(campaign.createdAt))
                  : 0
              }
              influencers={campaign.numberOfInfluencer}
              responsesCount={0}
              totalResponses={campaign.totalVoteNeeded}
              completionPercentage={0}
              daysLeft={7}
            />
          ))}
      </div>
    </div>
  );
};

export default Campaigns;
