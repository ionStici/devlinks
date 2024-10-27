import AuthLayout from "@/components/layouts/auth-layout";
import Header from "./header";
import Form from "./form";
import Input from "./input";
import Button from "./button";
import Footer from "./footer";

export default function LoginMain() {
  return (
    <AuthLayout>
      <Header heading="Login" content="Add your details below to get back into the app" />
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
        <Button pendingText="Logging In...">Login</Button>
      </Form>
      <Footer text="Don't have an account?" btn="Create account" href="/auth/register" />
    </AuthLayout>
  );
}

// export const metadata: Metadata = {
//   title: "Log in to your devlinks account",
//   description:
//     "Access your devlinks profile to manage your personal details and share your software development journey with the world.",
// };

// export const metadata: Metadata = {
//   title: "Create your devlinks account",
//   description:
//     "Join devlinks and build your personalized profile with all your software development social links. Share your journey, connect with others, and showcase your work.",
// };
