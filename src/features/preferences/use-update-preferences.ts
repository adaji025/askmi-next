"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";
import type { UserPreferences } from "./types";

export interface UpdatePreferencesRequest {
  timeZone?: string;
  campaignUpdate?: boolean;
  responseAlerts?: boolean;
  influencerActivity?: boolean;
}

export interface UpdatePreferencesSuccessResponse {
  success: true;
  message?: string;
  preferences: UserPreferences;
}

export interface UpdatePreferencesErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type UpdatePreferencesResponse =
  | UpdatePreferencesSuccessResponse
  | UpdatePreferencesErrorResponse;

interface UseUpdatePreferencesReturn {
  updatePreferences: (
    data: UpdatePreferencesRequest
  ) => Promise<UpdatePreferencesSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useUpdatePreferences(): UseUpdatePreferencesReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePreferences = useCallback(
    async (
      data: UpdatePreferencesRequest
    ): Promise<UpdatePreferencesSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.put<UpdatePreferencesSuccessResponse>(
          "/api/user/preferences",
          data
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse =
            result as unknown as UpdatePreferencesErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to update preferences. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: UpdatePreferencesErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to update preferences. Please try again.";
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
    updatePreferences,
    isLoading,
    error,
    resetError,
  };
}
