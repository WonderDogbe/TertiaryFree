"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import {
  getProgrammeOptionsForFacultyAndType,
  getProgrammeTypeOptions,
  isKnownFacultyName,
  isKnownGender,
  isKnownLevel,
  isKnownProgrammeName,
  isKnownProgrammeType,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";

const PROGRAMME_TYPE_OPTIONS = getProgrammeTypeOptions();

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

export default function StudentProgrammePage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [studentDetails] = useState(readStoredStudentDetails);
  const [programmeType, setProgrammeType] = useState(studentDetails.programmeType);
  const [programme, setProgramme] = useState(studentDetails.programme);
  const [error, setError] = useState("");
  const requiresProgrammeSelection = isHtuInstitution(institutionName);

  const hasRequiredStudentDetails =
    !requiresProgrammeSelection || isKnownFacultyName(studentDetails.department);

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

  const programmeOptions =
    hasRequiredStudentDetails && isKnownProgrammeType(programmeType)
      ? getProgrammeOptionsForFacultyAndType(
          studentDetails.department,
          programmeType,
        )
      : [];

  const hasValidProgrammeSelection =
    !requiresProgrammeSelection ||
    (isKnownProgrammeType(programmeType) &&
      programmeOptions.some((option) => option.name === programme));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!requiresProgrammeSelection) {
      window.localStorage.setItem(
        SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
        JSON.stringify({
          ...studentDetails,
          programmeType: "",
          programme: "",
        }),
      );

      router.push("/signup/student");
      return;
    }

    if (!isKnownProgrammeType(programmeType)) {
      setError("Programme type is required");
      return;
    }

    if (!programmeOptions.some((option) => option.name === programme)) {
      setError("Programme is required");
      return;
    }

    window.localStorage.setItem(
      SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
      JSON.stringify({
        ...studentDetails,
        programmeType,
        programme,
      }),
    );

    router.push("/signup/student");
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
          href="/signup/student/department"
          label="Back to faculty selection"
        />
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
            Complete Previous Steps First
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Select your faculty before choosing your programme.
          </p>
          <div className="mt-6">
            <Link
              href="/signup/student/department"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Faculty Selection
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <FloatingBackLink
        href={requiresProgrammeSelection ? "/signup/student/department" : "/signup/details"}
        label="Back"
      />
      <section className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
          Student Signup
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Select Your Programme
        </h1>
        {requiresProgrammeSelection ? (
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Choose your study type and programme under {studentDetails.department}.
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Programme selection is currently available only for HTU. Continue to student details.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {requiresProgrammeSelection && (
            <Select
              id="student-programme-type"
              label="Study Type"
              placeholder="Select study type"
              data={PROGRAMME_TYPE_OPTIONS}
              value={programmeType}
              onChange={(value) => {
                setProgrammeType(value || "");
                setProgramme("");
                if (error) {
                  setError("");
                }
              }}
              styles={inputStyles}
            />
          )}

          {requiresProgrammeSelection && (
            <Select
              id="student-programme"
              label="Programme"
              placeholder={
                isKnownProgrammeType(programmeType)
                  ? "Select your programme"
                  : "Select study type first"
              }
              data={programmeOptions.map((option) => ({
                value: option.name,
                label: option.name,
              }))}
              value={programme}
              onChange={(value) => {
                setProgramme(value || "");
                if (error) {
                  setError("");
                }
              }}
              disabled={!isKnownProgrammeType(programmeType)}
              searchable
              nothingFoundMessage="No matching programme"
              styles={inputStyles}
              error={error}
            />
          )}

          {requiresProgrammeSelection &&
            isKnownProgrammeType(programmeType) &&
            programmeOptions.length === 0 && (
            <p className="-mt-2 text-xs font-medium text-amber-600 dark:text-amber-400">
              No programmes are currently listed for this faculty and study type.
            </p>
            )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className={`w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:w-auto ${
                hasValidProgrammeSelection
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-300"
              }`}
              disabled={!hasValidProgrammeSelection}
            >
              Continue to Student Details
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}