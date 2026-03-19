"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";

export interface BudgetEstimate {
  baseBudget?: number;
  minBudget?: number;
  maxBudget?: number;
  totalQuestions?: number;
  desiredVote?: number;
  deviationPercent?: number;
  [key: string]: unknown;
}

export interface GetBudgetEstimateSuccessResponse {
  success: true;
  message?: string;
  estimate?: BudgetEstimate;
  [key: string]: unknown;
}

export interface GetBudgetEstimateErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type GetBudgetEstimateResponse =
  | GetBudgetEstimateSuccessResponse
  | GetBudgetEstimateErrorResponse;

interface UseGetEstimatedBudgetParams {
  totalQuestions: number;
  desiredVote: number;
}

interface UseGetEstimatedBudgetReturn {
  getEstimate: (
    params: UseGetEstimatedBudgetParams
  ) => Promise<GetBudgetEstimateSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useGetEstimatedBudget(): UseGetEstimatedBudgetReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEstimate = useCallback(
    async ({
      totalQuestions,
      desiredVote,
    }: UseGetEstimatedBudgetParams): Promise<GetBudgetEstimateSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<GetBudgetEstimateSuccessResponse>(
          "/api/budget/estimate",
          {
            params: { totalQuestions, desiredVote },
          }
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse = result as unknown as GetBudgetEstimateErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to fetch budget estimate. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: GetBudgetEstimateErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to fetch budget estimate. Please try again.";
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
    getEstimate,
    isLoading,
    error,
    resetError,
  };
}
