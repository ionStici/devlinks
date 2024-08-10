"use client";

import { ReactSVG } from "react-svg";

const femIconColor = "/assets/icon-fem-color.svg";
const devtoIconWhite = "/assets/icon-devto-white.svg";

export default function PlatformLink({ platform, url, icon, color, height }) {
  const isFem = platform === "Frontend Mentor";
  const isDevto = platform === "Dev.to";
  const isSmall = height === "44px" ? true : false;

  let newIcon;
  if (isFem) {
    newIcon = femIconColor;
  } else if (isDevto) {
    newIcon = devtoIconWhite;
  } else newIcon = icon;

  return (
    <li>
      <a
        href={url}
        target="_blank"
        style={{ backgroundColor: color }}
        className={`flex items-center justify-start gap-2 max-w-[237px] mx-auto px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2
        ${isSmall ? "h-[44px]" : "h-[56px]"}
        ${isFem ? "border border-borders text-dark_grey" : "text-white"}`}
      >
        {/* prettier-ignore */}
        <ReactSVG src={newIcon} className={`fill-white ${isSmall ? "size-4" : "size-5"}`} beforeInjection={(svg) => { svg.setAttribute("aria-label", `${platform} Logo`); }} />
        <span className="text-base">{platform}</span>
        {/* prettier-ignore */}
        <ReactSVG src="/assets/icon-arrow-right.svg" className={`ml-auto ${isFem ? "fill-grey" : "fill-white"}`} beforeInjection={(svg) => { svg.setAttribute("aria-label", `Arrow Right`); }} />
      </a>
    </li>
  );
}
