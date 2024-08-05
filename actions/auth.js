"use server";

// await new Promise((res) => setTimeout(res, 2500));

import { supabase } from "@/supabase";
import { redirect } from "next/navigation";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{8,64}$/;

// Sign Up
export async function signUp(formData) {
  const email = formData.get("email");
  const password = formData.get("new-password");
  const repeatPassword = formData.get("repeat-password");

  if (!emailRegex.test(email)) throw new Error("Invalid Email");
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");
  if (password !== repeatPassword) throw new Error("Passwords do not match");

  const userData = { email, password };

  const { data, error } = await supabase.auth.signUp(userData);

  if (error) throw new Error(error.message);

  redirect("/profile");
}

// Login
export async function login(formData) {
  // await new Promise((res) => setTimeout(res, 2500));

  const email = formData.get("email");
  const password = formData.get("password");

  if (!emailRegex.test(email)) throw new Error("Invalid Email");
  if (!passwordRegex.test(password)) throw new Error("Invalid Password");

  const userData = { email, password };

  const { data, error } = await supabase.auth.signInWithPassword(userData);

  if (error) throw new Error(error.message);

  redirect("/profile");
}

// Log Out
export async function logOut() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  redirect("/auth/login");
}
