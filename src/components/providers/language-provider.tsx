"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/language-store";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import heMessages from "@/messages/he.json";

const messagesMap = {
  en: enMessages,
  he: heMessages,
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
    const newMessages = messagesMap[language as keyof typeof messagesMap] || messages;
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
      {children}
    </NextIntlClientProvider>
  );
}

