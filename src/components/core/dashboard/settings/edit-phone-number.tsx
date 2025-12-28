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

function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  placeholder = "123 - 456 - 789",
  className,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countryCodes.find((c) => c.code === countryCode);

  return (
    <div
      className={cn(
        "flex items-center h-10 rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 px-3 h-full border-r border-input hover:bg-muted/50 transition-colors"
          >
            <span className="text-base">{selectedCountry?.flag}</span>
            <span className="text-sm font-medium">{countryCode}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" align="start">
          <div className="max-h-60 overflow-y-auto">
            {countryCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onCountryCodeChange(country.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-muted transition-colors",
                  countryCode === country.code && "bg-muted"
                )}
              >
                <span className="text-base">{country.flag}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{country.code}</span>
                  <span className="text-xs text-muted-foreground">
                    {country.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
      />
    </div>
  );
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
            Edit phone number
          </DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Update your contact number
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone-number" className="text-sm text-muted-foreground">
              Phone number
            </Label>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              placeholder="123 - 456 - 789"
            />
          </div>
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

export default EditPhoneNumberDialog;
