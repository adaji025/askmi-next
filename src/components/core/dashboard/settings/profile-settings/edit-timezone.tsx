"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useGetPreferences } from "@/features/preferences/use-get-preferences";
import { useUpdatePreferences } from "@/features/preferences/use-update-preferences";

interface Timezone {
  value: string;
  label: string;
}

const FALLBACK_TIMEZONES: Timezone[] = [
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Jerusalem", label: "Israel Standard Time (IST)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
];

export function getTimezoneLabel(value: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: value,
      timeZoneName: "long",
    });
    const parts = formatter.formatToParts(new Date());
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    return tzPart?.value ?? value.replace(/_/g, " ");
  } catch {
    return value.replace(/_/g, " ");
  }
}

function getStandardTimezones(): Timezone[] {
  try {
    if (typeof Intl?.supportedValuesOf === "function") {
      const values = Intl.supportedValuesOf("timeZone");
      const filtered = values.filter(
        (tz) => !tz.startsWith("Etc/") && tz !== "UTC"
      );
      return filtered
        .map((value) => ({ value, label: getTimezoneLabel(value) }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }
  } catch {
    // Fallback for older browsers
  }
  return FALLBACK_TIMEZONES;
}

const timezones = getStandardTimezones();

interface EditTimezoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTimezone?: string;
  onSave?: (timezone: string) => void;
}

export function EditTimezoneDialog({
  open,
  onOpenChange,
  currentTimezone = "Pacific Time (PT)",
  onSave,
}: EditTimezoneDialogProps) {
  const t = useTranslations("profile.dialogs.editTimezone");
  const tCommon = useTranslations("common");
  const { getPreferences, isLoading: isProfileLoading } = useGetPreferences();
  const {
    updatePreferences,
    isLoading: isUpdateLoading,
    error: updateError,
    resetError,
  } = useUpdatePreferences();

  const getTimezoneValue = (labelOrValue: string) => {
    const byLabel = timezones.find((tz) => tz.label === labelOrValue)?.value;
    const byValue = timezones.find((tz) => tz.value === labelOrValue)?.value;
    return byLabel ?? byValue ?? "America/Los_Angeles";
  };

  const [selectedTimezone, setSelectedTimezone] = useState(
    getTimezoneValue(currentTimezone)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const filteredTimezones = useMemo(() => {
    if (!searchQuery.trim()) return timezones;
    const q = searchQuery.toLowerCase();
    return timezones.filter(
      (tz) =>
        tz.label.toLowerCase().includes(q) ||
        tz.value.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    if (open) {
      resetError();
      setSearchQuery("");
      getPreferences()
        .then((res) => {
          const tz = res.preferences?.timeZone ?? currentTimezone;
          setSelectedTimezone(getTimezoneValue(tz));
        })
        .catch(() => {
          setSelectedTimezone(getTimezoneValue(currentTimezone));
        });
    }
  }, [open, getPreferences, resetError, currentTimezone]);

  const selectedLabel =
    timezones.find((tz) => tz.value === selectedTimezone)?.label ??
    selectedTimezone;

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetError();
    }
    onOpenChange(isOpen);
  };

  const handleSave = async () => {
    if (!selectedTimezone) return;
    try {
      await updatePreferences({ timeZone: selectedTimezone });
      const label =
        timezones.find((tz) => tz.value === selectedTimezone)?.label ??
        selectedTimezone;
      onSave?.(label);
      onOpenChange(false);
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-base text-foreground">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {updateError && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {updateError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="timezone" className="text-sm text-muted-foreground">
              {t("label")}
            </Label>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="timezone"
                  variant="outline"
                  role="combobox"
                  aria-expanded={popoverOpen}
                  disabled={isProfileLoading}
                  className="h-12 w-full justify-between font-normal"
                >
                  <span className={cn(!selectedLabel && "text-muted-foreground")}>
                    {selectedLabel || t("selectPlaceholder")}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0" align="start">
                <div className="flex items-center border-b px-2">
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 border-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                <div className="max-h-64 overflow-auto p-1">
                  {filteredTimezones.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      {t("noResults")}
                    </div>
                  ) : (
                    filteredTimezones.map((timezone) => (
                      <button
                        key={timezone.value}
                        type="button"
                        onClick={() => {
                          setSelectedTimezone(timezone.value);
                          setPopoverOpen(false);
                          setSearchQuery("");
                        }}
                        className={cn(
                          "flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                          selectedTimezone === timezone.value && "bg-accent"
                        )}
                      >
                        {timezone.label}
                      </button>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10 px-6"
            disabled={isUpdateLoading}
          >
            {tCommon("cancel")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isProfileLoading || isUpdateLoading}
            className="h-10 px-6 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
          >
            {isUpdateLoading ? "Saving..." : tCommon("saveChanges")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTimezoneDialog;

