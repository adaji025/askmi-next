"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import SurveyQuestions from "./survey-questions";

export default function CampaignDetail() {
  const t = useTranslations("campaign.detail");
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-emerald-100 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-emerald-950">78%</div>
            <div className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest mt-4">
              {t("completed")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-indigo-950">500</div>
            <div className="text-[10px] font-semibold text-indigo-800 uppercase tracking-widest mt-4">
              {t("responses")}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-none shadow-none p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-amber-950">7 days</div>
            <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-widest mt-4">
              {t("left")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Progress */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-black">
            {t("responseProgress")}
          </h2>
          <div className="text-3xl font-bold">
            500 <span className="text-gray-400 font-bold text-lg">/ 1,000</span>
          </div>
        </div>
        <Progress value={50} className="h-4 bg-gray-100" />
      </div>

      {/* Survey Questions */}
      <SurveyQuestions />
    </div>
  );
}
