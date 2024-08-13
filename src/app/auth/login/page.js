import { login } from "../../../actions/auth";
import Button from "../_components/Button";
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
  return (
    <Layout>
      <Header
        heading="Login"
        content="Add your details below to get back into the app"
      />
      <Form>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="e.g. code-wizard"
          autofill="username"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          autofill="current-password"
        />
        <Button action={login} pendingText="Logging In...">
          Login
        </Button>
      </Form>
      <Footer
        content="Don't have an account?"
        btnText="Create account"
        href="/auth/signup"
      />
    </Layout>
  );
}
