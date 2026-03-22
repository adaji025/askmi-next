"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";

export interface UserProfile {
  id: string;
  email: string;
  phoneNumber: string;
  company: string;
  companyCAC: string;
  fullName: string;
  countryCode: string;
  lang: string;
  role: "brand" | "influencer";
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserProfileSuccessResponse {
  success: true;
  message?: string;
  users: UserProfile[];
}

export interface GetUserProfileErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type GetUserProfileResponse =
  | GetUserProfileSuccessResponse
  | GetUserProfileErrorResponse;

interface UseGetUserProfileReturn {
  getProfile: () => Promise<GetUserProfileSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useGetUserProfile(): UseGetUserProfileReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = useCallback(
    async (): Promise<GetUserProfileSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<GetUserProfileSuccessResponse>(
          "/api/user/profile"
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse =
            result as unknown as GetUserProfileErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to fetch user profile. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: GetUserProfileErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to fetch user profile. Please try again.";
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
    getProfile,
    isLoading,
    error,
    resetError,
  };
}
