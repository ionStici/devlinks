"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { emailRegex, nameRegex } from "@/utils/regex";

// // // // // // // // // // // // // // // // // // // //

async function deleteImage(path) {
  const supabase = createClient();

  const { error } = await supabase.storage.from("avatars").remove([path]);

  if (error) throw new Error(error.message);
}

// // // // // // // // // // // // // // // // // // // //

export async function updateProfile(formData) {
  const supabase = createClient();

  const image = formData.get("picture");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");

  if (!emailRegex.test(email)) throw new Error("Invalid Email");
  if (!nameRegex.test(firstName)) throw new Error("Invalid First Name");
  if (!nameRegex.test(lastName)) throw new Error("Invalid Last Name");
  if (image.size > 750000) throw new Error("The image is too large");
  if (image.type.split("/")[0] !== "image" && image.size !== 0) {
    throw new Error("Wrong image format");
  }

  return;

  const { data, error } = await supabase.auth.updateUser({
    email,
    data: { firstName, lastName },
  });

  if (error) throw new Error(error.message);

  const { user } = data;
  const currentImage = data.user.user_metadata.image;
  if (image && currentImage) await deleteImage(currentImage);

  if (image) {
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(user.email.split("@")[0], image, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) throw new Error(error.message);

    await supabase.auth.updateUser({
      data: { image: data.path },
    });
  }

  revalidatePath("/edit/profile");
}

// // // // // // // // // // // // // // // // // // // //
