"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/language-store";
import { NextIntlClientProvider } from "next-intl";
import enCommon from "@/messages/en/common.json";
import enAuth from "@/messages/en/auth/index.json";
import enLanguage from "@/messages/en/language.json";
import enProfile from "@/messages/en/profile.json";
import enCampaign from "@/messages/en/campaign.json";
import enCampaignPages from "@/messages/en/campaign/index.json";
import enSurvey from "@/messages/en/survey.json";
import enDashboard from "@/messages/en/dashboard/index.json";
import enAnalytics from "@/messages/en/analytics/index.json";
import enInfluencers from "@/messages/en/influencers/index.json";
import enBilling from "@/messages/en/billing/index.json";
import heCommon from "@/messages/he/common.json";
import heAuth from "@/messages/he/auth/index.json";
import heLanguage from "@/messages/he/language.json";
import heProfile from "@/messages/he/profile.json";
import heCampaign from "@/messages/he/campaign.json";
import heCampaignPages from "@/messages/he/campaign/index.json";
import heSurvey from "@/messages/he/survey.json";
import heDashboard from "@/messages/he/dashboard/index.json";
import heAnalytics from "@/messages/he/analytics/index.json";
import heInfluencers from "@/messages/he/influencers/index.json";
import heBilling from "@/messages/he/billing/index.json";
import NextTopLoader from "nextjs-toploader";

const messagesMap = {
  en: {
    common: enCommon,
    auth: enAuth,
    language: enLanguage,
    profile: enProfile,
    campaign: { ...enCampaign, ...enCampaignPages },
    survey: enSurvey,
    dashboard: enDashboard,
    analytics: enAnalytics,
    influencers: enInfluencers,
    billing: enBilling,
  },
  he: {
    common: heCommon,
    auth: heAuth,
    language: heLanguage,
    profile: heProfile,
    campaign: { ...heCampaign, ...heCampaignPages },
    survey: heSurvey,
    dashboard: heDashboard,
    analytics: heAnalytics,
    influencers: heInfluencers,
    billing: heBilling,
  },
};

export function LanguageProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  const { language, setLanguage, isRTL } = useLanguageStore();
  const [currentMessages, setCurrentMessages] = useState(messages);
  const [currentLocale, setCurrentLocale] = useState(locale);

  useEffect(() => {
    // Sync store with current locale on mount
    if (locale !== language) {
      setLanguage(locale as "en" | "he");
    }
  }, []);

  useEffect(() => {
    // Update messages and locale when language changes
    const newMessages =
      messagesMap[language as keyof typeof messagesMap] || messages;
    setCurrentMessages(newMessages);
    setCurrentLocale(language);
  }, [language, messages]);

  useEffect(() => {
    // Update HTML attributes when language changes
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language, isRTL]);

  return (
    <NextIntlClientProvider locale={currentLocale} messages={currentMessages}>
      <NextTopLoader color="#0F172A" />
      {children}
    </NextIntlClientProvider>
  );
}
