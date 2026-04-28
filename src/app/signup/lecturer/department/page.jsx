"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select } from "@mantine/core";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import {
  getFacultyOptions,
  isKnownFacultyName,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_LECTURER_DETAILS_STORAGE_KEY = "tertiaryfree:signup-lecturer-details";
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";

const FACULTY_SELECT_OPTIONS = getFacultyOptions().map((option) => ({
  value: option.name,
  label: option.name,
}));

function isHtuInstitution(institutionName) {
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

function readStoredLecturerDetails() {
  if (typeof window === "undefined") return { name: "", email: "", title: "", courseLectured: "", department: "" };
  try {
    const storedValue = window.localStorage.getItem(SIGNUP_LECTURER_DETAILS_STORAGE_KEY);
    if (!storedValue) return { name: "", email: "", title: "", courseLectured: "", department: "" };
    const parsed = JSON.parse(storedValue);
    if (!parsed || typeof parsed !== "object") return { name: "", email: "", title: "", courseLectured: "", department: "" };
    
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
      title: typeof parsed.title === "string" ? parsed.title : "",
      courseLectured: typeof parsed.courseLectured === "string" ? parsed.courseLectured : "",
      department: typeof parsed.department === "string" && isKnownFacultyName(parsed.department) ? parsed.department : "",
    };
  } catch {
    return { name: "", email: "", title: "", courseLectured: "", department: "" };
  }
}

export default function LecturerFacultyPage() {
  const router = useRouter();
  const [institutionName] = useState(readStoredInstitutionName);
  const [lecturerDetails] = useState(readStoredLecturerDetails);
  const [faculty, setFaculty] = useState(lecturerDetails.department);
  const [error, setError] = useState("");
  const requiresFacultySelection = isHtuInstitution(institutionName);

  const inputStyles = {
    root: { marginBottom: "1.5rem" },
    label: { display: "none" },
    input: {
      backgroundColor: "var(--color-background)",
      color: "var(--color-text)",
      borderColor: "#d8b4fe",
      borderWidth: "1.5px",
      minHeight: "60px",
      borderRadius: "16px",
      fontSize: "1rem",
      fontWeight: "600",
      boxShadow: "0 2px 10px rgba(168, 85, 247, 0.05)",
      transition: "all 0.2s ease",
      "&::placeholder": { color: "#475569", opacity: 1 },
      "&:focus": {
        borderColor: "#a855f7",
        boxShadow: "0 0 0 4px rgba(168, 85, 247, 0.1)",
      },
    },
    dropdown: {
      backgroundColor: "var(--color-background)",
      borderRadius: "24px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
      border: "1px solid rgba(148, 163, 184, 0.22)",
      padding: "0.75rem",
      marginTop: "8px",
    },
    option: {
      borderRadius: "14px",
      fontSize: "0.95rem",
      fontWeight: "600",
      padding: "12px 16px",
      marginBottom: "4px",
      color: "var(--color-text)",
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!requiresFacultySelection) {
      window.localStorage.setItem(SIGNUP_LECTURER_DETAILS_STORAGE_KEY, JSON.stringify({ ...lecturerDetails, department: "" }));
      router.push("/signup/lecturer");
      return;
    }
    if (!isKnownFacultyName(faculty)) { setError("Faculty is required"); return; }
    window.localStorage.setItem(SIGNUP_LECTURER_DETAILS_STORAGE_KEY, JSON.stringify({ ...lecturerDetails, department: faculty }));
    router.push("/signup/lecturer");
  };

  return (
    <>
      <style>{`
        .institution-page {
          min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 1.25rem 2.5rem; position: relative; overflow: hidden; background: #fdfdfd;
        }
        .institution-container {
          position: relative; z-index: 1; width: 100%; max-width: 520px; display: flex; flex-direction: column; align-items: stretch; gap: 2.5rem;
        }
        .institution-header { text-align: center; margin-bottom: 1rem; }
        .institution-title {
          font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; color: #000; margin: 0; line-height: 1.1;
        }
        .institution-subtitle {
          font-size: 1rem; color: #334155; margin-top: 0.75rem; font-weight: 600;
        }
        .institution-form-card {
          background: #fff; border-radius: 32px; padding: 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.02);
        }
        .faculty-option {
          display: flex; align-items: center; gap: 1rem; color: #000; width: 100%;
        }
        .faculty-icon-placeholder {
          width: 36px; height: 36px; border-radius: 10px; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0;
        }
        .institution-continue-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 2.5rem; border-radius: 999px; border: none; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.01em; cursor: pointer; transition: all 0.25s ease; background: linear-gradient(135deg, #a855f7, #6366f1); color: #fff; width: 100%; margin-top: 1rem; box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }
        .institution-continue-btn:hover:not(:disabled) {
          transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.45);
        }
        .institution-continue-btn:disabled {
          opacity: 0.45; cursor: not-allowed; background: #ccc; box-shadow: none;
        }

        html.dark .institution-page { background: var(--color-background); }
        html.dark .institution-title { color: var(--color-text); }
        html.dark .institution-subtitle { color: #b8c0d6; }
        html.dark .institution-form-card { background: rgba(20, 26, 46, 0.9); border: 1px solid rgba(148, 163, 184, 0.22); }
        html.dark .mantine-Input-input { background-color: rgba(15, 19, 36, 0.6) !important; color: #fff !important; border-color: #475569 !important; }

        /* Mantine Select Overrides */
        [data-combobox-option][data-selected] {
          background-color: #4338ca !important;
          color: #fff !important;
        }
        [data-combobox-option][data-hovered] {
          background-color: rgba(67, 56, 202, 0.3) !important;
          color: #fff !important;
        }
        html.dark [data-combobox-option] { color: #fff !important; }
      `}</style>

      <main className="institution-page">
        <FloatingBackLink href="/signup/details" label="Back" />

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
                <h1 className="institution-title">Select Faculty</h1>
                <p className="institution-subtitle">Choose your department to continue.</p>
              </header>

              <div className="institution-form-card">
                <form onSubmit={handleSubmit}>
                  {requiresFacultySelection && (
                    <Select
                      id="lecturer-faculty"
                      placeholder="Select your faculty"
                      data={FACULTY_SELECT_OPTIONS}
                      value={faculty}
                      onChange={(value) => {
                        setFaculty(value || "");
                        if (error) setError("");
                      }}
                      error={error}
                      styles={inputStyles}
                      searchable
                      renderOption={({ option, checked }) => (
                        <div className="faculty-option">
                          <div className="faculty-icon-placeholder" style={{ backgroundColor: checked ? "#7e22ce" : "#000" }}>
                            {option.label.substring(0, 2).toUpperCase()}
                          </div>
                          <span style={{ color: "inherit", fontWeight: "inherit" }}>{option.label}</span>
                        </div>
                      )}
                    />
                  )}

                  <button
                    type="submit"
                    className="institution-continue-btn"
                    disabled={requiresFacultySelection && !isKnownFacultyName(faculty)}
                  >
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
