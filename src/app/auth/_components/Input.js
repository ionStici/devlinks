"use client";

import { passwordRegex, usernameRegex } from "@/utils/regex";
import Image from "next/image";
import { useState } from "react";

const usernameIcon = "/assets/icon-username.svg";
const passwordIcon = "/assets/icon-password.svg";

export default function Input({ label, type, name, placeholder, autofill }) {
  const icon = type === "text" ? usernameIcon : passwordIcon;

  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleValidation = () => {
    if (type === "text") setIsValid(usernameRegex.test(input));
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
        className={`border border-borders h-12 rounded-lg pl-[44px] pr-4 text-base placeholder-dark_grey/50 focus:outline-none focus:shadow-input focus:border-purple hover:border-purple ${
          isValid === false ? "!border-red hover:border-red" : ""
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
        <p className="absolute text-red text-xs right-0 top-0 sm:top-8 sm:right-4 sm:pl-1 sm:bg-white sm:py-1">
          {type === "text" ? "Invalid Username" : "Invalid Password"}
        </p>
      )}
    </div>
  );
}
