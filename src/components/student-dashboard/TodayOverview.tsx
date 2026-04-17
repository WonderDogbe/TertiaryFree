import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";

export interface OverviewItem {
  id: string;
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

interface TodayOverviewProps {
  items: OverviewItem[];
}

export function TodayOverview({ items }: TodayOverviewProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
        Today Overview
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isAttendanceCard = item.id === "attendance-rate";
          const attendancePercentage = Number.parseFloat(
            item.value.replace(/[^\d.]/g, ""),
          );
          const hasGoodAttendance =
            isAttendanceCard &&
            Number.isFinite(attendancePercentage) &&
            attendancePercentage >= 50;

          const attendanceCardClasses = hasGoodAttendance
            ? "border border-emerald-200 dark:border-emerald-700"
            : "border border-rose-200 dark:border-rose-700";

          const attendanceIconClasses = hasGoodAttendance
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
            : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";

          return (
            <Card
              key={item.id}
              className={isAttendanceCard ? attendanceCardClasses : undefined}
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isAttendanceCard
                        ? hasGoodAttendance
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-rose-700 dark:text-rose-300"
                        : "text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    {item.title}
                  </p>
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 ${
                      isAttendanceCard
                        ? attendanceIconClasses
                        : "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p
                    className={`text-2xl font-semibold transition-colors duration-300 ${
                      isAttendanceCard
                        ? hasGoodAttendance
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-rose-700 dark:text-rose-300"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      isAttendanceCard
                        ? hasGoodAttendance
                          ? "text-emerald-700/90 dark:text-emerald-300/90"
                          : "text-rose-700/90 dark:text-rose-300/90"
                        : "text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
