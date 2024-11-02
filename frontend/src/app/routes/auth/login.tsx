import { AuthLayout } from '@/components/layout/auth-layout';
import { Head } from '@/components/seo';
import { Button } from '@/features/auth/button';
import { Footer } from '@/features/auth/footer';
import { Form } from '@/features/auth/form';
import { Header } from '@/features/auth/header';
import { Input } from '@/features/auth/input';
import { ResetPasswordLink } from '@/features/auth/reset-password-link';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function LoginRoute() {
  const [pending, setPending] = useState<boolean>(false);
  const { login } = useAuth();

  const { register, handleSubmit, formState, clearErrors, resetField } =
    useForm({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
    });
  const { errors } = formState;

  async function onSubmit(credentials: FieldValues) {
    if (pending) return;

    setPending(true);

    try {
      await login({
        email: credentials.email as string,
        password: credentials.password as string,
      });
      toast.success('Logged In Successfully');
    } catch (error) {
      toast.error(String(error));
      resetField('password');
    } finally {
      setPending(false);
    }
  }

  function clearError(name: string) {
    clearErrors(name);
  }

  return (
    <AuthLayout>
      <Head
        title="Log in to your devlinks account"
        description="Access your devlinks profile to manage your personal details and share your software development journey with the world."
      />
      <Header
        heading="Login"
        content="Add your details below to get back into the app"
      />
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="e.g. alex@email.com"
          autoComplete="email"
          register={register}
          error={errors.email?.message}
          clearError={clearError}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          register={register}
          error={errors.password?.message}
          clearError={clearError}
        />
        <ResetPasswordLink />
        <Button pendingText="Logging In..." pending={pending}>
          Login
        </Button>
      </Form>
      <Footer
        text="Don't have an account?"
        btn="Create account"
        href="/auth/register"
      />
    </AuthLayout>
  );
}
