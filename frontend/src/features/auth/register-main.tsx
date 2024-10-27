import AuthLayout from "@/components/layouts/auth-layout";
import Header from "./header";
import Form from "./form";
import Input from "./input";
import TermsCheckbox from "./terms-checkbox";
import Button from "./button";
import Footer from "./footer";

export default function RegisterMain() {
  return (
    <AuthLayout>
      <Header heading="Create account" content="Let's get you started sharing links!" />
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
        <p className="text-xs text-grey -mt-3">Password must contain at least 8 characters</p>
        <TermsCheckbox />
        <Button pendingText="Creating Account...">Create new account</Button>
      </Form>
      <Footer text="Already have an account?" btn="Login" href="/auth/login" />
    </AuthLayout>
  );
}
