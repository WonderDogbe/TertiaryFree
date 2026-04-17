"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InstitutionCard } from "@/components/signup/InstitutionCard";
import {
  getInstitutions,
  isKnownInstitutionName,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const INSTITUTIONS = getInstitutions();

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
  const [selectedInstitution, setSelectedInstitution] = useState(
    readStoredInstitutionName,
  );

  const handleGoBack = () => {
    router.push("/");
  };

  const handleSelectInstitution = (institution) => {
    setSelectedInstitution(institution.name);
  };

  const handleContinue = () => {
    const selectedInstitutionRecord = INSTITUTIONS.find(
      (institution) => institution.name === selectedInstitution,
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <section className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <button
          type="button"
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
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
