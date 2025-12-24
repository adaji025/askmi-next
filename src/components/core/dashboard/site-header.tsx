"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Globe, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutSVG } from "./svg";
import LanguageDropdown from "./lang-dropdown";

const pageNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/campaigns": "Campaign",
  "/dashboard/surveys": "Surveys",
  "/dashboard/analytics": "Analytics",
  "/dashboard/influencers": "Influencers",
  "/dashboard/billings": "Billings",
  "/dashboard/settings": "Settings",
};

export function SiteHeader() {
  const pathname = usePathname();
  const pageName = pageNames[pathname] || "Dashboard";

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-2xl font-extrabold">{pageName}</h1>
        <div className="ml-auto flex items-center gap-2">
          <LanguageDropdown />
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="size-4" />
            <span className="absolute top-1 right-1.5 size-2 bg-[#8B5CF6] rounded-full"></span>
          </Button>
          <Button variant="ghost" size="sm" className="cursor-pointer">
            <LogoutSVG />
          </Button>
        </div>
      </div>
    </header>
  );
}
