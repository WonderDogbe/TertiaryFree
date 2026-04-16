import { CircleCheckBig, Clock4 } from "lucide-react";
import { Card } from "./Card";

export interface AssignmentItem {
  id: string;
  title: string;
  due: string;
  status: "Pending" | "Submitted";
}

interface AssignmentsDeadlinesProps {
  assignments: AssignmentItem[];
}

export function AssignmentsDeadlines({ assignments }: AssignmentsDeadlinesProps) {
  return (
    <Card title="Assignments / Deadlines">
      <div className="mt-4 space-y-3">
        {assignments.map((assignment) => {
          const isPending = assignment.status === "Pending";

          return (
            <article
              key={assignment.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-3 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
                  {assignment.title}
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isPending
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  }`}
                >
                  {assignment.status}
                </span>
              </div>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-gray-500 transition-colors duration-300 dark:text-gray-300">
                {isPending ? (
                  <Clock4 className="h-3.5 w-3.5" />
                ) : (
                  <CircleCheckBig className="h-3.5 w-3.5" />
                )}
                {assignment.due}
              </p>
            </article>
          );
        })}
      </div>
    </Card>
  );
}
