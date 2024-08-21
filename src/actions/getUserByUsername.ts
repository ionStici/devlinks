import { createClient } from "@/utils/supabase/server";

import { type userData } from "@/types/types";

export async function getUserByUsername(username: string): Promise<userData> {
  const supabase = createClient();

  const { data } = await supabase
    .from("usersData")
    .select("*")
    .eq("username", username)
    .single();

  return data;
}
