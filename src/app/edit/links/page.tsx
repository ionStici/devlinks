import { getUserData } from "@/actions/getUserData";
import Heading from "@/components/edit/Heading";
import LinksForm from "@/components/edit/LinksForm";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Your Social Links",
  description:
    "Manage the social platforms linked to your devlinks profile. Add or edit URLs to showcase your GitHub, LinkedIn, and other accounts. Instantly preview how your profile will look to others.",
};

export default async function Page() {
  const { links } = await getUserData();

  return (
    <>
      <Heading
        title="Customize your links"
        text="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <LinksForm links={links} />
    </>
  );
}
