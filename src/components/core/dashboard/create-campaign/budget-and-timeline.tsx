"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import { useCampaignForm } from "./campaign-form-context";

interface IProps {
  handleNext: (
    value: "Campaign Setup" | "Budget & Timeline" | "Review"
  ) => void;
}

const BudgetAndTimeline = ({ handleNext }: IProps) => {
  const { updateFormData, formData } = useCampaignForm();
  const [startDate, setStartDate] = useState<Date | undefined>(
    formData.startDate ? new Date(formData.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    formData.endDate ? new Date(formData.endDate) : undefined
  );
  const [matchingType, setMatchingType] = useState<"automatic" | "manual">();
  const [numberOfQuestions, setNumberOfQuestions] = useState<
    number | undefined
  >(formData.totalQuestions);

  // Sync default start date (today) to formData when not set
  useEffect(() => {
    if (!formData.startDate) {
      const today = new Date();
      updateFormData({ startDate: today.toISOString() });
    }
  }, []);

  // Sync numberOfQuestions from formData when it changes (e.g. from setup)
  useEffect(() => {
    setNumberOfQuestions(formData.totalQuestions);
  }, [formData.totalQuestions]);

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      updateFormData({ startDate: date.toISOString() });
      if (endDate && date > endDate) {
        setEndDate(undefined);
        updateFormData({ endDate: undefined });
      }
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      updateFormData({ endDate: date.toISOString() });
    } else {
      updateFormData({ endDate: undefined });
    }
  };

  const handleNumberOfQuestionsChange = (value: number | undefined) => {
    if (value == null || value === 0) {
      setNumberOfQuestions(undefined);
      updateFormData({ totalQuestions: undefined });
      return;
    }
    const num = Math.max(1, Math.min(1000, value));
    setNumberOfQuestions(num);
    updateFormData({ totalQuestions: num });
  };

  return (
    <div className="p-4 sm:p-6 lg:px-8 bg-white space-y-12 rounded-lg border border-[#E2E8F0]! shadow-none!">
      {/* Budget & Timeline Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Budget & Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="start-date"
              className="text-sm font-semibold text-muted-foreground"
            >
              Start date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-white",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd-MM-yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="end-date"
              className="text-sm font-semibold text-muted-foreground"
            >
              End date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-white",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd-MM-yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  disabled={(date) =>
                    startDate ? date < startDate : false
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
      <div className="space-y-2">
        <Label
          htmlFor="number-of-questions"
          className="text-sm font-semibold text-muted-foreground"
        >
          Number of questions
        </Label>
        <Input
          id="number-of-questions"
          type="number"
          min={1}
          max={100}
          placeholder="Enter number"
          value={numberOfQuestions ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              handleNumberOfQuestionsChange(undefined);
              return;
            }
            const val = parseInt(raw, 10);
            if (!isNaN(val)) handleNumberOfQuestionsChange(val);
          }}
          className="h-12 bg-white"
        />
      </div>

      {/* Influencer Matching Section */}
      <section className="space-y-6 block">
        <h2 className="text-xl font-bold tracking-tight">
          Influencer Matching
        </h2>
        <button
          onClick={() => setMatchingType("automatic")}
          className={cn(
            "w-full flex items-start gap-4 p-6 rounded-xl border transition-all text-left",
            matchingType === "automatic"
              ? "border-primary bg-primary/5"
              : "border-border bg-white hover:border-primary/50"
          )}
        >
          <div
            className={cn(
              "w-3 h-3 rounded-full mt-1 shrink-0",
              matchingType === "automatic"
                ? "bg-primary"
                : "bg-muted-foreground/30"
            )}
          />
          <div className="flex-1">
            <h3 className="font-bold mb-1">Automatic</h3>
            <p className="text-sm text-muted-foreground">
              Use our AI-powered matching
            </p>
          </div>
        </button>
      </section>

      {/* Action Footer */}
      <div className="flex justify-between pt-4">
        <Button
          variant={"outline"}
          onClick={() => handleNext("Campaign Setup")}
          className="px-10 h-12 text-base font-semibold text-[#2563EB] border-[#2563EB] hover:bg-[#2563EB]/10 rounded-lg transition-all active:scale-95"
        >
          Back
        </Button>
        <Button
          onClick={() => handleNext("Review")}
          disabled={!startDate || !endDate || numberOfQuestions == null}
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BudgetAndTimeline;
