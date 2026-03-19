"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";

export interface BrandStats {
  activeCampaigns: number;
  totalResponses: number;
  totalSurveys: number;
  completionRate: number;
}

export interface ActiveCampaign {
  id: string;
  campaignName: string;
  status: "active" | "completed";
  responseCount: number;
  totalVoteNeeded: number;
  progressPercent: number;
}

export interface RecentActivity {
  id: string;
  message: string;
  campaignId: string;
  campaignName: string;
  responseCount: number;
  createdAt: string;
  timeAgo: string;
}

export interface GetBrandStatisticsSuccessResponse {
  success: true;
  message?: string;
  stats: BrandStats;
  activeCampaigns: ActiveCampaign[];
  recentActivity: RecentActivity[];
}

export interface GetBrandStatisticsErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type GetBrandStatisticsResponse =
  | GetBrandStatisticsSuccessResponse
  | GetBrandStatisticsErrorResponse;

interface UseGetBrandStatisticsReturn {
  getStatistics: () => Promise<GetBrandStatisticsSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useGetBrandStatistics(): UseGetBrandStatisticsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStatistics = useCallback(
    async (): Promise<GetBrandStatisticsSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<GetBrandStatisticsSuccessResponse>(
          "/api/brand/statistics"
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse =
            result as unknown as GetBrandStatisticsErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to fetch brand statistics. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: GetBrandStatisticsErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to fetch brand statistics. Please try again.";
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
    getStatistics,
    isLoading,
    error,
    resetError,
  };
}
