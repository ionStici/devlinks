"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { platformsRegex } from "@/utils/regex";

// prettier-ignore
const platforms = ["GitHub", "Frontend Mentor", "Twitter", "LinkedIn", "YouTube", "Facebook", "Twitch", "Dev.to", "Codewars", "Codepen", "freeCodeCamp", "GitLab", "Hashnode", "Stack Overflow", ];

export async function updateLinks(formData) {
  const supabase = createClient();

  const newOrder = formData.get("order").split(",");

  const links = platforms
    .reduce((acc, platform, index) => {
      const url = formData.get(platform);

      if (formData.has(platform)) {
        if (!platformsRegex[index].test(url))
          throw new Error(`Invalid URL for ${platform}`);
      }

      if (url) acc.push(`${platform}%${url}`);
      return acc;
    }, [])
    .sort((a, b) => {
      return (
        newOrder.indexOf(a.split("%")[0]) - newOrder.indexOf(b.split("%")[0])
      );
    });

  const { error } = await supabase.auth.updateUser({
    data: { links },
  });

  if (error) throw new Error(error.message);

  revalidatePath("edit/links");
}
