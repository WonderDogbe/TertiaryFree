"use client";

import { useEffect, useMemo, useState } from "react";
import {
  TimetableGrid,
} from "@/components/student-dashboard/timetable/TimetableGrid";
import { WEEKLY_LECTURES } from "@/components/student-dashboard/timetable/data";
import { useAuth } from "@/components/AuthProvider";
import {
  getStudyDaysForMode,
  WEEKDAY_STUDY_DAYS,
} from "@/lib/study-schedule";

import { TimetableTabs } from "@/components/student-dashboard/timetable/TimetableTabs";

export default function ClassTimetablePage() {
  const { user: profile } = useAuth();
  const [activeDays, setActiveDays] = useState(WEEKDAY_STUDY_DAYS);

  useEffect(() => {
    if (!profile || profile.role !== "student") {
      setActiveDays(WEEKDAY_STUDY_DAYS);
      return;
    }

    setActiveDays(
      getStudyDaysForMode(
        profile.studyMode || "weekday",
        profile.customStudyDays || [],
      ),
    );
  }, [profile]);

  const filteredLectures = useMemo(
    () => WEEKLY_LECTURES.filter((lecture) => activeDays.includes(lecture.day)),
    [activeDays],
  );

  return (
    <div className="space-y-4">
      <TimetableTabs />
      
      <section className="rounded-[2rem] border border-sky-100 bg-sky-50/50 p-6 shadow-sm transition-colors duration-300 dark:border-sky-900/40 dark:bg-sky-900/10">
        <h2 className="text-xl font-bold text-sky-950 transition-colors duration-300 dark:text-sky-100">
          Weekly Classes
        </h2>
        <p className="mt-1 text-sm text-sky-800/80 transition-colors duration-300 dark:text-sky-200/60 font-medium">
          Your personalized lecture schedule based on your study mode.
        </p>
      </section>

      <TimetableGrid lectures={filteredLectures} days={activeDays} />
    </div>
  );
}
