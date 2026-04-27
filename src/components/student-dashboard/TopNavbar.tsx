"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  Bell, 
  MoreHorizontal, 
  MessageSquare, 
  CalendarDays, 
  BookOpen, 
  FileText, 
  ChartNoAxesColumn, 
  UserRound, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Maximize,
  HelpCircle,
  CheckCircle2,
  Columns,
  Moon,
  Sun
} from "lucide-react";
import { Menu } from "@mantine/core";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import { ConfirmationModal } from "./ConfirmationModal";
import { ThemeToggle } from "./ThemeToggle";

interface TopNavbarProps {
  title: string;
  onToggleSidebar: () => void;
  isDesktopSidebarCollapsed: boolean;
}

export function TopNavbar({
  title,
  onToggleSidebar,
  isDesktopSidebarCollapsed,
}: TopNavbarProps) {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("Student");
  const [displayLevel, setDisplayLevel] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isStandaloneMode, setIsStandaloneMode] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && (window.navigator as any).standalone) ||
      document.referrer.includes("android-app://");
    setIsStandaloneMode(isStandalone);

    if (user?.name) {
      setDisplayName(user.name);
    }
    if (user?.level) {
       setDisplayLevel(user.level.startsWith("Level") ? user.level : `Level ${user.level}`);
    } else {
       setDisplayLevel("TERTIARYFREE");
    }
    if (user?.avatarUrl) {
      setAvatarUrl(user.avatarUrl);
    } else {
      setAvatarUrl(null);
    }
  }, [user]);

  const userInitials = useMemo(() => {
    const words = displayName.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "ST";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }, [displayName]);

  const handleConfirmLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsLogoutModalOpen(false);
    router.push("/login");
  };

  const isTimetableRoute = pathname.startsWith("/dashboard/timetable") || pathname.startsWith("/dashboard/exam-timetable");
  const isCoursesRoute = pathname.startsWith("/dashboard/courses") || pathname.startsWith("/dashboard/my-courses") || pathname.startsWith("/dashboard/quizzes") || pathname.startsWith("/dashboard/midsem");
  const isAttendanceRoute = pathname.startsWith("/dashboard/attendance");
  const isSettingsRoute = pathname.startsWith("/dashboard/settings") || pathname.startsWith("/dashboard/profile");

  const renderMobileMenuItems = () => {
    if (isTimetableRoute) {
      return (
        <>
          <Menu.Label className="py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Timetables</Menu.Label>
          <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/timetable" leftSection={<CalendarDays className="h-4 w-4" />}>
            Class Timetable
          </Menu.Item>
          <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/exam-timetable" leftSection={<CalendarDays className="h-4 w-4" />}>
            Exam Timetable
          </Menu.Item>
        </>
      );
    }
    if (isCoursesRoute) {
      return (
        <>
          <Menu.Label className="py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Academics</Menu.Label>
          <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/courses" leftSection={<BookOpen className="h-4 w-4" />}>
            My Courses
          </Menu.Item>
          <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/quizzes" leftSection={<FileText className="h-4 w-4" />}>
            Quizzes
          </Menu.Item>
          <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/midsem" leftSection={<FileText className="h-4 w-4" />}>
            Midsem
          </Menu.Item>
        </>
      );
    }
    if (isAttendanceRoute) {
       return (
        <>
          <Menu.Label className="py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Attendance</Menu.Label>
          <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/attendance" leftSection={<ChartNoAxesColumn className="h-4 w-4" />}>
            View Reports
          </Menu.Item>
        </>
       );
    }
    if (isSettingsRoute) {
      return (
        <>
          <Menu.Label className="py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Account</Menu.Label>
          <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/profile" leftSection={<UserRound className="h-4 w-4" />}>
            Profile
          </Menu.Item>
          <Menu.Divider className="border-gray-100 dark:border-gray-800" />
          <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30" onClick={() => setIsLogoutModalOpen(true)} leftSection={<LogOut className="h-4 w-4" />}>
            Sign Out
          </Menu.Item>
        </>
      );
    }
    return (
      <>
        <Menu.Label className="py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Connect</Menu.Label>
        <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/chat" leftSection={<MessageSquare className="h-4 w-4" />}>
          Chats
        </Menu.Item>
        <Menu.Item className="h-9 min-h-0 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" component={Link} href="/dashboard/notifications" leftSection={<Bell className="h-4 w-4" />}>
          Notifications
        </Menu.Item>
      </>
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white transition-colors duration-300 dark:border-gray-800 dark:bg-[#121212]">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* LEFT: Mobile Profile Avatar (Sidebar Trigger) */}
          <div className="flex items-center md:hidden">
             <button 
               onClick={onToggleSidebar}
               className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 transition-transform active:scale-95"
               aria-label="Open sidebar"
             >
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="Profile" fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-400">
                    {userInitials}
                  </div>
                )}
             </button>
          </div>

          {/* CENTER: Navigation & Title */}
          <div className="hidden items-center gap-2 md:flex">
             <div className="flex items-center gap-1">
                <button onClick={() => router.back()} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => router.forward()} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <ChevronRight className="h-5 w-5" />
                </button>
             </div>
             
             <div className="mx-2 h-6 w-px bg-gray-200 dark:bg-gray-800" />
             
             <button 
               onClick={onToggleSidebar}
               className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
             >
               <Columns className="h-5 w-5" />
             </button>

             <h1 className="ml-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
               {title}
             </h1>
          </div>

          {/* RIGHT: Action Bar (Capsule) */}
          <div className="flex items-center">

            <div className="flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50/50 p-1 dark:border-gray-800 dark:bg-gray-800/30">
               <div className="flex h-8 w-8 items-center justify-center">
                  <ThemeToggle minimalist />
               </div>

               <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />

               <Link href="/dashboard/notifications" className="relative flex h-8 w-8 items-center justify-center rounded-full text-blue-500 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-gray-50 dark:ring-gray-900" />
               </Link>
               
               <button onClick={toggleFullscreen} className="hidden h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-white dark:hover:bg-gray-800 transition-colors sm:flex">
                  <Maximize className="h-4 w-4" />
               </button>

               <button className="hidden h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-white dark:hover:bg-gray-800 transition-colors sm:flex">
                  <CheckCircle2 className="h-4 w-4" />
               </button>

               <button className="hidden items-center gap-1.5 rounded-full px-3 py-1 text-gray-400 hover:bg-white dark:hover:bg-gray-800 transition-colors md:flex">
                  <HelpCircle className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Help</span>
               </button>
            </div>
          </div>

        </div>
      </header>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Sign out of your account?"
        description="You will need to sign in again to continue using your dashboard."
        confirmLabel="Sign out"
        cancelLabel={null as any}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
