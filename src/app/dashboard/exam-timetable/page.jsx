import { TimetableTabs } from "@/components/student-dashboard/timetable/TimetableTabs";

export default function ExamTimetablePage() {
  return (
    <div className="space-y-4">
      <TimetableTabs />

      <section className="rounded-[2rem] border border-sky-100 bg-sky-50/50 p-6 shadow-sm transition-colors duration-300 dark:border-sky-900/40 dark:bg-sky-900/10">
        <h2 className="text-xl font-bold text-sky-950 transition-colors duration-300 dark:text-sky-100">
          Exam Schedule
        </h2>
        <p className="mt-1 text-sm text-sky-800/80 transition-colors duration-300 dark:text-sky-200/60 font-medium">
          Official dates and venues for your end-of-semester examinations.
        </p>
      </section>

      <section className="rounded-[2.5rem] border border-dashed border-gray-200 bg-white/50 backdrop-blur-md p-12 text-center shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-white/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
        </div>
        <p className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Coming Soon
        </p>
        <p className="mt-2 text-sm text-gray-500 transition-colors duration-300 dark:text-gray-400 max-w-xs mx-auto">
          Exam schedule publishing will be available here as soon as the academic office releases the official dates.
        </p>
      </section>
    </div>
  );
}
