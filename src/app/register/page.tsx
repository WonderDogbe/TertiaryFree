"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Select,
  SegmentedControl,
} from "@mantine/core";
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
} from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "lecturer">("student");
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

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.school.trim() !== "" &&
    formData.department.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    formData.password === formData.confirmPassword &&
    (userType === "student"
      ? formData.programme.trim() !== "" && formData.level.trim() !== ""
      : formData.title.trim() !== "" && formData.courseLectured.trim() !== "");

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !validate()) return;

    setLoading(true);
    // Simulate API call — will connect to backend later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // For now, just log. Later connect to auth backend.
    console.log("Register submitted:", { userType, ...formData });
  };

  const inputClassNames = {
    input:
      "focus:border-[#0a0f5c] focus:ring-1 focus:ring-[#0a0f5c] dark:focus:border-[#2dd4a8] dark:focus:ring-[#2dd4a8]",
  };

  return (
    <AuthLayout
      subtitle={
        userType === "student"
          ? "Join thousands of students simplifying their academic life"
          : "Manage your lectures and connect with students effortlessly"
      }
    >
      <div className="mb-8 flex flex-col items-center">
        <p className="mb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
          ARE YOU A STUDENT OR A LECTURER?
        </p>
        <SegmentedControl
          fullWidth
          size="md"
          radius="xl"
          value={userType}
          onChange={(value) => setUserType(value as "student" | "lecturer")}
          data={[
            { label: "Student", value: "student" },
            { label: "Lecturer", value: "lecturer" },
          ]}
          color={userType === "student" ? "#0a0f5c" : "#2dd4a8"}
          className="bg-slate-100 dark:bg-slate-800"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        <TextInput
          id="register-name"
          label="Full Name"
          placeholder="e.g. John Doe"
          size="md"
          leftSection={<User size={18} className="text-slate-400" />}
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          classNames={inputClassNames}
        />

        <TextInput
          id="register-email"
          label={
            userType === "student" ? "Student Email Address" : "Email Address"
          }
          placeholder="e.g. john@university.edu"
          size="md"
          leftSection={<Mail size={18} className="text-slate-400" />}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          error={errors.email}
          classNames={inputClassNames}
        />

        {userType === "student" ? (
          <>
            <TextInput
              id="register-programme"
              label="Programme"
              placeholder="e.g. B.Sc. Computer Science"
              size="md"
              leftSection={<BookOpen size={18} className="text-slate-400" />}
              value={formData.programme}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, programme: e.target.value }))
              }
              classNames={inputClassNames}
            />
          </>
        ) : (
          <>
            <TextInput
              id="register-title"
              label="Title"
              placeholder="e.g. Dr., Prof., Mr., Ms."
              size="md"
              leftSection={<Briefcase size={18} className="text-slate-400" />}
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              classNames={inputClassNames}
            />

            <TextInput
              id="register-course"
              label="Course Lectured"
              placeholder="e.g. Advanced Data Structures"
              size="md"
              leftSection={<BookOpen size={18} className="text-slate-400" />}
              value={formData.courseLectured}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  courseLectured: e.target.value,
                }))
              }
              classNames={inputClassNames}
            />
          </>
        )}

        <TextInput
          id="register-school"
          label="School Name"
          placeholder="e.g. University of Ghana"
          size="md"
          leftSection={<School size={18} className="text-slate-400" />}
          value={formData.school}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, school: e.target.value }))
          }
          classNames={inputClassNames}
        />

        <TextInput
          id="register-department"
          label="Department"
          placeholder="e.g. Mathematical Sciences"
          size="md"
          leftSection={<Building2 size={18} className="text-slate-400" />}
          value={formData.department}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, department: e.target.value }))
          }
          classNames={inputClassNames}
        />

        {userType === "student" && (
          <Select
            id="register-level"
            label="Level"
            placeholder="Select your level"
            size="md"
            leftSection={<GraduationCap size={18} className="text-slate-400" />}
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
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, level: value || "" }))
            }
            classNames={inputClassNames}
          />
        )}

        <PasswordInput
          id="register-password"
          label="Password"
          placeholder="At least 8 characters"
          size="md"
          leftSection={<Lock size={18} className="text-slate-400" />}
          value={formData.password}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, password: e.target.value }));
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: "" }));
            }
          }}
          error={errors.password}
          classNames={inputClassNames}
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
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
          }}
          error={errors.confirmPassword}
          classNames={inputClassNames}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn-brand mt-4 sm:mt-6 w-full flex justify-center py-3 sm:py-3.5 text-base ${
            !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isFormValid || loading}
          id="create-account-btn"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block rounded-full border-2 border-white border-t-transparent animate-spin w-5 h-5" />
              Creating account...
            </span>
          ) : (
            <>
              Create Account
              <UserPlus size={20} />
            </>
          )}
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-300 sm:text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0a0f5c] transition-colors hover:underline dark:text-[#5eead4]"
            id="login-link"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
