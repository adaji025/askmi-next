"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingsOption {
  id: number;
  text: string;
}

interface MultiChoiceSettingsCardProps {
  settings?: SettingsOption[];
  onSettingsChange?: (settings: SettingsOption[]) => void;
}

const MultiChoiceSettingsCard = ({
  settings: initialSettings,
  onSettingsChange,
}: MultiChoiceSettingsCardProps) => {
  const [settings, setSettings] = useState<SettingsOption[]>(
    initialSettings || [
      { id: 1, text: "" },
      { id: 2, text: "" },
      { id: 3, text: "" },
      { id: 4, text: "" },
    ]
  );

  const handleSettingsChange = (id: number, text: string) => {
    const updatedSettings = settings.map((setting) =>
      setting.id === id ? { ...setting, text } : setting
    );
    setSettings(updatedSettings);
    onSettingsChange?.(updatedSettings);
  };

  const handleDeleteSettings = (id: number) => {
    const updatedSettings = settings.filter((setting) => setting.id !== id);
    setSettings(updatedSettings);
    onSettingsChange?.(updatedSettings);
  };

  const handleAddSettings = () => {
    const newId = Math.max(...settings.map((a) => a.id), 0) + 1;
    const updatedSettings = [...settings, { id: newId, text: "" }];
    setSettings(updatedSettings);
    onSettingsChange?.(updatedSettings);
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <h3 className="text-sm font-bold text-foreground uppercase">
        Settings Options
      </h3>

      {/* Settings Input Fields */}
      <div className="space-y-3">
        {settings.map((setting, index) => (
          <div key={setting.id} className="flex items-center gap-3">
            <Input
              type="text"
              placeholder={`Settings ${index + 1}`}
              value={setting.text}
              onChange={(e) => handleSettingsChange(setting.id, e.target.value)}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteSettings(setting.id)}
              className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Settings Button */}
      <Button
        variant="outline"
        onClick={handleAddSettings}
        className="w-full border-dashed border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5 hover:text-[#2563EB]"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add settings
      </Button>

      <div className="flex items-center justify-between gap-2 text-sm">
        <div>Required question</div>
        <Switch defaultChecked className="data-[state=checked]:bg-[#2563EB]" />
      </div>
    </div>
  );
};

export default MultiChoiceSettingsCard;
