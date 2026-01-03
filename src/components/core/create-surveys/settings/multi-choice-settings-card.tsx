"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { useQuestionStore } from "@/store/qustion-store";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

interface MultiChoiceSettingsCardProps {
  questionId: string;
}

const MultiChoiceSettingsCard = ({ questionId }: MultiChoiceSettingsCardProps) => {
  const t = useTranslations("survey.create.settings");
  const question = useQuestionStore((state) =>
    state.questions.find((q) => q.id === questionId)
  );
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);

  const settings = useMemo(() => {
    if (!question || !question.options || question.options.length === 0) {
      return [
        { id: 1, text: "" },
        { id: 2, text: "" },
      ];
    }
    return question.options;
  }, [question]);

  const handleSettingsChange = (id: number, text: string) => {
    const updatedSettings = settings.map((setting) =>
      setting.id === id ? { ...setting, text } : setting
    );
    updateQuestion(questionId, { options: updatedSettings });
  };

  const handleDeleteSettings = (id: number) => {
    if (settings.length <= 2) {
      // Keep at least 2 options
      return;
    }
    const updatedSettings = settings.filter((setting) => setting.id !== id);
    updateQuestion(questionId, { options: updatedSettings });
  };

  const handleAddSettings = () => {
    if (settings.length >= 4) {
      // Maximum 4 options
      return;
    }
    const newId = Math.max(...settings.map((a) => a.id), 0) + 1;
    const updatedSettings = [...settings, { id: newId, text: "" }];
    updateQuestion(questionId, { options: updatedSettings });
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      {/* <h3 className="text-sm font-bold text-foreground uppercase">
        Settings Options
      </h3> */}

      {/* Settings Input Fields */}
      <div className="space-y-3">
        {settings.map((setting, index) => (
          <div key={setting.id} className="flex items-center gap-3">
            <Input
              type="text"
              placeholder={t("settingsPlaceholder", { number: index + 1 })}
              value={setting.text}
              onChange={(e) => handleSettingsChange(setting.id, e.target.value)}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteSettings(setting.id)}
              className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Settings Button */}
      {settings.length < 4 && (
        <Button
          variant="outline"
          onClick={handleAddSettings}
          className="w-full border-dashed border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5 hover:text-[#2563EB]"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addInputField")}
        </Button>
      )}
    </div>
  );
};

export default MultiChoiceSettingsCard;
