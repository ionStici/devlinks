"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { emailRegex, nameRegex } from "@/utils/regex";

export async function updateProfile(formData) {
  const supabase = createClient();

  // Prepare data
  const image = formData.get("picture");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email").slice(0, 150);

  // Input validation
  // if (!emailRegex.test(email)) throw new Error("Invalid Email");
  if (!nameRegex.test(firstName)) throw new Error("Invalid First Name");
  if (!nameRegex.test(lastName)) throw new Error("Invalid Last Name");
  if (image.size > 750000) throw new Error("The image is too large");
  if (image.type.split("/")[0] !== "image" && image.size !== 0) {
    throw new Error("Wrong image format");
  }

  // Update metadata
  const { data, error } = await supabase.auth.updateUser({
    data: { email, firstName, lastName },
  });

  if (error) throw new Error(error.message);

  // Upload Image
  const currentImage = data.user.user_metadata.image;
  if (image.size > 0 && currentImage) {
    await supabase.storage.from("avatars").remove([currentImage]);
  }

  if (image.size > 0) {
    const imageName = `${Math.random()}-${image.name}`
      .replace("/", "")
      .slice(2);

    const { data: imgData, error: imgError } = await supabase.storage
      .from("avatars")
      .upload(imageName, image, { cacheControl: "3600", upsert: false });

    if (imgError) throw new Error(imgError.message);

    const { error: storePathError } = await supabase.auth.updateUser({
      data: { image: imgData.path },
    });

    if (storePathError) throw new Error(storePathError.message);
  }

  // Revalidate Path
  revalidatePath("/edit/profile");
}
