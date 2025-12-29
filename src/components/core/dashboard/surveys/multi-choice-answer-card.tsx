"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AnswerOption {
  id: number;
  text: string;
}

interface MultiChoiceAnswerCardProps {
  answers?: AnswerOption[];
  onAnswersChange?: (answers: AnswerOption[]) => void;
}

const MultiChoiceAnswerCard = ({
  answers: initialAnswers,
  onAnswersChange,
}: MultiChoiceAnswerCardProps) => {
  const [answers, setAnswers] = useState<AnswerOption[]>(
    initialAnswers || [
      { id: 1, text: "" },
      { id: 2, text: "" },
      { id: 3, text: "" },
    ]
  );

  const handleAnswerChange = (id: number, text: string) => {
    const updatedAnswers = answers.map((answer) =>
      answer.id === id ? { ...answer, text } : answer
    );
    setAnswers(updatedAnswers);
    onAnswersChange?.(updatedAnswers);
  };

  const handleDeleteAnswer = (id: number) => {
    const updatedAnswers = answers.filter((answer) => answer.id !== id);
    setAnswers(updatedAnswers);
    onAnswersChange?.(updatedAnswers);
  };

  const handleAddAnswer = () => {
    const newId = Math.max(...answers.map((a) => a.id), 0) + 1;
    const updatedAnswers = [...answers, { id: newId, text: "" }];
    setAnswers(updatedAnswers);
    onAnswersChange?.(updatedAnswers);
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <h3 className="text-sm font-bold text-foreground uppercase">
        Answer Options
      </h3>

      {/* Answer Input Fields */}
      <div className="space-y-3">
        {answers.map((answer, index) => (
          <div key={answer.id} className="flex items-center gap-3">
            <Input
              type="text"
              placeholder={`Answer ${index + 1}`}
              value={answer.text}
              onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteAnswer(answer.id)}
              className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Answer Button */}
      <Button
        variant="outline"
        onClick={handleAddAnswer}
        className="w-full border-dashed border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5 hover:text-[#2563EB]"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add answer
      </Button>

      <div className="flex items-center justify-between gap-2 text-sm">
        <div>Required question</div>
        <Switch defaultChecked className="data-[state=checked]:bg-[#2563EB]" />
      </div>
    </div>
  );
};

export default MultiChoiceAnswerCard;
