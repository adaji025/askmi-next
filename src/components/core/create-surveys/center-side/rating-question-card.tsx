"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useQuestionStore } from "@/store/qustion-store";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

interface RatingQuestionCardProps {
  questionId: string;
  questionNumber?: number;
}

const RatingQuestionCard = ({
  questionId,
  questionNumber = 2,
}: RatingQuestionCardProps) => {
  const t = useTranslations("survey.create");
  const tSidebar = useTranslations("survey.create.sidebar.questionTypes");
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
    <div className="relative max-w-100 mx-auto mt-5">
      {/* Question Type Indicator and Tab */}
      <div className="absolute -top-7 left-4 z-10 flex gap-1 items-end">
        <div className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-t-xl text-xs font-medium">
          {t("questionCard.questionLabel", { number: questionNumber })}. {tSidebar("ratingScale.title")}
        </div>
      </div>

      {/* Main Card */}
      <Card className="relative border-[#8B5CF6] border rounded-2xl shadow-sm bg-white p-4">
        {/* Question Input */}
        <div className="">
          <Input
            type="text"
            placeholder={t("questionCard.typeYourQuestion")}
            value={questionData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full h-9 text-base"
          />
        </div>

        {/* Rating Scale Options */}
        <div className="flex items-center gap-2 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              variant="outline"
              className="h-7 w-7 p-0 rounded-md border text-xs bg-white text-foreground border-gray-300 hover:border-[#2563EB]"
            >
              {number}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RatingQuestionCard;
