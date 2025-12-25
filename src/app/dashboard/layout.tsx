"use client";

import { AppSidebar } from "@/components/core/dashboard/layout/app-sidebar";
import { SiteHeader } from "@/components/core/dashboard/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "240px",
          "--header-height": "calc(var(--spacing) * 12 + 20px)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-3 sm:p-5">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
