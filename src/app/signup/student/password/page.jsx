"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "@mantine/core";
import { ArrowLeft, UserPlus } from "lucide-react";
import { registerUserAccount } from "@/lib/auth-storage";
import {
  getProgrammeOptionsForFacultyAndType,
  isKnownDepartmentName,
  isKnownGender,
  isKnownLevel,
  isKnownProgrammeName,
  isKnownProgrammeType,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";

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

function readStoredStudentDetails() {
  if (typeof window === "undefined") {
    return {
      name: "",
      email: "",
      indexNumber: "",
      gender: "",
      level: "",
      department: "",
      programmeType: "",
      programme: "",
    };
  }

  try {
    const storedValue = window.localStorage.getItem(
      SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
    );

    if (!storedValue) {
      return {
        name: "",
        email: "",
        indexNumber: "",
        gender: "",
        level: "",
        department: "",
        programmeType: "",
        programme: "",
      };
    }

    const parsed = JSON.parse(storedValue);

    if (!parsed || typeof parsed !== "object") {
      return {
        name: "",
        email: "",
        indexNumber: "",
        gender: "",
        level: "",
        department: "",
        programmeType: "",
        programme: "",
      };
    }

    const name = typeof parsed.name === "string" ? parsed.name : "";
    const email = typeof parsed.email === "string" ? parsed.email : "";
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
    const programmeType =
      typeof parsed.programmeType === "string" &&
      isKnownProgrammeType(parsed.programmeType)
        ? parsed.programmeType
        : "";
    const programme =
      typeof parsed.programme === "string" &&
      isKnownProgrammeName(parsed.programme)
        ? parsed.programme
        : "";

    return {
      name,
      email,
      indexNumber,
      gender,
      level,
      department,
      programmeType,
      programme,
    };
  } catch {
    return {
      name: "",
      email: "",
      indexNumber: "",
      gender: "",
      level: "",
      department: "",
      programmeType: "",
      programme: "",
    };
  }
}

export default function StudentPasswordPage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [studentDetails] = useState(readStoredStudentDetails);
  const requiresFacultyAndProgrammeSelection = isHtuInstitution(institutionName);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const programmeMatchesSelection =
    !requiresFacultyAndProgrammeSelection ||
    (isKnownDepartmentName(studentDetails.department) &&
    isKnownProgrammeType(studentDetails.programmeType)
      ? getProgrammeOptionsForFacultyAndType(
          studentDetails.department,
          studentDetails.programmeType,
        ).some((option) => option.name === studentDetails.programme)
      : false);

  const hasRequiredStudentDetails =
    studentDetails.name.trim() !== "" &&
    studentDetails.email.trim() !== "" &&
    studentDetails.email.includes("@") &&
    studentDetails.indexNumber.trim() !== "" &&
    isKnownGender(studentDetails.gender) &&
    isKnownLevel(studentDetails.level) &&
    (!requiresFacultyAndProgrammeSelection ||
      (isKnownDepartmentName(studentDetails.department) &&
        isKnownProgrammeType(studentDetails.programmeType) &&
        isKnownProgrammeName(studentDetails.programme))) &&
    programmeMatchesSelection;

  const inputStyles = {
    label: {
      color: "var(--color-text)",
      fontWeight: 700,
      fontSize: "0.76rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: "0.42rem",
    },
    input: {
      backgroundColor: "var(--color-secondary-bg)",
      color: "var(--color-text)",
      borderColor: "rgba(148, 163, 184, 0.35)",
      minHeight: "52px",
    },
    section: {
      color: "#94a3b8",
    },
  };

  const isFormValid =
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password.length >= 8 &&
    password === confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {
      password:
        password.trim() === ""
          ? "Password is required"
          : password.length < 8
            ? "Password must be at least 8 characters"
            : "",
      confirmPassword:
        confirmPassword.trim() === ""
          ? "Confirm password is required"
          : password !== confirmPassword
            ? "Passwords do not match"
            : "",
    };

    setErrors(nextErrors);

    if (nextErrors.password || nextErrors.confirmPassword) {
      return;
    }

    setLoading(true);
    setSubmitError("");

    const registrationResult = registerUserAccount({
      role: "student",
      name: studentDetails.name,
      gender: isKnownGender(studentDetails.gender)
        ? studentDetails.gender
        : undefined,
      email: studentDetails.email,
      password,
      school: institutionName,
      department: studentDetails.department,
      indexNumber: studentDetails.indexNumber,
      programme: studentDetails.programme,
      level: studentDetails.level,
    });

    setLoading(false);

    if (!registrationResult.success) {
      setSubmitError(registrationResult.message);
      return;
    }

    try {
      window.localStorage.removeItem(SIGNUP_STUDENT_DETAILS_STORAGE_KEY);
    } catch {
      // Ignore cleanup failures.
    }

    router.push("/dashboard");
  };

  if (!institutionName) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
            No Institution Selected
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Select your institution first to continue.
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

  if (!hasRequiredStudentDetails) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
            Complete Previous Steps First
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Complete level selection before creating your password.
          </p>
          <div className="mt-6">
            <Link
              href="/signup/student/level"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Level Selection
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
          Create Your Password
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Set a secure password to complete your account creation.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <PasswordInput
            id="student-password"
            label="Password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
              if (submitError) {
                setSubmitError("");
              }
            }}
            error={errors.password}
            styles={inputStyles}
          />

          <PasswordInput
            id="student-confirm-password"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.currentTarget.value);
              if (errors.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }
              if (submitError) {
                setSubmitError("");
              }
            }}
            error={errors.confirmPassword}
            styles={inputStyles}
          />

          {submitError && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-300"
            >
              {submitError}
            </p>
          )}

          <div className="pt-2 sm:flex sm:items-center sm:justify-between">
            <Link
              href="/signup/student/level"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <button
              type="submit"
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:mt-0 sm:w-auto ${
                isFormValid && !loading
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-300"
              }`}
              disabled={!isFormValid || loading}
            >
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <UserPlus className="h-4 w-4" />}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}