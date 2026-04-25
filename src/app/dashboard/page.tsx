"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3 } from "lucide-react";
import {
  AssignmentsDeadlines,
  type AssignmentItem,
} from "@/components/student-dashboard/AssignmentsDeadlines";
import {
  Timetable,
  type TimetableLecture,
} from "@/components/student-dashboard/Timetable";
import {
  TodayOverview,
  type OverviewItem,
} from "@/components/student-dashboard/TodayOverview";
import {
  NotificationsFeed,
} from "@/components/student-dashboard/NotificationsFeed";
import { useAuth } from "@/components/AuthProvider";
import { LECTURE_COMMUNICATIONS } from "@/lib/dashboard-notifications";
import {
  formatLectureTimeRange,
  getNextLecture,
  getTodayLectures,
  getWeekDayFromDate,
} from "@/components/student-dashboard/timetable/data";
import {
  getStudyDaysForMode,
  WEEKDAY_STUDY_DAYS,
} from "@/lib/study-schedule";
import type { WeekDay } from "@/components/student-dashboard/timetable/LectureCard";

const ASSIGNMENTS: AssignmentItem[] = [
  {
    id: "asg-1",
    title: "Operating Systems Mini Project",
    due: "Due today at 11:59 PM",
    status: "Pending",
  },
  {
    id: "asg-2",
    title: "Database ERD Submission",
    due: "Due tomorrow at 5:00 PM",
    status: "Pending",
  },
  {
    id: "asg-3",
    title: "Software Engineering Reflection",
    due: "Submitted yesterday",
    status: "Submitted",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeDays, setActiveDays] = useState<WeekDay[]>(
    WEEKDAY_STUDY_DAYS as WeekDay[],
  );

  useEffect(() => {
    if (!user || user.role !== "student") {
      setActiveDays(WEEKDAY_STUDY_DAYS as WeekDay[]);
      return;
    }

    setActiveDays(
      getStudyDaysForMode(
        user.studyMode,
        user.customStudyDays || [],
      ) as WeekDay[],
    );
  }, [user]);

  const now = new Date();
  const todayWeekDay = getWeekDayFromDate(now);
  const nextLectureResult = getNextLecture(now, { activeDays });
  const todayLectures = getTodayLectures(now, { activeDays });
  const nextLectureToday =
    activeDays.includes(todayWeekDay) &&
    nextLectureResult !== null &&
    nextLectureResult.lecture.day === todayWeekDay
      ? nextLectureResult.lecture
      : null;

  const orderedTodayLectures =
    nextLectureToday === null
      ? todayLectures
      : (() => {
          const nextLectureIndex = todayLectures.findIndex(
            (lecture) => lecture.id === nextLectureToday.id,
          );

          if (nextLectureIndex <= 0) {
            return todayLectures;
          }

          return [
            ...todayLectures.slice(nextLectureIndex),
            ...todayLectures.slice(0, nextLectureIndex),
          ];
        })();

  const overviewItems: OverviewItem[] = [
    {
      id: "next-lecture",
      title: "Next Lecture",
      value: nextLectureResult
        ? nextLectureResult.lecture.course
        : "No upcoming lecture",
      detail: nextLectureResult
        ? `${nextLectureResult.lecture.day} • ${formatLectureTimeRange(nextLectureResult.lecture)} • ${nextLectureResult.lecture.venue} • ${nextLectureResult.lecture.lecturer}`
        : "No class is currently scheduled.",
      icon: Clock3,
      countdownTargetIso: nextLectureResult?.startAtIso,
    },
  ];

  const timetableLectures: TimetableLecture[] = orderedTodayLectures.map((lecture) => ({
    id: lecture.id,
    course: lecture.course,
    time: formatLectureTimeRange(lecture),
    room: lecture.venue,
    isHighlighted: nextLectureToday !== null && nextLectureToday.id === lecture.id,
  }));

  const filteredLectureCommunications = useMemo(
    () =>
      LECTURE_COMMUNICATIONS.filter((item) => activeDays.includes(item.day)),
    [activeDays],
  );

  return (
    <div className="space-y-6">
      <TodayOverview items={overviewItems} />

      <section className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <div id="timetable" className="h-full scroll-mt-24">
          <Timetable lectures={timetableLectures} />
        </div>
        <div className="h-full">
          <AssignmentsDeadlines assignments={ASSIGNMENTS} />
        </div>
      </section>

      <section id="notifications" className="scroll-mt-24">
        <NotificationsFeed
          title="Lecture Communications"
          items={filteredLectureCommunications}
        />
      </section>
    </div>
  );
}
