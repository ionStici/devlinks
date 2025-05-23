import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Input } from '../auth/input';

type Props = {
  email: string;
  register: UseFormRegister<FieldValues>;
  clearError: (name: string) => void;
  errors: FieldErrors;
};

export function ChangeEmailInputs({
  email,
  register,
  clearError,
  errors,
}: Props) {
  return (
    <>
      <Input
        label="New Email Address"
        type="email"
        name="email"
        placeholder="e.g. greg@email.com"
        autoComplete="email"
        register={register}
        error={errors.email?.message}
        clearError={clearError}
      />
      <Input
        label="Confirm Current Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        register={register}
        error={errors.password?.message}
        clearError={clearError}
      />
      <p className="pt-2">
        <span>Your email address:</span>{' '}
        <span className="font-medium">{email}</span>
      </p>
    </>
  );
}
