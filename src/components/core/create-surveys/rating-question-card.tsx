"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

interface RatingQuestionCardProps {
  questionNumber?: number;
}

const RatingQuestionCard = ({
  questionNumber = 2,
}: RatingQuestionCardProps) => {
  const [question, setQuestion] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  return (
    <div className="relative max-w-100 mx-auto mt-5">
      {/* Question Type Indicator and Tab */}
      <div className="absolute -top-7 left-4 z-10 flex gap-1 items-end">
        {/* Blue Tab with Thumbs Up Icon */}
        <div className="bg-[#2563EB] text-white px-3 py-1.5 rounded-t-xl flex items-center justify-center">
          <ThumbsUp className="h-4 w-4" />
        </div>
        {/* Purple Tab with Question Number */}
        <div className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-t-xl text-xs font-medium">
          Question {questionNumber}
        </div>
      </div>

      {/* Main Card */}
      <Card className="relative border-[#8B5CF6] border rounded-2xl shadow-sm bg-white p-4">
        {/* Question Input */}
        <div className="">
          <Input
            type="text"
            placeholder="Type your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full h-12 text-base"
          />
        </div>

        {/* Rating Scale Options */}
        <div className="flex items-center gap-2 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              variant="outline"
              onClick={() => setSelectedRating(number)}
              className={`h-7 w-7 p-0 rounded-md border text-xs ${
                selectedRating === number
                  ? "bg-[#2563EB] text-white border-[#2563EB]"
                  : "bg-white text-foreground border-gray-300 hover:border-[#2563EB]"
              }`}
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
