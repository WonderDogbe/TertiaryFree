"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/Logo";

export type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  activePathname?: string;
  activeMatchMode?: "exact" | "prefix";
  group?: "timetable" | "classroom-connect" | "general";
};

interface SidebarProps {
  items: SidebarItem[];
  isDesktopCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

function SidebarLinks({
  items,
  isCollapsed = false,
  onNavigate,
}: {
  items: SidebarItem[];
  isCollapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav
      className={`flex flex-col gap-2 ${isCollapsed ? "items-center" : ""}`}
      aria-label="Sidebar navigation"
    >
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
            title={isCollapsed ? item.label : undefined}
            aria-label={isCollapsed ? item.label : undefined}
            className={`flex items-center rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            } ${
              isCollapsed
                ? "h-10 w-10 justify-center"
                : "gap-3 px-3 py-2.5 text-left"
            }`}
          >
            <Icon className="h-4 w-4" />
            {!isCollapsed && (
              <span className="uppercase tracking-[0.08em]">{item.label}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({
  items,
  isDesktopCollapsed,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const dashboardItem = items.find((item) => item.id === "dashboard");
  const middleItems = items.filter(
    (item) => item.id !== "dashboard" && item.id !== "settings",
  );
  const timetableItems = middleItems.filter((item) => item.group === "timetable");
  const classroomConnectItems = middleItems.filter(
    (item) => item.group === "classroom-connect",
  );
  const generalItems = middleItems.filter(
    (item) => item.group !== "timetable" && item.group !== "classroom-connect",
  );
  const settingsItem = items.find((item) => item.id === "settings");

  return (
    <>
      <aside
        className={`hidden flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out md:fixed md:inset-y-0 md:left-0 md:z-40 md:flex dark:border-gray-800 dark:bg-gray-900 ${
          isDesktopCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div
          className={`flex h-16 items-center border-b border-gray-200 transition-all duration-300 ease-in-out dark:border-gray-800 ${
            isDesktopCollapsed ? "justify-center px-3" : "px-6"
          }`}
        >
          {isDesktopCollapsed ? (
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-semibold text-white"
              aria-label="TertiaryFree"
            >
              TF
            </span>
          ) : (
            <div className="flex items-center">
              <Logo size="sm" className="origin-left" />
            </div>
          )}
        </div>

        <div
          className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
            isDesktopCollapsed ? "p-3" : "p-6"
          }`}
        >
          {dashboardItem && (
            <SidebarLinks
              items={[dashboardItem]}
              isCollapsed={isDesktopCollapsed}
            />
          )}

          {middleItems.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800">
              {timetableItems.length > 0 && (
                <div>
                  {!isDesktopCollapsed && (
                    <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
                      My Timetables
                    </p>
                  )}
                  <div className={isDesktopCollapsed ? "mt-0" : "mt-2"}>
                    <SidebarLinks
                      items={timetableItems}
                      isCollapsed={isDesktopCollapsed}
                    />
                  </div>
                </div>
              )}

              {classroomConnectItems.length > 0 && (
                <div
                  className={
                    timetableItems.length > 0
                      ? "mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800"
                      : undefined
                  }
                >
                  {!isDesktopCollapsed && (
                    <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
                      Classroom Connect
                    </p>
                  )}
                  <div className={isDesktopCollapsed ? "mt-0" : "mt-2"}>
                    <SidebarLinks
                      items={classroomConnectItems}
                      isCollapsed={isDesktopCollapsed}
                    />
                  </div>
                </div>
              )}

              {generalItems.length > 0 && (
                <div
                  className={
                    timetableItems.length > 0 || classroomConnectItems.length > 0
                      ? "mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800"
                      : undefined
                  }
                >
                  <SidebarLinks
                    items={generalItems}
                    isCollapsed={isDesktopCollapsed}
                  />
                </div>
              )}
            </div>
          )}

          {settingsItem && (
            <div className="mt-auto pt-4">
              <SidebarLinks
                items={[settingsItem]}
                isCollapsed={isDesktopCollapsed}
              />
            </div>
          )}
        </div>
      </aside>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out md:hidden dark:border-gray-800 dark:bg-gray-900 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile sidebar"
      >
        <div className="flex h-16 items-center border-b border-gray-200 px-4 transition-colors duration-300 dark:border-gray-800">
          <div className="flex items-center">
            <Logo size="sm" className="origin-left" />
          </div>
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

              {classroomConnectItems.length > 0 && (
                <div
                  className={
                    timetableItems.length > 0
                      ? "mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800"
                      : undefined
                  }
                >
                  <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 dark:text-gray-400">
                    Classroom Connect
                  </p>
                  <div className="mt-2">
                    <SidebarLinks
                      items={classroomConnectItems}
                      onNavigate={onCloseMobile}
                    />
                  </div>
                </div>
              )}

              {generalItems.length > 0 && (
                <div
                  className={
                    timetableItems.length > 0 || classroomConnectItems.length > 0
                      ? "mt-4 border-t border-gray-200 pt-4 transition-colors duration-300 dark:border-gray-800"
                      : undefined
                  }
                >
                  <SidebarLinks items={generalItems} onNavigate={onCloseMobile} />
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
