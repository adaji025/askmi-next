"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, User, Users } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { useRouter } from "next/navigation";
import { useCreateCampaign } from "@/features/campaign/hooks/use-create-campaign";
import { useCampaignForm } from "./campaign-form-context";
import { useUserStore } from "@/store/user-store";

interface IProps {
  handleNext: (
    value: "Campaign Setup" | "Budget & Timeline" | "Review"
  ) => void;
}

const Review = ({ handleNext }: IProps) => {
  const router = useRouter();
  const { formData } = useCampaignForm();
  const { createCampaign, isLoading, error, resetError } = useCreateCampaign();
  const { token, isAuthenticated } = useUserStore();

  // Mock data for display - in a real app, this would come from formData
  const surveyTitle = formData.campaignName || "Product Feedback Survey";
  const targetAudience = [
    { label: "North America", icon: MapPin },
    { label: "18-24", icon: User },
    { label: "All genders", icon: Users },
  ];
  const totalVotes = formData.totalVoteNeeded
    ? `${formData.totalVoteNeeded.toLocaleString()} votes`
    : "25,000 votes";
  const deviationRange = "±20%";
  const startDate = formData.startDate
    ? new Date(formData.startDate)
    : new Date("2025-01-11");
  const costPerVote = "$500";

  const handleSubmit = async () => {
    resetError();

    // Check if user is authenticated
    if (!isAuthenticated() || !token) {
      console.error("User is not authenticated. Please log in again.");
      router.push("/auth/sign-in");
      return;
    }

    // Validate required fields
    if (!formData.campaignName) {
      console.error("Campaign name is required");
      return;
    }

    if (!formData.totalVoteNeeded) {
      console.error("Total votes needed is required");
      return;
    }

    if (!formData.startDate) {
      console.error("Start date is required");
      return;
    }

    // Prepare campaign data from formData - ensure all fields are included
    const campaignData = {
      campaignName: formData.campaignName,
      description: formData.description || "",
      surveySource: formData.surveySource || "creating_new",
      ...(formData.surveyId && { surveyId: formData.surveyId }),
      ...(formData.targetAudience && { targetAudience: formData.targetAudience }),
      totalVoteNeeded: formData.totalVoteNeeded,
      startDate: formData.startDate,
      isActive: formData.isActive ?? true, // Default to true
    };

    console.log("Submitting campaign data:", JSON.stringify(campaignData, null, 2));

    try {
      const response = await createCampaign(campaignData);
      console.log("Campaign created successfully:", response.campaign);
      
      // Navigate to campaigns page or campaign detail page
      router.push(`/dashboard/campaigns/${response.campaign.id}`);
    } catch (err) {
      // Error is already set in the hook's error state
      console.error("Failed to create campaign:", error);
    }
  };

  const ReviewRow = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <>
      <div className="flex items-center justify-between py-4">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <div className="text-sm font-bold">{value}</div>
      </div>
      <Separator />
    </>
  );

  return (
    <div className="p-4 sm:p-6 lg:px-8 bg-white space-y-4 rounded-lg border border-[#E2E8F0]! shadow-none!">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Survey
        </span>
        <h2 className="text-xl font-bold tracking-tight">{surveyTitle}</h2>
      </div>

      <Separator />

      {/* Review Details */}
      <div className="space-y-0">
        <ReviewRow
          label="Target audience"
          value={
            <div className="flex items-center gap-2">
              {targetAudience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-[#E2E8F0] rounded border-none text-[#8A97A0] font-normal"
                  >
                    <Icon className="w-3 h-3" />
                    {item.label}
                  </Badge>
                );
              })}
            </div>
          }
        />
        <ReviewRow label="Total votes needed" value={totalVotes} />
        <ReviewRow label="Deviation range" value={deviationRange} />
        <ReviewRow
          label="Start date"
          value={format(startDate, "MMMM dd, yyyy")}
        />
        <ReviewRow label="Estimated Price" value={costPerVote} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-between pt-4">
        <Button
          variant={"outline"}
          onClick={() => handleNext("Budget & Timeline")}
          className="px-10 h-12 text-base font-semibold text-[#2563EB] border-[#2563EB] hover:bg-[#2563EB]/10 rounded-lg transition-all active:scale-95"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default Review;
