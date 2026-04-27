"use client";

import { useMemo } from "react";
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Award,
  AlertCircle,
  Timer
} from "lucide-react";
import Link from "next/link";
import { LiveCountdown } from "./LiveCountdown";

interface Assessment {
  id: string;
  course: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: string;
  dateTime: Date;
}

interface HeroAssessmentCardProps {
  type: "Quiz" | "Midsem";
  assessments: Assessment[];
}

export function HeroAssessmentCard({ type, assessments }: HeroAssessmentCardProps) {
  const upcoming = useMemo(() => 
    assessments.filter(a => a.status === "Upcoming" || a.status === "Ongoing")
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime()),
    [assessments]
  );

  const next = upcoming[0];

  if (!next) {
    return (
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 via-gray-50 to-white p-8 shadow-sm dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">No Upcoming {type}s</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            All your scheduled {type.toLowerCase()}s are completed or there are none currently assigned.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a3557] via-[#23456e] to-[#1a3557] p-8 shadow-xl dark:from-[#0a1525] dark:via-[#0d1a2d] dark:to-[#0a1525]">
      {/* Decorative Elements */}
      <span className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Next Assessment Highlight */}
        <div className="flex-1 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-400/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-100 backdrop-blur-md">
              <Award className="h-3 w-3" /> Next {type}
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              {next.course}
              <span className="block text-2xl font-semibold text-blue-200/80 sm:text-3xl">
                {next.title}
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-blue-100/90">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-blue-300" />
              <span>{next.venue}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Clock className="h-4 w-4 text-blue-300" />
              <span>{next.time}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 backdrop-blur-sm">
              <CalendarDays className="h-4 w-4 text-blue-300" />
              <span>{next.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-sm font-bold text-[#1a3557] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10">
              Start Practice
            </button>
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 text-white transition-all hover:bg-white/10">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right: Countdown Area */}
        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:min-w-[320px]">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider opacity-80">
              <Timer className="h-4 w-4 text-rose-400" />
              Countdown
            </h3>
            <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300 ring-1 ring-rose-500/30">
              Live Soon
            </span>
          </div>
          
          <div className="scale-110 origin-left">
            <LiveCountdown targetIso={`${next.date}T${next.time}:00`} />
          </div>

          {upcoming.length > 1 && (
            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="text-[10px] font-bold uppercase text-blue-300/60 mb-2">Other upcoming</p>
              <div className="flex -space-x-2 overflow-hidden">
                {upcoming.slice(1, 4).map((u, i) => (
                  <div key={u.id} className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1a3557] bg-blue-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white/5" title={u.course}>
                    {u.course.slice(0, 3)}
                  </div>
                ))}
                {upcoming.length > 4 && (
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1a3557] bg-white/10 text-[10px] font-bold text-white backdrop-blur-md">
                    +{upcoming.length - 4}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
