"use client";

import FilledQuestion from "@/components/core/create-surveys/center-side/filled-question";
import SideNav from "@/components/core/create-surveys/left-side";
import { useQuestionStore } from "@/store/qustion-store";
import EmptyQuestions from "@/components/core/create-surveys/center-side/empty-question";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SettingsPanel } from "@/components/core/create-surveys/settings/settings-panel";
import { useTranslations } from "next-intl";



function CanvasDropZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full min-h-full transition-all duration-200 ${
        isOver
          ? "bg-blue-50/50 ring-2 ring-blue-300 ring-offset-2 rounded-lg"
          : ""
      }`}
    >
      {children}
    </div>
  );
}

export default function CreateSurvey() {
  const t = useTranslations("survey");
  const { questions, addQuestion } = useQuestionStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeQuestionType, setActiveQuestionType] = useState<any>(null);

  console.log(questions)
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveQuestionType(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveQuestionType(null);

    if (!over) return;

    const activeData = active.data.current;
    if (
      activeData?.type === "question-type" &&
      (over.id === "canvas-drop-zone" ||
        over.id === "empty-questions-drop-zone" ||
        over.id === "questions-bottom-drop-zone")
    ) {
      const questionType = activeData.questionType as string;

      // Create default question based on type
      const defaultQuestion = getDefaultQuestion(questionType);
      addQuestion(defaultQuestion);
    }
  };

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
            { id: 3, text: "" },
            { id: 4, text: "" },
          ],
        };
      case "yes-no":
      case "rating-scale":
      case "short-text":
      case "long-text":
      default:
        return baseQuestion;
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-[calc(100vh-80px)] bg-[#FAFAFA]">
        {/* Left Sidebar - Question Types */}
        <SideNav />
        {/* Center Canvas - Survey Builder */}
        <div className="flex-1 p-8 overflow-y-auto relative">
          <CanvasDropZone>
            <div className="max-w-2xl mx-auto min-h-full">
              {questions.length === 0 ? <EmptyQuestions /> : <FilledQuestion />}
            </div>
          </CanvasDropZone>
        </div>

        {/* Right Sidebar - Question Settings */}
        <div className="w-80 bg-white border-l border-[#E2E8F0] p-6 overflow-y-auto">
          <SettingsPanel />
        </div>
      </div>
      <DragOverlay>
        {activeId && activeQuestionType ? (
          <Card className="p-2 shadow-lg border-[#2563EB] border-2 rounded-lg bg-white opacity-90">
            <div className="flex items-center gap-3">
              <div className="bg-[#E4EDFF] h-14 w-14 rounded-md flex justify-center items-center">
                <div className="h-5 w-5 bg-[#2563EB] rounded" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-1">
                  {activeQuestionType.title || t("question")}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {activeQuestionType.subtitle || ""}
                </p>
              </div>
            </div>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
