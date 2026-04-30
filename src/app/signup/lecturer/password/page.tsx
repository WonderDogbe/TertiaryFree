"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@mantine/core";
import { UserPlus, Lock } from "lucide-react";
import { FloatingBackLink } from "@/components/signup/FloatingBackLink";
import { createClient } from "@/utils/supabase/client";

const SIGNUP_INSTITUTION_STORAGE_KEY = "tertiaryfree:signup-institution";
const SIGNUP_LECTURER_DETAILS_STORAGE_KEY = "tertiaryfree:signup-lecturer-details";
const HTU_INSTITUTION_NAME = "HO TECHNICAL UNIVERSITY";

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

export default function LecturerPasswordPage() {
  const router = useRouter();
  const [institutionName] = React.useState(readStoredInstitutionName);
  const [lecturerDetails] = React.useState(readStoredLecturerDetails);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState({ password: "", confirmPassword: "" });
  const [submitError, setSubmitError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
      boxShadow: "0 2px 10px rgba(168, 85, 247, 0.05)",
      transition: "all 0.2s ease",
    },
    innerInput: {
      height: "56px",
      backgroundColor: "transparent",
      color: "inherit",
    },
    visibilityToggle: { color: "#64748b" },
    section: { paddingLeft: "12px", paddingRight: "12px" }
  };

  const isFormValid = password.trim() !== "" && confirmPassword.trim() !== "" && password.length >= 8 && password === confirmPassword;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      password: password.trim() === "" ? "Password is required" : password.length < 8 ? "Password must be at least 8 characters" : "",
      confirmPassword: confirmPassword.trim() === "" ? "Confirm password is required" : password !== confirmPassword ? "Passwords do not match" : "",
    };
    setErrors(nextErrors);
    if (nextErrors.password || nextErrors.confirmPassword) return;

    setLoading(true);
    setSubmitError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: lecturerDetails.email,
      password,
      options: {
        data: {
          role: "lecturer",
          name: lecturerDetails.name,
          title: lecturerDetails.title,
          school: institutionName,
          department: lecturerDetails.department,
          courseLectured: lecturerDetails.coursesLectured.join(", "),
          coursesLectured: lecturerDetails.coursesLectured,
        }
      }
    });
    setLoading(false);
    if (error) { setSubmitError(error.message); return; }

    try {
      window.localStorage.removeItem(SIGNUP_INSTITUTION_STORAGE_KEY);
      window.localStorage.removeItem(SIGNUP_LECTURER_DETAILS_STORAGE_KEY);
    } catch { /* ignore */ }

    router.push(`/welcome?email=${encodeURIComponent(lecturerDetails.email)}&role=lecturer`);
  };

  return (
    <>
      <style>{`
        .institution-page {
          min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 1.25rem 2.5rem; position: relative; overflow: hidden; background: #fdfdfd;
        }
        .institution-container {
          position: relative; z-index: 1; width: 100%; max-width: 500px; display: flex; flex-direction: column; align-items: stretch; gap: 2.5rem;
        }
        .institution-header { text-align: center; margin-bottom: 1rem; }
        .institution-title {
          font-size: 2.5rem; font-weight: 800; letter-spacing: -0.04em; color: #000; margin: 0; line-height: 1.1;
        }
        .institution-subtitle {
          font-size: 1rem; color: #334155; margin-top: 0.75rem; font-weight: 600;
        }
        .institution-form-card {
          background: #fff; border-radius: 32px; padding: 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.02);
        }
        .institution-continue-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 2.5rem; border-radius: 999px; border: none; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.01em; cursor: pointer; transition: all 0.25s ease; background: linear-gradient(135deg, #a855f7, #6366f1); color: #fff; width: 100%; margin-top: 1rem; box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }
        .institution-continue-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.45); }
        .institution-continue-btn:disabled { opacity: 0.45; cursor: not-allowed; background: #ccc; box-shadow: none; }
        
        html.dark .institution-page { background: var(--color-background); }
        html.dark .institution-title { color: var(--color-text); }
        html.dark .institution-subtitle { color: #b8c0d6; }
        html.dark .institution-form-card { background: rgba(20, 26, 46, 0.9); border: 1px solid rgba(148, 163, 184, 0.22); }
        html.dark .mantine-PasswordInput-innerInput { background-color: rgba(15, 19, 36, 0.6) !important; color: #fff !important; border-color: #475569 !important; }
        
        /* Focus styles */
        .mantine-PasswordInput-innerInput:focus-within {
          border-color: #a855f7 !important;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1) !important;
        }
      `}</style>

      <main className="institution-page">
        <FloatingBackLink href="/signup/lecturer" label="Back" />

        <div className="institution-container">
          <header className="institution-header">
            <h1 className="institution-title">Security</h1>
            <p className="institution-subtitle">Set a password to secure your account.</p>
          </header>

          <div className="institution-form-card">
            <form onSubmit={handleSubmit}>
              <PasswordInput
                id="lecturer-password"
                placeholder="New Password"
                leftSection={<Lock size={18} />}
                value={password}
                onChange={(e) => { setPassword(e.currentTarget.value); if (errors.password) setErrors(prev => ({ ...prev, password: "" })); if (submitError) setSubmitError(""); }}
                error={errors.password}
                styles={inputStyles}
              />

              <PasswordInput
                id="lecturer-confirm-password"
                placeholder="Confirm Password"
                leftSection={<Lock size={18} />}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.currentTarget.value); if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: "" })); if (submitError) setSubmitError(""); }}
                error={errors.confirmPassword}
                styles={inputStyles}
              />

              {submitError && <p className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-100">{submitError}</p>}

              <button type="submit" className="institution-continue-btn" disabled={!isFormValid || loading}>
                {loading ? "Completing..." : "Complete Signup"}
                {!loading && <UserPlus size={18} />}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
