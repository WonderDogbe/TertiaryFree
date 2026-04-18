"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InstitutionCard } from "@/components/signup/InstitutionCard";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import {
  getInstitutions,
  isKnownInstitutionName,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_STUDENT_DETAILS_STORAGE_KEY = "tertiaryfree:signup-student-details";
const INSTITUTIONS = getInstitutions();
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";
const START_OVER_QUERY_PARAM = "startOver";

function shouldStartOver() {
  if (typeof window === "undefined") {
    return false;
  }

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(START_OVER_QUERY_PARAM) === "1";
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

    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.name === "string" &&
      isKnownInstitutionName(parsed.name)
    ) {
      return parsed.name;
    }
  } catch {
    // Ignore invalid signup storage payloads.
  }

  return "";
}

export default function SignupInstitutionPage() {
  const router = useRouter();
  const [selectedInstitution, setSelectedInstitution] = useState(() =>
    shouldStartOver() ? "" : readStoredInstitutionName(),
  );

  useEffect(() => {
    if (!shouldStartOver()) {
      return;
    }

    try {
      window.localStorage.removeItem(SIGNUP_INSTITUTION_STORAGE_KEY);
      window.localStorage.removeItem(SIGNUP_STUDENT_DETAILS_STORAGE_KEY);
    } catch {
      // Ignore cleanup failures.
    }
  }, []);

  const isMobileViewport = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
  };

  const handleContinue = (institutionName = selectedInstitution) => {
    const institutionToContinueWith =
      typeof institutionName === "string" ? institutionName : selectedInstitution;

    const selectedInstitutionRecord = INSTITUTIONS.find(
      (institution) => institution.name === institutionToContinueWith,
    );

    if (!selectedInstitutionRecord) {
      return;
    }

    window.localStorage.setItem(
      SIGNUP_INSTITUTION_STORAGE_KEY,
      JSON.stringify(selectedInstitutionRecord),
    );

    router.push("/signup/details");
  };

  const handleSelectInstitution = (institution) => {
    setSelectedInstitution(institution.name);

    if (isMobileViewport()) {
      handleContinue(institution.name);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <FloatingBackLink href="/" label="Back to home" />
      <section className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Select Your Institution
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Choose your school to continue
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {INSTITUTIONS.map((institution) => (
            <InstitutionCard
              key={institution.name}
              name={institution.name}
              abbreviation={institution.abbreviation}
              isSelected={selectedInstitution === institution.name}
              onSelect={() => handleSelectInstitution(institution)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            className={`w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors sm:w-auto ${
              selectedInstitution
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-blue-300"
            }`}
            disabled={!selectedInstitution}
          >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}
