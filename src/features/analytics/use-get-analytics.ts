"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";

export interface AnalyticsStats {
  activeCampaigns: number;
  totalResponses: number;
  totalSurveys: number;
  completionRate: number;
  totalVotes: number;
  avgResponseRate: number;
  totalSpend: number;
}

export interface VoteCollectionOverTime {
  month: string;
  year: number;
  voteCount: number;
  monthIndex: number;
}

export interface AnalyticsCampaign {
  id: string;
  campaignName: string;
  status: "active" | "completed";
  responses: number;
  completionRate: number;
  costPerResponse: number;
  influencers: number;
  confidence: "high" | "medium" | "low";
}

export interface AnalyticsActiveCampaign {
  id: string;
  campaignName: string;
  status: "active" | "completed";
  responseCount: number;
  totalVoteNeeded: number;
  progressPercent: number;
}

export interface AnalyticsRecentActivity {
  id: string;
  message: string;
  campaignId: string;
  campaignName: string;
  responseCount: number;
  createdAt: string;
  timeAgo: string;
}

export interface GetAnalyticsSuccessResponse {
  success: true;
  message?: string;
  stats: AnalyticsStats;
  voteCollectionOverTime: VoteCollectionOverTime[];
  campaigns: AnalyticsCampaign[];
  activeCampaigns: AnalyticsActiveCampaign[];
  recentActivity: AnalyticsRecentActivity[];
}

export interface GetAnalyticsErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type GetAnalyticsResponse =
  | GetAnalyticsSuccessResponse
  | GetAnalyticsErrorResponse;

interface UseGetAnalyticsReturn {
  getAnalytics: () => Promise<GetAnalyticsSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useGetAnalytics(): UseGetAnalyticsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAnalytics = useCallback(
    async (): Promise<GetAnalyticsSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<GetAnalyticsSuccessResponse>(
          "/api/brand/analytics"
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse =
            result as unknown as GetAnalyticsErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to fetch analytics. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: GetAnalyticsErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to fetch analytics. Please try again.";
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
    getAnalytics,
    isLoading,
    error,
    resetError,
  };
}
