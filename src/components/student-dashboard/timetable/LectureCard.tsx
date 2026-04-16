export type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export interface WeeklyLecture {
  id: string;
  day: WeekDay;
  course: string;
  lecturer: string;
  venue: string;
  startTime: string;
  endTime: string;
}

interface LectureCardProps {
  lecture: WeeklyLecture;
  className?: string;
}

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LectureCard({ lecture, className }: LectureCardProps) {
  return (
    <article
      className={joinClasses(
        "h-full overflow-hidden rounded-lg bg-blue-100 p-3 text-sm text-blue-900 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md dark:bg-blue-900/30 dark:text-blue-100",
        className,
      )}
    >
      <p className="font-semibold leading-snug">{lecture.course}</p>
      <p className="mt-1 text-xs font-medium text-blue-800/90 dark:text-blue-100/90">
        {lecture.lecturer}
      </p>
      <p className="mt-1 text-xs text-blue-800/90 dark:text-blue-100/90">
        {lecture.venue}
      </p>
      <p className="mt-2 text-xs font-semibold">
        {lecture.startTime} - {lecture.endTime}
      </p>
    </article>
  );
}
