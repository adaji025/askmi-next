"use client";

import { useState } from "react";
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
import { useTranslations } from "next-intl";

interface EditCompanyCacDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCompanyCac?: string;
  onSave?: (companyCac: string) => void;
}

export function EditCompanyCacDialog({
  open,
  onOpenChange,
  currentCompanyCac = "",
  onSave,
}: EditCompanyCacDialogProps) {
  const t = useTranslations("profile.dialogs.editCompanyCac");
  const tCommon = useTranslations("common");
  const [companyCac, setCompanyCac] = useState("");

  // Set company CAC when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setCompanyCac(currentCompanyCac || "");
    }
    onOpenChange(isOpen);
  };

  const handleSave = () => {
    if (onSave && companyCac) {
      onSave(companyCac);
    }
    handleOpenChange(false);
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
            <Label htmlFor="company-cac" className="text-sm text-muted-foreground">
              {t("label")}
            </Label>
            <Input
              id="company-cac"
              type="text"
              value={companyCac}
              onChange={(e) => setCompanyCac(e.target.value)}
              placeholder={t("placeholder")}
              className="h-10"
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

export default EditCompanyCacDialog;

