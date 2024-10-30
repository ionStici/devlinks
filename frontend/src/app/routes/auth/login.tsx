import { AuthLayout } from '@/components/layout/auth-layout';
import { Header } from '@/features/auth/header';
import { Form } from '@/features/auth/form';
import { Input } from '@/features/auth/input';
import { Footer } from '@/features/auth/footer';
import { ResetPassword } from '@/features/auth/reset-password';

export function LoginRoute() {
  return (
    <AuthLayout>
      <Header
        heading="Login"
        content="Add your details below to get back into the app"
      />
      <Form pendingText="Logging In..." btnText="Login">
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
        <ResetPassword />
      </Form>
      <Footer
        text="Don't have an account?"
        btn="Create account"
        href="/auth/register"
      />
    </AuthLayout>
  );
}
