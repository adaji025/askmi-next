"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLanguageStore } from "@/store/language-store";
import { cn } from "@/lib/utils";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const t = useTranslations("auth.layout");
  const { isRTL } = useLanguageStore();

  return (
    <div className="flex">
      <div className="max-w-118.5 w-full h-screen bg-primary hidden lg:flex  text-white flex-col justify-between p-6 xl:p-10">
        <div className="">
          <Image
            src={"/images/svgs/askmi-logo.svg"}
            height={32}
            width={120}
            alt="askmi logo"
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6 max-w-lg">
          <h2 className="text-4xl font-extrabold leading-tight text-balance">
            {t("heading")}
          </h2>
          <p className="text-lg text-[#E2E8F0] leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Features */}
        <div className={cn("flex gap-8", isRTL && "rtl:flex-row-reverse")}>
          <div className={cn(
            "relative border-l-4 border-[#2563EB]",
            isRTL ? "pr-4 rtl:pl-0 rtl:border-l-0 rtl:border-r-4" : "pl-4"
          )}>
            <div className={cn(
              "absolute top-0 bottom-0 w-1 bg-primary rounded-full",
              isRTL ? "right-0" : "left-0"
            )}></div>
            <div className="text-3xl font-bold mb-1">{t("customerSupport24")}</div>
            <div className="text-sm text-gray-400">{t("customerSupport")}</div>
          </div>
          <div className={cn(
            "relative border-l-4 border-[#2563EB]",
            isRTL ? "pr-4 rtl:pl-0 rtl:border-l-0 rtl:border-r-4" : "pl-4"
          )}>
            <div className={cn(
              "absolute top-0 bottom-0 w-1 bg-primary rounded-full",
              isRTL ? "right-0" : "left-0"
            )}></div>
            <div className="text-3xl font-bold mb-1">{t("freeTrial")}</div>
            <div className="text-sm text-gray-400">{t("freeTrialDescription")}</div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-screen overflow-y-auto py-10 px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
