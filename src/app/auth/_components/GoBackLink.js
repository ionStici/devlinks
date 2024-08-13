import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export default function GoBackLink() {
  return (
    <Link
      className="flex items-center gap-1 mb-6 text-purple w-fit rounded-[4px] px-1 -ml-1 focus:outline-none focus:ring-1 focus:ring-purple"
      href="/edit/profile"
    >
      <IoArrowBackOutline className="size-4" />
      <span>Go Back</span>
    </Link>
  );
}
