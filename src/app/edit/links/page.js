import { getUser } from "@/actions/auth";
import AddLinkButton from "@/components/links/AddLinkButton";
import Form from "@/components/links/Form";
import GetStarted from "@/components/links/GetStarted";
import Heading from "@/components/ui/Heading";

export const metadata = { title: "Add Links" };

export default async function Page() {
  const { user_metadata: data } = await getUser();

  return (
    <section className="flex flex-col lg:min-h-[834px] max-w-[808px] mx-auto pt-6 pb-4 md:pt-10 md:pb-6 rounded-xl shadow-section bg-white flex-grow">
      <Heading
        title="Customize your links"
        text="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <AddLinkButton />
      {/* <GetStarted /> */}
      <Form links={data.links} />
    </section>
  );
}
