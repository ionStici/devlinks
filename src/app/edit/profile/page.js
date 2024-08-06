import { updateProfile } from "@/actions/profile";
import Button from "@/components/profile/Button";
import Heading from "@/components/profile/Heading";
import Inputs from "@/components/profile/Inputs";
import UploadPicture from "@/components/profile/UploadPicture";

import { getUser } from "@/actions/auth";

export default async function Page() {
  const user = await getUser();

  return (
    <section className="shadow-section max-w-[808px] mx-auto bg-white rounded-xl pt-6 pb-4 md:pt-10 md:pb-6 flex-grow">
      <Heading />
      <form action={updateProfile}>
        <UploadPicture />
        <Inputs user={user} />
        <div className="border-b border-borders mt-6 mb-4" />
        <Button>Save</Button>
      </form>
    </section>
  );
}
