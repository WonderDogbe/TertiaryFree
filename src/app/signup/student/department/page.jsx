"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import {
  getDepartmentOptions,
  isKnownDepartmentName,
  isKnownGender,
  isKnownLevel,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";

const DEPARTMENT_OPTIONS = getDepartmentOptions();

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

export default function StudentDepartmentPage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [studentDetails] = useState(readStoredStudentDetails);
  const [department, setDepartment] = useState(studentDetails.department);
  const [isDepartmentMenuOpen, setIsDepartmentMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const departmentMenuRef = useRef(null);

  useEffect(() => {
    const handleDocumentPointerDown = (event) => {
      if (!departmentMenuRef.current) {
        return;
      }

      if (!departmentMenuRef.current.contains(event.target)) {
        setIsDepartmentMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentPointerDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentPointerDown);
    };
  }, []);

  const hasRequiredStudentDetails =
    studentDetails.name.trim() !== "" &&
    studentDetails.indexNumber.trim() !== "" &&
    isKnownGender(studentDetails.gender) &&
    isKnownLevel(studentDetails.level);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isKnownDepartmentName(department)) {
      setError("Department is required");
      return;
    }

    window.localStorage.setItem(
      SIGNUP_STUDENT_DETAILS_STORAGE_KEY,
      JSON.stringify({
        ...studentDetails,
        department,
      }),
    );

    router.push(
      `/register?role=student&institution=${encodeURIComponent(institutionName)}`,
    );
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
            Enter your details and select your level before choosing a department.
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
          Select Your Department
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Choose your department before continuing to registration.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="student-department"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-300"
            >
              Department
            </label>
            <div ref={departmentMenuRef} className="relative">
              <button
                id="student-department"
                type="button"
                onClick={() => setIsDepartmentMenuOpen((current) => !current)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                aria-haspopup="listbox"
                aria-expanded={isDepartmentMenuOpen}
              >
                <span className={department ? "" : "text-gray-500 dark:text-gray-400"}>
                  {department || "Select your department"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform dark:text-gray-400 ${
                    isDepartmentMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDepartmentMenuOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-lg border border-gray-300 bg-white py-1 shadow-md dark:border-gray-600 dark:bg-gray-800">
                  {DEPARTMENT_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setDepartment(option.name);
                        setIsDepartmentMenuOpen(false);
                        if (error) {
                          setError("");
                        }
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                        department === option.name
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
                          : "text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {error && (
              <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

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
              className={`mt-4 w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:mt-0 sm:w-auto ${
                isKnownDepartmentName(department)
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-300"
              }`}
              disabled={!isKnownDepartmentName(department)}
            >
              Continue to Registration
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
