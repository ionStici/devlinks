import { signUp } from "../../../actions/auth";
import Button from "../_components/Button";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Input from "../_components/Input";
import Layout from "../_components/Layout";

export const metadata = {
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
      <form className="flex flex-col gap-6 mb-6">
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="e.g. code-wizard"
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
        <Button action={signUp} pendingText="Creating Account...">
          Create new account
        </Button>
      </form>
      <Footer
        content="Already have an account?"
        btnText="Login"
        href="/auth/login"
      />
    </Layout>
  );
}
