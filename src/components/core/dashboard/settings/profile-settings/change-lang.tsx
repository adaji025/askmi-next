"use client";

import { useState, useEffect } from "react";
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
import { useLanguageStore } from "@/store/language-store";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useGetUserProfile } from "@/features/user/use-get-user-details";
import { useUpdateUser } from "@/features/user/use-update-user";

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
  currentLanguage,
  onSave,
}: ChangeLangDialogProps) {
  const { language, setLanguage } = useLanguageStore();
  const t = useTranslations();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || language);
  const { getProfile, isLoading: isProfileLoading } = useGetUserProfile();
  const {
    updateUser,
    isLoading: isUpdateLoading,
    error: updateError,
    resetError,
  } = useUpdateUser();

  useEffect(() => {
    if (open) {
      resetError();
      getProfile()
        .then((res) => {
          const user = res.users?.[0];
          const lang = user?.lang ?? currentLanguage ?? language;
          setSelectedLanguage(lang);
        })
        .catch(() => {
          setSelectedLanguage(currentLanguage ?? language);
        });
    }
  }, [open, getProfile, resetError, currentLanguage, language]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetError();
    }
    onOpenChange(isOpen);
  };

  const handleSave = async () => {
    try {
      await updateUser({ lang: selectedLanguage });
      setLanguage(selectedLanguage as "en" | "he");
      onSave?.(selectedLanguage);
      onOpenChange(false);
      router.refresh();
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t("language.changeLanguage")}
          </DialogTitle>
          <DialogDescription className="text-base text-foreground">
            {t("language.selectLanguage")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {updateError && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {updateError}
            </div>
          )}
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              disabled={isProfileLoading}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all rtl:text-right",
                selectedLanguage === lang.code
                  ? "border-[#2563EB] bg-[#2563EB]/5"
                  : "border-[#E2E8F0] bg-white hover:border-[#2563EB]/50"
              )}
            >
              <span className="text-2xl shrink-0">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-foreground mb-1">
                  {lang.nativeName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {lang.code === "en"
                    ? t("language.platformInEnglish")
                    : t("language.platformInHebrew")}
                </div>
              </div>
              {selectedLanguage === lang.code && (
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
            disabled={isUpdateLoading}
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isProfileLoading || isUpdateLoading}
            className="h-10 px-6 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
          >
            {isUpdateLoading ? "Saving..." : t("language.saveChanges")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeLangDialog;
