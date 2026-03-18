"use client";

import { ArrowLeft, CheckCircle2, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCreateSurvey } from "@/features/surveys/use-create-survey";
import { useQuestionStore } from "@/store/qustion-store";
import type { SurveyQuestion } from "@/features/surveys/types";

const CreateSurveyHeader = () => {
  const router = useRouter();
  const t = useTranslations("survey.create.header");
  const { questions, clearQuestions, surveyTitle } = useQuestionStore();
  const { createSurvey, isLoading, error, resetError } = useCreateSurvey();

  const handlePublish = async () => {
    resetError();

    if (questions.length === 0 || !surveyTitle.trim()) {
      return;
    }

    const surveyQuestions: SurveyQuestion[] = questions.map((q) => ({
      type: q.type,
      title: q.title,
      required: q.required,
      ...(q.options && { options: q.options }),
      id: q.id,
      order: q.order,
    }));

    try {
      await createSurvey(surveyQuestions, surveyTitle.trim());
      clearQuestions();
      router.push(`/dashboard/surveys`);
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <>
      {error && (
        <div className="bg-destructive/15 text-destructive px-6 py-3 text-sm flex items-center justify-between">
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetError}
            className="text-destructive hover:bg-destructive/20 h-8"
          >
            Dismiss
          </Button>
        </div>
      )}
      <header className="bg-[#0F172A] px-6 py-4 flex items-center justify-between">
      {/* Left Section - Back Button */}
      <div className="lg:w-[38%]">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 text-black h-10 px-4"
        >
          <ArrowLeft className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">{t("backToSurvey")}</span>
        </Button>
      </div>

      {/* Center Section - Logo */}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="relative">
          <Image src={"/askmi-1.svg"} height={40} width={48} alt="logo" />
        </div>
      </div>

      {/* Right Section - Autosave, Preview, Publish */}
      <div className="flex items-center gap-4">
        {/* Autosave Status */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-[10px] md:text-sm text-gray-400">
            {t("autosaveOn")}
          </span>
        </div>

        {/* Preview Button */}
        <Button
          variant="outline"
          className="bg-gray-700 border-gray-600 rounded-md shadow-sm hover:bg-gray-600 text-white h-10 px-4"
        >
          <Eye className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">{t("preview")}</span>
        </Button>

        {/* Publish Survey Button */}
        <Button
          variant="outline"
          onClick={handlePublish}
          disabled={isLoading || questions.length === 0 || !surveyTitle.trim()}
          className="text-sm bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 text-[#2563EB] h-10 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 md:mr-2 animate-spin text-[#2563EB]" />
          ) : (
            <CheckCircle2 className="h-4 w-4 md:mr-2 text-[#2563EB]" />
          )}
          {isLoading ? t("publishing") : t("publishSurvey")}
        </Button>
      </div>
    </header>
    </>
  );
};

export default CreateSurveyHeader;
