"use client";

import Link from "next/link";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { TbPasswordFingerprint } from "react-icons/tb";
import { logOut } from "@/actions/auth";
import { TiDocumentText } from "react-icons/ti";

export default function ActionButtons({ setIsOpen }) {
  const ref = useOutsideClick(() => setIsOpen(false), false);

  return (
    <div
      ref={ref}
      className="absolute z-10 right-0 bottom-[78px] w-full xs:w-auto md:bottom-0 md:right-[170px] bg-white shadow-dropDown rounded-lg border border-borders"
    >
      <ul className="divide-y divide-borders text-base">
        <li className="text-dark_grey">
          <Link
            className="flex items-center w-full gap-[10px] px-4 py-2 group transition hover:text-purple bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:scale-105 relative focus:z-10"
            href="/terms"
          >
            <TiDocumentText className="w-5 h-5 transition fill-grey group-hover:fill-purple" />
            <span>Terms of Service</span>
          </Link>
        </li>
        <li className="text-dark_grey">
          <Link
            className="flex items-center w-full gap-[10px] px-4 py-2 group transition hover:text-purple bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:scale-105 relative focus:z-10"
            href="/auth/change-password"
          >
            <TbPasswordFingerprint className="w-5 h-5 transition stroke-grey group-hover:stroke-purple" />
            <span>Change Password</span>
          </Link>
        </li>
        <li className="text-dark_grey">
          <button
            className="flex items-center w-full gap-[10px] px-4 py-2 group transition hover:text-purple bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:scale-105 relative focus:z-10"
            formAction={logOut}
          >
            <FiLogOut className="w-5 h-5 transition stroke-grey group-hover:stroke-purple" />
            <span>Log Out</span>
          </button>
        </li>

        <li className="text-red">
          <Link
            className="flex items-center w-full gap-[10px] px-4 py-2 group transition bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red focus:scale-105 relative focus:z-10"
            href="/auth/delete-account"
          >
            <FiTrash2 className="w-5 h-5 transition stroke-red" />
            <span>Delete Account</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
