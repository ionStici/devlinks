"use client";

import { emailRegex, passwordRegex } from "@/utils/regex";
import Image from "next/image";
import { useState } from "react";

const emailIcon = "/assets/icon-email.svg";
const passwordIcon = "/assets/icon-password.svg";

type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  autoComplete: string;
};

export default function Input({
  label,
  type,
  name,
  placeholder,
  autoComplete,
}: InputProps) {
  const icon = type === "email" ? emailIcon : passwordIcon;

  const [input, setInput] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleValidation = () => {
    if (type === "email") setIsValid(emailRegex.test(input));
    if (type === "password") setIsValid(passwordRegex.test(input));
  };

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={name}
        className={`mb-1 text-xs ${
          isValid === false ? "text-red" : "text-dark_grey"
        }`}
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
        className={`border h-12 rounded-lg pl-[44px] pr-4 text-base placeholder-dark_grey/50 focus:outline-none focus:shadow-input focus:border-purple ${
          isValid === false
            ? "border-red hover:border-red"
            : "border-borders hover:border-purple"
        }`}
      />
      <Image
        src={icon}
        alt={name}
        width={16}
        height={16}
        className="absolute left-4 bottom-4 pointer-events-none"
      />
      {isValid === false && (
        <p className="absolute text-red text-xs right-0 top-0 sm:top-8 sm:right-4 sm:pl-1 sm:bg-white sm:py-1 sm:pointer-events-none">
          {type === "email" ? "Invalid Email" : "Invalid Password"}
        </p>
      )}
    </div>
  );
}
