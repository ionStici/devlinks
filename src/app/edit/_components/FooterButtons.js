"use client";

import Image from "next/image";
import { useState } from "react";
import ActionButtons from "./ActionButtons";
import TinySpinner from "@/ui/TinySpinner";
import { useFormStatus } from "react-dom";

export default function FooterButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const { pending } = useFormStatus();

  const isPending = pending && !isOpen;

  return (
    <>
      <div aria-hidden="true" className="md:h-10" />
      <div className="border-t border-borders mt-6 mb-4 md:mb-6 md:mt-auto" />
      <div className="relative flex xs:justify-end gap-4 mx-6 md:mx-10">
        {isOpen && <ActionButtons setIsOpen={setIsOpen} />}
        <button
          aria-label="Profile Actions"
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          className="flex items-center justify-center flex-shrink-0 w-[46px] h-[46px] shadow-box bg-light_grey rounded-lg sm:ml-auto transition hover:ring-purple focus:ring-purple hover:ring-2 focus:outline-none focus:ring-2"
        >
          <Image
            className="w-6 h-6"
            src="/assets/icon-profile.svg"
            width={24}
            height={24}
            alt="Profile"
          />
        </button>
        <button
          onClick={() => setIsOpen(false)}
          disabled={isPending}
          className="flex items-center justify-center h-[46px] w-full xs:w-[91px] bg-purple rounded-lg text-white text-base hover:bg-purple_hover hover:shadow-input transition focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2 disabled:bg-borders disabled:shadow-none"
        >
          {isPending ? <TinySpinner /> : "Save"}
        </button>
      </div>
    </>
  );
}
