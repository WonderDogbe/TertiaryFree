import { createClient } from "@/utils/supabase/client";

/**
 * Fetches all institutions from Supabase
 */
export async function getInstitutionsFromSupabase() {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("institutions")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching institutions:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetches faculties for a specific institution
 */
export async function getFacultiesFromSupabase(institutionId: string) {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("faculties")
    .select("*")
    .eq("institution_id", institutionId)
    .order("name");

  if (error) {
    console.error("Error fetching faculties:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetches programmes for a specific faculty
 */
export async function getProgrammesFromSupabase(facultyId: string) {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("programmes")
    .select("*")
    .eq("faculty_id", facultyId)
    .order("name");

  if (error) {
    console.error("Error fetching programmes:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetches courses from the catalog
 */
export async function getCoursesFromSupabase() {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("code");

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetches the weekly timetable
 */
export async function getTimetableFromSupabase() {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("weekly_lectures")
    .select("*")
    .order("day")
    .order("start_time");

  if (error) {
    console.error("Error fetching timetable:", error);
    return [];
  }
  
  return (data || []).map((l: any) => ({
    ...l,
    course_title: l.course_title || l.course_code || "Unknown Course",
  }));
}

/**
 * Fetches all quizzes from Supabase
 */
export async function getQuizzesFromSupabase() {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
  return data || [];
}

/**
 * Fetches academic levels
 */
export async function getLevelsFromSupabase() {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("academic_levels")
    .select("*")
    .order("level")
    .order("semester");

  if (error) {
    console.error("Error fetching levels:", error);
    return [];
  }
  return data || [];
}
