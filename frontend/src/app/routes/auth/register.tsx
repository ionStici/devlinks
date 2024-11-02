import { AuthLayout } from '@/components/layout/auth-layout';
import { Head } from '@/components/seo';
import { Button } from '@/features/auth/button';
import { Footer } from '@/features/auth/footer';
import { Form } from '@/features/auth/form';
import { Header } from '@/features/auth/header';
import { Input } from '@/features/auth/input';
import { TermsCheckbox } from '@/features/auth/terms-checkbox';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function RegisterRoute() {
  const [pending, setPending] = useState<boolean>(false);
  const { register: registerAuth } = useAuth();

  const { register, handleSubmit, formState, clearErrors, resetField } =
    useForm({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
    });
  const { errors } = formState;

  async function onSubmit(credentials: FieldValues) {
    if (pending) return;

    if (!credentials.terms) {
      toast.error('Agree to the Terms and Conditions');
      return;
    }

    setPending(true);

    try {
      await registerAuth({
        email: credentials.email as string,
        password: credentials['new-password'] as string,
      });
      toast.success('Registered Successfully');
    } catch (error) {
      toast.error(String(error));
      resetField('new-password');
      resetField('repeat-password');
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
        title="Create your devlinks account"
        description="Join devlinks and build your personalized profile with all your software development social links. Share your journey, connect with others, and showcase your work."
      />
      <Header
        heading="Create account"
        content="Let's get you started sharing links!"
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
          label="Create Password"
          type="password"
          name="new-password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          register={register}
          error={errors['new-password']?.message}
          clearError={clearError}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="repeat-password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          register={register}
          error={errors['repeat-password']?.message}
          clearError={clearError}
        />
        <p className="text-xs text-grey -mt-3">
          Password must contain at least 8 characters
        </p>
        <TermsCheckbox register={register} />
        <Button pendingText="Creating Account..." pending={pending}>
          Create new account
        </Button>
      </Form>
      <Footer text="Already have an account?" btn="Login" href="/auth/login" />
    </AuthLayout>
  );
}
