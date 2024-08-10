import { redirect } from "next/navigation";
import { changePassword, getUser } from "../_actions/auth";
import Footer from "../_components/Footer";
import Form from "../_components/Form";
import Header from "../_components/Header";
import Input from "../_components/Input";
import Layout from "../_components/Layout";

export const metadata = {
  title: "Change Your Password",
  description: "Change your devlinks password.",
};

export default async function Page() {
  const user = await getUser();
  if (!user) redirect("/auth/login");

  return (
    <Layout>
      <Header
        heading="Change Password"
        content="Securely change your devlinks password."
      />
      <Form action={changePassword} btnText="Change Password">
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
      </Form>
      <Footer
        content="Changed your mind?"
        btnText={`${user.email.slice(1)}`}
        href={user.email}
      />
    </Layout>
  );
}
