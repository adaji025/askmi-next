"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { CreateCampaignRequest, TargetAudience } from "@/features/campaign/types";

interface CampaignFormContextType {
  formData: Partial<CreateCampaignRequest>;
  updateFormData: (data: Partial<CreateCampaignRequest>) => void;
  resetFormData: () => void;
}

const CampaignFormContext = createContext<CampaignFormContextType | undefined>(
  undefined
);

export function CampaignFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<CreateCampaignRequest>>({});

  const updateFormData = (data: Partial<CreateCampaignRequest>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData({});
  };

  return (
    <CampaignFormContext.Provider
      value={{ formData, updateFormData, resetFormData }}
    >
      {children}
    </CampaignFormContext.Provider>
  );
}

export function useCampaignForm() {
  const context = useContext(CampaignFormContext);
  if (context === undefined) {
    throw new Error("useCampaignForm must be used within CampaignFormProvider");
  }
  return context;
}
