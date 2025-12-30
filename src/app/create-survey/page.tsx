"use client";

import EmptySettings from "@/components/core/create-surveys/settings/empty-settings";
import FilledQuestion from "@/components/core/create-surveys/filled-question";
import FilledSettings from "@/components/core/create-surveys/settings/filled-settings";
import SideNav from "@/components/core/create-surveys/side-nav";

export default function CreateSurvey() {
  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#FAFAFA]">
      {/* Left Sidebar - Question Types */}
      <SideNav />
      
      {/* Center Canvas - Survey Builder */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* <EmptyQuestions /> */}
          <FilledQuestion />
        </div>
      </div>

      {/* Right Sidebar - Question Settings */}
      <div className="w-80 bg-white border-l border-[#E2E8F0] p-6 overflow-y-auto">
        <FilledSettings />
        {/* <EmptySettings /> */}
      </div>
    </div>
  );
}
