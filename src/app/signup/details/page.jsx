"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, GraduationCap, Presentation } from "lucide-react";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import { getSignupRoleOptions } from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const ROLE_OPTIONS = getSignupRoleOptions();
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";
const ROLE_ICON_BY_VALUE = {
  student: GraduationCap,
  lecturer: Presentation,
};

function isHtuInstitution(institutionName) {
  return institutionName.trim().toUpperCase() === HTU_INSTITUTION_NAME;
}

function readStoredInstitutionName() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const storedValue = window.localStorage.getItem(
      SIGNUP_INSTITUTION_STORAGE_KEY,
    );

    if (!storedValue) {
      return "";
    }

    const parsed = JSON.parse(storedValue);

    if (parsed && typeof parsed === "object" && typeof parsed.name === "string") {
      return parsed.name;
    }
  } catch {
    // Ignore invalid signup storage payloads.
  }

  return "";
}

export default function SignupDetailsPage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [selectedRole, setSelectedRole] = useState("");

  const handleContinue = () => {
    if (!selectedRole) {
      return;
    }

    if (selectedRole === "student") {
      if (isHtuInstitution(institutionName)) {
        router.push("/signup/student/department");
      } else {
        router.push("/signup/student");
      }
      return;
    }

    router.push(
      `/register?role=${selectedRole}&institution=${encodeURIComponent(institutionName)}`,
    );
  };

  if (!institutionName) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <FloatingBackLink
          href="/signup/institution"
          label="Back to institution selection"
        />
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
            No Institution Selected
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Select your institution first to continue with account details.
          </p>
          <div className="mt-6">
            <Link
              href="/signup/institution"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Institution Selection
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <FloatingBackLink
        href="/signup/institution"
        label="Back to institution selection"
      />
      <section className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
          Selected Institution
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
          {institutionName}
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Choose your role, then continue.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {ROLE_OPTIONS.map((option) => {
            const Icon = ROLE_ICON_BY_VALUE[option.value] || GraduationCap;
            const isSelected = selectedRole === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedRole(option.value)}
                className={`rounded-xl border p-5 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-900/20"
                    : "border-gray-200 bg-white hover:border-blue-500 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400"
                }`}
                aria-pressed={isSelected}
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition-colors duration-300 dark:bg-blue-900/30 dark:text-blue-300">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-base font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
                  {option.title}
                </p>
                <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            className={`w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:w-auto ${
              selectedRole
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-blue-300"
            }`}
            disabled={!selectedRole}
          >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}
