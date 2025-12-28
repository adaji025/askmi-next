import { Switch } from "@/components/ui/switch"
import { SettingsItem } from "./settings-item"

export function PreferencesSettings() {
  return (
    <div className="space-y-6 pt-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Preferences</h2>
      </div>

      <div className="space-y-1">
        <SettingsItem label="Language" value="English" description="Platform display language" actionLabel="Change" />
        <SettingsItem
          label="Timezone"
          value="Pacific Time (PT)"
          description="Used for campaign scheduling"
          actionLabel="Change"
        />

        <div className="flex items-center justify-between py-6 border-b border-border">
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground">Campaign updates</span>
            <span className="text-xs text-muted-foreground">Get notified about campaign milestones</span>
          </div>
          <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
        </div>

        <div className="flex items-center justify-between py-6 border-b border-border">
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground">Response alerts</span>
            <span className="text-xs text-muted-foreground">Email when target responses are reached</span>
          </div>
          <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
        </div>

        <div className="flex items-center justify-between py-6 border-b border-border last:border-0">
          <div className="grid gap-1">
            <span className="text-sm font-medium text-muted-foreground">Influencer activity</span>
            <span className="text-xs text-muted-foreground">Updates when influencers join campaigns</span>
          </div>
          <Switch className="data-[state=checked]:bg-blue-500" />
        </div>
      </div>
    </div>
  )
}
