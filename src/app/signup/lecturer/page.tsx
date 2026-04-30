"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Select, MultiSelect } from "@mantine/core";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import {
  getLecturerTitleOptions,
  getCourseOptions,
} from "@/lib/local-db";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_LECTURER_DETAILS_STORAGE_KEY = "tertiaryfree:signup-lecturer-details";
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";

const TITLE_OPTIONS = getLecturerTitleOptions();
const COURSE_OPTIONS = getCourseOptions();

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

function readStoredLecturerDetails() {
  const defaults = { name: "", email: "", title: "", coursesLectured: [], department: "" };
  if (typeof window === "undefined") return defaults;
  try {
    const storedValue = window.localStorage.getItem(SIGNUP_LECTURER_DETAILS_STORAGE_KEY);
    if (!storedValue) return defaults;
    const parsed = JSON.parse(storedValue);
    if (!parsed || typeof parsed !== "object") return defaults;
    
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
      title: typeof parsed.title === "string" ? parsed.title : "",
      coursesLectured: Array.isArray(parsed.coursesLectured) ? parsed.coursesLectured : [],
      department: typeof parsed.department === "string" ? parsed.department : "",
    };
  } catch {
    return defaults;
  }
}

export default function SignupLecturerPage() {
  const router = useRouter();
  const [institutionName] = React.useState(readStoredInstitutionName);
  const [formData, setFormData] = React.useState(readStoredLecturerDetails);
  const [errors, setErrors] = React.useState({ name: "", email: "", title: "", coursesLectured: "" });

  const inputStyles = {
    root: { marginBottom: "1.25rem" },
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

  const isFormValid = 
    formData.name.trim() !== "" && 
    formData.email.trim() !== "" && 
    formData.email.includes("@") && 
    formData.title !== "" && 
    formData.coursesLectured.length > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      name: formData.name.trim() ? "" : "Full name is required",
      email: formData.email.trim() === "" ? "Email is required" : formData.email.includes("@") ? "" : "Invalid email address",
      title: formData.title ? "" : "Title is required",
      coursesLectured: formData.coursesLectured.length > 0 ? "" : "Select at least one course",
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.title || nextErrors.coursesLectured) return;

    window.localStorage.setItem(SIGNUP_LECTURER_DETAILS_STORAGE_KEY, JSON.stringify(formData));
    router.push("/signup/lecturer/password");
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
        html.dark .premium-input, html.dark .mantine-Input-input { background-color: rgba(15, 19, 36, 0.6) !important; color: #fff !important; border-color: #475569 !important; }
        html.dark [data-combobox-option] { color: #fff !important; }
        html.dark [data-combobox-option][data-selected] { background-color: #4338ca !important; color: #fff !important; }
        html.dark [data-combobox-option][data-hovered] { background-color: rgba(67, 56, 202, 0.3) !important; color: #fff !important; }
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
        .premium-input {
          width: 100%; background-color: var(--color-background); color: var(--color-text); border: 1.5px solid #d8b4fe; min-height: 60px; border-radius: 16px; font-size: 1rem; padding: 0 1.25rem; box-shadow: 0 2px 10px rgba(168, 85, 247, 0.05); transition: all 0.2s ease; outline: none; font-weight: 600;
        }
        .premium-input:focus { border-color: #a855f7; boxShadow: 0 0 0 4px rgba(168, 85, 247, 0.1); }
        .premium-input::placeholder { color: #475569; font-weight: 500; }
        .faculty-option { display: flex; align-items: center; gap: 1rem; color: #000; width: 100%; }
        .faculty-icon-placeholder {
          width: 36px; height: 36px; border-radius: 10px; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0;
        }
        .institution-continue-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 2.5rem; border-radius: 999px; border: none; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.01em; cursor: pointer; transition: all 0.25s ease; background: linear-gradient(135deg, #a855f7, #6366f1); color: #fff; width: 100%; margin-top: 1rem; box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }
        .institution-continue-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.45); }
        .institution-continue-btn:disabled { opacity: 0.45; cursor: not-allowed; background: #ccc; box-shadow: none; }

        /* Mantine Select Overrides */
        [data-combobox-option][data-selected] {
          background-color: #f3e8ff !important;
          color: #7e22ce !important;
        }
        [data-combobox-option][data-hovered] {
          background-color: #faf5ff !important;
          color: #7e22ce !important;
        }
      `}</style>

      <main className="institution-page">
        <FloatingBackLink href="/signup/lecturer/department" label="Back" />

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
                <h1 className="institution-title">Lecturer Details</h1>
                <p className="institution-subtitle">Tell us more about your role.</p>
              </header>

              <div className="institution-form-card">
                <form onSubmit={handleSubmit}>
                  <Select
                    id="lecturer-title"
                    placeholder="Select your title"
                    data={TITLE_OPTIONS}
                    value={formData.title}
                    onChange={(v) => { setFormData(prev => ({ ...prev, title: v || "" })); if (errors.title) setErrors(prev => ({ ...prev, title: "" })); }}
                    error={errors.title}
                    styles={inputStyles}
                  />

                  <div style={{ marginBottom: "1.25rem" }}>
                    <input
                      id="lecturer-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => { setFormData(prev => ({ ...prev, name: e.target.value })); if (errors.name) setErrors(prev => ({ ...prev, name: "" })); }}
                      placeholder="Full Name (e.g. Dr. John Doe)"
                      className="premium-input"
                    />
                    {errors.name && <p className="mt-1 text-xs font-bold text-red-500 ml-2">{errors.name}</p>}
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <input
                      id="lecturer-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setFormData(prev => ({ ...prev, email: e.target.value })); if (errors.email) setErrors(prev => ({ ...prev, email: "" })); }}
                      placeholder="Email Address (e.g. john@htu.edu.gh)"
                      className="premium-input"
                    />
                    {errors.email && <p className="mt-1 text-xs font-bold text-red-500 ml-2">{errors.email}</p>}
                  </div>

                  <MultiSelect
                    id="lecturer-courses"
                    placeholder="Select courses you lecture"
                    data={COURSE_OPTIONS}
                    value={formData.coursesLectured}
                    onChange={(v) => { setFormData(prev => ({ ...prev, coursesLectured: v })); if (errors.coursesLectured) setErrors(prev => ({ ...prev, coursesLectured: "" })); }}
                    error={errors.coursesLectured}
                    styles={inputStyles}
                    searchable
                    clearable
                    hidePickedOptions
                  />

                  <button type="submit" className="institution-continue-btn" disabled={!isFormValid}>
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
