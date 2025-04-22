import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Input } from '../auth/input';

type Props = {
  register: UseFormRegister<FieldValues>;
  clearError: (name: string) => void;
  errors: FieldErrors;
};

export function ChangePasswordInputs({ register, clearError, errors }: Props) {
  return (
    <>
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
      <Input
        label="New Password"
        type="password"
        name="new-password"
        placeholder="Enter your new password"
        autoComplete="new-password"
        register={register}
        error={errors['new-password']?.message}
        clearError={clearError}
      />
      <Input
        label="Verify Password"
        type="password"
        name="repeat-password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
        register={register}
        error={errors['repeat-password']?.message}
        clearError={clearError}
      />
    </>
  );
}
