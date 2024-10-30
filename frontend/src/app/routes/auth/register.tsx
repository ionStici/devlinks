import { AuthLayout } from '@/components/layout/auth-layout';
import { Header } from '@/features/auth/header';
import { Form } from '@/features/auth/form';
import { Input } from '@/features/auth/input';
import { Footer } from '@/features/auth/footer';
import { TermsCheckbox } from '@/features/auth/terms-checkbox';

export function RegisterRoute() {
  return (
    <AuthLayout>
      <Header
        heading="Create account"
        content="Let's get you started sharing links!"
      />
      <Form pendingText="Creating Account..." btnText="Create new account">
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
      </Form>
      <Footer text="Already have an account?" btn="Login" href="/auth/login" />
    </AuthLayout>
  );
}
