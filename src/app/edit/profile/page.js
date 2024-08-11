import { getUser } from "@/app/edit/_actions/auth";
import { updateProfile } from "@/app/edit/_actions/updateProfile";
import Heading from "@/app/edit/_components/Heading";
import SaveButton from "@/app/edit/_components/SaveButton";
import UploadPicture from "@/app/edit/_components/UploadPicture";
import ProfileInput from "../_components/ProfileInput";

export const metadata = {
  title: "Edit Your Profile",
  description:
    "Customize your devlinks profile by adding a profile picture, updating your name, and sharing more about yourself. View a live preview of your profile as you make changes.",
};

export default async function Page() {
  const user = await getUser();
  const { firstName, lastName, about } = user.user_metadata;

  return (
    <>
      <Heading
        title="Profile Details"
        text="Add your details to create a personal touch to your profile."
      />
      <form action={updateProfile} className="flex flex-col flex-grow">
        <UploadPicture img={user.user_metadata.image} />
        <div className="flex flex-col gap-3 mx-6 md:mx-10 p-5 bg-light_grey rounded-xl">
          <ProfileInput
            type="text"
            name="firstName"
            label="First Name"
            value={firstName}
            placeholder="e.g. John"
          />
          <ProfileInput
            type="text"
            name="lastName"
            label="Last Name"
            value={lastName}
            placeholder="e.g. Appleseed"
          />
          <ProfileInput
            type="text"
            name="about"
            label="About You"
            value={about}
            placeholder="e.g. Web Developer"
          />
        </div>
        <SaveButton />
      </form>
    </>
  );
}
