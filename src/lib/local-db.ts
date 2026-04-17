import academicOptionsJson from "@/db/academic-options.json";
import courseCatalogJson from "@/db/course-catalog.json";
import departmentsJson from "@/db/departments.json";
import institutionsJson from "@/db/institutions.json";
import weeklyLecturesJson from "@/db/weekly-lectures.json";

export interface InstitutionRecord {
  id: string;
  name: string;
  abbreviation: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export type SemesterOption = SelectOption;

export interface LevelOption extends SelectOption {
  level: string;
  semester: string;
}

export interface DepartmentRecord {
  id: string;
  name: string;
}

export interface ProgrammeRecord {
  id: string;
  name: string;
  departmentId: string;
}

export type UserRoleValue = "student" | "lecturer";

export interface SignupRoleOption {
  value: UserRoleValue;
  title: string;
  description: string;
}

interface AcademicOptionsPayload {
  genders: SelectOption[];
  semesters: SemesterOption[];
  levels: LevelOption[];
  programmes: ProgrammeRecord[];
  signupRoles: SignupRoleOption[];
  lecturerTitles: SelectOption[];
}

export interface CourseCatalogEntry {
  id: string;
  code: string;
  title: string;
  department: string;
  image: string;
}

export interface CourseOption extends SelectOption {
  code: string;
  title: string;
}

export type GenderValue = "male" | "female" | "other";

export type WeekDayValue =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

interface WeeklyLectureJsonRecord {
  id: string;
  day: string;
  courseCode: string;
  lecturer: string;
  venue: string;
  startTime: string;
  endTime: string;
}

export interface WeeklyLectureRecord {
  id: string;
  day: WeekDayValue;
  course: string;
  code: string;
  lecturer: string;
  venue: string;
  startTime: string;
  endTime: string;
}

const INSTITUTIONS = institutionsJson as InstitutionRecord[];
const ACADEMIC_OPTIONS = academicOptionsJson as AcademicOptionsPayload;
const DEPARTMENTS = departmentsJson as DepartmentRecord[];
const COURSE_CATALOG = courseCatalogJson as CourseCatalogEntry[];
const WEEKLY_LECTURES_JSON = weeklyLecturesJson as WeeklyLectureJsonRecord[];

const WEEKDAY_VALUES: WeekDayValue[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const WEEKDAY_SET = new Set<WeekDayValue>(WEEKDAY_VALUES);
const INSTITUTION_NAMES = new Set(INSTITUTIONS.map((item) => item.name));
const GENDER_VALUES = new Set(ACADEMIC_OPTIONS.genders.map((item) => item.value));
const LEVEL_VALUES = new Set(ACADEMIC_OPTIONS.levels.map((item) => item.value));
const DEPARTMENT_NAMES = new Set(DEPARTMENTS.map((item) => item.name));
const USER_ROLE_VALUES = new Set(
  ACADEMIC_OPTIONS.signupRoles.map((item) => item.value),
);
const COURSE_BY_CODE = new Map(COURSE_CATALOG.map((item) => [item.code, item]));

export function getInstitutions(): InstitutionRecord[] {
  return INSTITUTIONS;
}

export function isKnownInstitutionName(institutionName: string): boolean {
  return INSTITUTION_NAMES.has(institutionName);
}

export function findInstitutionByName(
  institutionName: string,
): InstitutionRecord | null {
  return (
    INSTITUTIONS.find((institution) => institution.name === institutionName) ||
    null
  );
}

export function getGenderOptions(): SelectOption[] {
  return ACADEMIC_OPTIONS.genders;
}

export function isKnownGender(value: unknown): value is GenderValue {
  return typeof value === "string" && GENDER_VALUES.has(value);
}

export function getSemesterOptions(): SemesterOption[] {
  return ACADEMIC_OPTIONS.semesters;
}

export function getLevelOptions(): LevelOption[] {
  return ACADEMIC_OPTIONS.levels;
}

export function isKnownLevel(value: unknown): value is string {
  return typeof value === "string" && LEVEL_VALUES.has(value);
}

export function getSignupRoleOptions(): SignupRoleOption[] {
  return ACADEMIC_OPTIONS.signupRoles;
}

export function isKnownUserRole(value: unknown): value is UserRoleValue {
  return typeof value === "string" && USER_ROLE_VALUES.has(value as UserRoleValue);
}

export function getLecturerTitleOptions(): SelectOption[] {
  return ACADEMIC_OPTIONS.lecturerTitles;
}

export function getDepartmentOptions(): DepartmentRecord[] {
  return DEPARTMENTS;
}

export function isKnownDepartmentName(value: unknown): value is string {
  return typeof value === "string" && DEPARTMENT_NAMES.has(value);
}

export function getProgrammeOptions(): ProgrammeRecord[] {
  return ACADEMIC_OPTIONS.programmes;
}

export function getCourseCatalog(): CourseCatalogEntry[] {
  return COURSE_CATALOG;
}

export function getCourseOptions(): CourseOption[] {
  return COURSE_CATALOG.map((course) => ({
    value: course.code,
    label: `${course.title} (${course.code})`,
    code: course.code,
    title: course.title,
  }));
}

export function findCourseByCode(courseCode: string): CourseCatalogEntry | null {
  return COURSE_BY_CODE.get(courseCode) || null;
}

export function getWeeklyLectures(): WeeklyLectureRecord[] {
  const mappedLectures: WeeklyLectureRecord[] = [];

  for (const lecture of WEEKLY_LECTURES_JSON) {
    if (!WEEKDAY_SET.has(lecture.day as WeekDayValue)) {
      continue;
    }

    const courseMetadata = findCourseByCode(lecture.courseCode);

    mappedLectures.push({
      id: lecture.id,
      day: lecture.day as WeekDayValue,
      course: courseMetadata?.title || lecture.courseCode,
      code: lecture.courseCode,
      lecturer: lecture.lecturer,
      venue: lecture.venue,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
    });
  }

  return mappedLectures;
}
