"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";
import type {
  CreateCampaignRequest,
  CreateCampaignSuccessResponse,
  CreateCampaignErrorResponse,
} from "../types";

interface UseCreateCampaignReturn {
  createCampaign: (
    data: CreateCampaignRequest
  ) => Promise<CreateCampaignSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useCreateCampaign(): UseCreateCampaignReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCampaign = useCallback(
    async (
      data: CreateCampaignRequest
    ): Promise<CreateCampaignSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post<CreateCampaignSuccessResponse>(
          "/api/campaign",
          {
            ...data,
            isActive: data.isActive ?? true, // Default to true if not provided
          }
        );

        const result = response.data;

        // Check if response indicates success
        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          // Handle error response
          const errorResponse = result as unknown as CreateCampaignErrorResponse;
          const errorMessage =
            errorResponse.message || "Campaign creation failed. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);
        
        // Handle axios errors
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: CreateCampaignErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message || "Campaign creation failed. Please try again.";
            setError(errorMessage);
            throw new Error(errorMessage);
          }
        }

        // Handle other errors
        if (err instanceof Error) {
          setError(err.message);
          throw err;
        }

        const errorMessage = "An unexpected error occurred. Please try again.";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    createCampaign,
    isLoading,
    error,
    resetError,
  };
}
