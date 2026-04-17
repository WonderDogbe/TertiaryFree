import { Bell, ChartNoAxesColumn, Clock3 } from "lucide-react";
import {
  AssignmentsDeadlines,
  type AssignmentItem,
} from "@/components/student-dashboard/AssignmentsDeadlines";
import {
  AttendanceStats,
  type AttendanceCourse,
} from "@/components/student-dashboard/AttendanceStats";
import {
  NotificationsFeed,
  type NotificationItem,
} from "@/components/student-dashboard/NotificationsFeed";
import {
  Timetable,
  type TimetableLecture,
} from "@/components/student-dashboard/Timetable";
import {
  TodayOverview,
  type OverviewItem,
} from "@/components/student-dashboard/TodayOverview";
import {
  formatLectureTimeRange,
  formatMinutesUntilStart,
  getNextLecture,
  getTodayLectures,
  getWeekDayFromDate,
} from "@/components/student-dashboard/timetable/data";

export const dynamic = "force-dynamic";

const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    id: "note-1",
    title: "Lecture Canceled",
    detail: "CSC 410 has been canceled for today by the lecturer.",
    time: "2h ago",
  },
  {
    id: "note-2",
    title: "Assignment Posted",
    detail: "New software architecture assignment is now available.",
    time: "4h ago",
  },
  {
    id: "note-3",
    title: "Attendance Reminder",
    detail: "Check in to Operating Systems before 10:45 AM.",
    time: "6h ago",
  },
  {
    id: "note-4",
    title: "Lab Venue Update",
    detail: "Network Security lab moved from Lab A to Lab C.",
    time: "1d ago",
  },
  {
    id: "note-5",
    title: "New Material Uploaded",
    detail: "Database systems slides for week 8 are now available.",
    time: "1d ago",
  },
];

const ATTENDANCE_COURSES: AttendanceCourse[] = [
  {
    id: "att-1",
    course: "CSC 355",
    percentage: 92,
    barWidthClass: "w-[92%]",
  },
  {
    id: "att-2",
    course: "CSC 399",
    percentage: 81,
    barWidthClass: "w-[81%]",
  },
  {
    id: "att-3",
    course: "CSC 325",
    percentage: 75,
    barWidthClass: "w-3/4",
  },
  {
    id: "att-4",
    course: "CSC 301",
    percentage: 88,
    barWidthClass: "w-[88%]",
  },
];

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
  const now = new Date();
  const todayWeekDay = getWeekDayFromDate(now);
  const nextLectureResult = getNextLecture(now);
  const todayLectures = getTodayLectures(now);

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
    {
      id: "attendance-rate",
      title: "Attendance %",
      value: "84%",
      detail: "You are above faculty threshold",
      icon: ChartNoAxesColumn,
    },
    {
      id: "new-notifications",
      title: "New Notifications",
      value: "5",
      detail: "2 require your response today",
      icon: Bell,
    },
  ];

  const timetableLectures: TimetableLecture[] = todayLectures.map((lecture) => ({
    id: lecture.id,
    course: lecture.course,
    time: formatLectureTimeRange(lecture),
    room: lecture.venue,
    isHighlighted:
      todayWeekDay !== null &&
      nextLectureResult !== null &&
      nextLectureResult.lecture.day === todayWeekDay &&
      nextLectureResult.lecture.id === lecture.id,
  }));

  return (
    <div className="space-y-6">
      <TodayOverview items={overviewItems} />

      <section className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div id="timetable" className="h-full scroll-mt-24">
          <Timetable lectures={timetableLectures} />
        </div>
        <div id="notifications" className="h-full scroll-mt-24">
          <NotificationsFeed items={NOTIFICATION_ITEMS} />
        </div>
        <div id="attendance" className="h-full scroll-mt-24">
          <AttendanceStats courses={ATTENDANCE_COURSES} />
        </div>
        <div className="h-full">
          <AssignmentsDeadlines assignments={ASSIGNMENTS} />
        </div>
      </section>
    </div>
  );
}
