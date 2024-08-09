"use client";

import Logo from "./Logo";
import NavLink from "./NavLink";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";

export default function NavigationBar({ username }) {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between max-w-[808px] lg:max-w-[1392px] px-[24px] py-[16px] mx-auto mb-4 sm:mb-6 sm:rounded-xl bg-white shadow-section">
      <div>
        <Logo size={isTablet ? "medium" : "small"} />
      </div>

      <ul className="flex items-center">
        <NavLink pathname={pathname} isTablet={isTablet} href="/edit/links" />
        <NavLink pathname={pathname} isTablet={isTablet} href="/edit/profile" />
      </ul>

      <NavLink pathname="preview" isTablet={isTablet} href={username} />
    </nav>
  );
}
