import { AuthLayout } from '@/components/layout/auth-layout';
import { Footer } from '@/features/auth/footer';
import { Form } from '@/features/auth/form';
import { Header } from '@/features/auth/header';
import { Input } from '@/features/auth/input';

export function ResetPasswordRoute() {
  return (
    <AuthLayout>
      <Header
        heading="Reset Password"
        content="We'll email you a link so you can reset your password.
"
      />
      <Form pendingText="Sending..." btnText="Request Password Reset">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="e.g. alex@email.com"
          autoComplete="email"
        />
      </Form>
      <Footer text="Back to" btn="Login" href="/auth/login" />
    </AuthLayout>
  );
}
