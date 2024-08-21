"use server";

import { emailRegex, passwordRegex } from "@/utils/regex";
import { supabase as supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

// // // // // LOGIN // // // // //
export async function login(
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  const supabase = createClient();

  // Retrieve form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate data
  if (!emailRegex.test(email)) {
    return { ok: false, message: "Invalid Email" };
  }
  if (!passwordRegex.test(password)) {
    return { ok: false, message: "Invalid Password" };
  }

  // Prepare data
  const userData = { email, password };

  // Perform login
  const { error } = await supabase.auth.signInWithPassword(userData);

  // Login failed
  if (error) return { ok: false, message: "Invalid Login Credentials" };

  // Login successful
  return { ok: true, message: "Welcome back! You've successfully logged in." };
}

// // // // // SIGN UP // // // // //
export async function signUp(
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  const supabase = createClient();

  // Retrieve form data
  const email = formData.get("email") as string;
  const password = formData.get("new-password") as string;
  const repeatPassword = formData.get("repeat-password") as string;
  const terms = formData.get("terms");

  // Validate data
  if (!emailRegex.test(email)) {
    return { ok: false, message: "Invalid Email" };
  }
  if (!passwordRegex.test(password)) {
    return { ok: false, message: "Invalid Password" };
  }
  if (password !== repeatPassword) {
    return { ok: false, message: "Passwords do not match" };
  }
  if (!(terms === "on")) {
    return {
      ok: false,
      message:
        "Please agree to the Terms and Conditions before creating your account.",
    };
  }

  // Prepare new user data
  const userData = { email, password };

  // Perform signup
  const {
    data: { user: newUser },
    error: singUpError,
  } = await supabase.auth.signUp(userData);

  // Signup Failed
  if (singUpError) {
    if (singUpError.code === "user_already_exists") {
      return {
        ok: false,
        message: "User already exists. Please try a different email address.",
      };
    }

    return {
      ok: false,
      message: "Sign up unsuccessful. Please try again later.",
    };
  }

  // Signup Successful & Add user row
  if (newUser) {
    await supabase
      .from("usersData")
      .insert([{ userId: newUser.id, username: newUser.id }]);
  }

  // Signup Successful
  return {
    ok: true,
    message: "Account created successfully! Welcome to devlinks.",
  };
}

// // // // // GET USER // // // // //
export async function getUser(): Promise<User | null> {
  const supabase = createClient();

  // Get the current logged in user
  const { data } = await supabase.auth.getUser();

  // Return user object if logged in, otherwise it will be null
  return data.user;
}

// // // // // LOG OUT // // // // //
export async function logOut(): Promise<void> {
  const supabase = createClient();

  // Perform log out
  const { error } = await supabase.auth.signOut();

  // If log out successful, redirect to /auth/login
  if (!error) redirect("/auth/login");
}

// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

// // // // // CHANGE PASSWORD // // // // //
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

// // // // // DELETE ACCOUNT // // // // //
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

  // Delete the user's profile picture
  if (user.user_metadata.image) {
    await supabase.storage.from("avatars").remove([user.user_metadata.image]);
  }

  // Deletion successful
  if (!deleteError) {
    return {
      ok: true,
      message: "Your account has been deleted. We're sad to see you go.",
    };
  }
}
