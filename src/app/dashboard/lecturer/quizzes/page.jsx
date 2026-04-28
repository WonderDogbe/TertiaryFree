"use client";

import { useState } from "react";
import { 
  Plus, 
  FileText, 
  Calendar, 
  Clock, 
  BarChart3, 
  MoreVertical,
  ChevronRight,
  ClipboardCheck,
  Timer
} from "lucide-react";

// Mock quiz data
const MOCK_QUIZZES = [
  { id: "q1", title: "Mid-Semester Assessment", course: "ICT 315", date: "May 15, 2026", duration: "60 mins", status: "Upcoming", submissions: 0 },
  { id: "q2", title: "Unit 1 Quiz: Intro to IT", course: "GNS 101", date: "Apr 20, 2026", duration: "30 mins", status: "Completed", submissions: 142 },
  { id: "q3", title: "Programming Basics", course: "ICT 102", date: "Apr 25, 2026", duration: "45 mins", status: "Marking", submissions: 138 },
];

export default function LecturerQuizzesPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quizzes & Assessments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create, manage and grade student assessments</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-700 active:scale-95 dark:shadow-none">
          <Plus size={18} />
          Create Assessment
        </button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
         <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Pending Marking</p>
            <p className="text-2xl font-black text-purple-600">3 Assessments</p>
         </div>
         <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Average Score</p>
            <p className="text-2xl font-black text-emerald-600">74.5%</p>
         </div>
         <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Participation</p>
            <p className="text-2xl font-black text-blue-600">92%</p>
         </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-100 dark:border-white/10 pb-px">
         {["All", "Upcoming", "Marking", "Completed"].map(tab => (
           <button 
             key={tab}
             onClick={() => setFilter(tab)}
             className={`px-4 py-2 text-sm font-bold transition-all border-b-2 ${
               filter === tab 
                 ? "border-purple-600 text-purple-600" 
                 : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      {/* Quiz List */}
      <div className="grid grid-cols-1 gap-4">
        {MOCK_QUIZZES.filter(q => filter === "All" || q.status === filter).map(quiz => (
          <div key={quiz.id} className="group relative rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all hover:border-purple-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-purple-900/50">
             <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                   <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                     quiz.status === "Upcoming" ? "bg-blue-100 text-blue-600" :
                     quiz.status === "Marking" ? "bg-amber-100 text-amber-600" :
                     "bg-emerald-100 text-emerald-600"
                   }`}>
                      <FileText size={24} />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{quiz.title}</h3>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                         <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{quiz.course}</span>
                         <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar size={12} /> {quiz.date}
                         </span>
                         <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <Timer size={12} /> {quiz.duration}
                         </span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                   <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-gray-400 uppercase">Submissions</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{quiz.submissions} Students</p>
                   </div>
                   
                   <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        quiz.status === "Upcoming" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200" :
                        quiz.status === "Marking" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200" :
                        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                      }`}>
                        {quiz.status}
                      </span>
                      <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-black active:scale-95 dark:bg-white dark:text-black">
                         {quiz.status === "Marking" ? "Grade Now" : "View Details"}
                         <ChevronRight size={14} />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
