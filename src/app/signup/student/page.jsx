"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  getGenderOptions,
  isKnownDepartmentName,
  isKnownGender,
  isKnownLevel,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";

const GENDER_OPTIONS = getGenderOptions();

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

function readStoredStudentDetails() {
  if (typeof window === "undefined") {
    return {
      name: "",
      indexNumber: "",
      gender: "",
      level: "",
      department: "",
    };
  }

  try {
    const storedValue = window.localStorage.getItem(
      SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
    );

    if (!storedValue) {
      return {
        name: "",
        indexNumber: "",
        gender: "",
        level: "",
        department: "",
      };
    }

    const parsed = JSON.parse(storedValue);

    if (!parsed || typeof parsed !== "object") {
      return {
        name: "",
        indexNumber: "",
        gender: "",
        level: "",
        department: "",
      };
    }

    const name = typeof parsed.name === "string" ? parsed.name : "";
    const indexNumber =
      typeof parsed.indexNumber === "string" ? parsed.indexNumber : "";
    const gender =
      typeof parsed.gender === "string" && isKnownGender(parsed.gender)
        ? parsed.gender
        : "";
    const level =
      typeof parsed.level === "string" && isKnownLevel(parsed.level)
        ? parsed.level
        : "";
    const department =
      typeof parsed.department === "string" &&
      isKnownDepartmentName(parsed.department)
        ? parsed.department
        : "";

    return {
      name,
      indexNumber,
      gender,
      level,
      department,
    };
  } catch {
    return {
      name: "",
      indexNumber: "",
      gender: "",
      level: "",
      department: "",
    };
  }
}

export default function SignupStudentPage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [formData, setFormData] = useState(readStoredStudentDetails);
  const [errors, setErrors] = useState({
    name: "",
    indexNumber: "",
    gender: "",
  });

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.indexNumber.trim() !== "" &&
    isKnownGender(formData.gender);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      name: formData.name.trim() ? "" : "Full name is required",
      indexNumber: formData.indexNumber.trim() ? "" : "Index number is required",
      gender: isKnownGender(formData.gender) ? "" : "Gender is required",
    };

    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.indexNumber || nextErrors.gender) {
      return;
    }

    window.localStorage.setItem(
      SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
      JSON.stringify({
        name: formData.name.trim(),
        indexNumber: formData.indexNumber.trim(),
        gender: formData.gender,
        level: formData.level,
        department: formData.department,
      }),
    );

    router.push("/signup/student/level");
  };

  if (!institutionName) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
            No Institution Selected
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Select your institution first to continue with student details.
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
      <section className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
          Student Signup
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Enter Student Details
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Provide your name, index number, and gender to continue registration.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="student-name"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              id="student-name"
              type="text"
              value={formData.name}
              onChange={(event) => {
                setFormData((prev) => ({ ...prev, name: event.target.value }));
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: "" }));
                }
              }}
              placeholder="e.g. Ama Mensah"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.name && (
              <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="student-index-number"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300"
            >
              Index Number
            </label>
            <input
              id="student-index-number"
              type="text"
              value={formData.indexNumber}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  indexNumber: event.target.value,
                }));
                if (errors.indexNumber) {
                  setErrors((prev) => ({ ...prev, indexNumber: "" }));
                }
              }}
              placeholder="e.g. UEB3214024"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.indexNumber && (
              <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                {errors.indexNumber}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="student-gender"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300"
            >
              Gender
            </label>
            <select
              id="student-gender"
              value={formData.gender}
              onChange={(event) => {
                setFormData((prev) => ({ ...prev, gender: event.target.value }));
                if (errors.gender) {
                  setErrors((prev) => ({ ...prev, gender: "" }));
                }
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Select your gender</option>
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                {errors.gender}
              </p>
            )}
          </div>

          <div className="pt-2 sm:flex sm:items-center sm:justify-between">
            <Link
              href="/signup/details"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <button
              type="submit"
              className={`mt-4 w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:mt-0 sm:w-auto ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-300"
              }`}
              disabled={!isFormValid}
            >
              Continue to Level Selection
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
