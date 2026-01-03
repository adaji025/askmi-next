"use client";

import React from "react";
import {
  MultiChoiceSVG,
  RatingQSVG,
  ShortTextSVG,
  YesNoSVG,
} from "../../dashboard/svg";
import QuestionCard from "./question-card";
import { useTranslations } from "next-intl";

interface QuestionType {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "choice" | "rating" | "text";
}

const SideNav = () => {
  const t = useTranslations("survey.create.sidebar");
  
  const questionTypes: QuestionType[] = [
    {
      id: "multiple-choice",
      title: t("questionTypes.multipleChoice.title"),
      subtitle: t("questionTypes.multipleChoice.subtitle"),
      icon: MultiChoiceSVG,
      category: "choice",
    },
    {
      id: "yes-no",
      title: t("questionTypes.yesNo.title"),
      subtitle: t("questionTypes.yesNo.subtitle"),
      icon: YesNoSVG,
      category: "choice",
    },
    {
      id: "rating-scale",
      title: t("questionTypes.ratingScale.title"),
      subtitle: t("questionTypes.ratingScale.subtitle"),
      icon: RatingQSVG,
      category: "rating",
    },
    {
      id: "text",
      title: t("questionTypes.text.title"),
      subtitle: t("questionTypes.text.subtitle"),
      icon: ShortTextSVG,
      category: "text",
    },
  ];

  const choiceQuestions = questionTypes.filter((q) => q.category === "choice");
  const ratingQuestions = questionTypes.filter((q) => q.category === "rating");
  const textQuestions = questionTypes.filter((q) => q.category === "text");
  return (
    <div className="w-80 bg-white border-r border-[#E2E8F0] p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Choice Questions */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
            {t("choiceQuestions")}
          </h3>
          <div className="space-y-3">
            {choiceQuestions.map((question) => {
              return <QuestionCard key={question.id} question={question} />;
            })}
          </div>
        </div>

        {/* Ratings Questions */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
            {t("ratingsQuestions")}
          </h3>
          <div className="space-y-3">
            {ratingQuestions.map((question) => {
              const Icon = question.icon;
              return <QuestionCard key={question.id} question={question} />;
            })}
          </div>
        </div>

        {/* Text Questions */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
            {t("textQuestions")}
          </h3>
          <div className="space-y-3">
            {textQuestions.map((question) => {
              const Icon = question.icon;
              return <QuestionCard key={question.id} question={question} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
