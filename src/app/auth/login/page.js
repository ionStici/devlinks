import Header from "@/components/auth/Header";
import Footer from "@/components/auth/Footer";
import Form from "@/components/auth/Form";
import Input from "@/components/auth/Input";

import { login } from "@/actions/auth";

export const metadata = {
  title: "Login",
  description: "Log in to your account",
};

export default function Page() {
  return (
    <>
      <Header
        heading="Login"
        content="Add your details below to get back into the app"
      />
      <Form action={login} btnText="Login">
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="e.g. alex@email.com"
          autofill="email"
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
        text="Don't have an account?"
        btn="Create account"
        href="/auth/signup"
      />
    </>
  );
}
