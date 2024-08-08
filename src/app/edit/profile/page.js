import { getUser } from "@/actions/auth";
import { updateProfile } from "@/actions/updateProfile";
import Heading from "@/components/edit/Heading";
import SaveButton from "@/components/edit/SaveButton";
import Inputs from "@/components/profile/Inputs";
import UploadPicture from "@/components/profile/UploadPicture";

export const metadata = { title: "Profile Details" };

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <Heading
        title="Profile Details"
        text="Add your details to create a personal touch to your profile."
      />
      <form action={updateProfile} className="flex flex-col flex-grow">
        <UploadPicture img={user.user_metadata.image} />
        <Inputs data={user.user_metadata} />
        <SaveButton />
      </form>
    </>
  );
}
