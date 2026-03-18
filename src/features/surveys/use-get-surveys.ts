"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";
import type {
  GetSurveysSuccessResponse,
  GetSurveysErrorResponse,
} from "./types";

interface UseGetSurveysReturn {
  getSurveys: () => Promise<GetSurveysSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useGetSurveys(): UseGetSurveysReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSurveys = useCallback(
    async (): Promise<GetSurveysSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<GetSurveysSuccessResponse>(
          "/api/survey"
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse = result as unknown as GetSurveysErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to fetch surveys. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: GetSurveysErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to fetch surveys. Please try again.";
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
    getSurveys,
    isLoading,
    error,
    resetError,
  };
}
