"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  description: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    description: "Platform in English",
    flag: "🇬🇧",
  },
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    description: "הפלטפורמה בעברית",
    flag: "🇮🇱",
  },
];

interface ChangeLangDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLanguage?: string;
  onSave?: (language: string) => void;
}

export function ChangeLangDialog({
  open,
  onOpenChange,
  currentLanguage = "en",
  onSave,
}: ChangeLangDialogProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleSave = () => {
    if (onSave) {
      onSave(selectedLanguage);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Change Language
          </DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Select your preferred language
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setSelectedLanguage(language.code)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all",
                selectedLanguage === language.code
                  ? "border-[#2563EB] bg-[#2563EB]/5"
                  : "border-[#E2E8F0] bg-white hover:border-[#2563EB]/50"
              )}
            >
              <span className="text-2xl shrink-0">{language.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-foreground mb-1">
                  {language.nativeName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {language.description}
                </div>
              </div>
              {selectedLanguage === language.code && (
                <div className="h-5 w-5 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                  <CheckIcon className="h-3 w-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <DialogFooter className="flex-row justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10 px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="h-10 px-6 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeLangDialog;
