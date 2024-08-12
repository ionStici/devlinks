"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { aboutYouRegex, nameRegex } from "@/utils/regex";

export async function updateProfile(formData) {
  const supabase = createClient();

  // Prepare data
  const image = formData.get("picture");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const about = formData.get("about").slice(0, 125);

  // Input validation
  if (!nameRegex.test(firstName)) {
    return { status: "success", message: "Invalid First Name" };
  }

  if (!nameRegex.test(lastName)) throw new Error("Invalid Last Name");
  if (!aboutYouRegex.test(about)) throw new Error("Invalid Bio");
  if (image.size > 750000) throw new Error("The image is too large");
  if (image.type.split("/")[0] !== "image" && image.size !== 0) {
    throw new Error("Wrong image format");
  }

  // Update metadata
  const { data, error } = await supabase.auth.updateUser({
    data: { firstName, lastName, about },
  });
  if (error)
    throw new Error("Unable to update your profile details. Please try again.");

  // Delete current image from supabase bucket if: new image exists && the user already has image
  const currentImage = data.user.user_metadata.image;
  if (image.size > 0 && currentImage) {
    await supabase.storage.from("avatars").remove([currentImage]);
  }

  if (image.size > 0) {
    // Create new image name
    const imageName = `${Math.random()}-${image.name}`
      .replace("/", "")
      .slice(2);

    // Upload the new image to supabase bucket
    const { data: imgData, error: imgError } = await supabase.storage
      .from("avatars")
      .upload(imageName, image, { cacheControl: "3600", upsert: false });
    if (imgError)
      throw new Error("Failed to upload the image. Please try again.");

    // Update user's data with new image path
    const { error: storePathError } = await supabase.auth.updateUser({
      data: { image: imgData.path },
    });
    if (storePathError)
      throw new Error("Failed to upload the image. Please try again.");
  }

  // Revalidate Path
  revalidatePath("/edit/profile");
}
