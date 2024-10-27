import { emailRegex, passwordRegex } from "@/utils/regex";
import { useState } from "react";

type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  autoComplete: string;
};

const emailIcon = "/assets/icon-email.svg";
const passwordIcon = "/assets/icon-password.svg";

export default function Input({ label, type, name, placeholder, autoComplete }: InputProps) {
  const [input, setInput] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleValidation = () => {
    if (type === "email") setIsValid(emailRegex.test(input));
    if (type === "password") setIsValid(passwordRegex.test(input));
  };

  const icon = type === "email" ? emailIcon : passwordIcon;

  return (
    <div className="relative flex flex-col">
      <label htmlFor="name" className={`mb-1 text-xs ${isValid ? "text-dark-grey" : "text-red"}`}>
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
        className={`
          border rounded-lg h-12 pl-[44px] pr-4 text-base placeholder:text-dark-grey/50 
          transition duration-200 focus:outline-none focus:shadow-input focus:border-purple
          ${isValid ? "border-borders hover:border-purple" : "border-red"}
        `}
      />
      <img
        src={icon}
        alt="name"
        className="size-4 absolute left-4 bottom-4 pointer-events-none"
        width={16}
        height={16}
      />
      {!isValid && (
        <p
          className="absolute right-0 top-0 text-red text-xs
        sm:right-4 sm:top-8 sm:pl-1 sm:bg-white sm:py-1 sm:pointer-events-none"
        >
          {type === "email" ? "Invalid Email" : "Invalid Password"}
        </p>
      )}
    </div>
  );
}
