"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Select } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import {
  findFacultyByName,
  getProgrammesAsync,
  getProgrammeTypeOptions,
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

const PROGRAMME_TYPE_OPTIONS = getProgrammeTypeOptions();

function isHtuInstitution(institutionName: string) {
  return institutionName.trim().toUpperCase() === HTU_INSTITUTION_NAME;
}

function readStoredInstitutionName() {
  if (typeof window === "undefined") return "";
  try {
    const storedValue = window.localStorage.getItem(SIGNUP_INSTITUTION_STORAGE_KEY);
    if (!storedValue) return "";
    const parsed = JSON.parse(storedValue);
    if (parsed && typeof parsed === "object" && typeof parsed.name === "string") return parsed.name;
  } catch { /* ignore */ }
  return "";
}

function readStoredStudentDetails() {
  if (typeof window === "undefined") return { name: "", email: "", indexNumber: "", gender: "", level: "", department: "", programmeType: "", programme: "", studyMode: "", customStudyDays: [] };
  try {
    const storedValue = window.localStorage.getItem(SIGNUP_STUDENT_DETAILS_STORAGE_KEY);
    if (!storedValue) return { name: "", email: "", indexNumber: "", gender: "", level: "", department: "", programmeType: "", programme: "", studyMode: "", customStudyDays: [] };
    const parsed = JSON.parse(storedValue);
    if (!parsed || typeof parsed !== "object") return { name: "", email: "", indexNumber: "", gender: "", level: "", department: "", programmeType: "", programme: "", studyMode: "", customStudyDays: [] };
    
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
      indexNumber: typeof parsed.indexNumber === "string" ? parsed.indexNumber : "",
      gender: typeof parsed.gender === "string" && isKnownGender(parsed.gender) ? parsed.gender : "",
      level: typeof parsed.level === "string" && isKnownLevel(parsed.level) ? parsed.level : "",
      department: typeof parsed.department === "string" && isKnownFacultyName(parsed.department) ? parsed.department : "",
      programmeType: typeof parsed.programmeType === "string" && isKnownProgrammeType(parsed.programmeType) ? parsed.programmeType : "",
      programme: typeof parsed.programme === "string" && isKnownProgrammeName(parsed.programme) ? parsed.programme : "",
      studyMode: typeof parsed.studyMode === "string" && isKnownStudyMode(parsed.studyMode) ? parsed.studyMode : "",
      customStudyDays: Array.isArray(parsed.customStudyDays) ? parsed.customStudyDays.filter((day) => isKnownWeekDay(day)) : [],
    };
  } catch {
    return { name: "", email: "", indexNumber: "", gender: "", level: "", department: "", programmeType: "", programme: "", studyMode: "", customStudyDays: [] };
  }
}

export default function StudentProgrammePage() {
  const router = useRouter();
  const [institutionName] = React.useState(readStoredInstitutionName);
  const [studentDetails] = React.useState(readStoredStudentDetails);
  const [programmeType, setProgrammeType] = React.useState(studentDetails.programmeType);
  const [programme, setProgramme] = React.useState(studentDetails.programme);
  const [programmeOptions, setProgrammeOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const requiresProgrammeSelection = isHtuInstitution(institutionName);

  React.useEffect(() => {
    async function loadProgrammes() {
      if (requiresProgrammeSelection && studentDetails.department && isKnownProgrammeType(programmeType)) {
        setIsLoading(true);
        // We need the faculty ID, but the storage might have the faculty Name.
        // Let's resolve the ID from the name if needed.
        const faculty = findFacultyByName(studentDetails.department);
        if (faculty) {
          const data = await getProgrammesAsync(faculty.id, programmeType);
          setProgrammeOptions(data);
        }
        setIsLoading(false);
      }
    }
    loadProgrammes();
  }, [studentDetails.department, programmeType, requiresProgrammeSelection]);

  const hasValidProgrammeSelection = !requiresProgrammeSelection || (isKnownProgrammeType(programmeType) && programmeOptions.some((option) => option.name === programme));

  const inputStyles = {
    root: { marginBottom: "1rem" },
    label: { display: "none" },
    input: {
      backgroundColor: "#fff",
      color: "#000",
      borderColor: "#d8b4fe",
      borderWidth: "1.5px",
      minHeight: "60px",
      borderRadius: "16px",
      fontSize: "1rem",
      fontWeight: "600",
      boxShadow: "0 2px 10px rgba(168, 85, 247, 0.05)",
      transition: "all 0.2s ease",
      "&::placeholder": { color: "#475569", opacity: 1 },
      "&:focus": { borderColor: "#a855f7", boxShadow: "0 0 0 4px rgba(168, 85, 247, 0.1)" },
    },
    dropdown: {
      backgroundColor: "var(--color-secondary-bg)",
      borderRadius: "24px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
      border: "1px solid rgba(0,0,0,0.08)",
      padding: "0.75rem",
      marginTop: "8px",
    },
    option: {
      borderRadius: "14px",
      fontSize: "0.95rem",
      fontWeight: "600",
      padding: "12px 16px",
      marginBottom: "4px",
      color: "#000",
      "&[data-selected]": { backgroundColor: "#f3e8ff", color: "#7e22ce" },
      "&[data-hovered]": { backgroundColor: "#faf5ff", color: "#7e22ce" },
    },
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!requiresProgrammeSelection) {
      window.localStorage.setItem(SIGNUP_STUDENT_DETAILS_STORAGE_KEY, JSON.stringify({ ...studentDetails, programmeType: "", programme: "" }));
      router.push("/signup/student");
      return;
    }
    if (!isKnownProgrammeType(programmeType)) { setError("Programme type is required"); return; }
    if (!programmeOptions.some((option) => option.name === programme)) { setError("Programme is required"); return; }
    window.localStorage.setItem(SIGNUP_STUDENT_DETAILS_STORAGE_KEY, JSON.stringify({ ...studentDetails, programmeType, programme }));
    router.push("/signup/student");
  };

  return (
    <>
      <style>{`
        .institution-page {
          min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 1.25rem 2.5rem; position: relative; overflow: hidden; background: var(--color-background);
        }
        html.dark .institution-page { background: var(--color-background); }
        html.dark .institution-title { color: var(--color-text); }
        html.dark .institution-subtitle { color: #b8c0d6; }
        html.dark .institution-form-card { background: rgba(20, 26, 46, 0.9); border: 1px solid rgba(148, 163, 184, 0.22); }



        .institution-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 2.5rem;
        }

        .institution-header { text-align: center; margin-bottom: 1rem; }
        .institution-title {
          font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; color: var(--color-text); margin: 0; line-height: 1.1;
        }
        .institution-subtitle {
          font-size: 1rem; color: var(--color-text); opacity: 0.8; margin-top: 0.75rem; font-weight: 600;
        }

        .institution-form-card {
          background: var(--color-background);
          border-radius: 32px;
          padding: 2.5rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.02);
        }
        html.dark .institution-form-card {
          background: rgba(20, 26, 46, 0.95);
          border-color: rgba(148, 163, 184, 0.22);
        }

        .faculty-option {
          display: flex; align-items: center; gap: 1rem; color: var(--color-text); width: 100%;
        }
        .faculty-icon-placeholder {
          width: 36px; height: 36px; border-radius: 10px; background: #1a1a1a; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 800; flex-shrink: 0;
        }
        html.dark .faculty-icon-placeholder { background: #334155; }

        .institution-continue-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 2.5rem;
          border-radius: 999px;
          border: none;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: all 0.25s ease;
          background: linear-gradient(135deg, #a855f7, #6366f1);
          color: #fff;
          width: 100%;
          margin-top: 1rem;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }
        .institution-continue-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
        }
        .institution-continue-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          background: #ccc;
          box-shadow: none;
        }
      `}</style>

      <main className="institution-page">
        <FloatingBackLink href="/signup/student/department" label="Back" />

        <div className="institution-container">
          {!institutionName ? (
            <div className="institution-header">
              <h1 className="institution-title">No Institution Selected</h1>
              <div className="mt-8">
                <Link href="/signup/institution" className="institution-continue-btn">Back to selection</Link>
              </div>
            </div>
          ) : (
            <>
              <header className="institution-header">
                <h1 className="institution-title">Your Programme</h1>
                <p className="institution-subtitle">Tell us what you are studying.</p>
              </header>

              <div className="institution-form-card">
                <form onSubmit={handleSubmit}>
                  {requiresProgrammeSelection && (
                    <>
                      <Select
                        id="student-programme-type"
                        placeholder="Select study type"
                        data={PROGRAMME_TYPE_OPTIONS}
                        value={programmeType}
                        onChange={(value) => { setProgrammeType(value || ""); setProgramme(""); if (error) setError(""); }}
                        styles={inputStyles}
                        renderOption={({ option, checked }: { option: any; checked: boolean }) => (
                          <div className="faculty-option">
                            <div className="faculty-icon-placeholder" style={{ backgroundColor: checked ? "#7e22ce" : "#000" }}>
                              {option.label.substring(0, 2).toUpperCase()}
                            </div>
                            <span style={{ color: "inherit", fontWeight: "inherit" }}>{option.label}</span>
                          </div>
                        )}
                      />

                      <Select
                        id="student-programme"
                        placeholder={isLoading ? "Loading..." : isKnownProgrammeType(programmeType) ? "Select your programme" : "Select study type first"}
                        data={programmeOptions.map((option) => ({ value: option.name, label: option.name }))}
                        value={programme}
                        onChange={(value) => { setProgramme(value || ""); if (error) setError(""); }}
                        disabled={!isKnownProgrammeType(programmeType) || isLoading}
                        searchable
                        nothingFoundMessage={isLoading ? "Loading programmes..." : "No matching programme"}
                        styles={inputStyles}
                        error={error}
                        renderOption={({ option, checked }: { option: any; checked: boolean }) => (
                          <div className="faculty-option">
                            <div className="faculty-icon-placeholder" style={{ backgroundColor: checked ? "#7e22ce" : "#000" }}>
                              {option.label.substring(0, 2).toUpperCase()}
                            </div>
                            <span style={{ color: "inherit", fontWeight: "inherit" }}>{option.label}</span>
                          </div>
                        )}
                      />
                    </>
                  )}

                  <button type="submit" className="institution-continue-btn" disabled={!hasValidProgrammeSelection}>
                    Continue
                    <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}