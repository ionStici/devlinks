import { type ProfileFormValues } from '@/types/profile-form-values';
import { usernameRegex } from '@/utils/regex';
import { type UseFormRegister } from 'react-hook-form';

type ProfileInputProps = {
  type: string;
  name: keyof ProfileFormValues;
  label: string;
  placeholder: string;
  register: UseFormRegister<ProfileFormValues>;
  error: string | undefined;
  clearError: (name: 'username' | 'name' | 'about') => void;
};

export function ProfileInput({
  type,
  name,
  label,
  placeholder,
  register,
  error,
  clearError,
}: ProfileInputProps) {
  return (
    <div className="relative sm:flex sm:items-center">
      <label
        htmlFor={name}
        className="block mb-1 text-xs text-dark-grey sm:mb-0 sm:text-base sm:text-grey"
      >
        {label}
      </label>
      <input
        className={`w-full h-12 px-4 rounded-lg border border-borders text-base text-dark-grey placeholder-dark-grey/50 sm:w-[344px] sm:ml-auto transition duration-200 focus:outline-none focus:shadow-input focus:border-purple hover:border-purple font-medium ${
          error ? '!border-red hover:border-red' : ''
        }`}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          validate: (value) => {
            if (name === 'username' && !usernameRegex.test(value)) {
              return 'Invalid Username';
            }
            if (name === 'name' && value.length > 30) {
              return 'Invalid Name';
            }
            if (name === 'about' && value.length > 125) {
              return 'Invalid Bio';
            }
            return true;
          },
        })}
        onClick={() => clearError(name)}
      />
      {error && (
        <p className="absolute right-1 top-0 sm:top-[6px] sm:right-3 pl-2 text-xs sm:text-sm text-red sm:bg-white sm:py-2 pointer-events-none">
          {String(error)}
        </p>
      )}
    </div>
  );
}
