import { changePassword, getUser } from "../../../actions/auth";
import Button from "../_components/Button";
import Footer from "../_components/Footer";
import GoBackLink from "../_components/GoBackLink";
import Header from "../_components/Header";
import Input from "../_components/Input";
import Layout from "../_components/Layout";

export const metadata = {
  title: "Change Your Password",
  description: "Change your devlinks password.",
};

export default async function Page() {
  const user = await getUser();

  return (
    <Layout>
      <GoBackLink />
      <Header
        heading="Change Password"
        content="Securely change your devlinks password."
      />
      <form className="flex flex-col gap-6 mb-6">
        <Input
          label="Current Password"
          type="password"
          name="current-password"
          placeholder="Confirm your current password"
          autofill="current-password"
        />
        <Input
          label="New Password"
          type="password"
          name="new-password"
          placeholder="At least 8 characters"
          autofill="new-password"
        />
        <input type="hidden" name="username" value={user.email} />
        <Button action={changePassword} pendingText="Changing...">
          Change Password
        </Button>
      </form>
      <Footer
        content="Changed your mind?"
        btnText={`${user.email.slice(1)}`}
        href={user.email}
      />
    </Layout>
  );
}
