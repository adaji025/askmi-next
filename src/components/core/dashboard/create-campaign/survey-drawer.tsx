"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { NewSurveyDraft, SurveyQuestion } from "@/features/surveys/types";

type DraftQuestionType = "multiple-choice" | "yes-no" | "rating-scale" | "text";

interface DraftQuestion {
  id: string;
  type: DraftQuestionType;
  title: string;
  required: boolean;
  options: string[];
}

function surveyQuestionsToDraft(questions: SurveyQuestion[]): DraftQuestion[] {
  return questions.map((q) => ({
    id: q.id,
    type: q.type,
    title: q.title,
    required: q.required,
    options:
      q.type === "multiple-choice" && q.options && q.options.length > 0
        ? q.options.map((o) => o.text)
        : ["", ""],
  }));
}

function mapDraftsToSurveyQuestions(drafts: DraftQuestion[]): SurveyQuestion[] {
  const valid = drafts.filter((q) => q.title.trim());
  return valid.map((question, index) => {
    const mapped: SurveyQuestion = {
      id: question.id,
      type: question.type,
      title: question.title.trim(),
      required: question.required,
      order: index + 1,
    };
    if (question.type === "multiple-choice") {
      mapped.options = question.options
        .filter((option) => option.trim().length > 0)
        .map((option, optionIndex) => ({
          id: optionIndex + 1,
          text: option.trim(),
        }));
    }
    return mapped;
  });
}

interface SurveyDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDraft: NewSurveyDraft | undefined;
  onSaveDraft: (draft: NewSurveyDraft) => void;
}

const createDraftQuestion = (): DraftQuestion => ({
  id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type: "text",
  title: "",
  required: false,
  options: ["", ""],
});

export function SurveyDrawer({
  open,
  onOpenChange,
  initialDraft,
  onSaveDraft,
}: SurveyDrawerProps) {
  const [newSurveyTitle, setNewSurveyTitle] = useState("");
  const [draftQuestions, setDraftQuestions] = useState<DraftQuestion[]>([
    createDraftQuestion(),
  ]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const prevOpen = useRef(false);

  const resetLocalForm = () => {
    setNewSurveyTitle("");
    setDraftQuestions([createDraftQuestion()]);
    setValidationError(null);
  };

  useEffect(() => {
    if (open && !prevOpen.current) {
      if (
        initialDraft &&
        (initialDraft.title.trim() || initialDraft.questions.length > 0)
      ) {
        setNewSurveyTitle(initialDraft.title);
        setDraftQuestions(
          initialDraft.questions.length > 0
            ? surveyQuestionsToDraft(initialDraft.questions)
            : [createDraftQuestion()]
        );
      } else {
        resetLocalForm();
      }
    }
    if (!open && prevOpen.current) {
      setValidationError(null);
    }
    prevOpen.current = open;
  // Re-hydrate from `initialDraft` only when the sheet opens (see `prevOpen`).
  // eslint-disable-next-line react-hooks/exhaustive-deps -- `initialDraft` intentionally omitted
  }, [open]);

  const updateDraftQuestion = (
    id: string,
    updates: Partial<Omit<DraftQuestion, "id">>
  ) => {
    setDraftQuestions((prev) =>
      prev.map((question) =>
        question.id === id ? { ...question, ...updates } : question
      )
    );
  };

  const addDraftQuestion = () => {
    setDraftQuestions((prev) => [...prev, createDraftQuestion()]);
  };

  const removeDraftQuestion = (id: string) => {
    setDraftQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    setDraftQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) return question;
        const nextOptions = [...question.options];
        nextOptions[optionIndex] = value;
        return { ...question, options: nextOptions };
      })
    );
  };

  const addOption = (questionId: string) => {
    setDraftQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? { ...question, options: [...question.options, ""] }
          : question
      )
    );
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setDraftQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== questionId || question.options.length <= 2) {
          return question;
        }
        return {
          ...question,
          options: question.options.filter((_, index) => index !== optionIndex),
        };
      })
    );
  };

  const closeDrawer = () => {
    onOpenChange(false);
  };

  const handleSaveDraft = () => {
    setValidationError(null);
    const sanitizedTitle = newSurveyTitle.trim();
    if (!sanitizedTitle) {
      setValidationError("Survey title is required.");
      return;
    }

    const questions = mapDraftsToSurveyQuestions(draftQuestions);
    if (questions.length === 0) {
      setValidationError("Add at least one question with a title.");
      return;
    }

    onSaveDraft({ title: sanitizedTitle, questions });
    onOpenChange(false);
    resetLocalForm();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="border-b">
          <SheetTitle>New survey</SheetTitle>
          <SheetDescription>
            Your survey is saved with this campaign and will be created when you
            submit.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="new-survey-title">Survey title</Label>
            <Input
              id="new-survey-title"
              value={newSurveyTitle}
              onChange={(e) => setNewSurveyTitle(e.target.value)}
              placeholder="e.g. Product Feedback Q2"
            />
          </div>

          <div className="space-y-4">
            {draftQuestions.map((question, index) => (
              <div
                key={question.id}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Question {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDraftQuestion(question.id)}
                    disabled={draftQuestions.length === 1}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Question title</Label>
                  <Input
                    value={question.title}
                    onChange={(e) =>
                      updateDraftQuestion(question.id, {
                        title: e.target.value,
                      })
                    }
                    placeholder="Type your question"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Question type</Label>
                    <Select
                      value={question.type}
                      onValueChange={(value: DraftQuestionType) =>
                        updateDraftQuestion(question.id, {
                          type: value,
                          options:
                            value === "multiple-choice" ? question.options : [],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="multiple-choice">
                          Multiple choice
                        </SelectItem>
                        <SelectItem value="yes-no">Yes/No</SelectItem>
                        <SelectItem value="rating-scale">
                          Rating scale
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Required</Label>
                    <div className="h-10 px-3 border rounded-md flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Make question required
                      </span>
                      <Switch
                        checked={question.required}
                        onCheckedChange={(checked) =>
                          updateDraftQuestion(question.id, {
                            required: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {question.type === "multiple-choice" && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={`${question.id}-option-${optionIndex}`}
                          className="flex items-center gap-2"
                        >
                          <Input
                            value={option}
                            onChange={(e) =>
                              updateOption(
                                question.id,
                                optionIndex,
                                e.target.value
                              )
                            }
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeOption(question.id, optionIndex)
                            }
                            disabled={question.options.length <= 2}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add option
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addDraftQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              Add another question
            </Button>
          </div>

          {validationError && (
            <p className="text-sm text-destructive">{validationError}</p>
          )}
        </div>
        <SheetFooter className="border-t gap-3">
          <div className="flex gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={closeDrawer}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1"
            >
              Save with campaign
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
