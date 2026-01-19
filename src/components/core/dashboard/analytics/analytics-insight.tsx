"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AnswerOption {
  label: string;
  percentage: number;
}

interface QuestionData {
  questionNumber: number;
  questionText: string;
  answers: AnswerOption[];
  responses: number;
  skipped: number;
  confidence: "High" | "Medium" | "Low";
}

interface AnalyticsInsightProps {
  questions?: QuestionData[];
}

const defaultQuestions: QuestionData[] = [
  {
    questionNumber: 1,
    questionText: "Would you consider buying this product?",
    answers: [
      { label: "Yes", percentage: 42 },
      { label: "No", percentage: 35 },
    ],
    responses: 1247,
    skipped: 2,
    confidence: "High",
  },
  {
    questionNumber: 2,
    questionText: "Which price point feels most appropriate?",
    answers: [
      { label: "$20-$30", percentage: 42 },
      { label: "$30-$40", percentage: 35 },
      { label: "$40-$50", percentage: 35 },
      { label: "$50+", percentage: 35 },
    ],
    responses: 1247,
    skipped: 2,
    confidence: "High",
  },
];

export function AnalyticsInsight({
  questions = defaultQuestions,
}: AnalyticsInsightProps) {
  return (
    <div className="mt-10">
      <div className="mb-4 text-3xl">Survey Questions Insights</div>
      <div className="space-y-6 w-full">
        {questions.map((question, index) => (
          <Card
            key={index}
            className="bg-white rounded-lg border border-[#E2E8F0] shadow-none py-3"
          >
            <CardContent className="p-4">
              {/* Question Header */}
              <div className="flex items-center gap-2 mb-6">
                <Image src={"/askmi-1.svg"} width={20} height={20} alt="askmi" />
                <h3 className="text-base font-semibold text-foreground">
                  Q{question.questionNumber}: {question.questionText}
                </h3>
              </div>

              {/* Answer Options with Bars */}
              <div className="space-y-4 mb-6">
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {answer.label}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {answer.percentage}%
                      </span>
                    </div>
                    <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-[#9333EA] rounded-full transition-all"
                        style={{ width: `${answer.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Statistics */}
              <div className="flex items-center gap-6 pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Responses:{" "}
                    <span className="font-medium text-foreground">
                      {question.responses.toLocaleString()}
                    </span>
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Skipped:{" "}
                  <span className="font-medium text-foreground">
                    {question.skipped}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      question.confidence === "High"
                        ? "bg-green-500"
                        : question.confidence === "Medium"
                          ? "bg-orange-500"
                          : "bg-red-500",
                    )}
                  />
                  <span className="text-sm text-muted-foreground">
                    Confidence:{" "}
                    <span className="font-medium text-green-600">
                      {question.confidence}
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsInsight;
