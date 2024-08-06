import Header from "@/components/auth/Header";
import Footer from "@/components/auth/Footer";
import Form from "@/components/auth/Form";
import Input from "@/components/auth/Input";

import { signUp } from "@/actions/auth";

export const metadata = {
  title: "Sign Up",
  description: "Create a new devlinks account",
};

export default function Page() {
  return (
    <>
      <Header
        heading="Create account"
        content="Let's get you started sharing links!"
      />
      <Form action={signUp} btnText="Create new account">
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="e.g. alex@email.com"
          autofill="email"
        />
        <Input
          label="Create password"
          type="password"
          name="new-password"
          placeholder="At least 8 characters"
          autofill="new-password"
        />
        <Input
          label="Confirm password"
          type="password"
          name="repeat-password"
          placeholder="At least 8 characters"
          autofill="new-password"
        />
        <p className="text-xs text-grey">
          Password must contain at least 8 characters
        </p>
      </Form>
      <Footer text="Already have an account?" btn="Login" href="/auth/login" />
    </>
  );
}
