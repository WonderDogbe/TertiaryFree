"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import { Logo } from "@/components/Logo";

export type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  activePathname?: string;
  activeMatchMode?: "exact" | "prefix";
  group?: "timetable" | "general";
};

interface SidebarProps {
  items: SidebarItem[];
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

function SidebarLinks({
  items,
  onNavigate,
}: {
  items: SidebarItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2" aria-label="Sidebar navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.activePathname
          ? item.activeMatchMode === "prefix"
            ? pathname === item.activePathname ||
              pathname.startsWith(`${item.activePathname}/`)
            : pathname === item.activePathname
          : false;

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="uppercase tracking-[0.08em]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({
  items,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const dashboardItem = items.find((item) => item.id === "dashboard");
  const middleItems = items.filter(
    (item) => item.id !== "dashboard" && item.id !== "settings",
  );
  const timetableItems = middleItems.filter((item) => item.group === "timetable");
  const otherItems = middleItems.filter((item) => item.group !== "timetable");
  const settingsItem = items.find((item) => item.id === "settings");

  return (
    <>
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white transition-colors duration-300 md:flex dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 p-6 transition-colors duration-300 dark:border-gray-800">
          <div className="flex flex-col items-start">
            <Logo size="sm" className="origin-left" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {dashboardItem && <SidebarLinks items={[dashboardItem]} />}

          {middleItems.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800">
              {timetableItems.length > 0 && (
                <div>
                  <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
                    My Timetables
                  </p>
                  <div className="mt-2">
                    <SidebarLinks items={timetableItems} />
                  </div>
                </div>
              )}

              {otherItems.length > 0 && (
                <div
                  className={
                    timetableItems.length > 0
                      ? "mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800"
                      : undefined
                  }
                >
                  <SidebarLinks items={otherItems} />
                </div>
              )}
            </div>
          )}

          {settingsItem && (
            <div className="mt-auto pt-4">
              <SidebarLinks items={[settingsItem]} />
            </div>
          )}
        </div>
      </aside>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:hidden dark:border-gray-800 dark:bg-gray-900 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile sidebar"
      >
        <div className="flex items-start justify-between border-b border-gray-200 p-5 transition-colors duration-300 dark:border-gray-800">
          <div className="flex flex-col items-start">
            <Logo size="sm" className="origin-left" />
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors duration-300 dark:border-gray-700 dark:text-gray-300"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {dashboardItem && (
            <SidebarLinks items={[dashboardItem]} onNavigate={onCloseMobile} />
          )}

          {middleItems.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800">
              {timetableItems.length > 0 && (
                <div>
                  <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
                    My Timetables
                  </p>
                  <div className="mt-2">
                    <SidebarLinks items={timetableItems} onNavigate={onCloseMobile} />
                  </div>
                </div>
              )}

              {otherItems.length > 0 && (
                <div
                  className={
                    timetableItems.length > 0
                      ? "mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800"
                      : undefined
                  }
                >
                  <SidebarLinks items={otherItems} onNavigate={onCloseMobile} />
                </div>
              )}
            </div>
          )}

          {settingsItem && (
            <div className="mt-auto pt-4">
              <SidebarLinks items={[settingsItem]} onNavigate={onCloseMobile} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
