"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "../../../auth/phone-number-input";
import { useTranslations } from "next-intl";
import { useGetUserProfile } from "@/features/user/use-get-user-details";
import { useUpdateUser } from "@/features/user/use-update-user";

const DIAL_CODE_TO_COUNTRY: Record<string, string> = {
  "+1": "US",
  "+972": "IL",
  "+44": "GB",
  "+33": "FR",
  "+49": "DE",
};

interface CountryCode {
  code: string;
  flag: string;
  name: string;
}

const countryCodes: CountryCode[] = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
];

interface EditPhoneNumberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPhoneNumber?: string;
  onSave?: (phoneNumber: string, countryCode: string) => void;
}

export function EditPhoneNumberDialog({
  open,
  onOpenChange,
  currentPhoneNumber = "",
  onSave,
}: EditPhoneNumberDialogProps) {
  const t = useTranslations("profile.dialogs.editPhoneNumber");
  const tCommon = useTranslations("common");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { getProfile, isLoading: isProfileLoading } = useGetUserProfile();
  const {
    updateUser,
    isLoading: isUpdateLoading,
    error: updateError,
    resetError,
  } = useUpdateUser();

  const parsePhoneFromProfile = (fullPhone: string) => {
    const match = fullPhone?.match(/^(\+\d+)/);
    if (match) {
      setCountryCode(match[1]);
      setPhoneNumber(fullPhone.replace(match[1], "").trim().replace(/\D/g, ""));
    } else if (fullPhone) {
      setPhoneNumber(fullPhone.replace(/\D/g, ""));
    }
  };

  useEffect(() => {
    if (open) {
      resetError();
      getProfile()
        .then((res) => {
          const user = res.users?.[0];
          const fullPhone = user?.phoneNumber ?? currentPhoneNumber;
          if (fullPhone) {
            parsePhoneFromProfile(fullPhone);
          } else {
            setCountryCode("+1");
            setPhoneNumber("");
          }
        })
        .catch(() => {
          if (currentPhoneNumber) {
            parsePhoneFromProfile(currentPhoneNumber);
          }
        });
    }
  }, [open, getProfile, resetError, currentPhoneNumber]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetError();
    }
    onOpenChange(isOpen);
  };

  const handleSave = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\D/g, "")}`;
    const countryCodeAlpha = DIAL_CODE_TO_COUNTRY[countryCode] ?? "US";
    try {
      await updateUser({
        phoneNumber: fullPhoneNumber,
        countryCode: countryCodeAlpha,
      });
      onSave?.(phoneNumber, countryCode);
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
            <Label
              htmlFor="phone-number"
              className="text-sm text-muted-foreground"
            >
              {t("label")}
            </Label>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              placeholder={t("placeholder")}
            />
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

export default EditPhoneNumberDialog;
