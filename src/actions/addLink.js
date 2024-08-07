"use server";

import { createClient } from "@/utils/supabase/server";

const platforms = [
  "GitHub",
  "Frontend Mentor",
  "Twitter",
  "LinkedIn",
  "YouTube",
  "Facebook",
  "Twitch",
  "Dev.to",
  "Codewars",
  "Codepen",
  "freeCodeCamp",
  "GitLab",
  "Hashnode",
  "Stack Overflow",
];

export async function addLink(formData) {
  const supabase = createClient();

  const links = platforms.reduce((acc, p) => {
    const url = formData.get(p);
    if (url) acc.push({ [`${p}`]: url });
    return acc;
  }, []);

  const { error } = await supabase.auth.updateUser({
    data: { links },
  });

  if (error) throw new Error(error.message);

  // const platform = formData.get("platform");
  // const url = formData.get("url");

  // const newLink = { platform, url };
  // console.log(newLink);
}
