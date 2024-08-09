"use server";

import { adminAuthClient } from "@/utils/supabase/admin";

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
