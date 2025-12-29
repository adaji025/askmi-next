import { Settings } from "lucide-react";
import React from "react";

const FilledSettings = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6 text-[#8B5CF6]" />
        <div className="text-sm font-bold">Question Settings</div>
      </div>
    </div>
  );
};

export default FilledSettings;
