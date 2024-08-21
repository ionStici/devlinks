import { logOut } from "@/actions/auth";
import { getUserData } from "@/actions/getUserData";
import { updateProfile } from "@/actions/updateProfile";
import Buttons from "@/components/edit/Buttons";
import Footer from "@/components/edit/Footer";
import Heading from "@/components/edit/Heading";
import ProfileInput from "@/components/edit/ProfileInput";
import UploadPicture from "@/components/edit/UploadPicture";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Your Profile",
  description:
    "Customize your devlinks profile by adding a profile picture, updating your name, and sharing more about yourself. View a live preview of your profile as you make changes.",
};

export default async function Page() {
  const { username, name, about, image } = await getUserData();

  return (
    <>
      <Heading
        title="Profile Details"
        text="Add your details to create a personal touch to your profile."
      />
      <form className="flex flex-col flex-grow">
        <UploadPicture img={image} />
        <div className="flex flex-col gap-3 mx-6 md:mx-10 p-5 bg-light_grey rounded-xl">
          <ProfileInput
            type="text"
            name="username"
            label="Username"
            value={username}
            placeholder="e.g. code-wizard"
          />
          <ProfileInput
            type="text"
            name="name"
            label="Full Name"
            value={name}
            placeholder="e.g. Harry Potter"
          />
          <ProfileInput
            type="text"
            name="about"
            label="About You"
            value={about}
            placeholder="e.g. Wizard by profession"
          />
        </div>
        <Footer>
          <Buttons action={updateProfile} logOutAction={logOut} />
        </Footer>
      </form>
    </>
  );
}
