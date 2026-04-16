import { WEEKLY_LECTURES } from "@/components/student-dashboard/timetable/data";

function getCourseNames(): string[] {
  const uniqueCourseNames = new Set(
    WEEKLY_LECTURES.map((lecture) => lecture.course.trim()),
  );

  return Array.from(uniqueCourseNames).sort((a, b) => a.localeCompare(b));
}

export default function MyCoursesPage() {
  const courseNames = getCourseNames();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-sky-200 bg-sky-100 p-6 shadow-sm transition-colors duration-300 dark:border-sky-800/70 dark:bg-sky-900/25">
        <h2 className="text-xl font-semibold text-sky-950 transition-colors duration-300 dark:text-sky-100">
          My Courses
        </h2>
        <p className="mt-2 text-sm text-sky-800 transition-colors duration-300 dark:text-sky-200/90">
          Course names from your class timetable.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {courseNames.map((courseName) => (
          <article
            key={courseName}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
              {courseName}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
