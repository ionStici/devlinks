"use client";

import { useFormStatus } from "react-dom";

export default function Button({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="flex items-center justify-center gap-4 h-[46px] rounded-lg bg-purple text-white text-base disabled:bg-borders hover:bg-purple_hover hover:shadow-input transition disabled:shadow-none focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2"
    >
      {pending ? (
        <>
          <TinySpinner />
          <span>
            {children === "Login" ? "Logging In..." : "Creating Account..."}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

const TinySpinner = () => {
  return (
    <div className="w-6 h-6 border-4 border-t-4 border-t-purple border-white rounded-full animate-spin" />
  );
};
