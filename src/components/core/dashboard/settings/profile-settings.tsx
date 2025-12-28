import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SettingsItem } from "./settings-item";
import { PreferencesSettings } from "./preference-settings";

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">My Profile</h2>
      </div>

      <div className="space-y-1">
        {/* Photo Section */}
        <div className="flex items-center justify-between py-6 border-b border-border">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground w-24">
              Photo
            </span>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="DR" />
                <AvatarFallback className="bg-purple-600 text-white text-xs">
                  DR
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                Shown on your brand profile
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs font-semibold bg-transparent"
            >
              Upload
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-xs font-semibold bg-transparent"
            >
              Delete
            </Button>
          </div>
        </div>

        <SettingsItem
          label="Full name"
          value="Sarah Smith"
          description="Your name as it appears to Influencers"
        />
        <SettingsItem
          label="Contact email"
          value="sarahsmith@example.com"
          description="Primary email for platform communications"
        />
        <SettingsItem
          label="Company"
          value="Acme Corporation"
          description="Your brand or company name"
        />
        <SettingsItem
          label="Phone number"
          value="+1 (555) 123-4567"
          description="For account security and notifications"
        />
      </div>

      <PreferencesSettings />
    </div>
  );
}
