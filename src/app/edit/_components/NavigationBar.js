"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

export default function NavigationBar({ username }) {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between max-w-[808px] lg:max-w-[1392px] px-[24px] py-[16px] mx-auto mb-4 sm:mb-6 sm:rounded-xl bg-white shadow-section">
      <Link
        href="/"
        className="rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple -ml-[2px] p-[2px] md:pr-1"
      >
        <Logo size={isTablet ? "medium" : "small"} />
      </Link>

      <ul className="flex items-center">
        <NavLink pathname={pathname} isTablet={isTablet} href="/edit/links" />
        <NavLink pathname={pathname} isTablet={isTablet} href="/edit/profile" />
      </ul>

      <NavLink pathname="preview" isTablet={isTablet} href={username} />
    </nav>
  );
}
