import { signUp, getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import Header from "../_components/Header";
import Form from "../_components/Form";
import Input from "../_components/Input";
import Footer from "../_components/Footer";

export const metadata = {
  title: "Create your devlinks account",
  description:
    "Join devlinks and build your personalized profile with all your software development social links. Share your journey, connect with others, and showcase your work.",
};

export default async function Page() {
  const user = await getUser();
  if (user) redirect("/edit/profile");

  return (
    <>
      <Header
        heading="Create account"
        content="Let's get you started sharing links!"
      />
      <Form action={signUp} btnText="Create new account">
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="e.g. codeWizard"
          autofill="username"
        />
        <Input
          label="Create Password"
          type="password"
          name="new-password"
          placeholder="At least 8 characters"
          autofill="new-password"
        />
        <Input
          label="Confirm Password"
          type="password"
          name="repeat-password"
          placeholder="At least 8 characters"
          autofill="new-password"
        />
        <p className="text-xs text-grey">
          Password must contain at least 8 characters
        </p>
      </Form>
      <Footer
        content="Already have an account?"
        btnText="Login"
        href="/auth/login"
      />
    </>
  );
}
