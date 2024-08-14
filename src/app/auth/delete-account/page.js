import { deleteAccount, getUser } from "../../../actions/auth";
import Button from "../_components/Button";
import Footer from "../_components/Footer";
import Form from "../_components/Form";
import GoBackLink from "../_components/GoBackLink";
import Header from "../_components/Header";
import Input from "../_components/Input";
import Layout from "../_components/Layout";

export const metadata = {
  title: "Delete Your Account",
  description:
    "Permanently delete your devlinks account. This action is irreversible, and all your data will be removed. Make sure you want to proceed before confirming.",
};

export default async function Page() {
  const user = await getUser();

  return (
    <Layout>
      <GoBackLink />
      <Header
        heading="Delete Your Account"
        content="This action is permanent and cannot be undone. Please confirm if you want to proceed."
      />
      <Form>
        <Input
          label="Current Password"
          type="password"
          name="current-password"
          placeholder="Confirm password to continue"
          autofill="current-password"
        />
        <input type="hidden" name="user-id" value={user?.id} />
        <Button action={deleteAccount} pendingText="Deleting...">
          Delete Account
        </Button>
      </Form>
      <Footer
        username={user?.email?.slice(1)}
        content="account will be permanently deleted."
      />
    </Layout>
  );
}
