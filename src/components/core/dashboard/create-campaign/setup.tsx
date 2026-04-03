"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  MapPin,
  Building2,
  User,
  Users,
  Sparkles,
  ChevronDown,
  X,
  Check,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCampaignForm } from "./campaign-form-context";
import { useGetSurveys } from "@/features/surveys/use-get-surveys";
import type { Survey } from "@/features/surveys/types";
import { SurveyDrawer } from "./survey-drawer";

interface IProps {
  handleNext: (
    value: "Campaign Setup" | "Budget & Timeline" | "Review"
  ) => void;
}

export function CampaignSetup({ handleNext }: IProps) {
  const { updateFormData, formData } = useCampaignForm();
  const { getSurveys, isLoading: isSurveysLoading, error: surveysError } =
    useGetSurveys();
  const initialSurveyType: "existing" | "new" =
    formData.surveySource === "existing" ? "existing" : "new";
  const [surveyType, setSurveyType] = useState<"existing" | "new">(
    initialSurveyType
  );
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const SLIDER_MAX = 50000;
  const [votes, setVotes] = useState(
    formData.totalVoteNeeded ? [formData.totalVoteNeeded] : [SLIDER_MAX]
  );
  const [campaignName, setCampaignName] = useState(
    formData.campaignName || ""
  );
  const [description, setDescription] = useState(formData.description || "");
  const [isSurveyDrawerOpen, setIsSurveyDrawerOpen] = useState(false);

  // Sync default votes to formData when not set
  useEffect(() => {
    if (!formData.totalVoteNeeded) {
      updateFormData({ totalVoteNeeded: SLIDER_MAX });
    }
  }, []);

  useEffect(() => {
    getSurveys()
      .then((res) => setSurveys(res.surveys ?? []))
      .catch(() => {
        setSurveys([]);
      });
  }, [getSurveys]);

  useEffect(() => {
    if (!formData.surveyId || surveys.length === 0) return;
    const selectedSurvey = surveys.find((survey) => survey.id === formData.surveyId);
    if (!selectedSurvey) return;
    updateFormData({ totalQuestions: selectedSurvey.questions?.length || 0 });
  }, [formData.surveyId, surveys, updateFormData]);

  // Check if all required data is provided
  const hasTargetAudience = (() => {
    const audience = formData.targetAudience;
    if (!audience) return false;
    const fields = ["region", "city", "age", "gender", "interest"] as const;
    return fields.some((field) => {
      const item = audience[field];
      return item && (item.type === "all" || (item.values?.length ?? 0) > 0);
    });
  })();
  
  const hasNewSurveyDraft =
    !!formData.newSurveyDraft?.title?.trim() &&
    (formData.newSurveyDraft?.questions?.length ?? 0) > 0;

  const isFormValid =
    campaignName.trim().length > 0 &&
    hasTargetAudience &&
    (surveyType === "existing"
      ? !!formData.surveyId
      : hasNewSurveyDraft) &&
    (formData.totalVoteNeeded ?? votes[0]) > 0;

  return (
    <div className="p-4 sm:p-6 lg:px-8 bg-white space-y-12 rounded-lg border border-[#E2E8F0]! shadow-none!">
      {/* Basic Information */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Basic Information</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="campaign-name"
              className="text-sm font-semibold text-muted-foreground"
            >
              Campaign name
            </Label>
            <Input
              id="campaign-name"
              placeholder="Name your campaign"
              className="h-12 bg-white"
              value={campaignName}
              onChange={(e) => {
                setCampaignName(e.target.value);
                updateFormData({ campaignName: e.target.value });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Short description about your campaign"
              className="min-h-30 bg-white resize-none"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                updateFormData({ description: e.target.value });
              }}
            />
          </div>
        </div>
      </section>

      {/* Survey Details */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Survey Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setSurveyType("existing");
              updateFormData({
                surveySource: "existing",
                newSurveyDraft: undefined,
              });
            }}
            className={cn(
              "flex flex-col items-start p-6 rounded-xl border transition-all text-left group",
              surveyType === "existing"
                ? "border-primary bg-primary/5"
                : "border-border bg-white hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "w-3 h-3 rounded-full mb-4",
                surveyType === "existing"
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              )}
            />
            <h3 className="font-bold mb-1">Use existing survey</h3>
            <p className="text-sm text-muted-foreground">
              Choose from your existing surveys
            </p>
          </button>
          <button
            onClick={() => {
              setSurveyType("new");
              updateFormData({
                surveySource: "creating_new",
                surveyId: undefined,
                newSurveyDraft: undefined,
                totalQuestions: undefined,
              });
            }}
            className={cn(
              "flex flex-col items-start p-6 rounded-xl border transition-all text-left group",
              surveyType === "new"
                ? "border-primary bg-primary/5"
                : "border-border bg-white hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "w-3 h-3 rounded-full mb-4",
                surveyType === "new" ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
            <h3 className="font-bold mb-1">Create new survey</h3>
            <p className="text-sm text-muted-foreground">
              Build a new survey from scratch
            </p>
          </button>
        </div>
        {surveyType === "existing" && (
          <div className="space-y-2">
            <Label
              htmlFor="existing-survey-select"
              className="text-sm font-semibold text-muted-foreground"
            >
              Existing Survey
            </Label>
            <Select
              value={formData.surveyId || ""}
              onValueChange={(value) => {
                const selectedSurvey = surveys.find((survey) => survey.id === value);
                updateFormData({
                  surveySource: "existing",
                  surveyId: value,
                  totalQuestions: selectedSurvey?.questions?.length || 0,
                  newSurveyDraft: undefined,
                });
              }}
            >
              <SelectTrigger
                id="existing-survey-select"
                className="h-12 bg-white w-full"
                disabled={isSurveysLoading}
              >
                <SelectValue
                  placeholder={
                    isSurveysLoading ? "Loading surveys..." : "Select a survey"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {surveys.map((survey) => (
                  <SelectItem key={survey.id} value={survey.id}>
                    {survey.title || "Untitled survey"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {surveysError && (
              <p className="text-sm text-destructive">
                Failed to load surveys. Please refresh and try again.
              </p>
            )}
            {!isSurveysLoading && !surveysError && surveys.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No surveys found. Create one first or switch to create new survey.
              </p>
            )}
          </div>
        )}
        {surveyType === "new" && (
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 px-4"
              onClick={() => setIsSurveyDrawerOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {formData.newSurveyDraft ? "Edit survey" : "Build survey"}
            </Button>
            {formData.newSurveyDraft ? (
              <p className="text-sm text-muted-foreground">
                Saved:{" "}
                <span className="font-medium text-foreground">
                  {formData.newSurveyDraft.title}
                </span>{" "}
                ({formData.newSurveyDraft.questions.length} question
                {formData.newSurveyDraft.questions.length === 1 ? "" : "s"}).
                It will be created when you submit the campaign.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Add questions here; the survey is created when you finish the
                campaign.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Target Audience */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Target Audience</h2>
        <div className="flex flex-wrap gap-3">
          <AudienceSelect
            icon={<MapPin className="w-4 h-4" />}
            label="Regions"
            field="region"
            options={[
              "All Regions",
              "North America",
              "South America",
              "Europe",
              "Asia",
              "Africa",
              "Oceania",
            ]}
          />
          <AudienceSelect
            icon={<Building2 className="w-4 h-4" />}
            label="Cities"
            field="city"
            options={[
              "All Cities",
              "New York",
              "Los Angeles",
              "London",
              "Paris",
              "Tokyo",
              "Sydney",
            ]}
          />
          <AudienceSelect
            icon={<User className="w-4 h-4" />}
            label="Ages"
            field="age"
            options={[
              "All Ages",
              "18-24",
              "25-34",
              "35-44",
              "45-54",
              "55-64",
              "65+",
            ]}
          />
          <AudienceSelect
            icon={<Users className="w-4 h-4" />}
            label="Genders"
            field="gender"
            options={["All Genders", "Male", "Female", "Non-binary", "Prefer not to say"]}
          />
          <AudienceSelect
            icon={<Sparkles className="w-4 h-4" />}
            label="Interests"
            field="interest"
            options={[
              "All Interests",
              "Technology",
              "Fashion",
              "Sports",
              "Travel",
              "Food",
              "Music",
              "Gaming",
            ]}
          />
        </div>
      </section>

      {/* Campaign Goals */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold tracking-tight">Campaign Goals</h2>
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <Label className="text-sm font-semibold text-muted-foreground mb-2">
              Total votes needed
            </Label>
            <span className="text-2xl font-bold">
              {votes[0].toLocaleString()}
            </span>
          </div>
          <div className="space-y-4">
            <Slider
              value={votes}
              onValueChange={(newVotes) => {
                setVotes(newVotes);
                updateFormData({ totalVoteNeeded: newVotes[0] });
              }}
              min={50}
              max={SLIDER_MAX}
              step={50}
              className="**:[[role=slider]]:h-5 **:[[role=slider]]:w-5"
            />
            <div className="flex justify-between text-sm font-medium text-muted-foreground/60">
              <span>50</span>
              <span>50,000</span>
            </div>
          </div>

          {/* <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-semibold text-muted-foreground">
                Deviation range
              </Label>
              <HelpCircle className="w-4 h-4 text-primary cursor-help" />
            </div>
            <Select defaultValue="recommended">
              <SelectTrigger className="h-12 bg-white w-full">
                <SelectValue placeholder="Select deviation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">±20% (Recommended)</SelectItem>
                <SelectItem value="strict">±10% (Strict)</SelectItem>
                <SelectItem value="flexible">±30% (Flexible)</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={() => handleNext("Budget & Timeline")}
          disabled={!isFormValid}
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>

      <SurveyDrawer
        open={isSurveyDrawerOpen}
        onOpenChange={setIsSurveyDrawerOpen}
        initialDraft={formData.newSurveyDraft}
        onSaveDraft={(draft) => {
          updateFormData({
            surveySource: "creating_new",
            surveyId: undefined,
            newSurveyDraft: draft,
            totalQuestions: draft.questions.length,
          });
        }}
      />
    </div>
  );
}

function AudienceSelect({
  icon,
  label,
  options,
  field,
}: {
  icon: React.ReactNode;
  label: string;
  options?: string[];
  field: "region" | "city" | "age" | "gender" | "interest";
}) {
  const { updateFormData, formData } = useCampaignForm();
  const [open, setOpen] = useState(false);

  // Get initial values from context
  const getInitialValues = (): string[] => {
    const audience = formData.targetAudience;
    if (!audience) return [];

    const fieldData = audience[field as keyof typeof audience];
    if (!fieldData) return [];

    // If type is "all", return ["All {label}"], otherwise return values
    if (fieldData.type === "all") {
      return [`All ${label}`];
    }
    return fieldData.values || [];
  };

  const [selectedValues, setSelectedValues] = useState<string[]>(() => getInitialValues());

  // Default options if none provided
  const defaultOptions = options || [
    `All ${label}`,
    `Option 1`,
    `Option 2`,
    `Option 3`,
    `Option 4`,
  ];

  const toggleValue = (value: string) => {
    let newValues: string[];

    if (value === `All ${label}`) {
      // If "All" is selected, clear other selections or select all
      if (selectedValues.includes(`All ${label}`)) {
        newValues = [];
      } else {
        newValues = [`All ${label}`];
      }
    } else {
      // Remove "All" if a specific option is selected
      newValues = selectedValues.filter((v) => v !== `All ${label}`);

      if (newValues.includes(value)) {
        newValues = newValues.filter((v) => v !== value);
      } else {
        newValues = [...newValues, value];
      }
    }

    setSelectedValues(newValues);

    // Update context with formatted targetAudience data
    const currentAudience = formData.targetAudience || {};
    const hasAllOption = newValues.includes(`All ${label}`);
    const type: "all" | "custom" = hasAllOption ? "all" : "custom";
    const values = newValues.filter((v) => v !== `All ${label}`);

    updateFormData({
      targetAudience: {
        ...currentAudience,
        [field]: {
          type,
          values: type === "all" ? [] : values,
        },
      },
    });
  };

  const removeValue = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues(selectedValues.filter((v) => v !== value));
  };

  const displayText =
    selectedValues.length === 0
      ? label
      : selectedValues.length === 1
        ? selectedValues[0]
        : `${selectedValues.length} selected`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-auto h-12 px-6 rounded-full bg-white border-border hover:border-primary/50 transition-colors gap-3 group justify-between",
            selectedValues.length > 0 && "border-primary/50 bg-primary/5"
          )}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium">{displayText}</span>
          </div>
          <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 max-h-80 flex flex-col" align="start">
        <div className="overflow-y-auto max-h-60 p-2">
          <div className="space-y-1">
            {defaultOptions.map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => toggleValue(option)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted",
                    isSelected && "bg-primary/10"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center",
                        isSelected
                          ? "bg-primary border-primary"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {selectedValues.length > 0 && (
          <div className="mt-auto p-2 pt-3 border-t bg-muted/30">
            <div className="flex flex-wrap gap-1.5">
              {selectedValues.map((value) => (
                <Badge
                  key={value}
                  variant="secondary"
                  className="text-xs px-2 py-1 pr-1 flex items-center gap-1"
                >
                  {value}
                  <button
                    onClick={(e) => removeValue(value, e)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
