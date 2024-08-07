import Heading from "@/components/ui/Heading";
import AddLinkButton from "@/components/links/AddLinkButton";
import GetStarted from "@/components/links/GetStarted";
import Button from "@/components/links/Button";
import { getUser } from "@/actions/auth";

export const metadata = { title: "Add Links" };

export default async function Page() {
  const { user_metadata: data } = await getUser();
  const { links } = data;

  return (
    <section className="flex flex-col lg:min-h-[834px] max-w-[808px] mx-auto pt-6 pb-4 md:pt-10 md:pb-6 rounded-xl shadow-section bg-white flex-grow">
      <Heading
        title="Customize your links"
        text="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <AddLinkButton />
      <GetStarted />
      <form className="mt-auto">
        <Button>Save</Button>
      </form>
    </section>
  );
}
