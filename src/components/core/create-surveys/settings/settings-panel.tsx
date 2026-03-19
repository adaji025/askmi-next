"use client";

import { useEffect, useState } from "react";
import { useQuestionStore } from "@/store/qustion-store";
import EmptySettings from "./empty-settings";
import FilledSettings from "./filled-settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useGetCampaigns } from "@/features/campaign/hooks/use-get-campaigns";
import type { Campaign } from "@/features/campaign/types";

export function SettingsPanel() {
  const t = useTranslations("survey.create");
  const questions = useQuestionStore((state) => state.questions);
  const surveyTitle = useQuestionStore((state) => state.surveyTitle);
  const setSurveyTitle = useQuestionStore((state) => state.setSurveyTitle);
  const campaignId = useQuestionStore((state) => state.campaignId);
  const setCampaignId = useQuestionStore((state) => state.setCampaignId);
  const { getCampaigns } = useGetCampaigns();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const multipleChoiceQuestions = questions.filter(
    (q) => q.type === "multiple-choice"
  );

  useEffect(() => {
    getCampaigns()
      .then((res) => setCampaigns(res.campaigns))
      .catch(() => {});
  }, [getCampaigns]);

  return (
    <div className="space-y-6">
      {/* Survey Title - always visible */}
      <div className="space-y-2">
        <Label htmlFor="survey-title" className="text-sm font-medium">
          {t("titleModal.label")}
        </Label>
        <Input
          id="survey-title"
          type="text"
          value={surveyTitle}
          onChange={(e) => setSurveyTitle(e.target.value)}
          placeholder={t("titleModal.placeholder")}
          className="h-10"
        />
      </div>

      {/* Campaign Select */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {t("campaignSelect.label")}
        </Label>
        <Select
          value={campaignId || ""}
          onValueChange={setCampaignId}
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder={t("campaignSelect.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {campaigns.map((campaign) => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.campaignName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Question settings */}
      {multipleChoiceQuestions.length > 0 ? (
        <FilledSettings />
      ) : (
        <EmptySettings />
      )}
    </div>
  );
}