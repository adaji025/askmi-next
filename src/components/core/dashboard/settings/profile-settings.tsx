"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import ChangeLangDialog from "./change-lang";
import EditPhoneNumberDialog from "./edit-phone-number";

export function ProfileSettings() {
  const [openLangDialog, setOpenLangDialog] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("+1 (555) 123-4567");

  return (
    <div className="space-y-6">
      <ChangeLangDialog
        open={openLangDialog}
        onOpenChange={setOpenLangDialog}
        currentLanguage={currentLanguage}
        onSave={(lang) => setCurrentLanguage(lang)}
      />
      <EditPhoneNumberDialog
        open={openPhoneDialog}
        onOpenChange={setOpenPhoneDialog}
        currentPhoneNumber={currentPhoneNumber}
        onSave={(phoneNumber, countryCode) => {
          setCurrentPhoneNumber(`${countryCode} ${phoneNumber}`);
        }}
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-foreground">My Profile</h2>
      </div>

      <Table>
        <TableBody>
          {/* Photo Section */}
          <TableRow className="border-b border-[#E2E8F0]">
            <TableCell className="py-6">
              <span className="text-sm font-medium text-muted-foreground">
                Photo
              </span>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-linear-to-br from-purple-400 to-pink-400">
                  <AvatarFallback className="text-white font-semibold text-sm">
                    DR
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  Shown on your brand profile
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  Upload
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>

          {/* Full name */}
          <TableRow className="border-b border-[#E2E8F0]">
            <TableCell className="py-6 w-1/3">
              <span className="text-sm font-medium text-muted-foreground">
                Full name
              </span>
            </TableCell>
            <TableCell className="py-6 w-1/3">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  Sarah Smith
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Your name as it appears to influencers
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right w-1/3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>

          {/* Contact email */}
          <TableRow className="border-b border-[#E2E8F0]">
            <TableCell className="py-6">
              <span className="text-sm font-medium text-muted-foreground">
                Contact email
              </span>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  Sarahsmith@example.com
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Primary email for platform communications
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>

          {/* Company */}
          <TableRow className="border-b border-[#E2E8F0]">
            <TableCell className="py-6">
              <span className="text-sm font-medium text-muted-foreground">
                Company
              </span>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  Acme Corporation
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  Your brand or company name
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>

          {/* Phone number */}
          <TableRow className="border-b-0">
            <TableCell className="py-6">
              <span className="text-sm font-medium text-muted-foreground">
                Phone number
              </span>
            </TableCell>
            <TableCell className="py-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {currentPhoneNumber}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  For account security and notifications
                </span>
              </div>
            </TableCell>
            <TableCell className="py-6 text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenPhoneDialog(true)}
                className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="space-y-6 pt-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground">Preferences</h2>
        </div>

        <Table>
          <TableBody>
            {/* Language */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Language
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    {currentLanguage === "en" ? "English" : "עברית"}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Platform display language
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenLangDialog(true)}
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  Change
                </Button>
              </TableCell>
            </TableRow>

            {/* Timezone */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Timezone
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    Pacific Time (PT)
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Used for campaign scheduling
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground"
                >
                  Change
                </Button>
              </TableCell>
            </TableRow>

            {/* Campaign updates */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Campaign updates
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <span className="text-xs text-muted-foreground">
                  Get notified about campaign milestones
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#2563EB]"
                />
              </TableCell>
            </TableRow>

            {/* Response alerts */}
            <TableRow className="border-b border-[#E2E8F0]">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Response alerts
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <span className="text-xs text-muted-foreground">
                  Email when target responses are reached
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-[#2563EB]"
                />
              </TableCell>
            </TableRow>

            {/* Influencer activity */}
            <TableRow className="border-b-0">
              <TableCell className="py-6 w-1/3">
                <span className="text-sm font-medium text-muted-foreground">
                  Influencer activity
                </span>
              </TableCell>
              <TableCell className="py-6 w-1/3">
                <span className="text-xs text-muted-foreground">
                  Updates when influencers join campaigns
                </span>
              </TableCell>
              <TableCell className="py-6 text-right w-1/3">
                <Switch className="data-[state=checked]:bg-[#2563EB]" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
