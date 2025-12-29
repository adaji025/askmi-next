import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import React from "react";

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  onSelect: (id: string) => void;
}

const QuestionCard = ({ question, onSelect }: QuestionCardProps) => {
  const Icon = question.icon;
  
  return (
    <Card
      className="p-2 cursor-pointer shadow-none hover:border-[#2563EB] transition-all border border-[#E2E8F0] rounded-lg"
      onClick={() => onSelect(question.id)}
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
            <p className="text-xs text-muted-foreground">
              {question.subtitle}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-muted"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </Card>
  );
};

export default QuestionCard;
