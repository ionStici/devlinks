import Form from "@/components/auth/Form";
import Input from "@/components/auth/Input";
import { login } from "@/actions/auth";

export default function Page() {
  return (
    <Form
      header={["Login", "Add your details below to get back into the app"]}
      footer={["Don't have an account?", "Create account", "/auth/signup"]}
      action={login}
      btnText="Login"
    >
      <Input
        label="Email address"
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
    </Form>
  );
}
