import Form from "@/components/auth/Form";
import Input from "@/components/auth/Input";
import { signUp } from "@/actions/auth";

export default function Page() {
  return (
    <Form
      header={["Create account", "Let's get you started sharing links!"]}
      footer={["Already have an account?", "Login", "/auth/login"]}
      action={signUp}
      btnText="Create new account"
    >
      <Input
        label="Email address"
        type="email"
        name="email"
        placeholder="e.g. alex@email.com"
        autoComplete="email"
      />
      <Input
        label="Create password"
        type="password"
        name="new-password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
      />
      <Input
        label="Confirm password"
        type="password"
        name="repeat-password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
      />
      <p className="text-xs text-grey">
        Password must contain at least 8 characters
      </p>
    </Form>
  );
}
