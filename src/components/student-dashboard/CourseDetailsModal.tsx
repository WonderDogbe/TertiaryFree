"use client";

import { useId, useEffect } from "react";
import { 
  X, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Award,
  AlertCircle
} from "lucide-react";
import { getNextLectureForCourse, formatLectureTimeRange } from "./timetable/data";
import { getQuizzesForCourse } from "@/lib/local-db";

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    code: string;
    department: string;
    image: string;
  };
}

export function CourseDetailsModal({ isOpen, onClose, course }: CourseDetailsModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const nextLecture = getNextLectureForCourse(course.code);
  const quizzes = getQuizzesForCourse(course.code);
  const upcomingQuizzes = quizzes.filter(q => q.status === "Upcoming" || q.status === "Ongoing");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-label="Close details"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900"
      >
        {/* Header Image/Banner */}
        <div className="relative h-32 w-full bg-blue-600">
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
           <div className="absolute bottom-4 left-6">
              <h2 id={titleId} className="text-xl font-bold text-white">
                {course.title}
              </h2>
              <p className="text-sm text-blue-100">{course.code}</p>
           </div>
           <button
             onClick={onClose}
             className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/30"
           >
             <X className="h-5 w-5" />
           </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Department */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Department</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{course.department}</p>
              </div>
            </div>

            {/* Lecturer */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Lecturer</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {nextLecture?.lecture.lecturer || "Not assigned"}
                </p>
              </div>
            </div>

            {/* Next Class */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Next Class</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {nextLecture ? (
                    <>
                      {nextLecture.lecture.day} at {nextLecture.lecture.startTime}
                      <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                        ({nextLecture.lecture.venue})
                      </span>
                    </>
                  ) : "No classes scheduled"}
                </p>
              </div>
            </div>

            {/* Quizzes / Assessments */}
            <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-gray-100">
                  <Award className="h-4 w-4 text-amber-500" />
                  Quizzes & Midsems
                </h3>
                {upcomingQuizzes.length > 0 && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                    {upcomingQuizzes.length} Upcoming
                  </span>
                )}
              </div>
              
              {quizzes.length > 0 ? (
                <div className="space-y-3">
                  {quizzes.slice(0, 2).map((quiz) => (
                    <div key={quiz.id} className="flex items-start justify-between gap-2 border-b border-gray-200 pb-2 last:border-0 last:pb-0 dark:border-gray-700">
                      <div>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{quiz.title}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{quiz.date} at {quiz.time}</p>
                      </div>
                      <span className={`text-[10px] font-medium ${
                        quiz.status === 'Completed' ? 'text-emerald-600' : 'text-blue-600'
                      }`}>
                        {quiz.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  No upcoming quizzes or midsems
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Close
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-700 dark:shadow-none"
            >
              Course Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
