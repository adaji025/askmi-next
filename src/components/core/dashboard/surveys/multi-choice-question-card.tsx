"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultiChoiceSVG, SmallMultiChoiceSVG } from "../svg";

interface MultiChoiceCardProps {
  questionNumber?: number;
}

const MultiChoiceQuestionCard = ({
  questionNumber = 1,
}: MultiChoiceCardProps) => {
  const [question, setQuestion] = useState({
    title: "",
    options: [
      { id: 1, text: "Answer 1" },
      { id: 2, text: "Answer 2" },
      { id: 3, text: "Answer 3" },
      { id: 4, text: "Answer 4" },
    ],
    isRequired: false,
  });

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleAnswerChange = (id: number, text: string) => {
    setQuestion({
      ...question,
      options: question.options.map((option) =>
        option.id === id ? { ...option, text } : option
      ),
    });
  };

  return (
    <div className="relative max-w-100 mx-auto mt-5">
      {/* Question Tab */}

      <div className="absolute -top-7 left-4 z-10 flex gap-1 items-end">
        <SmallMultiChoiceSVG />
        <div className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-t-xl text-xs font-medium">
          Question {questionNumber}
        </div>
      </div>
      {/* Required Tab */}
      <div className="absolute -top-7 right-6 z-10">
        <div className="text-[#8B5CF6] bg-[#2563EB26] border border-b-0 border-[#2563EB4D] px-4 py-1.5 rounded-xl text-xs font-medium">
          Required
        </div>
      </div>

      {/* Main Card */}
      <Card className="relative border-[#8B5CF6] border rounded-2xl shadow-sm bg-white p-6">
        {/* Question Input */}
        <div className="mb-2">
          <Input
            type="text"
            placeholder="Type your question"
            value={question.title}
            onChange={(e) =>
              setQuestion({ ...question, title: e.target.value })
            }
            className="w-full h-9 text-xs placeholder:text-xs"
          />
        </div>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <div
              key={option.id}
              className="flex items-center gap-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                id={`option-${option.id}`}
                name="answer"
                value={option.id.toString()}
                checked={selectedQuestion === option.id.toString()}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                className="w-4 h-4  text-[#2563EB] border-gray-300 focus:ring-[#2563EB] focus:ring-2"
              />
              <label
                htmlFor={`option-${option.id}`}
                className="flex-1 text-xs cursor-pointer"
              >
                <Input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleAnswerChange(option.id, e.target.value)
                  }
                  className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedQuestion(option.id.toString());
                  }}
                />
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MultiChoiceQuestionCard;
