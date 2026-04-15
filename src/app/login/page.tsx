"use client";

import { useState } from "react";
import Link from "next/link";
import { TextInput, PasswordInput } from "@mantine/core";
import { Mail, Lock, LogIn } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    // Simulate API call — will connect to backend later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // For now, just log. Later connect to auth backend.
    console.log("Login submitted:", formData);
  };

  const inputStyles = {
    input: {
      backgroundColor: "var(--color-secondary-bg)",
      color: "var(--color-text)",
      borderColor: "rgba(148, 163, 184, 0.35)",
      minHeight: "54px",
    },
    label: {
      color: "var(--color-text)",
      fontWeight: 700,
      fontSize: "0.76rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      marginBottom: "0.42rem",
    },
    section: {
      color: "#94a3b8",
    },
  };

  return (
    <AuthLayout
      userType="login"
      title="Sign In"
      subtitle="Enter your credentials to continue"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        <TextInput
          id="login-email"
          label="Email or Phone Number"
          placeholder="Email or Phone Number"
          size="md"
          leftSection={<Mail size={18} className="text-slate-400" />}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          styles={inputStyles}
          classNames={{
            input:
              "focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]",
          }}
        />

        <PasswordInput
          id="login-password"
          label="Password"
          placeholder="Enter password"
          size="md"
          leftSection={<Lock size={18} className="text-slate-400" />}
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          styles={inputStyles}
          classNames={{
            input:
              "focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]",
          }}
        />

        {/* Forgot Password */}
        <div className="-mt-2 flex justify-end">
          <button
            type="button"
            className="cursor-pointer border-none bg-transparent text-xs font-semibold uppercase tracking-[0.06em] text-[var(--color-primary)] hover:underline"
            id="forgot-password-link"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn-brand mt-1 flex w-full items-center justify-center gap-2 px-6 py-3 text-base sm:py-3.5 ${
            !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isFormValid || loading}
          id="sign-in-btn"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block rounded-full border-2 border-white border-t-transparent animate-spin w-5 h-5" />
              Signing in...
            </span>
          ) : (
            <>
              Sign In
              <LogIn size={20} />
            </>
          )}
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-300 sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/get-started"
            className="font-semibold text-[#0a0f5c] transition-colors hover:underline dark:text-[#5eead4]"
            id="register-link"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
