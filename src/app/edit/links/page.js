import { getUser } from "@/app/edit/_actions/auth";
import Heading from "@/app/edit/_components/Heading";
import LinksForm from "../_components/LinksForm";

export const metadata = {
  title: "Edit Your Social Links",
  description:
    "Manage the social platforms linked to your devlinks profile. Add or edit URLs to showcase your GitHub, LinkedIn, and other accounts. Instantly preview how your profile will look to others.",
};

export default async function Page() {
  const { user_metadata: data } = await getUser();

  return (
    <>
      <Heading
        title="Customize your links"
        text="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <LinksForm links={data.links} />
    </>
  );
}
