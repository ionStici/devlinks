"use server";

import { adminAuthClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export async function getUserByUsername(paramUsername, perPage = 1000) {
  const { data: listOfUsers, error } = await adminAuthClient.listUsers({
    page: 1,
    perPage: perPage,
  });

  if (error) throw new Error("Failed to load the user data");

  const user = listOfUsers.users.find((user) => {
    return user.email.split("@")[1] === paramUsername;
  });

  return user;
}

export async function getUser() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return data?.user;
}
