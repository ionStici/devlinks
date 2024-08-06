"use client";

import Logo from "./Logo";
import NavLink from "./NavLink";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  return (
    <nav className="max-w-[1392px] mx-auto rounded-xl flex items-center justify-between px-[24px] py-[16px] bg-white">
      <div>
        <Logo size={isTablet ? "large" : "small"} />
      </div>

      <ul className="flex items-center">
        <NavLink pathname={pathname} isTablet={isTablet} href="/edit/links" />
        <NavLink pathname={pathname} isTablet={isTablet} href="/edit/profile" />
      </ul>

      <NavLink pathname="preview" isTablet={isTablet} href="/" />
    </nav>
  );
}