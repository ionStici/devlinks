"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUserId(): Promise<string> {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return data.user!.id;
}
