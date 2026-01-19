"use client";

import { AppSidebar } from "@/components/core/dashboard/dashboard/layout/app-sidebar";
import { SiteHeader } from "@/components/core/dashboard/dashboard/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLanguageStore } from "@/store/language-store";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isRTL } = useLanguageStore();
  const pathname = usePathname();

  // Check if we're on an analytics details page (/dashboard/analytics/[id])
  const isAnalyticsDetailPage =
    pathname.startsWith("/dashboard/analytics/") &&
    pathname !== "/dashboard/analytics";

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "240px",
          "--header-height": "calc(var(--spacing) * 12 + 20px)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" side={isRTL ? "right" : "left"} />
      <SidebarInset>
        {!isAnalyticsDetailPage && <SiteHeader />}
        <div className="flex flex-1 flex-col p-3 sm:p-5">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
