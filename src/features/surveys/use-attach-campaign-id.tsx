"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";

interface DetachCampaignPayload {
  campaignId: string;
}

interface DetachCampaignSuccessResponse {
  success: true;
  message: string;
}

interface DetachCampaignErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

interface UseDetachCampaignIdReturn {
  detachCampaignId: (
    surveyId: string,
    payload: DetachCampaignPayload
  ) => Promise<DetachCampaignSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useDetachCampaignId(): UseDetachCampaignIdReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detachCampaignId = useCallback(
    async (
      surveyId: string,
      payload: DetachCampaignPayload
    ): Promise<DetachCampaignSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.patch<DetachCampaignSuccessResponse>(
          `/api/survey/${surveyId}/detach-campaign`,
          payload
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse = result as unknown as DetachCampaignErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to detach campaign from survey. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: DetachCampaignErrorResponse;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to detach campaign from survey. Please try again.";
            setError(errorMessage);
            throw new Error(errorMessage);
          }
        }

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
    detachCampaignId,
    isLoading,
    error,
    resetError,
  };
}
