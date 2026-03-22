"use client";

import { useState, useCallback } from "react";
import apiClient from "@/lib/axios";
import type { User } from "@/features/auth/types";

export interface UpdateUserRequest {
  email?: string;
  phoneNumber?: string;
  company?: string;
  fullName?: string;
  role?: "brand" | "influencer";
  isApproved?: boolean;
  [key: string]: unknown;
}

export interface UpdateUserSuccessResponse {
  success: true;
  message?: string;
  user: User;
}

export interface UpdateUserErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type UpdateUserResponse =
  | UpdateUserSuccessResponse
  | UpdateUserErrorResponse;

interface UseUpdateUserReturn {
  updateUser: (data: UpdateUserRequest) => Promise<UpdateUserSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useUpdateUser(): UseUpdateUserReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = useCallback(
    async (data: UpdateUserRequest): Promise<UpdateUserSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.put<UpdateUserSuccessResponse>(
          "/api/user/profile",
          data
        );

        const result = response.data;

        if (result.success) {
          setIsLoading(false);
          return result;
        } else {
          const errorResponse = result as unknown as UpdateUserErrorResponse;
          const errorMessage =
            errorResponse.message ||
            "Failed to update user. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err: unknown) {
        setIsLoading(false);

        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as {
            response?: {
              data?: UpdateUserErrorResponse;
              status?: number;
            };
          };

          if (axiosError.response?.data) {
            const errorResponse = axiosError.response.data;
            const errorMessage =
              errorResponse.message ||
              "Failed to update user. Please try again.";
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
    updateUser,
    isLoading,
    error,
    resetError,
  };
}
