"use client";

import { useQuestionStore } from "@/store/qustion-store";
import EmptySettings from "./empty-settings";
import FilledSettings from "./filled-settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export function SettingsPanel() {
  const t = useTranslations("survey.create");
  const questions = useQuestionStore((state) => state.questions);
  const surveyTitle = useQuestionStore((state) => state.surveyTitle);
  const setSurveyTitle = useQuestionStore((state) => state.setSurveyTitle);
  const multipleChoiceQuestions = questions.filter(
    (q) => q.type === "multiple-choice"
  );

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

      {/* Question settings */}
      {multipleChoiceQuestions.length > 0 ? (
        <FilledSettings />
      ) : (
        <EmptySettings />
      )}
    </div>
  );
}