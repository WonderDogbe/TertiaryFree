import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import localInstitutions from "@/db/institutions.json";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const fallback = NextResponse.json({ institutions: localInstitutions }, { status: 200 });
  fallback.headers.set("Cache-Control", "no-store");

  const supabaseKey = serviceRoleKey || anonKey;
  if (!supabaseUrl || !supabaseKey) return fallback;

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("institutions")
      .select("id,name,abbreviation")
      .order("name");

    if (error || !data || data.length === 0) return fallback;

    const response = NextResponse.json({ institutions: data }, { status: 200 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return fallback;
  }
}
