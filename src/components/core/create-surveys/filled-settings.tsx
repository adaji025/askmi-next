import { Settings } from "lucide-react";
import MultiChoiceSettingsCard from "./multi-choice-settings-card";

const FilledSettings = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-6 w-6 text-[#8B5CF6]" />
        <div className="text-sm font-bold">Question Settings</div>
      </div>
      <MultiChoiceSettingsCard />
    </div>
  );
};

export default FilledSettings;
