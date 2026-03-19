"use client";

import { useEffect, useState } from "react";
import CampaignComp from "@/components/core/dashboard/campaign";
import { SurveyCard } from "@/components/core/dashboard/campaign/survey-card";
import { useTranslations } from "next-intl";
import { useGetCampaigns } from "@/features/campaign/hooks/use-get-campaigns";
import type { Campaign } from "@/features/campaign/types";
import { differenceInDays } from "date-fns";

const CAMPAIGN_DURATION_DAYS = 30;

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
        {!isLoading && campaigns.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            {t("noCampaigns")}
          </div>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
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
              daysLeft={Math.max(
                0,
                campaign.endDate
                  ? differenceInDays(
                      new Date(campaign.endDate),
                      new Date(campaign.startDate)
                    )
                  : CAMPAIGN_DURATION_DAYS
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default Campaigns;
