import iconEmail from '@/assets/icons/icon-email.svg';
import iconPassword from '@/assets/icons/icon-password.svg';
import { emailRegex, passwordRegex } from '@/utils/regex';
import {
  type FieldError,
  type FieldErrorsImpl,
  type FieldValues,
  type Merge,
  type UseFormRegister,
} from 'react-hook-form';

type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  autoComplete: string;
  register: UseFormRegister<FieldValues>;
  error:
    | string
    | FieldError
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  clearError: (name: string) => void;
};

export function Input({
  label,
  type,
  name,
  placeholder,
  autoComplete,
  register,
  error,
  clearError,
}: InputProps) {
  let icon = null;
  if (type === 'email') icon = iconEmail;
  if (type === 'password') icon = iconPassword;

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={name}
        className={`mb-1 text-xs ${!error ? 'text-dark-grey' : 'text-red'}`}
      >
        {label}
      </label>
      <input
        {...register(name, {
          required: 'Required',
          pattern: {
            value:
              type === 'email'
                ? emailRegex
                : type === 'password'
                ? passwordRegex
                : /.*/,
            message:
              type === 'email'
                ? 'Invalid Email'
                : type === 'password'
                ? 'Invalid Password'
                : 'Wrong Format',
          },
          validate: (value, formValues) => {
            if (name !== 'repeat-password') return true;
            return (
              value === formValues['new-password'] || 'Passwords do not match'
            );
          },
        })}
        onClick={() => clearError(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`border border-borders rounded-lg h-12 pl-[44px] pr-4 
        transition duration-200 focus:shadow-input focus:border-purple
        focus:outline-none placeholder:text-dark-grey/50
        ${!error ? 'hover:border-purple' : '!border-red'}`}
      />
      {icon && (
        <img
          src={icon}
          alt={name}
          width={16}
          height={16}
          className="absolute left-4 bottom-4 pointer-events-none"
        />
      )}
      {error && (
        <p className="absolute right-0 top-0 sm:top-8 sm:right-4 text-red text-xs sm:pl-1 sm:bg-white sm:py-1 sm:pointer-events-none">
          {String(error)}
        </p>
      )}
    </div>
  );
}
