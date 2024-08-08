import { getUser } from "@/actions/auth";
import Heading from "@/components/edit/Heading";
import Form from "@/components/links/Form";

export const metadata = { title: "Add Links" };

export default async function Page() {
  const { user_metadata: data } = await getUser();

  return (
    <>
      <Heading
        title="Customize your links"
        text="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <Form links={data.links} />
    </>
  );
}
