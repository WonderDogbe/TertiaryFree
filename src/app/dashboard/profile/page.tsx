"use client";

import { useEffect, useState, type ReactNode } from "react";
import { GraduationCap, Hash, IdCard, User } from "lucide-react";
import {
  type ActiveUserProfile,
  getActiveUserProfile,
} from "@/lib/auth-storage";

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
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

  const name = profile?.name || "Not available";
  const indexNumber = profile?.indexNumber || "Not provided during registration";
  const programme = profile?.programme || "Not available";
  const department = profile?.department || "Not available";

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Student Profile
        </h2>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          These details are loaded from the information captured at account
          creation.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProfileRow
          icon={<User className="h-4 w-4" />}
          label="Name"
          value={name}
        />
        <ProfileRow
          icon={<Hash className="h-4 w-4" />}
          label="Index Number"
          value={indexNumber}
        />
        <ProfileRow
          icon={<GraduationCap className="h-4 w-4" />}
          label="Programme Offered"
          value={programme}
        />
        <ProfileRow
          icon={<IdCard className="h-4 w-4" />}
          label="Department"
          value={department}
        />
      </section>
    </div>
  );
}
