import type { WeekDay, WeeklyLecture } from "./LectureCard";

export const WEEKLY_LECTURES: WeeklyLecture[] = [
  {
    id: "wk-1",
    day: "Monday",
    course: "Math 101",
    lecturer: "Dr. Smith",
    venue: "Room A2",
    startTime: "09:00",
    endTime: "10:50",
  },
  {
    id: "wk-2",
    day: "Monday",
    course: "Data Structures",
    lecturer: "Dr. Mensah",
    venue: "Lab C",
    startTime: "13:00",
    endTime: "14:50",
  },
  {
    id: "wk-3",
    day: "Tuesday",
    course: "Physics 201",
    lecturer: "Prof. Lee",
    venue: "Hall B1",
    startTime: "11:00",
    endTime: "12:50",
  },
  {
    id: "wk-4",
    day: "Tuesday",
    course: "UI Design",
    lecturer: "Ms. Ofori",
    venue: "Studio 4",
    startTime: "15:00",
    endTime: "16:50",
  },
  {
    id: "wk-5",
    day: "Wednesday",
    course: "Software Engineering",
    lecturer: "Dr. Boateng",
    venue: "Room D3",
    startTime: "07:00",
    endTime: "08:50",
  },
  {
    id: "wk-6",
    day: "Thursday",
    course: "Database Systems",
    lecturer: "Dr. Chen",
    venue: "Lab A1",
    startTime: "17:00",
    endTime: "18:50",
  },
  {
    id: "wk-7",
    day: "Friday",
    course: "Networks",
    lecturer: "Mr. Johnson",
    venue: "Room C5",
    startTime: "19:00",
    endTime: "20:50",
  },
];

const WEEKDAY_INDEX: Record<WeekDay, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
};

const MINUTES_IN_DAY = 24 * 60;

function parseTimeToMinutes(timeValue: string): number {
  const [hours, minutes] = timeValue.split(":").map(Number);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return Number.NaN;
  }

  return hours * 60 + minutes;
}

function formatTo12HourClock(timeValue: string): string {
  const [rawHours, rawMinutes] = timeValue.split(":").map(Number);

  if (!Number.isFinite(rawHours) || !Number.isFinite(rawMinutes)) {
    return timeValue;
  }

  const meridiem = rawHours >= 12 ? "PM" : "AM";
  const hours = rawHours % 12 || 12;

  return `${hours}:${String(rawMinutes).padStart(2, "0")} ${meridiem}`;
}

function getMondayBasedDayIndex(referenceDate: Date): number {
  return (referenceDate.getDay() + 6) % 7;
}

export function getWeekDayFromDate(referenceDate: Date): WeekDay | null {
  const dayIndex = getMondayBasedDayIndex(referenceDate);

  if (dayIndex > 4) {
    return null;
  }

  const weekdays: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return weekdays[dayIndex];
}

export function getTodayLectures(referenceDate = new Date()): WeeklyLecture[] {
  const weekday = getWeekDayFromDate(referenceDate);

  if (!weekday) {
    return [];
  }

  return WEEKLY_LECTURES.filter((lecture) => lecture.day === weekday).sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );
}

export interface NextLectureResult {
  lecture: WeeklyLecture;
  minutesUntilStart: number;
}

export function getNextLecture(referenceDate = new Date()): NextLectureResult | null {
  const nowDayIndex = getMondayBasedDayIndex(referenceDate);
  const nowMinutes = referenceDate.getHours() * 60 + referenceDate.getMinutes();

  let closestLecture: NextLectureResult | null = null;

  for (const lecture of WEEKLY_LECTURES) {
    const lectureDayIndex = WEEKDAY_INDEX[lecture.day];
    const lectureStartMinutes = parseTimeToMinutes(lecture.startTime);

    if (!Number.isFinite(lectureStartMinutes)) {
      continue;
    }

    let dayOffset = lectureDayIndex - nowDayIndex;

    if (dayOffset < 0 || (dayOffset === 0 && lectureStartMinutes < nowMinutes)) {
      dayOffset += 7;
    }

    const minutesUntilStart =
      dayOffset * MINUTES_IN_DAY + (lectureStartMinutes - nowMinutes);

    if (
      closestLecture === null ||
      minutesUntilStart < closestLecture.minutesUntilStart
    ) {
      closestLecture = {
        lecture,
        minutesUntilStart,
      };
    }
  }

  return closestLecture;
}

export function formatLectureTimeRange(lecture: WeeklyLecture): string {
  return `${formatTo12HourClock(lecture.startTime)} - ${formatTo12HourClock(lecture.endTime)}`;
}

export function formatMinutesUntilStart(minutesUntilStart: number): string {
  const safeMinutes = Math.max(0, Math.floor(minutesUntilStart));

  if (safeMinutes < 1) {
    return "Starting now";
  }

  if (safeMinutes < 60) {
    return `Starts in ${safeMinutes} min`;
  }

  const days = Math.floor(safeMinutes / MINUTES_IN_DAY);
  const remainingDayMinutes = safeMinutes % MINUTES_IN_DAY;
  const hours = Math.floor(remainingDayMinutes / 60);
  const minutes = remainingDayMinutes % 60;

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0 && days === 0) {
    parts.push(`${minutes}m`);
  }

  if (parts.length === 0) {
    parts.push("0m");
  }

  return `Starts in ${parts.join(" ")}`;
}
