import { login } from "@/actions/auth";
import Button from "@/components/auth/Button";
import Footer from "@/components/auth/Footer";
import Form from "@/components/auth/Form";
import Header from "@/components/auth/Header";
import Input from "@/components/auth/Input";
import Layout from "@/components/auth/Layout";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in to your devlinks account",
  description:
    "Access your devlinks profile to manage your personal details and share your software development journey with the world.",
};

export default async function Page() {
  return (
    <Layout>
      <Header
        heading="Login"
        content="Add your details below to get back into the app"
      />
      <Form>
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="e.g. alex@email.com"
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        <Button action={login} pendingText="Logging In...">
          Login
        </Button>
      </Form>
      <Footer
        text="Don't have an account?"
        btn="Create account"
        href="/auth/signup"
      />
    </Layout>
  );
}
