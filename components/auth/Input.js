"use client";

import { useState } from "react";
import Image from "next/image";

const emailIcon = "/assets/icon-email.svg";
const passwordIcon = "/assets/icon-password.svg";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{8,64}$/;

export default function Input({
  label,
  type,
  name,
  placeholder,
  autoComplete,
}) {
  const icon = type === "email" ? emailIcon : passwordIcon;

  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleValidation = () => {
    if (type === "email") setIsValid(emailRegex.test(input));
    if (type === "password") setIsValid(passwordRegex.test(input));
  };

  const resetValidation = () => setIsValid(true);

  return (
    <div className="relative flex flex-col">
      <label
        className={`mb-1 text-dark_grey text-xs ${
          isValid === false ? "text-red" : ""
        }`}
        htmlFor={name}
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
        onFocus={resetValidation}
        className={`border border-borders h-12 rounded-lg pl-[44px] text-base focus:outline-none focus:shadow-input focus:border-purple hover:border-purple ${
          isValid === false ? "border-red hover:border-red" : ""
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
        <p className="absolute text-red text-xs right-0 top-0">
          {type === "email" ? "Invalid Email" : "Invalid Password"}
        </p>
      )}
    </div>
  );
}
