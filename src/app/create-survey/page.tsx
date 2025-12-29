"use client";

import { useState } from "react";
import {
  Radio,
  Circle,
  ThumbsUp,
  FileText,
  MoreVertical,
  Settings,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  ChoiceSVG,
  LongTextSVG,
  MultiChoiceSVG,
  RatingQSVG,
  ShortTextSVG,
  YesNoSVG,
} from "@/components/core/dashboard/svg";
import QuestionCard from "@/components/core/dashboard/surveys/question-card";
import Empty from "@/components/core/dashboard/surveys/empty";

interface QuestionType {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "choice" | "rating" | "text";
}

const questionTypes: QuestionType[] = [
  {
    id: "multiple-choice",
    title: "Multiple Choice",
    subtitle: "Single selection",
    icon: MultiChoiceSVG,
    category: "choice",
  },
  {
    id: "yes-no",
    title: "Yes or No",
    subtitle: "Binary choice",
    icon: YesNoSVG,
    category: "choice",
  },
  {
    id: "rating-scale",
    title: "Rating Scale",
    subtitle: "1-10",
    icon: RatingQSVG,
    category: "rating",
  },
  {
    id: "short-text",
    title: "Short Text",
    subtitle: "Single line response",
    icon: ShortTextSVG,
    category: "text",
  },
  {
    id: "long-text",
    title: "Long Text",
    subtitle: "Single line response",
    icon: LongTextSVG,
    category: "text",
  },
];

export default function CreateSurvey() {
  const [selectedQuestionType, setSelectedQuestionType] = useState<
    string | null
  >(null);

  const choiceQuestions = questionTypes.filter((q) => q.category === "choice");
  const ratingQuestions = questionTypes.filter((q) => q.category === "rating");
  const textQuestions = questionTypes.filter((q) => q.category === "text");

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#FAFAFA]">
      {/* Left Sidebar - Question Types */}
      <div className="w-80 bg-white border-r border-[#E2E8F0] p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Choice Questions */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
              Choice Questions
            </h3>
            <div className="space-y-3">
              {choiceQuestions.map((question) => {
                return (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onSelect={setSelectedQuestionType}
                  />
                );
              })}
            </div>
          </div>

          {/* Ratings Questions */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
              Ratings Questions
            </h3>
            <div className="space-y-3">
              {ratingQuestions.map((question) => {
                const Icon = question.icon;
                return (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onSelect={setSelectedQuestionType}
                  />
                );
              })}
            </div>
          </div>

          {/* Text Questions */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
              Text Questions
            </h3>
            <div className="space-y-3">
              {textQuestions.map((question) => {
                const Icon = question.icon;
                return (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onSelect={setSelectedQuestionType}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Center Canvas - Survey Builder */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <Empty />
        </div>
      </div>

      {/* Right Sidebar - Question Settings */}
      <div className="w-80 bg-white border-l border-[#E2E8F0] p-6 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <Settings className="h-12 w-12 text-[#8B5CF6] mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Select a question type to see its settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
