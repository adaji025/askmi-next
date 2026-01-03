"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuestionStore } from "@/store/qustion-store";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/store/language-store";
import { cn } from "@/lib/utils";

interface TextQuestionCardProps {
  questionId: string;
  questionNumber?: number;
}

const TextQuestionCard = ({
  questionId,
  questionNumber = 1,
}: TextQuestionCardProps) => {
  const t = useTranslations("survey.create.questionCard");
  const tSidebar = useTranslations("survey.create.sidebar.questionTypes");
  const { isRTL } = useLanguageStore();
  const question = useQuestionStore((state) =>
    state.questions.find((q) => q.id === questionId)
  );
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);

  const questionData = useMemo(() => {
    if (!question) {
      return { title: "", required: false };
    }
    return {
      title: question.title || "",
      required: question.required || false,
    };
  }, [question]);

  const handleTitleChange = (title: string) => {
    updateQuestion(questionId, { title });
  };

  return (
    <div className="relative max-w-100 w-full mx-auto mt-5">
      <div
        className={cn(
          "absolute -top-7 left-4 z-10 flex gap-1 items-end",
          isRTL && "rtl:right-4 rtl:left-auto rtl:flex-row-reverse"
        )}
      >
        <div className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-t-xl text-xs font-medium">
          {t("questionLabel", { number: questionNumber })}. {tSidebar("text.title")}
        </div>
      </div>
      {questionData.required && (
        <div
          className={cn(
            "absolute -top-7 right-6 z-10",
            isRTL && "rtl:left-6 rtl:right-auto"
          )}
        >
          <div className="text-[#8B5CF6] bg-[#2563EB26] border border-b-0 border-[#2563EB4D] px-4 py-1.5 rounded-xl text-xs font-medium">
            {t("required")}
          </div>
        </div>
      )}

      <Card className="relative border-[#8B5CF6] border rounded-2xl shadow-sm bg-white p-4">
        <div onClick={(e) => e.stopPropagation()}>
          <Input
            type="text"
            placeholder={t("typeYourQuestion")}
            value={questionData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            maxLength={102}
            className="w-full h-9 text-xs placeholder:text-xs"
          />
        </div>
      </Card>
    </div>
  );
};

export default TextQuestionCard;
