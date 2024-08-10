import { redirect } from "next/navigation";
import { getUser, login } from "../_actions/auth";
import Footer from "../_components/Footer";
import Form from "../_components/Form";
import Header from "../_components/Header";
import Input from "../_components/Input";
import Layout from "../_components/Layout";

export const metadata = {
  title: "Log in to your devlinks account",
  description:
    "Access your devlinks profile to manage your personal details and share your software development journey with the world.",
};

export default async function Page() {
  const user = await getUser();
  if (user) redirect("/edit/profile");

  return (
    <Layout>
      <Header
        heading="Login"
        content="Add your details below to get back into the app"
      />
      <Form action={login} btnText="Login">
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="e.g. codeWizard"
          autofill="username"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          autofill="current-password"
        />
      </Form>
      <Footer
        content="Don't have an account?"
        btnText="Create account"
        href="/auth/signup"
      />
    </Layout>
  );
}
