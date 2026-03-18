"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";
import type {
  SurveyQuestion,
  CreateSurveyRequest,
  CreateSurveySuccessResponse,
  CreateSurveyErrorResponse,
} from "./types";

interface UseCreateSurveyReturn {
  createSurvey: (
    questions: SurveyQuestion[],
    title?: string
  ) => Promise<CreateSurveySuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useCreateSurvey(): UseCreateSurveyReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSurvey = useCallback(
    async (
      questions: SurveyQuestion[],
      title?: string
    ): Promise<CreateSurveySuccessResponse> => {
      setIsLoading(true);
      setError(null);

      const payload: CreateSurveyRequest = {
        questions,
        ...(title && { title }),
      };

      try {
        const response = await apiClient.post<CreateSurveySuccessResponse>(
          "/api/survey",
          payload
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse = result as unknown as CreateSurveyErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Survey creation failed. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: CreateSurveyErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Survey creation failed. Please try again.";
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
    createSurvey,
    isLoading,
    error,
    resetError,
  };
}
