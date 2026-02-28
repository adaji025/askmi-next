"use client";

import { useState, useCallback } from "react";
import type {
  RegisterRequest,
  RegisterSuccessResponse,
  RegisterErrorResponse,
} from "../types";

interface UseRegisterReturn {
  register: (data: RegisterRequest) => Promise<RegisterSuccessResponse>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useRegister(): UseRegisterReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (data: RegisterRequest): Promise<RegisterSuccessResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
        const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result: RegisterSuccessResponse | RegisterErrorResponse =
          await response.json();

        if (!response.ok) {
          // Handle error responses (400, 409, 500, etc.)
          const errorResponse = result as RegisterErrorResponse;
          const errorMessage =
            errorResponse.message || "Registration failed. Please try again.";
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        // Success response (201)
        const successResponse = result as RegisterSuccessResponse;
        setIsLoading(false);
        return successResponse;
      } catch (err) {
        setIsLoading(false);
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
    register,
    isLoading,
    error,
    resetError,
  };
}
