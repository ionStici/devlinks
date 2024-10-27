import { ReactNode } from "react";
import TinySpinner from "@/components/ui/tiny-spinner";

type ButtonProps = {
  children: ReactNode;
  pendingText: string;
};

export default function Button({ children, pendingText }: ButtonProps) {
  const pending = false;

  return (
    <button
      disabled={pending}
      className="
        flex items-center justify-center gap-4 h-[46px] rounded-lg
        text-white text-base bg-purple
        transition duration-200 focus:outline-none ring-[2px] ring-transparent ring-offset-2 focus:ring-purple
        disabled:bg-borders disabled:shadow-none hover:bg-purple-hover hover:shadow-input
      "
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
