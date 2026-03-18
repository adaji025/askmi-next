"use client";

import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SurveyCard from "@/components/core/dashboard/survey/survey-card";
import Link from "next/link";
import { useTranslations } from "next-intl";
import NewSurveyCard from "@/components/core/dashboard/survey/new-survey-card";
import { useGetSurveys } from "@/features/surveys/use-get-surveys";
import type { Survey } from "@/features/surveys/types";
import { differenceInDays } from "date-fns";

export default function Surveys() {
  const t = useTranslations("survey.page");
  const { getSurveys, isLoading, error } = useGetSurveys();
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    getSurveys()
      .then((res) => setSurveys(res.surveys))
      .catch(() => {});
  }, [getSurveys]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            className="pl-9 h-11 bg-white rounded-md"
          />
        </div>
        <Link href={"/create-survey"}>
          <Button className="h-11 px-6 cursor-pointer bg-[#2563EB] hover:bg-[#2563EB]/90 text-white rounded-md">
            <Plus className="h-5 w-5" />
            {t("newSurvey")}
          </Button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Survey Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Loading state */}
        {isLoading && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Loading surveys...
          </div>
        )}

        {/* Published and Draft Survey Cards */}
        {!isLoading &&
          surveys.map((survey) => (
            <SurveyCard
              key={survey.id}
              title={survey.title}
              status={survey.status ?? "draft"}
              daysAgo={
                survey.createdAt
                  ? differenceInDays(new Date(), new Date(survey.createdAt))
                  : 0
              }
              questionsCount={survey.questions?.length ?? 0}
            />
          ))}

        {/* New Survey Card */}
        {!isLoading && <NewSurveyCard />}
      </div>
    </div>
  );
}
