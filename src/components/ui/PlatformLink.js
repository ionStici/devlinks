"use client";

import { ReactSVG } from "react-svg";

export default function PlatformLink({ platform, url, icon, color, height }) {
  const femColorIcon = "/assets/icon-fem-color.svg";
  const isFem = platform === "Frontend Mentor";
  const isSmall = height === "44px" ? true : false;

  // hover:scale-x-[1.025]

  return (
    <li>
      <a
        href={url}
        target="_blank"
        style={{ backgroundColor: color }}
        className={`flex items-center gap-2 justify-start max-w-[237px] mx-auto h-[${height}] px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2
        ${
          platform === "Frontend Mentor"
            ? "border border-borders text-dark_grey"
            : "text-white"
        }`}
      >
        {/* prettier-ignore */}
        <ReactSVG src={isFem ? femColorIcon : icon} className={`fill-white ${isSmall ? "size-4" : "size-5"}`} beforeInjection={(svg) => { svg.setAttribute("aria-label", `${platform} Logo`); }} />
        <span className="text-base">{platform}</span>
      </a>
    </li>
  );
}
