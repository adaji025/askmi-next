"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreVertical, Plus } from "lucide-react";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useQuestionStore } from "@/store/qustion-store";

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const Icon = question.icon;
  const addQuestion = useQuestionStore((state) => state.addQuestion);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `question-type-${question.id}`,
      data: {
        type: "question-type",
        questionType: question.id,
        title: question.title,
        subtitle: question.subtitle,
      },
    });

  const getDefaultQuestion = (type: string) => {
    const baseQuestion = {
      type: type as any,
      title: "",
      required: false,
    };

    switch (type) {
      case "multiple-choice":
        return {
          ...baseQuestion,
          options: [
            { id: 1, text: "" },
            { id: 2, text: "" },
          ],
        };
      case "yes-no":
      case "rating-scale":
      case "text":
      default:
        return baseQuestion;
    }
  };

  const handleAddQuestion = () => {
    const defaultQuestion = getDefaultQuestion(question.id);
    addQuestion(defaultQuestion);
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.4 : 1,
        transition: isDragging ? "none" : "opacity 0.2s",
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-2 cursor-grab active:cursor-grabbing shadow-none hover:border-[#2563EB] transition-all border border-[#E2E8F0] rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="mt-1 bg-[#E4EDFF] h-14 w-14 rounded-md flex justify-center items-center">
            <Icon className="h-5 w-5 text-[#2563EB]" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold text-foreground mb-1">
              {question.title}
            </h4>
            <p className="text-xs text-muted-foreground">{question.subtitle}</p>
          </div>
        </div>
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              handleAddQuestion();
            }}
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
