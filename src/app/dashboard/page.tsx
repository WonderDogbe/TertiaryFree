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
  type NotificationItem,
} from "@/components/student-dashboard/NotificationsFeed";
import {
  formatLectureTimeRange,
  formatMinutesUntilStart,
  getNextLecture,
  getTodayLectures,
  getWeekDayFromDate,
} from "@/components/student-dashboard/timetable/data";

export const dynamic = "force-dynamic";

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

const LECTURE_COMMUNICATIONS: NotificationItem[] = [
  {
    id: "comm-1",
    title: "CSC 301 - Dr. Mensah",
    detail:
      "Upload your lab report before 6:00 PM today. Late submissions will close automatically.",
    time: "15 mins ago",
  },
  {
    id: "comm-2",
    title: "MAT 221 - Prof. Boateng",
    detail:
      "Tomorrow's class starts 30 minutes earlier. Please review tutorial sheet 4 before coming.",
    time: "1 hour ago",
  },
  {
    id: "comm-3",
    title: "PHY 201 - Dr. Owusu",
    detail:
      "Live Q&A opens at 8:00 PM for revision. Bring one question from the previous quiz.",
    time: "Today",
  },
];

export default function DashboardPage() {
  const now = new Date();
  const todayWeekDay = getWeekDayFromDate(now);
  const nextLectureResult = getNextLecture(now);
  const todayLectures = getTodayLectures(now);
  const nextLectureToday =
    todayWeekDay !== null &&
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
        ? `${nextLectureResult.lecture.venue} • ${nextLectureResult.lecture.lecturer} • ${formatMinutesUntilStart(nextLectureResult.minutesUntilStart)}`
        : "No class is currently scheduled.",
      icon: Clock3,
    },
  ];

  const timetableLectures: TimetableLecture[] = orderedTodayLectures.map((lecture) => ({
    id: lecture.id,
    course: lecture.course,
    time: formatLectureTimeRange(lecture),
    room: lecture.venue,
    isHighlighted: nextLectureToday !== null && nextLectureToday.id === lecture.id,
  }));

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
          items={LECTURE_COMMUNICATIONS}
        />
      </section>
    </div>
  );
}
