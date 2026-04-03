"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextInput, PasswordInput } from "@mantine/core";
import { Mail, Lock, LogIn } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
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

  return (
    <AuthLayout subtitle="Sign in to access your unified academic dashboard">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <TextInput
          id="login-email"
          label="Email Address"
          placeholder="e.g. john@university.edu"
          size="md"
          leftSection={<Mail size={18} className="text-slate-400" />}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          classNames={{
            input:
              "focus:border-[#0a0f5c] focus:ring-1 focus:ring-[#0a0f5c] dark:focus:border-[#2dd4a8] dark:focus:ring-[#2dd4a8]",
          }}
        />

        <PasswordInput
          id="login-password"
          label="Password"
          placeholder="Enter your password"
          size="md"
          leftSection={<Lock size={18} className="text-slate-400" />}
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          classNames={{
            input:
              "focus:border-[#0a0f5c] focus:ring-1 focus:ring-[#0a0f5c] dark:focus:border-[#2dd4a8] dark:focus:ring-[#2dd4a8]",
          }}
        />

        {/* Forgot Password */}
        <div className="flex justify-end -mt-3 sm:-mt-4">
          <button
            type="button"
            className="border-none bg-transparent text-xs font-semibold text-[#0a0f5c] hover:underline cursor-pointer sm:text-sm dark:text-[#5eead4]"
            id="forgot-password-link"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn-brand mt-2 w-full flex justify-center py-3 sm:py-3.5 text-base ${
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
            href="/register"
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
