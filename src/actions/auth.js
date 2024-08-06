"use server";

// await new Promise((res) => setTimeout(res, 2500));

import { redirect } from "next/navigation";
import { emailRegex, passwordRegex } from "@/utils/regex";
import { createClient } from "@/utils/supabase/server";

// Login
export async function login(formData) {
  const supabase = createClient();

  const email = formData.get("email");
  const password = formData.get("password");
  const userData = { email, password };

  if (!emailRegex.test(email)) throw new Error("Invalid Email");
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");

  const { error } = await supabase.auth.signInWithPassword(userData);
  if (error) throw new Error(error.message);

  redirect("/edit/profile");
}

// Sign Up
export async function signUp(formData) {
  const supabase = createClient();

  const email = formData.get("email");
  const password = formData.get("new-password");
  const repeatPassword = formData.get("repeat-password");
  const userData = { email, password };

  if (!emailRegex.test(email)) throw new Error("Invalid Email");
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");
  if (password !== repeatPassword) throw new Error("Passwords do not match");

  const { data, error } = await supabase.auth.signUp(userData);
  if (error) throw new Error(error.message);

  const { data: updatedData } = await supabase.auth.updateUser({
    data: { firstName: "", lastName: "", image: "" },
  });

  console.log(updatedData);

  redirect("/edit/profile");
}

// Log Out
export async function logOut() {
  const supabase = createClient();

  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  redirect("/auth/login");
}

// Get User
export async function getUser() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return data?.user;
}
