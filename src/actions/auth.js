"use server";

import { passwordRegex, usernameRegex } from "@/utils/regex";
import { supabase as supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// LOGIN //
export async function login(formData) {
  const supabase = createClient();

  // Retrieve form data
  const username = formData.get("username");
  const password = formData.get("password");

  // Validate data
  if (!usernameRegex.test(username)) {
    return { ok: false, message: "Invalid Username" };
  }
  if (!passwordRegex.test(password)) {
    return { ok: false, message: "Invalid Password" };
  }

  // Prepare data
  const newUser = { email: `/@${username}`, password };

  // Perform login
  const { error } = await supabase.auth.signInWithPassword(newUser);

  // Login Failed
  if (error) return { ok: false, message: "Invalid Login Credentials" };

  // Login Successful
  if (!error) {
    return {
      ok: true,
      message: "Welcome back! You've successfully logged in.",
    };
  }
}

// SIGN UP //
export async function signUp(formData) {
  const supabase = createClient();

  // Retrieve form data
  const username = formData.get("username");
  const password = formData.get("new-password");
  const repeatPassword = formData.get("repeat-password");

  // Validate data
  if (!usernameRegex.test(username)) {
    return { ok: false, message: "Invalid Username" };
  }
  if (!passwordRegex.test(password)) {
    return { ok: false, message: "Invalid Password" };
  }
  if (password !== repeatPassword) {
    return { ok: false, message: "Passwords do not match" };
  }

  // Prepare data
  const userData = { email: `/@${username}`, password };

  // Perform signup
  const { error } = await supabase.auth.signUp(userData);

  // Signup Failed
  if (error) {
    return {
      ok: false,
      message: "Sign up unsuccessful. Please try again later.",
    };
  }

  // Add initial user data
  await supabase.auth.updateUser({
    data: { firstName: "", lastName: "", about: "", image: "", links: [] },
  });

  // Signup Successful
  if (!error) {
    return {
      ok: true,
      message: "Account created successfully! Welcome to devlinks.",
    };
  }
}

// GET USER //
export async function getUser() {
  const supabase = createClient();

  // Get the current logged in user
  const { data } = await supabase.auth.getUser();

  // Return user if logged in, otherwise null
  return data?.user;
}

// LOG OUT //
export async function logOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (!error) redirect("/auth/login");
}

// CHANGE PASSWORD //
export async function changePassword(formData) {
  const supabase = createClient();

  // Retrieve form data
  const username = formData.get("username");
  const password = formData.get("current-password");
  const newPassword = formData.get("new-password");

  // Validate data
  if (!passwordRegex.test(password)) {
    return { ok: false, message: "Invalid Current Password" };
  }
  if (!passwordRegex.test(newPassword)) {
    return { ok: false, message: "Invalid New Password" };
  }

  // Check if password is correct
  const { error: checkError } = await supabase.auth.signInWithPassword({
    email: username,
    password,
  });

  // Failed to authenticate
  if (checkError) {
    return { ok: false, message: "Incorrect Password" };
  }

  // Change Password
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  // Failed to change password
  if (error) {
    return {
      ok: false,
      message: "Unable to change your password. Please try again.",
    };
  }

  // Change Successful
  if (!error) {
    return { ok: true, message: "Password updated successfully!" };
  }
}

// DELETE ACCOUNT //
export async function deleteAccount(formData) {
  const supabase = createClient();

  // Retrieve form data
  const password = formData.get("current-password");
  const userId = formData.get("user-id");

  // Check if user is logged in
  const user = await getUser();
  if (!user) {
    return { ok: false, message: "You are logged out." };
  }

  // Prepare data
  const userData = { email: user.email, password };

  // Check if password is correct
  const { error } = await supabase.auth.signInWithPassword(userData);

  // Incorrect Password
  if (error) {
    return { ok: false, message: "Incorrect Password" };
  }

  // Delete user
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    userId
  );

  // Deletion failed
  if (deleteError) {
    return {
      ok: false,
      message: "Account deletion failed. Please try again later.",
    };
  }

  // Deletion successful
  if (!deleteError) {
    return {
      ok: true,
      message: "Your account has been deleted. We're sad to see you go.",
    };
  }
}
