"use client";

import {
  Clock,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  BookOpen,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-slide-up">
      {/* 1. The Progress Bar: Day-at-a-Glance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel dark:glass-panel-dark p-6 rounded-[2rem] premium-shadow border-none">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold text-[#0a0f5c] dark:text-white">
              Semester Progress
            </h2>
            <span className="text-sm font-bold text-[#2dd4a8]">
              Week 8 of 13
            </span>
          </div>
          <div className="relative w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#0a0f5c] to-[#2dd4a8] transition-all duration-1000 ease-out shadow-sm"
              style={{ width: "61.5%" }}
            />
          </div>
          <div className="mt-4 flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
            <span>START (JAN 12)</span>
            <span>62% COMPLETED</span>
            <span>FINALS (APR 15)</span>
          </div>
        </div>

        {/* 4. Personal Success Metrics: Quick Stats */}
        <div className="glass-panel dark:glass-panel-dark p-6 rounded-[2rem] premium-shadow border-none flex items-center justify-center bg-gradient-to-br from-[#0a0f5c] to-[#1a2080]">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4a8]/80">
              Current GPA
            </p>
            <h3 className="text-5xl font-black text-white mt-1">3.86</h3>
            <div className="mt-2 inline-flex items-center text-[10px] font-bold text-[#2dd4a8] bg-[#2dd4a8]/10 px-2.5 py-1 rounded-full border border-[#2dd4a8]/30">
              <TrendingUp size={12} className="mr-1" />
              +0.12 FROM LAST SEMESTER
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 1. Today's Timeline: Centerpiece */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-extrabold text-[#0a0f5c] dark:text-white">
              Next Up
            </h2>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-white dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Calendar size={18} className="text-slate-500" />
              </span>
              <button className="text-xs font-bold text-[#0a0f5c] dark:text-[#2dd4a8] hover:underline">
                VIEW FULL TIMETABLE
              </button>
            </div>
          </div>

          {[
            {
              time: "10:30 AM - 12:00 PM",
              subject: "Advanced Software Engineering",
              code: "CS301",
              location: "Hall B3 - Academic Block",
              status: "Live Now",
              isLive: true,
            },
            {
              time: "02:00 PM - 03:30 PM",
              subject: "Database Management Systems",
              code: "CS302",
              location: "Lab 2 - Tech Center",
              status: "Upcoming",
              isLive: false,
            },
            {
              time: "04:00 PM - 05:30 PM",
              subject: "Technical Communication",
              code: "EN210",
              location: "Room 102 - Humanities Wing",
              status: "Upcoming",
              isLive: false,
            },
          ].map((lecture, i) => (
            <div
              key={lecture.code}
              className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                lecture.isLive
                  ? "bg-white dark:bg-slate-900 border-[#0a0f5c] dark:border-[#2dd4a8] ring-1 ring-[#0a0f5c]/20 dark:ring-[#2dd4a8]/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              }`}
            >
              {lecture.isLive && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0a0f5c] dark:bg-[#2dd4a8]" />
              )}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-tighter bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                      {lecture.code}
                    </span>
                    {lecture.isLive && (
                      <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-[#2dd4a8] animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4a8]" />
                        LIVE NOW
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#0a0f5c] dark:text-white leading-tight">
                    {lecture.subject}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock
                        size={14}
                        className="text-[#0a0f5c] dark:text-[#2dd4a8]"
                      />
                      {lecture.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin
                        size={14}
                        className="text-[#0a0f5c] dark:text-[#2dd4a8]"
                      />
                      {lecture.location}
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <ChevronRight size={18} className="text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Intelligent Notification Center */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#0a0f5c] dark:text-white mb-2">
            Notice Board
          </h2>

          <div className="glass-panel dark:glass-panel-dark p-5 rounded-2xl premium-shadow border-none space-y-4">
            {[
              {
                icon: AlertCircle,
                color: "rose",
                text: "Lecture moved: Hall A → Hall B4",
                label: "Academic",
              },
              {
                icon: BookOpen,
                color: "amber",
                text: "Assignment 3 Slides uploaded",
                label: "Coursework",
              },
              {
                icon: CheckCircle2,
                color: "emerald",
                text: "Attendance registered for CS301",
                label: "System",
              },
            ].map((note, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-xl bg-${note.color}-500/10 text-${note.color}-500 flex-shrink-0`}
                >
                  <note.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 mb-0.5">
                    {note.label}
                  </p>
                  <p className="text-sm font-semibold text-[#0a0f5c] dark:text-slate-200 leading-snug">
                    {note.text}
                  </p>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              MARK ALL AS READ
            </button>
          </div>

          {/* 4. Success Metrics: Credits */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                CREDIT HOURS
              </span>
              <span className="text-xs font-black text-[#0a0f5c] dark:text-[#2dd4a8]">
                102 / 120
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0a0f5c] dark:bg-[#2dd4a8]"
                style={{ width: "85%" }}
              />
            </div>
          </div>
        </div>

        {/* 1. Upcoming Deadlines: Right Col */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#0a0f5c] dark:text-white mb-2">
            Deadlines
          </h2>

          {[
            {
              title: "Database Schema Design",
              date: "TOMORROW, 11:59PM",
              urgency: "high",
            },
            {
              title: "Network Protocols Quiz",
              date: "FEB 24, 10:00AM",
              urgency: "med",
            },
            {
              title: "Soft Skills Reflection",
              date: "MAR 02, 09:00AM",
              urgency: "low",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#0a0f5c] dark:hover:border-[#2dd4a8] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div
                  className={`p-1.5 rounded-lg ${
                    item.urgency === "high"
                      ? "bg-rose-50 text-rose-500 dark:bg-rose-950/30"
                      : item.urgency === "med"
                        ? "bg-amber-50 text-amber-500 dark:bg-amber-950/30"
                        : "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30"
                  }`}
                >
                  <Clock size={14} />
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-slate-300 group-hover:text-[#0a0f5c] dark:group-hover:text-[#2dd4a8] transition-colors"
                />
              </div>
              <h4 className="text-sm font-bold text-[#0a0f5c] dark:text-slate-200 group-hover:text-[#0a0f5c] dark:group-hover:text-[#2dd4a8] transition-colors">
                {item.title}
              </h4>
              <p className="mt-1 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">
                {item.date}
              </p>
            </div>
          ))}

          {/* Exam Countdown */}
          <div className="mt-8 p-6 rounded-[2rem] bg-gradient-to-br from-[#1a2080] to-[#0a0f5c] text-white overflow-hidden relative">
            <Calendar className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 opacity-40 rotate-12" />
            <p className="text-[10px] font-black uppercase tracking-widest text-[#2dd4a8]">
              Exam Season
            </p>
            <h4 className="text-xl font-black mt-1">Starting in</h4>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 text-center">
                <span className="block text-xl font-black">42</span>
                <span className="text-[8px] font-bold uppercase opacity-60">
                  DAYS
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 text-center">
                <span className="block text-xl font-black">16</span>
                <span className="text-[8px] font-bold uppercase opacity-60">
                  HOURS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
