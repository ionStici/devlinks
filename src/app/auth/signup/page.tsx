import { signUp } from "@/actions/auth";
import Button from "@/components/auth/Button";
import Footer from "@/components/auth/Footer";
import Form from "@/components/auth/Form";
import Header from "@/components/auth/Header";
import Input from "@/components/auth/Input";
import Layout from "@/components/auth/Layout";
import TermsCheckbox from "@/components/auth/TermsCheckbox";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create your devlinks account",
  description:
    "Join devlinks and build your personalized profile with all your software development social links. Share your journey, connect with others, and showcase your work.",
};

export default async function Page() {
  return (
    <Layout>
      <Header
        heading="Create account"
        content="Let's get you started sharing links!"
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
          label="Create Password"
          type="password"
          name="new-password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
        <Input
          label="Confirm Password"
          type="password"
          name="repeat-password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
        <p className="text-xs text-grey -mt-3">
          Password must contain at least 8 characters
        </p>
        <TermsCheckbox />
        <Button action={signUp} pendingText="Creating Account...">
          Create new account
        </Button>
      </Form>
      <Footer text="Already have an account?" btn="Login" href="/auth/login" />
    </Layout>
  );
}
