"use client";

import { Settings } from "lucide-react";
import MultiChoiceSettingsCard from "./multi-choice-settings-card";
import { useQuestionStore } from "@/store/qustion-store";
import { useTranslations } from "next-intl";

const FilledSettings = () => {
  const t = useTranslations("survey.create.settings");
  const questions = useQuestionStore((state) => state.questions);
  const multipleChoiceQuestions = questions
    .filter((q) => q.type === "multiple-choice")
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-6 w-6 text-[#8B5CF6]" />
        <div className="text-sm font-bold">{t("questionSettings")}</div>
      </div>
      <div className="space-y-10">
        {multipleChoiceQuestions.map((question) => (
          <div key={question.id} className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">
              {t("question", { number: question.order })}
            </div>
            <MultiChoiceSettingsCard questionId={question.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilledSettings;
