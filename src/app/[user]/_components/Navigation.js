"use client";

import { URL } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Navigation() {
  const pathname = usePathname();

  const copyUrl = () => {
    navigator.clipboard.writeText(URL + pathname);
    toast.success("The link has been copied to your clipboard!");
  };

  return (
    <nav className="w-full absolute z-20 left-0 top-3">
      <ul className="flex items-center justify-between px-4">
        <li>
          <Link
            className="flex justify-center w-[105px] py-1 rounded-md shadow-layout text-white transition border-2 border-transparent hover:border-white focus:border-white focus:outline-none"
            href="/edit/profile"
          >
            Edit Profile
          </Link>
        </li>
        <li>
          <button
            className="flex justify-center w-[105px] py-1 rounded-md shadow-layout text-white transition border-2 border-transparent hover:border-white focus:border-white focus:outline-none"
            onClick={copyUrl}
          >
            Share Link
          </button>
        </li>
      </ul>
    </nav>
  );
}
