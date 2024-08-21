"use server";

import { createClient } from "@/utils/supabase/server";
import { platforms as allPlatforms } from "@/data/platforms";
import { revalidatePath } from "next/cache";
import { getUserId } from "./getUserId";

// // // // // UPDATE LINKS // // // // //
export async function updateLinks(formData: FormData) {
  const supabase = createClient();

  // Pre-data
  const platforms = allPlatforms.map(({ platform }) => platform);
  const domains = allPlatforms.map(({ domains }) => domains);
  const protocol = "https://";

  // Retrieve sorted reference
  const sorted = String(formData.get("sorted")).split(",");

  // Prepare data
  const unsortedLinks = platforms.reduce((acc: string[], platform, index) => {
    const input = formData.get(platform) as string;

    if (input === null || input === "") return acc;

    // If 'Website', return whatever value with https:// prefix
    if (formData.has(platform) && platform === "Website") {
      const trimmedInput = input.replaceAll(" ", "").toLowerCase();

      const link = (
        trimmedInput.startsWith("https://")
          ? trimmedInput
          : "https://" + trimmedInput
      ).slice(0, 50);

      acc.push(`${platform}%${link}`);
      return acc;
    }

    // Check input domain
    const domain = domains[index].find((domain) =>
      input.toLowerCase().includes(domain)
    );

    // If not valid domain, pass a "INVALID" flag
    if (!domain) {
      acc.push(`INVALID${platform}`);
      return acc;
    }

    // Create the url
    const userPath = input
      .toLowerCase()
      .split(domain)[1]
      .replaceAll(" ", "")
      .slice(0, 50);

    const link = `${platform}%${protocol}${domain}${userPath}`;
    acc.push(link);

    return acc;
  }, []);

  // Check for "INVALID" flags
  const invalidLink = unsortedLinks
    .find((link) => link.startsWith("INVALID"))
    ?.split("INVALID")[1];

  // Return if data contain invalid links
  if (invalidLink) {
    return { ok: false, message: `Invalid URL for ${invalidLink}` };
  }

  // Sort the array
  const links = unsortedLinks.sort((a, b) => {
    return sorted.indexOf(a.split("%")[0]) - sorted.indexOf(b.split("%")[0]);
  });

  // Update the user with new links
  const userId = await getUserId();

  const { error } = await supabase
    .from("usersData")
    .update({ links })
    .eq("userId", userId);

  // Failed to Update
  if (error) {
    return {
      ok: false,
      message: "Failed to save your links. Please try again.",
    };
  }

  // Revalidate the page with new data
  revalidatePath("/edit/links");

  // Send Response
  return { ok: true, message: "Your changes have been successfully saved!" };
}
