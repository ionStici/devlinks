import { getUser } from "@/app/edit/_actions/auth";
import Heading from "@/app/edit/_components/Heading";
import LinksForm from "../_components/LinksForm";

// d
export const metadata = { title: "Add Links" };

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
