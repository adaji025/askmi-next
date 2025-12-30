"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Trash2, Users } from "lucide-react";
import { useTranslations } from "next-intl";

interface SurveyCardProps {
  title: string;
  status: "published" | "draft";
  daysAgo: number;
  questionsCount: number;
}

const SurveyCard = ({ title, status, daysAgo, questionsCount }: SurveyCardProps) => {
  const t = useTranslations("survey.card");

  return (
    <Card className="bg-white rounded-md border p-0 border-[#E2E8F0] shadow-none">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Status Badge */}
          <Badge
            className={`rounded px-2 py-0.5 text-[10px] font-medium ${
              status === "published"
                ? "bg-[#DCFCE7] text-[#16A34A] border-[#4AC36026] rounded"
                : "bg-[#F3F4F6] text-[#6B7280] border-[#8E8E8E26]"
            }`}
          >
            {status === "published" ? t("published") : t("draft")}
          </Badge>

          {/* Title */}
          <h3 className="text-base font-bold text-black">{title}</h3>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center  gap-1.5">
              <Calendar className="h-3 w-3" />
              <span>
                <strong className="text-foreground">
                  {t("createdDaysAgo", { days: daysAgo })}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3" />
              <span>{t("questions", { count: questionsCount })}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 px-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 bg-white text-sm border rounded border-[#EBEBEB] hover:bg-muted text-foreground"
        >
          {t("edit")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-12 p-0 bg-white border border-[#E2E8F0] hover:bg-muted text-foreground rounded"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SurveyCard;
