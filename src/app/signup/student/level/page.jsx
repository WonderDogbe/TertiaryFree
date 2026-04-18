"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import {
  getLevelOptions,
  getSemesterOptions,
  isKnownDepartmentName,
  isKnownGender,
  isKnownLevel,
  isKnownProgrammeName,
  isKnownProgrammeType,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";

const LEVEL_OPTIONS = getLevelOptions();
const SEMESTER_OPTIONS = getSemesterOptions();
const LEVEL_NUMBER_OPTIONS = Array.from(
  new Set(LEVEL_OPTIONS.map((option) => option.level)),
).map((levelValue) => ({
  value: levelValue,
  label: `Level ${levelValue}`,
}));

function isHtuInstitution(institutionName) {
  return institutionName.trim().toUpperCase() === HTU_INSTITUTION_NAME;
}

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

export default function StudentLevelPage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [studentDetails] = useState(readStoredStudentDetails);
  const requiresFacultyAndProgrammeSelection = isHtuInstitution(institutionName);
  const initialLevelSelection = getStoredLevelSelection(studentDetails.level);
  const [selectedLevel, setSelectedLevel] = useState(initialLevelSelection.level);
  const [selectedSemester, setSelectedSemester] = useState(
    initialLevelSelection.semester,
  );
  const [error, setError] = useState("");

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

  const level = buildLevelValue(selectedLevel, selectedSemester);
  const hasValidLevelSelection = isKnownLevel(level);

  const hasRequiredStudentDetails =
    studentDetails.name.trim() !== "" &&
    studentDetails.email.trim() !== "" &&
    studentDetails.email.includes("@") &&
    studentDetails.indexNumber.trim() !== "" &&
    isKnownGender(studentDetails.gender) &&
    (!requiresFacultyAndProgrammeSelection ||
      (isKnownDepartmentName(studentDetails.department) &&
        isKnownProgrammeType(studentDetails.programmeType) &&
        isKnownProgrammeName(studentDetails.programme)));

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

    router.push("/signup/student/password");
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

  if (!hasRequiredStudentDetails) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <FloatingBackLink
          href="/signup/student"
          label="Back to student details"
        />
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
            Complete Student Details First
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Complete programme and student details before selecting your level.
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
      <FloatingBackLink href="/signup/student" label="Back to student details" />
      <section className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
          Student Signup
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Select Your Level and Semester
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Choose your current level and semester before setting your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Select
            id="student-level"
            label="Level"
            placeholder="Select your level"
            data={LEVEL_NUMBER_OPTIONS}
            value={selectedLevel}
            onChange={(value) => {
              setSelectedLevel(value || "");
              if (error) {
                setError("");
              }
            }}
            styles={inputStyles}
          />

          <Select
            id="student-semester"
            label="Semester"
            placeholder="Select your semester"
            data={SEMESTER_OPTIONS}
            value={selectedSemester}
            onChange={(value) => {
              setSelectedSemester(value || "");
              if (error) {
                setError("");
              }
            }}
            error={error}
            styles={inputStyles}
          />

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className={`w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:w-auto ${
                hasValidLevelSelection
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-300"
              }`}
              disabled={!hasValidLevelSelection}
            >
              Continue to Password Setup
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
