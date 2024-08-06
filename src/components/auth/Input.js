"use client";

import { useState } from "react";
import Image from "next/image";
import { emailRegex, passwordRegex } from "@/utils/regex";

const emailIcon = "/assets/icon-email.svg";
const passwordIcon = "/assets/icon-password.svg";

export default function Input({ label, type, name, placeholder, autofill }) {
  const icon = type === "email" ? emailIcon : passwordIcon;

  const [input, setInput] = useState(() => {
    // TEST DATA
    return type === "email" ? "test-user@email.app" : "qazwsxedc";
  });
  const [isValid, setIsValid] = useState(true);

  const handleValidation = () => {
    if (type === "email") setIsValid(emailRegex.test(input));
    if (type === "password") setIsValid(passwordRegex.test(input));
  };

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={name}
        className={`mb-1 text-dark_grey text-xs ${
          isValid === false ? "text-red" : ""
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete={autofill}
        onChange={({ target }) => setInput(target.value)}
        value={input}
        onBlur={handleValidation}
        onFocus={() => setIsValid(true)}
        className={`border border-borders h-12 rounded-lg pl-[44px] text-base focus:outline-none focus:shadow-input focus:border-purple hover:border-purple ${
          isValid === false ? "!border-red hover:border-red" : ""
        }`}
      />
      <Image
        src={icon}
        alt="Email"
        width={16}
        height={16}
        className="absolute left-4 bottom-4 pointer-events-none"
      />
      {isValid === false && (
        <p className="absolute text-red text-xs right-0 top-0 md:top-9 md:right-4">
          {type === "email" ? "Invalid Email" : "Invalid Password"}
        </p>
      )}
    </div>
  );
}
