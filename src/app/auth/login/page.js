import { login, getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import Header from "../_components/Header";
import Form from "../_components/Form";
import Input from "../_components/Input";
import Footer from "../_components/Footer";

export const metadata = {
  title: "Log in to your devlinks account",
  description:
    "Access your devlinks profile to manage your personal details and share your software development journey with the world.",
};

export default async function Page() {
  const user = await getUser();
  if (user) redirect("/edit/profile");

  return (
    <>
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
    </>
  );
}
