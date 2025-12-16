import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    redirect("/beranda");
  } catch (error) {
    // If Supabase is not configured, redirect to login
    redirect("/login");
  }
}

