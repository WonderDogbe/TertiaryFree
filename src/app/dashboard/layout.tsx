"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Calendar, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Wallet, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Calendar, label: "Timetable", href: "/dashboard/timetable" },
  { icon: CheckCircle2, label: "Attendance", href: "/dashboard/attendance" },
  { icon: BookOpen, label: "Courses", href: "/dashboard/courses" },
  { icon: GraduationCap, label: "Grades", href: "/dashboard/grades" },
  { icon: Wallet, label: "Finance", href: "/dashboard/finance" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col items-center py-8 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all shadow-sm overflow-hidden">
        <div className="mb-10 px-6 w-full flex justify-start items-center">
          <Logo size="sm" showText={false} />
          <span className="ml-3 font-extrabold text-[#0a0f5c] dark:text-[#2dd4a8] whitespace-nowrap">
            TertiaryFree
          </span>
        </div>

        <nav className="flex-1 w-full px-3 space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center w-full p-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#0a0f5c] text-white dark:bg-[#2dd4a8] dark:text-[#0a0f5c]" 
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={24} className="flex-shrink-0" />
                <span className="ml-4 font-bold text-sm whitespace-nowrap opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="w-full px-3 space-y-2 pb-4">
          <div className="flex items-center w-full p-3 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl cursor-pointer">
            <Settings size={24} className="flex-shrink-0" />
            <span className="ml-4 font-bold text-sm whitespace-nowrap opacity-100 transition-opacity duration-300">Settings</span>
          </div>
          <Link href="/login" className="flex items-center w-full p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all">
            <LogOut size={24} className="flex-shrink-0" />
            <span className="ml-4 font-bold text-sm whitespace-nowrap opacity-100 transition-opacity duration-300">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 transition-all duration-300 min-h-screen bg-white dark:bg-[#020617]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-[#0a0f5c] dark:text-white">Dashboard Overview</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, John 👋</p>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0a0f5c] to-[#1a2080] flex items-center justify-center text-white font-bold text-sm border-2 border-white dark:border-slate-800 shadow-sm">
              JD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
