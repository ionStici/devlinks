"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateProfile(formData) {
  const supabase = createClient();

  const image = formData.get("picture");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");

  console.log(image, firstName, lastName, email);

  const { data, error } = await supabase.auth.updateUser({
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
