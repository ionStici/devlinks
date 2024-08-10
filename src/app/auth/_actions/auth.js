"use server";

import { redirect } from "next/navigation";
import { usernameRegex, passwordRegex } from "@/utils/regex";
import { createClient } from "@/supabase/server";
import { adminAuthClient } from "@/supabase/admin";

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

  // Retrieve form data
  const username = formData.get("username");
  const password = formData.get("current-password");
  const newPassword = formData.get("new-password");

  // Check data validity
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");
  if (!passwordRegex.test(newPassword)) throw new Error("Invalid New Password");

  // Check if password is correct
  const { error: checkError } = await supabase.auth.signInWithPassword({
    email: username,
    password,
  });
  if (checkError) throw new Error("Incorrect Password");

  // Reset Password
  const { error: resetError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (resetError) throw new Error(resetError.message);

  console.log(username);

  redirect("/edit/profile");
}

// Delete Account
export async function deleteAccount(formData) {
  const supabase = createClient();

  // Retrieve form data
  const password = formData.get("current-password");
  const userId = formData.get("user-id");

  // Check if user is logged in
  const user = await getUser();
  if (!user) throw new Error("You are logged out");

  // Prepare data
  const userData = { email: user.email, password };

  // Check if password is correct
  const { error } = await supabase.auth.signInWithPassword(userData);
  if (error) throw new Error("Incorrect Password");

  // Delete user
  const { error: deleteError } = await adminAuthClient.deleteUser(userId);
  if (deleteError) throw new Error(deleteError.message);

  console.log(user.email);

  // Redirect
  redirect("/auth/login");
}
