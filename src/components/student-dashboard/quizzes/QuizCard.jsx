const STATUS_STYLES = {
  Upcoming:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
  Ongoing:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
  Completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  Missed: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200",
};

function getStatusClassName(status) {
  return (
    STATUS_STYLES[status] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
  );
}

export function QuizCard({ quiz }) {
  return (
    <article className="flex flex-col gap-2 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
            {quiz.course}
          </p>
          <h3 className="mt-1 text-base font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
            {quiz.title}
          </h3>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClassName(quiz.status)}`}
        >
          {quiz.status}
        </span>
      </div>

      <p className="text-sm text-gray-700 transition-colors duration-300 dark:text-gray-200">
        {quiz.dateLabel} at {quiz.timeLabel}
      </p>
      <p className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
        Mode / Venue: <span className="font-medium">{quiz.venue}</span>
      </p>
    </article>
  );
}