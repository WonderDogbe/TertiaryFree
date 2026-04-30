"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  CalendarDays,
  Clock,
  MapPin,
  PlusCircle,
  Megaphone,
  FileUp,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  BellRing,
  Star,
  FileText,
  QrCode,
  LayoutDashboard,
  GraduationCap
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import {
  formatLectureTimeRange,
  getTodayLectures,
} from "@/components/student-dashboard/timetable/data";
import { getTimetableFromSupabase } from "@/lib/supabase-data";
import { useState, useEffect } from "react";
import type { WeekDay } from "@/components/student-dashboard/timetable/LectureCard";

// --- Helpers ---

const QUICK_ACTIONS = [
  { id: "qa-1", label: "Attendance", icon: CheckCircle2, href: "/dashboard/lecturer/attendance" },
  { id: "qa-2", label: "Broadcast", icon: Megaphone, href: "/dashboard/lecturer/announcements" },
  { id: "qa-3", label: "Quizzes", icon: FileUp, href: "/dashboard/lecturer/quizzes" },
];

const ANNOUNCEMENTS = [
  { id: "ann-1", title: "Midsem Examination Date", detail: "The mid-semester exam for ICT 315 has been scheduled for May 15th.", time: "2h ago" },
  { id: "ann-2", title: "New Resource Uploaded", detail: "Lecture notes for 'Distributed Systems' are now available in the portal.", time: "5h ago" },
];

// --- Sub-components ---

interface StatData {
  id: string;
  label: string;
  value: string;
  icon: any;
}

interface ActionData {
  id: string;
  label: string;
  icon: any;
  href: string;
}

function StatCard({ stat }: { stat: StatData }) {
  const Icon = stat.icon;
  return (
    <div className="group flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-500/30">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          <Icon size={24} />
        </div>
        <TrendingUp size={16} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div>
        <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{stat.value}</p>
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</p>
      </div>
    </div>
  );
}

function ActionButton({ action }: { action: ActionData }) {
  const Icon = action.icon;
  return (
    <Link href={action.href} className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-300 hover:shadow-lg active:scale-95 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-500/40">
      <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full bg-indigo-500/5 transition-transform group-hover:scale-[3]" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all group-hover:scale-110 dark:shadow-none">
        <Icon size={24} />
      </div>
      <span className="relative text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200">{action.label}</span>
    </Link>
  );
}

export function LecturerDashboard() {
  const { user } = useAuth();
  const now = useMemo(() => new Date(), []);
  const [weeklyLectures, setWeeklyLectures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const lectures = await getTimetableFromSupabase();
      if (lectures && lectures.length > 0) {
        const mapped = lectures.map((l: any) => ({
          id: l.id,
          day: l.day as WeekDay,
          course: l.course_title,
          code: l.course_code,
          lecturer: l.lecturer,
          venue: l.venue,
          startTime: l.start_time,
          endTime: l.end_time
        }));
        setWeeklyLectures(mapped);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const todayLectures = useMemo(() => getTodayLectures(now, {}, weeklyLectures), [now, weeklyLectures]);

  const activeCoursesCount = user?.coursesLectured?.length || 0;

  const dynamicStats = useMemo(() => [
    { id: "stat-1", label: "Total Students", value: "248", icon: Users },
    { id: "stat-2", label: "Assigned Courses", value: activeCoursesCount.toString(), icon: GraduationCap },
    { id: "stat-3", label: "Marking Inbox", value: "03", icon: FileText },
    { id: "stat-4", label: "Avg. Attendance", value: "92%", icon: CheckCircle2 },
  ], [activeCoursesCount]);

  const myLectures = useMemo(() => {
    return todayLectures.filter(l => {
      const isMyName = l.lecturer?.toLowerCase().includes(user?.name?.toLowerCase() || "");
      const isMyCourse = user?.coursesLectured?.some((code: string) => l.code?.includes(code));
      return isMyName || isMyCourse;
    });
  }, [todayLectures, user]);

  const displayName = user?.name
    ? user.name.trim().split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
    : "Lecturer";
  
  const firstName = displayName.split(" ")[0];
  const title = user?.title || "Dr.";

  return (
    <div className="space-y-8 pb-10">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative overflow-hidden rounded-[3rem] bg-[#0f172a] p-10 text-white shadow-2xl dark:bg-[#020617] border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />
        
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-300 border border-indigo-500/30">
                 <Star className="h-3 w-3 fill-indigo-400" />
                 Senior Academic Staff
               </span>
               <span className="text-xs font-medium text-slate-500 italic">Verified Account</span>
            </div>
            
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Welcome back,
              <br />
              <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                {title} {firstName}
              </span>
            </h1>
            
            <p className="max-w-md text-lg font-medium text-slate-400 leading-relaxed">
              Managing <span className="text-indigo-300">{activeCoursesCount} active courses</span> today across the {user?.department || "Computer Science Faculty"}.
            </p>
          </div>
          
          <div className="flex flex-shrink-0 flex-col items-center gap-6">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 animate-pulse rounded-[2.5rem] bg-indigo-500/20 blur-xl" />
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-slate-800 p-1 shadow-2xl">
                 <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-gradient-to-br from-indigo-500 to-slate-900 text-4xl font-black text-white">
                   {user?.name?.[0]}{user?.name?.split(" ")[1]?.[0] || "L"}
                 </div>
              </div>
            </div>
            <div className="flex gap-2">
               <Link href="/dashboard/settings" className="rounded-xl bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                  <PlusCircle size={20} />
               </Link>
               <Link href="/dashboard/lecturer/timetable" className="rounded-xl bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                  <CalendarDays size={20} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- DASHBOARD NAVIGATION --- */}
      <div className="flex items-center justify-between px-2">
         <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
           <LayoutDashboard size={14} />
           Administrative Command
         </h2>
         <div className="h-px flex-1 mx-6 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* --- QUICK ACTIONS --- */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {QUICK_ACTIONS.map(action => (
          <ActionButton key={action.id} action={action} />
        ))}
      </section>

      {/* --- UNIFORM STATS --- */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {dynamicStats.map(stat => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      {/* --- ACTIVITY SPLIT --- */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* --- PROFESSIONAL SCHEDULE --- */}
        <section className="lg:col-span-7 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-8 flex items-center justify-between">
            <div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white">Teaching Schedule</h3>
               <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1">Today's Sessions</p>
            </div>
            <Link href="/dashboard/lecturer/timetable" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:bg-white/5">
              <ArrowRight size={20} />
            </Link>
          </div>

          {myLectures.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-slate-50 dark:bg-slate-800/50">
                <CalendarDays className="h-10 w-10 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">No lectures scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myLectures.map(lecture => (
                <div key={lecture.id} className="group flex items-center gap-5 rounded-3xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-indigo-100 hover:bg-indigo-50/30 dark:border-white/5 dark:bg-white/5 dark:hover:border-indigo-500/20">
                  <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-white font-black text-indigo-600 shadow-sm dark:bg-slate-800">
                    <span className="text-[10px] uppercase leading-none opacity-40">{lecture.day.slice(0, 3)}</span>
                    <span className="text-xl leading-none mt-1">{now.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate text-lg font-black text-slate-900 dark:text-white leading-tight">{lecture.code}</h4>
                    <div className="mt-2 flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <Clock size={14} className="text-indigo-500" /> {formatLectureTimeRange(lecture)}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <MapPin size={14} className="text-indigo-500" /> {lecture.venue}
                      </span>
                    </div>
                  </div>
                  <Link href="/dashboard/lecturer/attendance" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all hover:scale-110 active:scale-95 dark:shadow-none">
                     <QrCode size={20} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- ACADEMIC UPDATES --- */}
        <section className="lg:col-span-5 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-8 flex items-center justify-between">
            <div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white">Notifications</h3>
               <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1">Recent Faculty Alerts</p>
            </div>
            <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
              Clear All
            </button>
          </div>
          
          <div className="space-y-4">
            {ANNOUNCEMENTS.map(item => (
              <div key={item.id} className="flex gap-5 rounded-3xl border border-slate-50 bg-slate-50/50 p-5 dark:border-white/5 dark:bg-white/5 transition-all hover:bg-white dark:hover:bg-white/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <BellRing size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-black text-slate-900 dark:text-white">{item.title}</p>
                    <span className="flex-shrink-0 text-[10px] font-black uppercase text-slate-400 tracking-tighter">{item.time}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
            
            <Link href="/dashboard/lecturer/announcements" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-black active:scale-[0.98] dark:bg-indigo-600 dark:hover:bg-indigo-700">
               <Megaphone size={16} />
               Push New Update
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
