"use client";

import { useState } from "react";
import { 
  Plus, 
  BookOpen, 
  Users, 
  Settings, 
  ArrowRight,
  MoreVertical,
  GraduationCap,
  Layers
} from "lucide-react";

// Mock courses data
const MOCK_COURSES = [
  { id: "c1", code: "ICT 315", name: "Distributed Systems", students: 142, department: "Computer Science", level: "300" },
  { id: "c2", code: "GNS 101", name: "Use of English", students: 850, department: "General Studies", level: "100" },
  { id: "c3", code: "ICT 102", name: "Programming in C++", students: 138, department: "Computer Science", level: "100" },
  { id: "c4", code: "ICT 212", name: "Data Structures", students: 156, department: "Computer Science", level: "200" },
];

export default function LecturerCoursesPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Course Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage your assigned courses and students</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 dark:shadow-none">
          <Plus size={18} />
          Create New Course
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {MOCK_COURSES.map(course => (
          <div key={course.id} className="group relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/70 p-1 shadow-sm backdrop-blur-md transition-all hover:border-blue-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-900/50">
             <div className="p-7">
                <div className="flex items-start justify-between">
                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 transition-transform group-hover:scale-110">
                      <BookOpen size={28} />
                   </div>
                   <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 transition-colors">
                      <MoreVertical size={20} />
                   </button>
                </div>

                <div className="mt-6">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{course.name}</h3>
                   <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase tracking-wide">{course.code}</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                   <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                         <Users size={16} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Students</p>
                         <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-none">{course.students}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                         <Layers size={16} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Level</p>
                         <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-none">{course.level}</p>
                      </div>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                   <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{course.department}</span>
                   <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-black active:scale-95 dark:bg-white dark:text-black">
                      Manage Students
                      <ArrowRight size={14} />
                   </button>
                </div>
             </div>
             
             {/* Decorative background element */}
             <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
