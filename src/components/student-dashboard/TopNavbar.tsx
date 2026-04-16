"use client";

import { Bell, Menu } from "lucide-react";

interface TopNavbarProps {
  title: string;
  onOpenMobileMenu: () => void;
}

export function TopNavbar({ title, onOpenMobileMenu }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors duration-300 md:hidden dark:border-gray-700 dark:text-gray-300"
            aria-label="Open menu"
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

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white transition-colors duration-300 dark:bg-gray-700"
            aria-label="Open user profile"
          >
            SK
          </button>
        </div>
      </div>
    </header>
  );
}
