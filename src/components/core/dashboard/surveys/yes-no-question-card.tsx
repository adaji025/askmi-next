"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { YesNoSVG } from "../svg";

interface YesNoQuestionCardProps {
  questionNumber?: number;
}

const YesNoQuestionCard = ({ questionNumber = 3 }: YesNoQuestionCardProps) => {
  const [question, setQuestion] = useState("");

  return (
    <div className="relative max-w-100 w-full mx-auto mt-5">
      {/* Question Type Indicator and Tab */}
      <div className="absolute -top-7 left-4 z-10 flex gap-1 items-end">
        {/* Blue Tab with Thumbs Up Icon */}
        <div className="bg-[#2563EB]/20 text-white px-3 py-0.5 rounded-t-xl flex items-center justify-center">
          <YesNoSVG />
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
      </Card>
    </div>
  );
};

export default YesNoQuestionCard;
