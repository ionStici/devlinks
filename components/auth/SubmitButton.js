"use client";

import TinySpinner from "../ui/TinySpinner";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }) {
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
