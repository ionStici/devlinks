"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Log Out
export async function logOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect("/auth/login");
}

// Get User
export async function getUser() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return data?.user;
}
