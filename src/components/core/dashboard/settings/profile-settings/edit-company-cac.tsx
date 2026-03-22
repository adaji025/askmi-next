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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useGetUserProfile } from "@/features/user/use-get-user-details";
import { useUpdateUser } from "@/features/user/use-update-user";

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
          setCompanyCac(user?.companyCAC ?? currentCompanyCac ?? "");
        })
        .catch(() => {
          setCompanyCac(currentCompanyCac ?? "");
        });
    }
  }, [open, getProfile, resetError, currentCompanyCac]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetError();
    }
    onOpenChange(isOpen);
  };

  const handleSave = async () => {
    try {
      await updateUser({ companyCAC: companyCac.trim() });
      onSave?.(companyCac.trim());
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
              disabled={isProfileLoading}
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

export default EditCompanyCacDialog;

