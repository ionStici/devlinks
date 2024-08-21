"use client";

import TinySpinner from "@/components/ui/TinySpinner";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

type ButtonProps = {
  children: ReactNode;
  action: (formData: FormData) => Promise<{ ok: boolean; message: string }>;
  pendingText: string;
};

export default function Button({ children, action, pendingText }: ButtonProps) {
  const { pending } = useFormStatus();

  const router = useRouter();

  const formAction = async (formData: FormData) => {
    const { ok, message } = await action(formData);

    if (!ok) toast.error(message);
    if (ok) toast.success(message);
    if (ok) router.replace("/edit/profile");
  };

  return (
    <button
      formAction={formAction}
      disabled={pending}
      className="flex items-center justify-center gap-4 h-[46px] rounded-lg text-white text-base transition focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2 disabled:bg-borders disabled:shadow-none bg-purple hover:bg-purple_hover hover:shadow-input"
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
