"use client";

import TinySpinner from "../ui/TinySpinner";
import { useFormStatus } from "react-dom";

export default function Button({ children }) {
  const { pending } = useFormStatus();

  return (
    <div className="mx-6 md:mx-10">
      <button
        disabled={pending}
        className="w-full sm:w-[91px] sm:ml-auto flex items-center justify-center gap-4 h-[46px] rounded-lg bg-purple text-white text-base disabled:bg-borders disabled:shadow-none hover:bg-purple_hover hover:shadow-input transition focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2"
      >
        {pending ? <TinySpinner /> : children}
      </button>
    </div>
  );
}
