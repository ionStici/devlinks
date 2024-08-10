import { redirect } from "next/navigation";
import { deleteAccount, getUser } from "../_actions/auth";
import Footer from "../_components/Footer";
import Form from "../_components/Form";
import Header from "../_components/Header";
import Input from "../_components/Input";

export const metadata = {
  title: "Delete Your Account",
  description:
    "Permanently delete your devlinks account. This action is irreversible, and all your data will be removed. Make sure you want to proceed before confirming.",
};

export default async function Page() {
  const user = await getUser();
  if (!user) redirect("/auth/login");

  return (
    <>
      <Header
        heading="Delete Your Account"
        content="This action is permanent and cannot be undone. Please confirm if you want to proceed."
      />
      <Form action={deleteAccount} btnText="Delete Account">
        <Input
          label="Current Password"
          type="password"
          name="current-password"
          placeholder="Confirm password to continue"
          autofill="current-password"
        />
        <input type="hidden" name="user-id" value={user.id} />
      </Form>
      <Footer
        username={user.email.slice(1)}
        content="account will be permanently deleted."
      />
    </>
  );
}
