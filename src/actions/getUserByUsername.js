"use server";

import { supabase } from "@/utils/supabase/admin";

export async function getUserByUsername(paramUsername, perPage = 1000) {
  const { data: listOfUsers, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: perPage,
  });

  if (error)
    return {
      ok: false,
      message: "Failed to load the user data",
    };

  const user = listOfUsers.users.find((user) => {
    return user.email.split("@")[1] === paramUsername;
  });

  return user;
}
