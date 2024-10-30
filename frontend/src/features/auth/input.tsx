import { useState } from 'react';
import iconEmail from '@/assets/icons/icon-email.svg';
import iconPassword from '@/assets/icons/icon-password.svg';
import { emailRegex, passwordRegex } from '@/utils/regex';

type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  autoComplete: string;
};

export function Input({
  label,
  type,
  name,
  placeholder,
  autoComplete,
}: InputProps) {
  const [input, setInput] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleValidation = () => {
    if (type === 'email') setIsValid(emailRegex.test(input));
    if (type === 'password') setIsValid(passwordRegex.test(input));
  };

  let icon = null;
  if (type === 'email') icon = iconEmail;
  if (type === 'password') icon = iconPassword;

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={name}
        className={`mb-1 text-xs ${isValid ? 'text-dark-grey' : 'text-red'}`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={({ target }) => setInput(target.value)}
        value={input}
        onBlur={handleValidation}
        onFocus={() => setIsValid(true)}
        className={`border border-borders rounded-lg h-12 pl-[44px] pr-4 
        transition duration-200 focus:shadow-input focus:border-purple
        focus:outline-none placeholder:text-dark-grey/50
        ${isValid ? 'hover:border-purple' : '!border-red'}`}
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
      {!isValid && (
        <p className="absolute right-0 top-0 sm:top-8 sm:right-4 text-red text-xs sm:pl-1 sm:bg-white sm:py-1 sm:pointer-events-none">
          <span>Invalid </span>
          <span>{type}</span>
        </p>
      )}
    </div>
  );
}
