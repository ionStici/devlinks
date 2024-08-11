"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { platforms as allPlatforms } from "@/data/platforms";

const platforms = allPlatforms.map(({ platform }) => platform);
const domains = allPlatforms.map(({ domains }) => domains);
const protocol = "https://";

export async function updateLinks(formData) {
  const supabase = createClient();

  // Retrieve sorted reference
  const sorted = formData.get("sorted").split(",");

  // Prepare data
  const unsortedLinks = platforms.reduce((acc, platform, index) => {
    const input = formData.get(platform);

    if (input === null) return acc;
    if (input === "") return acc;

    // If 'Website', return whatever value
    if (formData.has(platform) && platform === "Website") {
      acc.push(`${platform}%${input}`);
      return acc;
    }

    // Check input domain
    const domain = domains[index].find((domain) => input.includes(domain));

    // Validate input
    if (!domain) throw new Error(`Invalid URL for ${platform}`);

    // Create the url
    const userPath = input.split(domain)[1];
    const link = `${platform}%${protocol}${domain}${userPath}`;
    acc.push(link);

    return acc;
  }, []);

  // Sort the array
  const links = unsortedLinks.sort((a, b) => {
    return sorted.indexOf(a.split("%")[0]) - sorted.indexOf(b.split("%")[0]);
  });

  // Update the user with new links
  const { error } = await supabase.auth.updateUser({ data: { links } });
  if (error) throw new Error(error.message);

  // Revalidate the page with new data
  revalidatePath("/edit/links");
}
