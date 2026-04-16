import {
  TimetableGrid,
} from "@/components/student-dashboard/timetable/TimetableGrid";
import { WEEKLY_LECTURES } from "@/components/student-dashboard/timetable/data";

export default function ClassTimetablePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-sky-200 bg-sky-100 p-6 shadow-sm transition-colors duration-300 dark:border-sky-800/70 dark:bg-sky-900/25">
        <h2 className="text-xl font-semibold text-sky-950 transition-colors duration-300 dark:text-sky-100">
          Class Timetable
        </h2>
        <p className="mt-2 text-sm text-sky-800 transition-colors duration-300 dark:text-sky-200/90">
          View all classes by day, time, lecturer, and venue in one clear weekly
          overview.
        </p>
      </section>

      <TimetableGrid lectures={WEEKLY_LECTURES} />
    </div>
  );
}
