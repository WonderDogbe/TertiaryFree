import type { WeekDay, WeeklyLecture } from "./LectureCard";
import { getWeeklyLectures } from "@/lib/local-db";

export const WEEKLY_LECTURES: WeeklyLecture[] = getWeeklyLectures().map(
  (lecture) => ({
    ...lecture,
    day: lecture.day as WeekDay,
  }),
);

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
