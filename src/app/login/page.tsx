"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextInput, PasswordInput } from "@mantine/core";
import { Mail, Lock, LogIn } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string | string[] | undefined;
    registered?: string | string[] | undefined;
  }>;
}) {
  const router = useRouter();
  const resolvedSearchParams = use(searchParams);
  const rawEmail = resolvedSearchParams.email;
  const emailFromQuery = Array.isArray(rawEmail) ? rawEmail[0] : rawEmail;
  const rawRegistered = resolvedSearchParams.registered;
  const accountCreated =
    (Array.isArray(rawRegistered) ? rawRegistered[0] : rawRegistered) === "1";
  const [formData, setFormData] = useState(() => ({
    email: emailFromQuery || "",
    password: "",
  }));
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const authNotice = accountCreated
    ? "Account created. Sign in with your new credentials."
    : "";

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setAuthError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      setAuthError(error.message);
      return;
    }

    router.push("/dashboard");
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
          label="Email Address"
          placeholder="Enter your email"
          size="md"
          leftSection={<Mail size={18} className="text-slate-400" />}
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }));
            if (authError) setAuthError("");
          }}
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
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, password: e.target.value }));
            if (authError) setAuthError("");
          }}
          styles={inputStyles}
          classNames={{
            input:
              "focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]",
          }}
        />

        {authNotice && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-900/20 dark:text-emerald-300">
            {authNotice}
          </p>
        )}

        {authError && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-300"
          >
            {authError}
          </p>
        )}

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
            href="/signup/institution?startOver=1"
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
