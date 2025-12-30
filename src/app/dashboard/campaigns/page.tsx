"use client";

import CampaignComp from "@/components/core/dashboard/campaign";
import { SurveyCard } from "@/components/core/dashboard/campaign/survey-card";
import { surveys } from "@/components/core/dashboard/data";
import { useTranslations } from "next-intl";

const Campaigns = () => {
  const t = useTranslations("campaign.page");

  return (
    <div>
      <div className="mb-4">
        {t("description")}
      </div>
      <CampaignComp />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6">
        {surveys.map((survey, index) => (
          <SurveyCard key={index} {...survey} />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
