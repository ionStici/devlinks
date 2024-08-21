"use client";

// import { FiTrash2 } from "react-icons/fi";
// import { TbPasswordFingerprint } from "react-icons/tb";
// import { TiDocumentText } from "react-icons/ti";
import TinySpinner from "@/components/ui/TinySpinner";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";

type SaveButtonProps = {
  action: (formData: FormData) => Promise<{ ok: boolean; message: string }>;
  logOutAction: () => Promise<void>;
};

export default function Buttons({ action, logOutAction }: SaveButtonProps) {
  const { pending } = useFormStatus();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false), false);

  const savePending = pending && !isOpen;
  const logOutPending = pending && isOpen;

  const formAction = async (formData: FormData) => {
    const { ok, message } = await action(formData);

    if (!ok) toast.error(message);
    if (ok) toast.success(message);
  };

  return (
    <>
      {isOpen && (
        <div
          ref={ref}
          className="absolute z-10 right-0 bottom-[78px] w-full xs:w-[175px] md:bottom-0 md:right-[170px] bg-white shadow-dropDown rounded-lg border border-borders"
        >
          <ul className="divide-y divide-borders text-base">
            <li>
              <Link
                className="flex items-center w-full gap-3 px-4 py-2 group transition hover:text-purple bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:scale-105 relative focus:z-10"
                href="/edit/account"
              >
                <LuSettings className="w-5 h-5 transition stroke-grey group-hover:stroke-purple" />
                <span>Account</span>
              </Link>
            </li>
            <li className="text-dark_grey">
              <button
                formAction={logOutAction}
                disabled={logOutPending}
                className="flex items-center w-full gap-3 px-4 py-2 group transition hover:text-purple bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:scale-105 relative focus:z-10"
              >
                <FiLogOut className="w-5 h-5 transition stroke-grey group-hover:stroke-purple" />
                <span>Log Out</span>
                {logOutPending && (
                  <TinySpinner classes="ml-[6px] !border-t-purple !border-borders" />
                )}
              </button>
            </li>
          </ul>
        </div>
      )}

      <button
        aria-label="Actions"
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
        formAction={formAction}
        disabled={savePending}
        className="flex items-center justify-center h-[46px] w-full xs:w-[91px] bg-purple rounded-lg text-white text-base hover:bg-purple_hover hover:shadow-input transition focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2 disabled:bg-borders disabled:shadow-none"
      >
        {savePending ? <TinySpinner /> : "Save"}
      </button>
    </>
  );
}
