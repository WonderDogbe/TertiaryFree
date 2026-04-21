"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import {
  getFacultyOptions,
  isKnownFacultyName,
  isKnownGender,
  isKnownLevel,
  isKnownProgrammeName,
  isKnownProgrammeType,
  isKnownStudyMode,
  isKnownWeekDay,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";

const FACULTY_SELECT_OPTIONS = getFacultyOptions().map((option) => ({
  value: option.name,
  label: option.name,
}));

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
      studyMode: "",
      customStudyDays: [],
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
        studyMode: "",
        customStudyDays: [],
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
        studyMode: "",
        customStudyDays: [],
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
    const faculty =
      typeof parsed.department === "string" &&
      isKnownFacultyName(parsed.department)
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
    const studyMode =
      typeof parsed.studyMode === "string" && isKnownStudyMode(parsed.studyMode)
        ? parsed.studyMode
        : "";
    const customStudyDays = Array.isArray(parsed.customStudyDays)
      ? parsed.customStudyDays.filter((day) => isKnownWeekDay(day))
      : [];

    return {
      name,
      email,
      indexNumber,
      gender,
      level,
      department: faculty,
      programmeType,
      programme,
      studyMode,
      customStudyDays,
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
      studyMode: "",
      customStudyDays: [],
    };
  }
}

export default function StudentFacultyPage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [studentDetails] = useState(readStoredStudentDetails);
  const [faculty, setFaculty] = useState(studentDetails.department);
  const [error, setError] = useState("");
  const requiresFacultySelection = isHtuInstitution(institutionName);

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
    dropdown: {
      backgroundColor: "var(--color-secondary-bg)",
      borderColor: "rgba(148, 163, 184, 0.35)",
    },
    option: {
      color: "var(--color-text)",
      backgroundColor: "transparent",
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!requiresFacultySelection) {
      window.localStorage.setItem(
        SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
        JSON.stringify({
          ...studentDetails,
          department: "",
          programmeType: "",
          programme: "",
        }),
      );

      router.push("/signup/student");
      return;
    }

    if (!isKnownFacultyName(faculty)) {
      setError("Faculty is required");
      return;
    }

    window.localStorage.setItem(
      SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
      JSON.stringify({
        ...studentDetails,
        department: faculty,
        programmeType: studentDetails.programmeType,
        programme: "",
      }),
    );

    router.push("/signup/student/programme");
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <FloatingBackLink href="/signup/details" label="Back to role selection" />
      <section className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
          Student Signup
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Select Your Faculty
        </h1>
        {requiresFacultySelection ? (
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Choose your faculty to continue to programme selection.
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Faculty and programme selection are currently available only for HTU. Continue to student details.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {requiresFacultySelection && (
            <Select
              id="student-faculty"
              label="Faculty"
              placeholder="Select your faculty"
              data={FACULTY_SELECT_OPTIONS}
              value={faculty}
              onChange={(value) => {
                setFaculty(value || "");
                if (error) {
                  setError("");
                }
              }}
              error={error}
              styles={inputStyles}
              searchable
              nothingFoundMessage="No matching faculty"
            />
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className={`w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:w-auto ${
                !requiresFacultySelection || isKnownFacultyName(faculty)
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-300"
              }`}
              disabled={requiresFacultySelection && !isKnownFacultyName(faculty)}
            >
              {requiresFacultySelection
                ? "Continue to Programme Selection"
                : "Continue to Student Details"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
