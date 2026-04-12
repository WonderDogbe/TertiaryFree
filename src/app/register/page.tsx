"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TextInput, PasswordInput, Select } from "@mantine/core";
import {
  Mail,
  Lock,
  User,
  UserPlus,
  BookOpen,
  GraduationCap,
  Building2,
  School,
  Briefcase,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<"student" | "lecturer">("student");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    programme: "",
    department: "",
    level: "",
    title: "",
    courseLectured: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  useEffect(() => {
    const role = searchParams.get("role");

    if (role === "student" || role === "lecturer") {
      setUserType(role);
    }
  }, [searchParams]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (formData.name.trim() === "") newErrors.name = "Name is required";
      if (formData.email.trim() === "") newErrors.email = "Email is required";
      if (!formData.email.includes("@"))
        newErrors.email = "Invalid email address";
    } else if (step === 2) {
      if (userType === "student") {
        if (formData.programme.trim() === "")
          newErrors.programme = "Programme is required";
        if (formData.level.trim() === "") newErrors.level = "Level is required";
      } else {
        if (formData.title.trim() === "") newErrors.title = "Title is required";
        if (formData.courseLectured.trim() === "")
          newErrors.courseLectured = "Course is required";
      }
    } else if (step === 3) {
      if (formData.school.trim() === "")
        newErrors.school = "School is required";
      if (formData.department.trim() === "")
        newErrors.department = "Department is required";
    } else if (step === 4) {
      if (formData.password.trim() === "")
        newErrors.password = "Password is required";
      if (formData.confirmPassword.trim() === "")
        newErrors.confirmPassword = "Confirm password is required";
      if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isCurrentStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.email.includes("@")
      );
    } else if (currentStep === 2) {
      if (userType === "student") {
        return formData.programme.trim() !== "" && formData.level.trim() !== "";
      } else {
        return (
          formData.title.trim() !== "" && formData.courseLectured.trim() !== ""
        );
      }
    } else if (currentStep === 3) {
      return formData.school.trim() !== "" && formData.department.trim() !== "";
    } else if (currentStep === 4) {
      return (
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== "" &&
        formData.password.length >= 8 &&
        formData.password === formData.confirmPassword
      );
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setLoading(true);
    // Simulate API call — will connect to backend later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // For now, just log. Later connect to auth backend.
    console.log("Register submitted:", { userType, ...formData });
  };

  const inputStyles = {
    label: {
      color: "var(--color-text)",
      fontWeight: 500,
    },
    input: {
      backgroundColor: "#ffffff",
      color: "#0f172a",
      borderColor: "#dbeafe",
    },
    section: {
      color: "#94a3b8",
    },
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information";
      case 2:
        return userType === "student"
          ? "Academic Information"
          : "Professional Information";
      case 3:
        return "Institution Details";
      case 4:
        return "Set Password";
      default:
        return "";
    }
  };

  return (
    <AuthLayout
      userType={userType}
      title="Create your account"
      subtitle={
        userType === "student"
          ? "Join thousands of students simplifying their academic life"
          : "Manage your lectures and connect with students effortlessly"
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        {/* Step Title */}
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Step {currentStep} of {totalSteps}
          </h3>
          <p className="text-lg font-bold text-[var(--color-text)] mt-1">
            {getStepTitle()}
          </p>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <>
            <TextInput
              id="register-name"
              label="Full Name"
              placeholder="e.g. John Doe"
              size="md"
              leftSection={<User size={18} className="text-slate-400" />}
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              error={errors.name}
              styles={inputStyles}
            />

            <TextInput
              id="register-email"
              label={
                userType === "student"
                  ? "Student Email Address"
                  : "Email Address"
              }
              placeholder="e.g. john@university.edu"
              size="md"
              leftSection={<Mail size={18} className="text-slate-400" />}
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={errors.email}
              styles={inputStyles}
            />
          </>
        )}

        {/* Step 2: Academic/Professional Information */}
        {currentStep === 2 && (
          <>
            {userType === "student" ? (
              <>
                <TextInput
                  id="register-programme"
                  label="Programme"
                  placeholder="e.g. B.Sc. Computer Science"
                  size="md"
                  leftSection={
                    <BookOpen size={18} className="text-slate-400" />
                  }
                  value={formData.programme}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      programme: e.target.value,
                    }));
                    if (errors.programme)
                      setErrors((prev) => ({ ...prev, programme: "" }));
                  }}
                  error={errors.programme}
                  styles={inputStyles}
                />

                <Select
                  id="register-level"
                  label="Level"
                  placeholder="Select your level"
                  size="md"
                  leftSection={
                    <GraduationCap size={18} className="text-slate-400" />
                  }
                  data={[
                    { value: "100-1", label: "Level 100 (1st Semester)" },
                    { value: "100-2", label: "Level 100 (2nd Semester)" },
                    { value: "200-1", label: "Level 200 (1st Semester)" },
                    { value: "200-2", label: "Level 200 (2nd Semester)" },
                    { value: "300-1", label: "Level 300 (1st Semester)" },
                    { value: "300-2", label: "Level 300 (2nd Semester)" },
                    { value: "400-1", label: "Level 400 (1st Semester)" },
                    { value: "400-2", label: "Level 400 (2nd Semester)" },
                  ]}
                  value={formData.level}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, level: value || "" }));
                    if (errors.level)
                      setErrors((prev) => ({ ...prev, level: "" }));
                  }}
                  error={errors.level}
                  styles={inputStyles}
                />
              </>
            ) : (
              <>
                <TextInput
                  id="register-title"
                  label="Title"
                  placeholder="e.g. Dr., Prof., Mr., Ms."
                  size="md"
                  leftSection={
                    <Briefcase size={18} className="text-slate-400" />
                  }
                  value={formData.title}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, title: e.target.value }));
                    if (errors.title)
                      setErrors((prev) => ({ ...prev, title: "" }));
                  }}
                  error={errors.title}
                  styles={inputStyles}
                />

                <TextInput
                  id="register-course"
                  label="Course Lectured"
                  placeholder="e.g. Advanced Data Structures"
                  size="md"
                  leftSection={
                    <BookOpen size={18} className="text-slate-400" />
                  }
                  value={formData.courseLectured}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      courseLectured: e.target.value,
                    }));
                    if (errors.courseLectured)
                      setErrors((prev) => ({ ...prev, courseLectured: "" }));
                  }}
                  error={errors.courseLectured}
                  styles={inputStyles}
                />
              </>
            )}
          </>
        )}

        {/* Step 3: Institution Details */}
        {currentStep === 3 && (
          <>
            <TextInput
              id="register-school"
              label="School Name"
              placeholder="e.g. University of Ghana"
              size="md"
              leftSection={<School size={18} className="text-slate-400" />}
              value={formData.school}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, school: e.target.value }));
                if (errors.school)
                  setErrors((prev) => ({ ...prev, school: "" }));
              }}
              error={errors.school}
              styles={inputStyles}
            />

            <TextInput
              id="register-department"
              label="Department"
              placeholder="e.g. Mathematical Sciences"
              size="md"
              leftSection={<Building2 size={18} className="text-slate-400" />}
              value={formData.department}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  department: e.target.value,
                }));
                if (errors.department)
                  setErrors((prev) => ({ ...prev, department: "" }));
              }}
              error={errors.department}
              styles={inputStyles}
            />
          </>
        )}

        {/* Step 4: Password */}
        {currentStep === 4 && (
          <>
            <PasswordInput
              id="register-password"
              label="Password"
              placeholder="At least 8 characters"
              size="md"
              leftSection={<Lock size={18} className="text-slate-400" />}
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }));
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
              error={errors.password}
              styles={inputStyles}
            />

            <PasswordInput
              id="register-confirm-password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              size="md"
              leftSection={<Lock size={18} className="text-slate-400" />}
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              error={errors.confirmPassword}
              styles={inputStyles}
            />
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="flex-1 flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <ArrowLeft size={18} />
              Previous
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className={`flex-1 flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 ${
                !isCurrentStepValid() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isCurrentStepValid()}
            >
              Next
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              className={`btn-brand flex-1 flex justify-center items-center gap-2 py-3 sm:py-3.5 text-base ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
              id="create-account-btn"
            >
              {loading ? (
                <>
                  <span className="inline-block rounded-full border-2 border-white border-t-transparent animate-spin w-5 h-5" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <UserPlus size={20} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Login Link */}
        <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-300 sm:text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--color-primary)] transition-colors hover:underline"
            id="login-link"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
