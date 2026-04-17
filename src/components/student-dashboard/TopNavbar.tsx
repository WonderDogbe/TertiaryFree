"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { getActiveUserProfile } from "@/lib/auth-storage";

interface TopNavbarProps {
  title: string;
  onToggleSidebar: () => void;
}

export function TopNavbar({ title, onToggleSidebar }: TopNavbarProps) {
  const [displayName, setDisplayName] = useState("Student");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const userProfile = getActiveUserProfile();

      if (userProfile?.name) {
        setDisplayName(userProfile.name);
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const userInitials = useMemo(() => {
    const words = displayName
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 0) {
      return "ST";
    }

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }, [displayName]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors duration-300 dark:border-gray-700 dark:text-gray-300"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
          </button>

          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1 text-sm font-semibold text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Open student profile"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white transition-colors duration-300 dark:bg-gray-700">
              {userInitials}
            </span>
            <span className="hidden max-w-[140px] truncate sm:inline">
              {displayName}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
