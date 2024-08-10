"use server";

import { redirect } from "next/navigation";
import { usernameRegex, passwordRegex } from "@/utils/regex";
import { createClient } from "@/supabase/server";

// Login
export async function login(formData) {
  const supabase = createClient();

  const username = formData.get("username");
  const password = formData.get("password");

  if (!usernameRegex.test(username)) throw new Error("Invalid Username");
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");

  const newUser = { email: `/@${username}`, password };

  const { error } = await supabase.auth.signInWithPassword(newUser);
  if (error) throw new Error(error.message);

  redirect("/edit/profile");
}

// Sign Up
export async function signUp(formData) {
  const supabase = createClient();

  const username = formData.get("username");
  const password = formData.get("new-password");
  const repeatPassword = formData.get("repeat-password");

  if (!usernameRegex.test(username)) throw new Error("Invalid Username");
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");
  if (password !== repeatPassword) throw new Error("Passwords do not match");

  const userData = { email: `/@${username}`, password };

  const { error } = await supabase.auth.signUp(userData);
  if (error) throw new Error(error.message);

  await supabase.auth.updateUser({
    data: { firstName: "", lastName: "", about: "", image: "", links: [] },
  });

  redirect("/edit/profile");
}

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

// Reset Password
export async function resetPassword(formData) {
  const supabase = createClient();

  const password = formData.get("current-password");
  const newPassword = formData.get("new-password");

  if (!passwordRegex.test(password)) throw new Error("Invalid Password");
  if (!passwordRegex.test(newPassword)) throw new Error("Invalid New Password");

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  redirect("/edit/profile");
}

// Delete Account
export async function deleteAccount(formData) {
  const supabase = createClient();

  const password = formData.get("current-password");
}
