"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChartNoAxesColumn,
  FileText,
  Home,
  MessageSquare,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Sidebar, type SidebarItem } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { useAuth } from "@/components/AuthProvider";
import { Megaphone, QrCode } from "lucide-react";

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
    href: "/dashboard/courses",
    activePathname: "/dashboard/courses",
    activeMatchMode: "prefix",
    group: "general",
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: ChartNoAxesColumn,
    href: "/dashboard/attendance",
    activePathname: "/dashboard/attendance",
    activeMatchMode: "prefix",
    group: "general",
  },
  {
    id: "quizzes",
    label: "Quizzes",
    icon: FileText,
    href: "/dashboard/quizzes",
    activePathname: "/dashboard/quizzes",
    activeMatchMode: "prefix",
    group: "classroom-connect",
  },
  {
    id: "midsem",
    label: "Midsem",
    icon: FileText,
    href: "/dashboard/midsem",
    activePathname: "/dashboard/midsem",
    activeMatchMode: "prefix",
    group: "classroom-connect",
  },
  {
    id: "chat",
    label: "Chats",
    icon: MessageSquare,
    href: "/dashboard/chat",
    activePathname: "/dashboard/chat",
    activeMatchMode: "prefix",
    group: "classroom-connect",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/dashboard/notifications",
    activePathname: "/dashboard/notifications",
    activeMatchMode: "prefix",
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

const LECTURER_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Overview",
    icon: Home,
    href: "/dashboard",
    activePathname: "/dashboard",
    activeMatchMode: "exact",
  },
  {
    id: "lectures",
    label: "My Schedule",
    icon: CalendarDays,
    href: "/dashboard/lecturer/timetable",
    activePathname: "/dashboard/lecturer/timetable",
    activeMatchMode: "prefix",
    group: "timetable",
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: QrCode,
    href: "/dashboard/lecturer/attendance",
    activePathname: "/dashboard/lecturer/attendance",
    activeMatchMode: "prefix",
    group: "general",
  },
  {
    id: "courses",
    label: "Manage Courses",
    icon: BookOpen,
    href: "/dashboard/lecturer/courses",
    activePathname: "/dashboard/lecturer/courses",
    activeMatchMode: "prefix",
    group: "general",
  },
  {
    id: "quizzes",
    label: "Quizzes & Exams",
    icon: FileText,
    href: "/dashboard/lecturer/quizzes",
    activePathname: "/dashboard/lecturer/quizzes",
    activeMatchMode: "prefix",
    group: "classroom-connect",
  },
  {
    id: "announcements",
    label: "Announcements",
    icon: Megaphone,
    href: "/dashboard/lecturer/announcements",
    activePathname: "/dashboard/lecturer/announcements",
    activeMatchMode: "prefix",
    group: "classroom-connect",
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
  const { user } = useAuth();
  const pathname = usePathname();
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleScreenSizeChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileSidebarOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleScreenSizeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenSizeChange);
    };
  }, []);

  const handleSidebarToggle = () => {
    const isDesktopScreen = window.matchMedia("(min-width: 768px)").matches;

    if (isDesktopScreen) {
      setIsDesktopSidebarCollapsed((previousState) => !previousState);
      return;
    }

    setIsMobileSidebarOpen((previousState) => !previousState);
  };

  const isTimetableRoute =
    pathname.startsWith("/dashboard/timetable") ||
    pathname.startsWith("/dashboard/exam-timetable");
  const isMyCoursesRoute =
    pathname.startsWith("/dashboard/courses") ||
    pathname.startsWith("/dashboard/my-courses");
  const isAttendanceRoute = pathname.startsWith("/dashboard/attendance");
  const isQuizzesRoute =
    pathname.startsWith("/dashboard/quizzes") ||
    pathname.startsWith("/dashboard/quiz-midsem");
  const isMidsemRoute = pathname.startsWith("/dashboard/midsem");
  const isChatRoute = pathname.startsWith("/dashboard/chat");
  const isProfileRoute = pathname.startsWith("/dashboard/profile");
  const isNotificationsRoute = pathname.startsWith("/dashboard/notifications");

  const pageTitle = pathname.startsWith("/dashboard/settings")
    ? "Settings"
    : isNotificationsRoute
      ? "Notifications"
    : isProfileRoute
      ? "My Profile"
    : isChatRoute
      ? "Chat"
    : isMidsemRoute
      ? "Midsem"
    : isQuizzesRoute
      ? "Quizzes"
    : isAttendanceRoute
      ? "Attendance"
    : isMyCoursesRoute
      ? "My Courses"
    : isTimetableRoute
      ? "My Timetables"
      : "Dashboard";

  return (
    <div className="h-screen overflow-hidden bg-gray-50 transition-colors duration-300 dark:bg-[#121212]">
      {isMobileSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          aria-label="Close sidebar overlay"
        />
      )}

      <div className="flex h-full">
        <Sidebar
          items={user?.role === "lecturer" ? LECTURER_SIDEBAR_ITEMS : SIDEBAR_ITEMS}
          isDesktopCollapsed={isDesktopSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <div
          className={`flex min-w-0 flex-1 flex-col h-full transition-[margin] duration-300 ease-in-out ${
            isDesktopSidebarCollapsed ? "md:ml-16" : "md:ml-64"
          }`}
        >
          <div className="flex-shrink-0">
            <TopNavbar
              title={pageTitle}
              onToggleSidebar={handleSidebarToggle}
              isDesktopSidebarCollapsed={isDesktopSidebarCollapsed}
            />
          </div>

          <main className="flex-1 overflow-y-auto scroll-smooth px-4 py-6 pb-28 sm:px-6 md:pb-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
