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
    .select("*");

  if (error) {
    console.error("Error fetching timetable:", error);
    return [];
  }
  return data || [];
}
