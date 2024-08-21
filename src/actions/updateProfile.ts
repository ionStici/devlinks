"use server";

import { aboutYouRegex, nameRegex, usernameRegex } from "@/utils/regex";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getUserId } from "./getUserId";

// // // // // UPDATE PROFILE // // // // //
export async function updateProfile(formData: FormData) {
  const supabase = createClient();

  // Retrieve form data
  const image = formData.get("picture") as File;
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const about = String(formData.get("about")).slice(0, 125);

  // Validate data
  if (!usernameRegex.test(username)) {
    return { ok: false, message: "Invalid Username" };
  }
  if (!nameRegex.test(name)) {
    return { ok: false, message: "Invalid Name" };
  }
  if (!aboutYouRegex.test(about)) {
    return { ok: false, message: "Invalid Bio" };
  }
  if (image.size > 750000) {
    return { ok: false, message: "The image is too large" };
  }
  if (image.type.split("/")[0] !== "image" && image.size !== 0) {
    return { ok: false, message: "Wrong image format" };
  }

  // Update profile data
  const profileData = { username, name, about };

  const userId = await getUserId();

  const { data: updatedProfileData, error: updateError } = await supabase
    .from("usersData")
    .update(profileData)
    .eq("userId", userId)
    .select();

  // Failed to update profile data
  if (updateError) {
    return {
      ok: false,
      message: "Unable to update your profile details. Please try again.",
    };
  }

  // Delete current image from supabase bucket if: new image exists && the user already has image
  const currentImage = updatedProfileData[0].image;
  if (image.size > 0 && currentImage) {
    await supabase.storage.from("avatars").remove([currentImage]);
  }

  // If image exists:
  if (image.size > 0) {
    // Create new image name
    const imageName = `${Math.random()}-${image.name}`
      .replace("/", "")
      .slice(2);

    // Upload the new image to supabase bucket
    const { data: imgData, error: imgError } = await supabase.storage
      .from("avatars")
      .upload(imageName, image, { cacheControl: "3600", upsert: false });

    // Failed to upload the new image
    if (imgError) {
      return {
        ok: false,
        message: "Failed to upload the image. Please try again.",
      };
    }

    // Update user's profile data with new image path
    const { error: storeImgPathError } = await supabase
      .from("usersData")
      .update({ image: imgData.path })
      .eq("userId", userId);

    // Failed to update user's data
    if (storeImgPathError) {
      return {
        ok: false,
        message: "Failed to upload the image. Please try again.",
      };
    }
  }

  // Revalidate the page with new data
  revalidatePath("/edit/profile");

  // Send Response
  return { ok: true, message: "Your changes have been successfully saved!" };
}
