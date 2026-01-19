"use client";

import AnalyticsDetails from "@/components/core/dashboard/analytics/analytics-details";
import { AnalyticsHeader } from "@/components/core/dashboard/analytics/analytics-header";
import { useParams } from "next/navigation";

const CampaignDetails = () => {
  const params = useParams();
  const campaignId = params?.id as string;

  // TODO: Fetch actual campaign data based on campaignId
  // For now, using sample data
  const campaignData = {
    title: "Product Feedback Survey",
    status: "Completed" as const,
    responses: 1247,
    confidence: "High" as const,
  };

  return (
    <div>
      <AnalyticsHeader
        title={campaignData.title}
        status={campaignData.status}
        responses={campaignData.responses}
        confidence={campaignData.confidence}
      />
      <AnalyticsDetails />
    </div>
  );
};

export default CampaignDetails;
