"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { platformsRegex } from "@/utils/regex";

// prettier-ignore
const platforms = ["GitHub", "Frontend Mentor", "Twitter", "LinkedIn", "YouTube", "Facebook", "Twitch", "Dev.to", "Codewars", "Codepen", "freeCodeCamp", "GitLab", "Hashnode", "Stack Overflow", ];

export async function updateLinks(formData) {
  const supabase = createClient();

  const links = platforms.reduce((acc, platform) => {
    const url = formData.get(platform);
    if (url) acc.push(`${platform}%${url}`);
    return acc;
  }, []);

  const { error } = await supabase.auth.updateUser({
    data: { links },
  });

  if (error) throw new Error(error.message);

  revalidatePath("edit/links");
}
