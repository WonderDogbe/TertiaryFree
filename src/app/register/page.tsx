"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextInput, PasswordInput } from "@mantine/core";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.identifier.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    formData.password === formData.confirmPassword;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !validate()) return;

    setLoading(true);
    // Simulate API call — will connect to backend later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // For now, just log. Later connect to auth backend.
    console.log("Register submitted:", formData);
  };

  const inputClassNames = {
    input: 'focus:border-[#0a0f5c] focus:ring-1 focus:ring-[#0a0f5c]'
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join thousands of students simplifying their academic life"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        <TextInput
          id="register-name"
          label="Full Name"
          placeholder="e.g. John Doe"
          size="md"
          leftSection={<User size={18} className="text-slate-400" />}
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          classNames={inputClassNames}
        />

        <TextInput
          id="register-identifier"
          label="Email or Student ID"
          placeholder="e.g. john@university.edu"
          size="md"
          leftSection={<Mail size={18} className="text-slate-400" />}
          value={formData.identifier}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, identifier: e.target.value }))
          }
          classNames={inputClassNames}
        />

        <PasswordInput
          id="register-password"
          label="Password"
          placeholder="At least 8 characters"
          size="md"
          leftSection={<Lock size={18} className="text-slate-400" />}
          value={formData.password}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, password: e.target.value }));
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: "" }));
            }
          }}
          error={errors.password}
          classNames={inputClassNames}
        />

        <PasswordInput
          id="register-confirm-password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          size="md"
          leftSection={<Lock size={18} className="text-slate-400" />}
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }));
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
          }}
          error={errors.confirmPassword}
          classNames={inputClassNames}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn-brand mt-4 sm:mt-6 w-full flex justify-center py-3 sm:py-3.5 text-base ${
            !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isFormValid || loading}
          id="create-account-btn"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block rounded-full border-2 border-white border-t-transparent animate-spin w-5 h-5" />
              Creating account...
            </span>
          ) : (
            <>
              Create Account
              <UserPlus size={20} />
            </>
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm sm:text-sm mt-4 text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#0a0f5c] hover:underline transition-colors" id="login-link">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
