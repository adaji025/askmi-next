"use client";

import type React from "react";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface IProps {
  handleNext: (
    value: "Campaign Setup" | "Budget & Timeline" | "Review"
  ) => void;
}
export function CampaignSetup({ handleNext }: IProps) {
  const [surveyType, setSurveyType] = useState<"existing" | "new">("existing");
  const [votes, setVotes] = useState([25000]);

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
            />
          </div>
        </div>
      </section>

      {/* Survey Details */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Survey Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSurveyType("existing")}
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
            onClick={() => setSurveyType("new")}
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
      </section>

      {/* Target Audience */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Target Audience</h2>
        <div className="flex flex-wrap gap-3">
          <AudienceSelect
            icon={<MapPin className="w-4 h-4" />}
            label="Regions"
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
            options={["All Genders", "Male", "Female", "Non-binary", "Prefer not to say"]}
          />
          <AudienceSelect
            icon={<Sparkles className="w-4 h-4" />}
            label="Interests"
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
              onValueChange={setVotes}
              min={50}
              max={50000}
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
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

function AudienceSelect({
  icon,
  label,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  options?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Default options if none provided
  const defaultOptions = options || [
    `All ${label}`,
    `Option 1`,
    `Option 2`,
    `Option 3`,
    `Option 4`,
  ];

  const toggleValue = (value: string) => {
    if (value === `All ${label}`) {
      // If "All" is selected, clear other selections or select all
      if (selectedValues.includes(`All ${label}`)) {
        setSelectedValues([]);
      } else {
        setSelectedValues([`All ${label}`]);
      }
    } else {
      // Remove "All" if a specific option is selected
      const newValues = selectedValues.filter((v) => v !== `All ${label}`);
      
      if (newValues.includes(value)) {
        setSelectedValues(newValues.filter((v) => v !== value));
      } else {
        setSelectedValues([...newValues, value]);
      }
    }
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
