"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Building2, User, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useGetCampaign } from "@/features/campaign/hooks/use-get-campaign";
import { useGetSurveys } from "@/features/surveys/use-get-surveys";
import type { Campaign } from "@/features/campaign/types";
import type { Survey } from "@/features/surveys/types";
import { differenceInDays } from "date-fns";
import SurveyCard from "@/components/core/dashboard/survey/survey-card";

export default function CampaignDetail() {
  const t = useTranslations("campaign.detail");
  const params = useParams();
  const campaignId = params?.id as string;
  const { getCampaign, isLoading, error } = useGetCampaign();
  const { getSurveys } = useGetSurveys();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    if (campaignId) {
      getCampaign(campaignId)
        .then((res) => setCampaign(res.campaign))
        .catch(() => {});
    }
  }, [campaignId, getCampaign]);

  useEffect(() => {
    getSurveys()
      .then((res) => {
        const campaignSurveys = (res.surveys || []).filter(
          (s) => s.campaignId === campaignId
        );
        setSurveys(campaignSurveys);
      })
      .catch(() => {});
  }, [campaignId, getSurveys]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-muted-foreground">
        Loading campaign...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-muted-foreground">
        Campaign not found
      </div>
    );
  }

  const completionPercentage =
    campaign.totalVoteNeeded > 0
      ? Math.round((campaign.response / campaign.totalVoteNeeded) * 100)
      : 0;
  const daysLeft = campaign.endDate
    ? Math.max(0, differenceInDays(new Date(campaign.endDate), new Date()))
    : 0;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Campaign Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-black">
          {campaign.campaignName}
        </h1>
        {campaign.description && (
          <p className="text-muted-foreground">{campaign.description}</p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-emerald-100 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-emerald-950">
              {completionPercentage}%
            </div>
            <div className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest mt-4">
              {t("completed")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-indigo-950">
              {campaign.response.toLocaleString()}
            </div>
            <div className="text-[10px] font-semibold text-indigo-800 uppercase tracking-widest mt-4">
              {t("responses")}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-amber-950">
              {daysLeft} days
            </div>
            <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-widest mt-4">
              {t("left")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Progress */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-black">
            {t("responseProgress")}
          </h2>
          <div className="text-3xl font-bold">
            {campaign.response.toLocaleString()}{" "}
            <span className="text-gray-400 font-bold text-lg">
              / {campaign.totalVoteNeeded.toLocaleString()}
            </span>
          </div>
        </div>
        <Progress
          value={completionPercentage}
          className="h-4 bg-gray-100"
        />
      </div>

      {/* Target Audience */}
      {campaign.targetAudience && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-black">
            {t("targetAudience")}
          </h2>
          <div className="flex flex-col gap-6">
            {(
              [
                ["region", MapPin],
                ["city", Building2],
                ["age", User],
                ["gender", Users],
                ["interest", Sparkles],
              ] as const
            ).map(([field, Icon]) => {
              const item = campaign.targetAudience?.[field];
              if (!item) return null;
              const values =
                item.type === "all" ? ["All"] : item.values || [];
              if (values.length === 0) return null;
              return (
                <div
                  key={field}
                  className="flex items-center gap-2 flex-wrap"
                >
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex flex-wrap gap-1.5">
                    {values.map((v) => (
                      <Badge
                        key={v}
                        variant="secondary"
                        className="font-normal"
                      >
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Surveys */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-black">{t("surveys")}</h2>
        {surveys.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t("noSurveys")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyCard
                key={survey.id}
                title={survey.title}
                status={survey.status ?? "draft"}
                daysAgo={
                  survey.createdAt
                    ? differenceInDays(new Date(), new Date(survey.createdAt))
                    : 0
                }
                questionsCount={survey.questions?.length ?? 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
