"use server";

import { createClient } from "@/utils/supabase/server";

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

  await deleteImage("avatar1.png");

  console.log(image);

  const { data, error: imgError } = await supabase.storage
    .from("avatars")
    .upload("avatar1.png", image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (imgError) throw new Error(error.message);

  console.log(data);

  //

  const { error } = await supabase.auth.updateUser({
    email,
    data: { firstName, lastName },
  });

  if (error) throw new Error(error.message);

  // const fileName = `${Date.now()}_${image.name}`;
  // const filePath = `uploads/${fileName}`;

  // const { data, error } = await supabase.storage
  //   .from("avatars")
  //   .upload(filePath, image, {
  //     cacheControl: "3600",
  //     upsert: false,
  //   });

  // if (error) throw new Error(error.message);

  // console.log(data);
}
