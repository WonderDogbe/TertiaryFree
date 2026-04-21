"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  CalendarDays,
  Building2,
  GraduationCap,
  Hash,
  IdCard,
  Layers3,
  Mail,
  User,
} from "lucide-react";
import {
  type ActiveUserProfile,
  getActiveUserProfile,
} from "@/lib/auth-storage";

const formatDisplayName = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`)
    .join(" ");

function ProfileInfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition-colors duration-300 dark:bg-blue-900/40 dark:text-blue-200">
          {icon}
        </span>
        {label}
      </p>
      <p className="mt-3 text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
        {value}
      </p>
    </article>
  );
}

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<ActiveUserProfile | null>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setProfile(getActiveUserProfile());
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const name = profile?.name ? formatDisplayName(profile.name) : "Not available";
  const indexNumber = profile?.indexNumber || "Not provided during registration";
  const programme = profile?.programme || "Not available";
  const level = profile?.level
    ? profile.level.toLowerCase().startsWith("level")
      ? formatDisplayName(profile.level)
      : `Level ${profile.level}`
    : "Not available";
  const department = profile?.department || "Not available";
  const school = profile?.school || "Not available";
  const email = profile?.email || "Not available";
  const studyModeLabel =
    profile?.studyMode === "weekend"
      ? "Weekend"
      : profile?.studyMode === "custom"
        ? "Custom"
        : "Weekday";
  const activeDaysLabel =
    profile?.customStudyDays && profile.customStudyDays.length > 0
      ? profile.customStudyDays.join(", ")
      : "Monday, Tuesday, Wednesday, Thursday, Friday";

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50 p-6 shadow-sm transition-colors duration-300 dark:border-blue-900/50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 transition-colors duration-300 dark:text-blue-300">
              Student Profile
            </p>
            <h2 className="mt-2 truncate text-2xl font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
              {name}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
              Your academic identity and registration details in one place.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700 backdrop-blur transition-colors duration-300 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
            <Layers3 className="h-3.5 w-3.5" />
            {formatDisplayName(level)}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProfileInfoCard
          icon={<User className="h-4 w-4" />}
          label="Name"
          value={name}
        />
        <ProfileInfoCard
          icon={<Hash className="h-4 w-4" />}
          label="Index Number"
          value={indexNumber}
        />
        <ProfileInfoCard
          icon={<GraduationCap className="h-4 w-4" />}
          label="Programme"
          value={programme}
        />
        <ProfileInfoCard
          icon={<Layers3 className="h-4 w-4" />}
          label="Level"
          value={formatDisplayName(level)}
        />
        <ProfileInfoCard
          icon={<IdCard className="h-4 w-4" />}
          label="Department"
          value={department}
        />
        <ProfileInfoCard
          icon={<CalendarDays className="h-4 w-4" />}
          label="Study Mode"
          value={studyModeLabel}
        />
        <ProfileInfoCard
          icon={<Building2 className="h-4 w-4" />}
          label="Institution"
          value={school}
        />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
          <CalendarDays className="h-4 w-4" />
          Active Study Days
        </p>
        <p className="mt-2 text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
          {activeDaysLabel}
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
          <Mail className="h-4 w-4" />
          Account Email
        </p>
        <p className="mt-2 text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
          {email}
        </p>
      </section>
    </div>
  );
}
