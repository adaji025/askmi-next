"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageDropdown from "../dashboard/dashboard/layout/lang-dropdown";
import InfluenceDirections from "./influencer-directions";

export function RegisterForm() {
  const [accountType, setAccountType] = useState<"brand" | "influencer">(
    "brand"
  );
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateFullName = (fullName: string): string => {
    if (!fullName.trim()) {
      return "Full name is required";
    }
    if (fullName.trim().length < 2) {
      return "Full name must be at least 2 characters";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): string => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }
    if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const validateForm = (): boolean => {
    const fullNameError = validateFullName(formData.fullName);
    const companyError = formData.company.trim()
      ? ""
      : "Company name is required";
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    setErrors({
      fullName: fullNameError,
      company: companyError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return (
      !fullNameError &&
      !companyError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual registration API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", { accountType, ...formData });
      router.push("/dashboard");
      // Navigate to login or dashboard after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
    // Clear confirm password error if password changes
    if (field === "password" && errors.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "" });
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <LanguageDropdown />
      </div>
      <div className="w-full ">
        <div className="text-center mb-8 max-w-md mx-auto">
          <h1 className="text-[32px] text-center font-bold mb-2 text-blck">
            Create your account
          </h1>
          <p className="text-base text-center text-[#5D6A6B]">
            Start your journey with us today
          </p>
        </div>

        {/* Account Type Toggle */}
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 mb-8 bg-secondary border rounded-lg p-0.5 ">
            <button
              onClick={() => setAccountType("brand")}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                accountType === "brand"
                  ? "bg-white text-foreground border border-[#E2E8F0]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              As a brand
            </button>
            <button
              onClick={() => setAccountType("influencer")}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                accountType === "influencer"
                  ? "bg-white text-foreground border border-[#E2E8F0]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              As an influencer
            </button>
          </div>
        </div>

        {/* Form */}
        {accountType === "brand" && (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  Enter your full name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="e.g John Doe Gabriel"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleFieldChange("fullName", e.target.value)
                  }
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.fullName
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={(e) => handleFieldChange("company", e.target.value)}
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.company
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.company && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  Work Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create strong password"
                  value={formData.password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.password
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-bold text-[#8E8E8E]"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleFieldChange("confirmPassword", e.target.value)
                  }
                  className={`h-11 bg-white rounded-[6px] ${
                    errors.confirmPassword
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-12 rounded-[6px] w-full h-12 text-base font-medium bg-[#2563EB] hover:bg-[#2563EB]/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href={"/auth/sign-in"}
                className="text-[#8B5CF6] font-medium cursor-pointer hover:underline"
              >
                Sign in.
              </Link>
            </p>
          </div>
        )}

        {accountType === "influencer" && <InfluenceDirections />}
      </div>
    </div>
  );
}
