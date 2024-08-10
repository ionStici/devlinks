"use client";

import TinySpinner from "@/components/ui/TinySpinner";
import { useFormStatus } from "react-dom";

export default function Button({ children }) {
  const { pending } = useFormStatus();

  let pendingText = "";
  if (children === "Create new account") pendingText = "Creating Account...";
  if (children === "Login") pendingText = "Logging In...";
  if (children === "Delete Account") pendingText = "Deleting...";
  if (children === "Reset Password") pendingText = "Resetting...";

  return (
    <button
      disabled={pending}
      className={`flex items-center justify-center gap-4 h-[46px] rounded-lg text-white text-base transition focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2 disabled:bg-borders disabled:shadow-none 
      ${
        children !== "Delete Account"
          ? "bg-purple hover:bg-purple_hover hover:shadow-input"
          : "bg-red"
      }`}
    >
      {pending ? (
        <>
          <TinySpinner />
          <span>{pendingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
