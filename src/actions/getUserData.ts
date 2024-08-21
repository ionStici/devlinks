"use server";

import { type userData } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { getUserId } from "./getUserId";

export async function getUserData(): Promise<userData> {
  const supabase = createClient();

  const userId = await getUserId();

  const { data } = await supabase
    .from("usersData")
    .select("*")
    .eq("userId", userId)
    .single();

  return data;
}
