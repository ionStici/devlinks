"use client";

import TinySpinner from "@/ui/TinySpinner";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function Button({ children, action, pendingText }) {
  const { pending } = useFormStatus();

  const router = useRouter();

  const formAction = async (formData) => {
    const { ok, message } = await action(formData);

    if (!ok) toast.error(message);
    if (ok) toast.success(message);
    if (ok) router.replace("/edit/profile");
  };

  return (
    <button
      formAction={formAction}
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
