import Image from "next/image";
import Link from "next/link";
import { ReactSVG } from "react-svg";

const linkIcon = "/assets/icon-links-header.svg";
const profileIcon = "/assets/icon-profile-details-header.svg";
const previewIcon = "/assets/icon-preview-header.svg";

type NavLinkProps = {
  pathname: string;
  isTablet: boolean;
  href: string;
};

export default function NavLink({ pathname, isTablet, href }: NavLinkProps) {
  if (pathname === "preview")
    return (
      <Link
        className="border border-purple rounded-lg py-[10px] px-[15px] text-base font-semibold text-purple transition hover:bg-light_purple focus:outline-none focus:bg-light_purple"
        href={href}
      >
        {isTablet ? (
          "Preview"
        ) : (
          <Image src={previewIcon} width={20} height={20} alt="Preview" />
        )}
      </Link>
    );

  const icon = href === "/edit/links" ? linkIcon : profileIcon;
  const ariaLabel = href === "/edit/links" ? "Links" : "Profile";
  const linkText = href === "/edit/links" ? "Links" : "Profile Details";

  return (
    <li className={`rounded-lg ${pathname === href ? "bg-light_purple" : ""}`}>
      <Link
        className={`flex items-center gap-2 py-[11px] px-[27px] group text-base text-grey font-semibold rounded-lg transition hover:text-purple focus:outline-none focus:ring-2 focus:ring-purple focus:ring-inset hover:!ring-0 ${
          pathname === href ? "text-purple focus:!ring-0" : ""
        }`}
        href={href}
        tabIndex={pathname === href ? -1 : 0}
      >
        {/* prettier-ignore */}
        <ReactSVG src={icon} className={`${ pathname === href ? "fill-purple" : "fill-grey group-hover:fill-purple" } `} beforeInjection={(svg) => { svg.setAttribute("aria-label", ariaLabel); }} />
        {isTablet && linkText}
      </Link>
    </li>
  );
}
