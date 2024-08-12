"use server";

import { platforms as allPlatforms } from "@/data/platforms";
import { aboutYouRegex, nameRegex } from "@/utils/regex";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// UPDATE PROFILE //
export async function updateProfile(formData) {
  const supabase = createClient();

  // Retrieve form data
  const image = formData.get("picture");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const about = formData.get("about").slice(0, 125);

  // Validate data
  if (!nameRegex.test(firstName)) {
    return { ok: false, message: "Invalid First Name" };
  }
  if (!nameRegex.test(lastName)) {
    return { ok: false, message: "Invalid Last Name" };
  }
  if (!aboutYouRegex.test(about)) {
    return { ok: false, message: "Invalid Bio" };
  }
  if (image.size > 750000) {
    return { ok: false, message: "The image is too large" };
  }
  if (image.type.split("/")[0] !== "image" && image.size !== 0) {
    return { ok: false, message: "Wrong image format" };
  }

  // Update metadata
  const { data, error } = await supabase.auth.updateUser({
    data: { firstName, lastName, about },
  });
  // Failed to update metadata
  if (error) {
    return {
      ok: false,
      message: "Unable to update your profile details. Please try again.",
    };
  }

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
    // Failed to upload the new image
    if (imgError) {
      return {
        ok: false,
        message: "Failed to upload the image. Please try again.",
      };
    }

    // Update user's data with new image path
    const { error: storePathError } = await supabase.auth.updateUser({
      data: { image: imgData.path },
    });
    // Failed to update user's data
    if (storePathError) {
      return {
        ok: false,
        message: "Failed to upload the image. Please try again.",
      };
    }
  }

  // Revalidate the page with new data
  revalidatePath("/edit/profile");

  // Send Response
  return { ok: true, message: "Your changes have been successfully saved!" };
}

// UPDATE LINKS //
export async function updateLinks(formData) {
  const supabase = createClient();

  // Pre-data
  const platforms = allPlatforms.map(({ platform }) => platform);
  const domains = allPlatforms.map(({ domains }) => domains);
  const protocol = "https://";

  // Retrieve sorted reference
  const sorted = formData.get("sorted").split(",");

  // Prepare data
  const unsortedLinks = platforms.reduce((acc, platform, index) => {
    const input = formData.get(platform);

    if (input === null) return acc;
    if (input === "") return acc;

    // If 'Website', return whatever value with https:// prefix
    if (formData.has(platform) && platform === "Website") {
      const trimmedInput = input.replaceAll(" ", "");

      const link = (
        trimmedInput.startsWith("https://")
          ? trimmedInput
          : "https://" + trimmedInput
      ).slice(0, 50);

      acc.push(`${platform}%${link}`);
      return acc;
    }

    // Check input domain
    const domain = domains[index].find((domain) => input.includes(domain));

    // If not valid domain, pass a INVALID flag
    if (!domain) {
      acc.push(`INVALID${platform}`);
      return acc;
    }

    // Create the url
    const userPath = input.split(domain)[1].replaceAll(" ", "").slice(0, 50);
    const link = `${platform}%${protocol}${domain}${userPath}`;
    acc.push(link);

    return acc;
  }, []);

  // Check if INVALID flag
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
  const { error } = await supabase.auth.updateUser({ data: { links } });

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
