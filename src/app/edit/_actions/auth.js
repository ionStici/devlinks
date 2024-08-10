"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Log Out
export async function logOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  redirect("/auth/login");
}

// Get User
export async function getUser() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return data?.user;
}
