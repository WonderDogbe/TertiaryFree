"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TimetableTabs() {
  const pathname = usePathname();
  const isExamTimetable = pathname.includes("exam-timetable");

  const tabs = [
    {
      id: "class",
      label: "Class Schedule",
      href: "/dashboard/timetable",
      isActive: !isExamTimetable,
    },
    {
      id: "exam",
      label: "Exam Schedule",
      href: "/dashboard/exam-timetable",
      isActive: isExamTimetable,
    },
  ];

  return (
    <div className="flex p-1.5 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
            tab.isActive
              ? "bg-white dark:bg-[#121212] text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
