"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";
import type {
  GetCampaignsSuccessResponse,
  GetCampaignsErrorResponse,
} from "../types";

interface UseGetCampaignsReturn {
  getCampaigns: () => Promise<GetCampaignsSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useGetCampaigns(): UseGetCampaignsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCampaigns = useCallback(
    async (): Promise<GetCampaignsSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<GetCampaignsSuccessResponse>(
          "/api/campaign"
        );

        const result = response.data;

        // Check if response indicates success
        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          // Handle error response
          const errorResponse = result as unknown as GetCampaignsErrorResponse;
          const errorMessage =
            errorResponse.message || "Failed to fetch campaigns. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        // Handle axios errors
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: GetCampaignsErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message || "Failed to fetch campaigns. Please try again.";
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
    getCampaigns,
    isLoading,
    error,
    resetError,
  };
}
