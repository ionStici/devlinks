"use server";

import { redirect } from "next/navigation";
import { usernameRegex, passwordRegex } from "@/utils/regex";
import { createClient } from "@/utils/supabase/server";
import { adminAuthClient } from "@/utils/supabase/admin";

// LOGIN //
export async function login(formData) {
  const supabase = createClient();

  // Retrieve form data
  const username = formData.get("username");
  const password = formData.get("password");

  // Validate data
  if (!usernameRegex.test(username)) throw new Error("Invalid Username");
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");

  // Prepare data
  const newUser = { email: `/@${username}`, password };

  // Perform login
  const { error } = await supabase.auth.signInWithPassword(newUser);
  if (error) throw new Error("Invalid Login Credentials");

  // Redirect to profile
  redirect("/edit/profile");
}

// SIGN UP //
export async function signUp(formData) {
  const supabase = createClient();

  // Retrieve form data
  const username = formData.get("username");
  const password = formData.get("new-password");
  const repeatPassword = formData.get("repeat-password");

  // Validate data
  if (!usernameRegex.test(username)) throw new Error("Invalid Username");
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");
  if (password !== repeatPassword) throw new Error("Passwords do not match");

  // Prepare data
  const userData = { email: `/@${username}`, password };

  // Perform signup
  const { error } = await supabase.auth.signUp(userData);
  if (error) throw new Error("Sign up unsuccessful. Please try again later.");

  // Add initial user data
  await supabase.auth.updateUser({
    data: { firstName: "", lastName: "", about: "", image: "", links: [] },
  });

  // Redirect to profile
  redirect("/edit/profile");
}

// GET USER //
export async function getUser() {
  const supabase = createClient();

  // Get the current logged in user
  const { data } = await supabase.auth.getUser();

  // Return user if logged in, otherwise null
  return data?.user;
}

// CHANGE PASSWORD //
export async function changePassword(formData) {
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

  // Change Password
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) {
    throw new Error("Unable to change your password. Please try again.");
  }

  // Redirect to profile
  redirect("/edit/profile");
}

// DELETE ACCOUNT //
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
  if (deleteError) {
    throw new Error("Account deletion failed. Please try again later.");
  }

  // Redirect to login page
  redirect("/auth/login");
}
