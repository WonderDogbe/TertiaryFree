"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import {
  getProgrammeOptionsForFacultyAndType,
  getStudyModeOptions,
  isKnownDepartmentName,
  isKnownGender,
  isKnownLevel,
  isKnownProgrammeName,
  isKnownProgrammeType,
  isKnownStudyMode,
  isKnownWeekDay,
} from "@/lib/local-db";
import { ALL_WEEK_DAYS } from "@/lib/study-schedule";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";

const STUDY_MODE_OPTIONS = getStudyModeOptions();

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
    const studyMode =
      typeof parsed.studyMode === "string" && isKnownStudyMode(parsed.studyMode)
        ? parsed.studyMode
        : "";

    const customStudyDays = Array.isArray(parsed.customStudyDays)
      ? ALL_WEEK_DAYS.filter((day) =>
          parsed.customStudyDays.some((storedDay) => storedDay === day),
        )
      : [];

    return {
      name,
      email,
      indexNumber,
      gender,
      level,
      department,
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

export default function StudentStudyModePage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [studentDetails] = useState(readStoredStudentDetails);
  const requiresFacultyAndProgrammeSelection = isHtuInstitution(institutionName);

  const [studyMode, setStudyMode] = useState(studentDetails.studyMode);
  const [customStudyDays, setCustomStudyDays] = useState(
    studentDetails.customStudyDays,
  );
  const [error, setError] = useState("");

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

  const hasValidStudyMode =
    isKnownStudyMode(studyMode) &&
    (studyMode !== "custom" || customStudyDays.length > 0);

  const handleToggleCustomDay = (day) => {
    if (!isKnownWeekDay(day)) {
      return;
    }

    setCustomStudyDays((currentDays) => {
      const daySet = new Set(currentDays);

      if (daySet.has(day)) {
        daySet.delete(day);
      } else {
        daySet.add(day);
      }

      return ALL_WEEK_DAYS.filter((item) => daySet.has(item));
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isKnownStudyMode(studyMode)) {
      setError("Select your study mode");
      return;
    }

    if (studyMode === "custom" && customStudyDays.length === 0) {
      setError("Select at least one study day for custom mode");
      return;
    }

    window.localStorage.setItem(
      SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
      JSON.stringify({
        ...studentDetails,
        studyMode,
        customStudyDays: studyMode === "custom" ? customStudyDays : [],
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
          href="/signup/student/level"
          label="Back to level selection"
        />
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
            Complete Previous Steps First
          </h1>
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            Complete student profile and level setup before choosing study mode.
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
      <FloatingBackLink href="/signup/student/level" label="Back to level selection" />
      <section className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
          Student Signup
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Select Your Study Mode
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Choose the days your classes normally run so your timetable and notifications stay relevant.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STUDY_MODE_OPTIONS.map((option) => {
              const isSelected = studyMode === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setStudyMode(option.value);
                    if (option.value !== "custom") {
                      setCustomStudyDays([]);
                    }
                    if (error) {
                      setError("");
                    }
                  }}
                  className={`rounded-xl border px-4 py-4 text-left transition-colors duration-200 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                      : "border-gray-200 bg-white hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800"
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
                    {option.label}
                  </p>
                  <p className="mt-1 text-xs text-gray-600 transition-colors duration-300 dark:text-gray-300">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          {studyMode === "custom" && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800/60">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-600 transition-colors duration-300 dark:text-gray-300">
                Select Active Days
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ALL_WEEK_DAYS.map((day) => {
                  const isSelected = customStudyDays.includes(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleToggleCustomDay(day)}
                      className={`inline-flex items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isSelected
                          ? "border-blue-500 bg-blue-100 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-200"
                          : "border-gray-300 bg-white text-gray-700 hover:border-blue-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      <span>{day.slice(0, 3)}</span>
                      {isSelected && <Check className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm font-medium text-red-600 transition-colors duration-300 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className={`w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:w-auto ${
                hasValidStudyMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-300"
              }`}
              disabled={!hasValidStudyMode}
            >
              Continue to Password Setup
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
