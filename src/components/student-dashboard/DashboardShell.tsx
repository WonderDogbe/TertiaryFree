"use client";

import { ReactNode, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChartNoAxesColumn,
  Home,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Sidebar, type SidebarItem } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    activePathname: "/dashboard",
    activeMatchMode: "exact",
  },
  {
    id: "class-timetable",
    label: "Class Timetable",
    icon: CalendarDays,
    href: "/dashboard/timetable",
    activePathname: "/dashboard/timetable",
    activeMatchMode: "prefix",
    group: "timetable",
  },
  {
    id: "exam-timetable",
    label: "Exam Timetable",
    icon: CalendarDays,
    href: "/dashboard/exam-timetable",
    activePathname: "/dashboard/exam-timetable",
    activeMatchMode: "prefix",
    group: "timetable",
  },
  {
    id: "my-courses",
    label: "My Courses",
    icon: BookOpen,
    href: "/dashboard/my-courses",
    activePathname: "/dashboard/my-courses",
    activeMatchMode: "prefix",
    group: "general",
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: ChartNoAxesColumn,
    href: "/dashboard#attendance",
    group: "general",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/dashboard#notifications",
    group: "general",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    activePathname: "/dashboard/settings",
    activeMatchMode: "prefix",
  },
];

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isTimetableRoute =
    pathname.startsWith("/dashboard/timetable") ||
    pathname.startsWith("/dashboard/exam-timetable");
  const isMyCoursesRoute = pathname.startsWith("/dashboard/my-courses");

  const pageTitle = pathname.startsWith("/dashboard/settings")
    ? "Settings"
    : isMyCoursesRoute
      ? "My Courses"
    : isTimetableRoute
      ? "My Timetables"
      : "Dashboard";

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      {isMobileSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
          aria-label="Close sidebar overlay"
        />
      )}

      <div className="flex min-h-screen">
        <Sidebar
          items={SIDEBAR_ITEMS}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar
            title={pageTitle}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
