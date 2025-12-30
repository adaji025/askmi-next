"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
import { PhoneInput } from "../../../auth/phone-number-input";
import { useTranslations } from "next-intl";

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

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  placeholder?: string;
  className?: string;
}

interface EditPhoneNumberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPhoneNumber?: string;
  onSave?: (phoneNumber: string, countryCode: string) => void;
}

export function EditPhoneNumberDialog({
  open,
  onOpenChange,
  currentPhoneNumber = "+1 (555) 123-4567",
  onSave,
}: EditPhoneNumberDialogProps) {
  const t = useTranslations("profile.dialogs.editPhoneNumber");
  const tCommon = useTranslations("common");
  const [countryCode, setCountryCode] = useState("+972");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Parse current phone number on open
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && currentPhoneNumber) {
      // Extract country code if present
      const match = currentPhoneNumber.match(/^(\+\d+)/);
      if (match) {
        setCountryCode(match[1]);
        setPhoneNumber(currentPhoneNumber.replace(match[1], "").trim());
      } else {
        setPhoneNumber(currentPhoneNumber);
      }
    }
    onOpenChange(isOpen);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(phoneNumber, countryCode);
    }
    onOpenChange(false);
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
          >
            {tCommon("cancel")}
          </Button>
          <Button
            onClick={handleSave}
            className="h-10 px-6 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
          >
            {tCommon("saveChanges")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditPhoneNumberDialog;
