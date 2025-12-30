"use client";

import { BillingSettings } from "@/components/core/dashboard/billing/billing-settings";
import { TransactionHistory } from "@/components/core/dashboard/billing/transaction-history";
import { StatCard } from "@/components/core/dashboard/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslations } from "next-intl";

const Billings = () => {
  const t = useTranslations("billing.page");

  const stats = [
    {
      title: t("stats.totalSpend"),
      value: "$5,010",
      bgColor: "bg-[#D8F3DC]", // Light Blue
    },
    {
      title: t("stats.currentMonth"),
      value: "$6,010",
      bgColor: "bg-[#EAF5FF]", // Light Blue
    },
    {
      title: t("stats.avgCostPerVote"),
      value: "$0.5",
      bgColor: "bg-[#F0F2FF]", // Light Lavender
    },
    {
      title: t("stats.pending"),
      value: "$1,867",
      bgColor: "bg-[#FDF8E1]", // Light Blue
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <div className="">{t("description")}</div>
        <Button
          size="sm"
          className="bg-[#2563EB] cursor-pointer rounded-md text-sm font-medium px-3 text-white hover:bg-blue-700 border-none shadow-none"
        >
          {t("downloadReport")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-10">
        <BillingSettings />
      </div>

      <div className="mt-6">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Billings;
