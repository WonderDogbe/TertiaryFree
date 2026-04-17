"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  getLevelOptions,
  getSemesterOptions,
  isKnownDepartmentName,
  isKnownGender,
  isKnownLevel,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";

const LEVEL_OPTIONS = getLevelOptions();
const SEMESTER_OPTIONS = getSemesterOptions();
const LEVEL_NUMBER_OPTIONS = Array.from(
  new Set(LEVEL_OPTIONS.map((option) => option.level)),
).map((levelValue) => ({
  value: levelValue,
  label: `Level ${levelValue}`,
}));

function getStoredLevelSelection(storedLevel) {
  if (!isKnownLevel(storedLevel)) {
    return {
      level: "",
      semester: "",
    };
  }

  const matchedOption = LEVEL_OPTIONS.find(
    (option) => option.value === storedLevel,
  );

  if (!matchedOption) {
    return {
      level: "",
      semester: "",
    };
  }

  return {
    level: matchedOption.level,
    semester: matchedOption.semester,
  };
}

function buildLevelValue(level, semester) {
  const matchedOption = LEVEL_OPTIONS.find(
    (option) => option.level === level && option.semester === semester,
  );

  return matchedOption?.value || "";
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

export default function StudentLevelPage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [studentDetails] = useState(readStoredStudentDetails);
  const initialLevelSelection = getStoredLevelSelection(studentDetails.level);
  const [selectedLevel, setSelectedLevel] = useState(initialLevelSelection.level);
  const [selectedSemester, setSelectedSemester] = useState(
    initialLevelSelection.semester,
  );
  const [error, setError] = useState("");

  const level = buildLevelValue(selectedLevel, selectedSemester);
  const hasValidLevelSelection = isKnownLevel(level);

  const hasRequiredStudentDetails =
    studentDetails.name.trim() !== "" &&
    studentDetails.indexNumber.trim() !== "" &&
    isKnownGender(studentDetails.gender);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!hasValidLevelSelection) {
      setError("Level and semester are required");
      return;
    }

    window.localStorage.setItem(
      SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
      JSON.stringify({
        ...studentDetails,
        level,
      }),
    );

    router.push("/signup/student/department");
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
            Complete Student Details First
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Enter your name, index number, and gender before selecting your level.
          </p>
          <div className="mt-6">
            <Link
              href="/signup/student"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Student Details
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
          Select Your Level and Semester
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Choose your current level and semester before selecting your department.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="student-level"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300"
            >
              Level
            </label>
            <select
              id="student-level"
              value={selectedLevel}
              onChange={(event) => {
                setSelectedLevel(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Select your level</option>
              {LEVEL_NUMBER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="student-semester"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300"
            >
              Semester
            </label>
            <select
              id="student-semester"
              value={selectedSemester}
              onChange={(event) => {
                setSelectedSemester(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Select your semester</option>
              {SEMESTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <div className="pt-2 sm:flex sm:items-center sm:justify-between">
            <Link
              href="/signup/student"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <button
              type="submit"
              className={`mt-4 w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:mt-0 sm:w-auto ${
                hasValidLevelSelection
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-300"
              }`}
              disabled={!hasValidLevelSelection}
            >
              Continue to Department Selection
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
