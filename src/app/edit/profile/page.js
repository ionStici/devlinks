import Heading from "@/components/profile/Heading";
import UploadPicture from "@/components/profile/UploadPicture";
import Inputs from "@/components/profile/Inputs";
import Button from "@/components/profile/Button";

import { updateProfile } from "@/actions/updateProfile";
import { getUser } from "@/actions/auth";

export const metadata = { title: "Profile Details" };

export default async function Page() {
  const user = await getUser();

  return (
    <section className="flex flex-col max-w-[808px] md:h-[834px] mx-auto rounded-xl pt-6 pb-4 md:pt-10 md:pb-6 flex-grow shadow-section bg-white">
      <Heading />
      <form action={updateProfile} className="flex flex-col flex-grow">
        <UploadPicture img={user.user_metadata.image} />
        <Inputs data={user.user_metadata} />
        <Button>Save</Button>
      </form>
    </section>
  );
}
