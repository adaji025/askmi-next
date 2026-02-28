import React from "react";
import { useTranslations } from "next-intl";

const SurveyQuestions = () => {
  const t = useTranslations("campaign.detail");
  
  return (
    <div className="space-y-10 bg-white p-4 lg:p-6 rounded-md">
      <h2 className="text-lg font-bold text-black">{t("surveyQuestions")}</h2>

      {/* Question 1 */}
      <div className="space-y-4">
        <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
          {t("questionOf", { current: 1, total: 2 })}
        </div>
        <h3 className="text-lg font-bold text-black">
          {t("ageGroupQuestion")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["18-24", "25-34", "35-44", "45+"].map((age) => (
            <div
              key={age}
              className="p-4 rounded-lg border border-[#E2E8F0] bg-gray-[#FAFAFA] text-center font-medium text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {age}
            </div>
          ))}
        </div>
      </div>

      {/* Question 2 */}
      <div className="space-y-4">
        <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
          {t("questionOf", { current: 2, total: 2 })}
        </div>
        <h3 className="text-lg font-bold text-black">
          {t("satisfactionQuestion")}
        </h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <div
              key={num}
              className="flex items-center justify-center rounded-lg border border-[#E2E8F0] py-2.5 bg-white text-center font-medium text-sm text-gray-700 hover:border-indigo-100 hover:bg-indigo-50/30 cursor-pointer transition-all"
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestions;
