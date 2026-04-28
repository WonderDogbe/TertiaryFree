"use client";

import { useMemo, useState } from "react";
import { 
  Plus, 
  Clock, 
  MapPin, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { getTodayLectures, formatLectureTimeRange } from "@/components/student-dashboard/timetable/data";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function LecturerTimetablePage() {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  
  const allLectures = useMemo(() => {
    // In a real app, this would fetch from Supabase
    // For now, we mock it using the existing data structure
    return getTodayLectures(new Date()); 
  }, []);

  const filteredLectures = useMemo(() => {
    return allLectures.filter(l => l.day === selectedDay);
  }, [allLectures, selectedDay]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Lecture Schedule</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your weekly teaching commitments</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 dark:shadow-none">
          <Plus size={18} />
          Add Lecture
        </button>
      </header>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              selectedDay === day
                ? "bg-blue-600 text-white shadow-md shadow-blue-100 dark:shadow-none"
                : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 dark:bg-white/5 dark:text-gray-300 dark:border-white/10"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredLectures.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
             <CalendarIcon className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
             <p className="text-gray-500 dark:text-gray-400 font-medium">No lectures scheduled for {selectedDay}</p>
             <button className="mt-4 text-sm font-bold text-blue-600 dark:text-blue-400">Schedule one now</button>
          </div>
        ) : (
          filteredLectures.map(lecture => (
            <div key={lecture.id} className="group relative rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all hover:border-blue-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-900/50">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-[10px] font-bold dark:bg-blue-900/40 dark:text-blue-200">
                      {lecture.code}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{lecture.course}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <Clock size={16} className="text-blue-500" />
                      {formatLectureTimeRange(lecture)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <MapPin size={16} className="text-blue-500" />
                      {lecture.venue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-colors">
                      <Edit2 size={18} />
                   </button>
                   <button className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors">
                      <Trash2 size={18} />
                   </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
