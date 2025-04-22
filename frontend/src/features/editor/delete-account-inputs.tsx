import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Input } from '../auth/input';

type Props = {
  register: UseFormRegister<FieldValues>;
  clearError: (name: string) => void;
  errors: FieldErrors;
};

export function DeleteAccountInputs({ register, clearError, errors }: Props) {
  return (
    <>
      <Input
        label="Confirm Your Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        register={register}
        error={errors.password?.message}
        clearError={clearError}
      />

      <div className="pt-1 xs:pt-2">
        <p className="text-lg font-semibold text-red mb-2">Important</p>
        <p className="text-sm xs:text-base">
          <span>Please enter your password to confirm.</span>{' '}
          <span>
            Once submitted, your account and all associated data will be
            permanently and immediately deleted and cannot be recovered.
          </span>
        </p>
      </div>
    </>
  );
}
