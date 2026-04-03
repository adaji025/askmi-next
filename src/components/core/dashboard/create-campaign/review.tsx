"use client";

import { useEffect, useState } from "react";
import { MapPin, Building2, User, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import React from "react";
import { useRouter } from "next/navigation";
import { useCreateCampaign } from "@/features/campaign/hooks/use-create-campaign";
import { useGetEstimatedBudget } from "@/features/budget/use-get-estimated-budget";
import { useCreateSurvey } from "@/features/surveys/use-create-survey";
import { useCampaignForm } from "./campaign-form-context";
import { useUserStore } from "@/store/user-store";
import type { BudgetEstimate } from "@/features/budget/use-get-estimated-budget";

interface IProps {
  handleNext: (
    value: "Campaign Setup" | "Budget & Timeline" | "Review"
  ) => void;
}

const Review = ({ handleNext }: IProps) => {
  const router = useRouter();
  const { formData } = useCampaignForm();
  const { createCampaign, isLoading, error, resetError } = useCreateCampaign();
  const {
    createSurvey,
    isLoading: isCreatingSurvey,
    error: surveyCreateError,
    resetError: resetSurveyCreateError,
  } = useCreateSurvey();
  const { getEstimate, isLoading: isEstimateLoading } = useGetEstimatedBudget();
  const { token, isAuthenticated } = useUserStore();
  const [estimate, setEstimate] = useState<BudgetEstimate | null>(null);

  const totalQuestions =
    formData.newSurveyDraft?.questions.length ??
    formData.totalQuestions ??
    5;
  const desiredVote = formData.totalVoteNeeded ?? 0;

  useEffect(() => {
    if (desiredVote > 0) {
      getEstimate({ totalQuestions, desiredVote })
        .then((res) => setEstimate(res.estimate ?? null))
        .catch(() => setEstimate(null));
    } else {
      setEstimate(null);
    }
  }, [totalQuestions, desiredVote, getEstimate]);

  const surveyTitle =
    formData.newSurveyDraft?.title?.trim() ||
    formData.campaignName ||
    "Product Feedback Survey";

  // Build target audience: icon + label, then badges for values
  const targetAudienceConfig: Record<
    string,
    { label: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    region: { label: "Region", icon: MapPin },
    city: { label: "City", icon: Building2 },
    age: { label: "Age", icon: User },
    gender: { label: "Gender", icon: Users },
    interest: { label: "Interest", icon: Sparkles },
  };
  const targetAudienceItems: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    values: string[];
  }[] = [];
  const audience = formData.targetAudience;
  if (audience) {
    (["region", "city", "age", "gender", "interest"] as const).forEach(
      (field) => {
        const item = audience[field];
        if (!item) return;
        const config = targetAudienceConfig[field];
        const values = item.type === "all" ? ["All"] : item.values || [];
        if (values.length > 0) {
          targetAudienceItems.push({
            label: config.label,
            icon: config.icon,
            values,
          });
        }
      }
    );
  }
  const totalVotes = formData.totalVoteNeeded
    ? `${formData.totalVoteNeeded.toLocaleString()} votes`
    : "25,000 votes";
  const deviationRange =
    estimate?.deviationPercent != null
      ? `±${estimate.deviationPercent}%`
      : isEstimateLoading
        ? "..."
        : "±20%";
  const estimatedPrice =
    estimate?.baseBudget != null
      ? `$${estimate.baseBudget.toLocaleString()}`
      : isEstimateLoading
        ? "..."
        : "$500";
  const startDate = formData.startDate
    ? new Date(formData.startDate)
    : new Date("2025-01-11");
  const endDate = formData.endDate
    ? new Date(formData.endDate)
    : undefined;
  const handleSubmit = async () => {
    resetError();
    resetSurveyCreateError();

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

    const surveySource = formData.surveySource ?? "creating_new";

    try {
      let surveyId = formData.surveyId;
      let campaignSurveySource: "creating_new" | "existing" = surveySource;

      // New survey: create survey first, then campaign with returned id
      if (surveySource === "creating_new") {
        if (!formData.newSurveyDraft) {
          console.error("Survey draft is missing. Go back and save your survey.");
          return;
        }
        const draft = formData.newSurveyDraft;
        const surveyResponse = await createSurvey(draft.questions, draft.title);
        surveyId = surveyResponse.survey.id;
        campaignSurveySource = "existing";
      }

      if (!surveyId) {
        console.error("surveyId is required to create a campaign.");
        return;
      }

      const campaignData = {
        campaignName: formData.campaignName,
        description: formData.description || "",
        surveySource: campaignSurveySource,
        surveyId,
        ...(formData.targetAudience && {
          targetAudience: formData.targetAudience,
        }),
        totalVoteNeeded: formData.totalVoteNeeded,
        startDate: formData.startDate,
        ...(formData.endDate && { endDate: formData.endDate }),
        isActive: formData.isActive ?? true,
      };

      console.log(
        "Submitting campaign data:",
        JSON.stringify(campaignData, null, 2)
      );

      const response = await createCampaign(campaignData);
      console.log("Campaign created successfully:", response.campaign);

      router.push(`/dashboard/campaigns/${response.campaign.id}`);
    } catch (err) {
      console.error("Failed to create survey or campaign:", err);
    }
  };

  const ReviewRow = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  }) => (
    <>
      <div className="flex items-center justify-between py-4">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
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
        {targetAudienceItems.length > 0 ? (
          targetAudienceItems.map((item, index) => (
            <ReviewRow
              key={index}
              label={item.label}
              icon={item.icon}
              value={
                <div className="flex flex-wrap gap-2">
                  {item.values.map((value) => (
                    <Badge
                      key={value}
                      variant="outline"
                      className="bg-[#E2E8F0] rounded border-none text-[#8A97A0] font-normal"
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
              }
            />
          ))
        ) : (
          <ReviewRow
            label="Target audience"
            value={
              <span className="text-muted-foreground text-sm">
                No target audience selected
              </span>
            }
          />
        )}
        <ReviewRow
          label="Total questions"
          value={
            formData.newSurveyDraft?.questions.length ??
            formData.totalQuestions ??
            "—"
          }
        />
        <ReviewRow label="Total votes needed" value={totalVotes} />
        <ReviewRow label="Deviation range" value={deviationRange} />
        <ReviewRow
          label="Start date"
          value={format(startDate, "MMMM dd, yyyy")}
        />
        {endDate && (
          <ReviewRow
            label="End date"
            value={format(endDate, "MMMM dd, yyyy")}
          />
        )}
        <ReviewRow label="Estimated Price" value={estimatedPrice} />
      </div>

      {/* Error Message */}
      {(surveyCreateError || error) && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive space-y-1">
          {surveyCreateError && <p>{surveyCreateError}</p>}
          {error && <p>{error}</p>}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-between pt-4">
        <Button
          variant={"outline"}
          onClick={() => handleNext("Budget & Timeline")}
          className="px-10 h-12 text-base font-semibold text-[#2563EB] border-[#2563EB] hover:bg-[#2563EB]/10 rounded-lg transition-all active:scale-95"
          disabled={isLoading || isCreatingSurvey}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95"
          disabled={isLoading || isCreatingSurvey}
        >
          {isLoading || isCreatingSurvey ? "Creating..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default Review;
