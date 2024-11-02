import { AuthLayout } from '@/components/layout/auth-layout';
import { Head } from '@/components/seo';
import { Button } from '@/features/auth/button';
import { Footer } from '@/features/auth/footer';
import { Form } from '@/features/auth/form';
import { Header } from '@/features/auth/header';
import { Input } from '@/features/auth/input';
import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function ResetPasswordRoute() {
  const [pending, setPending] = useState<boolean>(false);
  const resetPassword = async (email: string) => email;

  const { register, handleSubmit, formState, clearErrors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const { errors } = formState;

  async function onSubmit(data: FieldValues) {
    if (pending) return;

    toast.error('Password reset is not implemented yet.');

    await resetPassword(data.email);

    setPending(false);
  }

  function clearError(name: string) {
    clearErrors(name);
  }

  return (
    <AuthLayout>
      <Head title="Reset your Password" />
      <Header
        heading="Reset Password"
        content="We'll email you a link so you can reset your password.
"
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
        <Button pendingText="Sending..." pending={pending}>
          Request Password Reset
        </Button>
      </Form>
      <Footer text="Back to" btn="Login" href="/auth/login" />
    </AuthLayout>
  );
}
