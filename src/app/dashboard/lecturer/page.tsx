import { redirect } from "next/navigation";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { LecturerDashboard } from "@/components/lecturer-dashboard/LecturerDashboard";

export const dynamic = "force-dynamic";

export default async function LecturerDashboardPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.user_metadata?.role !== "lecturer") {
    redirect("/dashboard");
  }

  return <LecturerDashboard />;
}
