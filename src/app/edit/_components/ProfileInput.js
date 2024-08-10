"use client";

import { nameRegex, aboutYouRegex } from "@/utils/regex";
import { useState } from "react";

export default function ProfileInput({
  type,
  name,
  label,
  value,
  placeholder,
}) {
  const [input, setInput] = useState(value ? value : "");
  const [isValid, setIsValid] = useState(true);

  const handleValidation = () => {
    if (name === "about") setIsValid(aboutYouRegex.test(input));
    if (name === "lastName") setIsValid(nameRegex.test(input));
    if (name === "firstName") setIsValid(nameRegex.test(input));
  };

  return (
    <div className="relative sm:flex sm:items-center">
      <label
        htmlFor={name}
        className="block mb-1 text-xs text-dark_grey sm:mb-0 sm:text-base sm:text-grey"
      >
        {label}
      </label>
      <input
        className={`w-full h-12 px-4 rounded-lg border border-borders text-base text-dark_grey placeholder-dark_grey/50 sm:w-[344px] sm:ml-auto focus:outline-none focus:shadow-input focus:border-purple hover:border-purple ${
          !isValid ? "!border-red hover:border-red" : ""
        }`}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={({ target }) => setInput(target.value)}
        value={input}
        onBlur={handleValidation}
        onFocus={() => setIsValid(true)}
      />
      {!isValid && (
        <p className="absolute right-1 top-0 sm:top-[6px] sm:right-3 pl-2 text-xs sm:text-sm text-red sm:bg-white sm:py-2 pointer-events-none">
          Invalid {name === "about" ? "Bio" : "Name"}
        </p>
      )}
    </div>
  );
}
