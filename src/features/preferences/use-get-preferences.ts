"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";
import type { UserPreferences } from "./types";

export interface GetPreferencesSuccessResponse {
  success: true;
  message?: string;
  preferences: UserPreferences;
}

export interface GetPreferencesErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type GetPreferencesResponse =
  | GetPreferencesSuccessResponse
  | GetPreferencesErrorResponse;

interface UseGetPreferencesReturn {
  getPreferences: () => Promise<GetPreferencesSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useGetPreferences(): UseGetPreferencesReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPreferences = useCallback(
    async (): Promise<GetPreferencesSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<GetPreferencesSuccessResponse>(
          "/api/user/preferences"
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse =
            result as unknown as GetPreferencesErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to fetch preferences. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: GetPreferencesErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to fetch preferences. Please try again.";
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
    getPreferences,
    isLoading,
    error,
    resetError,
  };
}
