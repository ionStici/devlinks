"use client";

import TinySpinner from "@/ui/TinySpinner";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function SaveButton() {
  const { pending, data, method, action } = useFormStatus();

  console.log(data, method, action);

  const notify = () => toast.success("Saved!");
  return (
    <>
      <div aria-hidden="true" className="md:h-10" />
      <div className="border-t border-borders mt-6 mb-4 md:mb-6 md:mt-auto" />
      <div className="mx-6 md:mx-10">
        <button
          onClick={() => {
            setTimeout(() => {
              if (!pending) notify();
            }, 500);
          }}
          disabled={pending}
          className="flex items-center justify-center h-[46px] w-full sm:w-[91px] sm:ml-auto bg-purple rounded-lg text-white text-base hover:bg-purple_hover hover:shadow-input transition focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2 disabled:bg-borders disabled:shadow-none"
        >
          {pending ? <TinySpinner /> : "Save"}
        </button>
      </div>
    </>
  );
}
