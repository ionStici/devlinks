"use client";

import { ReactSVG } from "react-svg";

type PlatformLinkProps = {
  platform: string;
  url: string;
  icons: string[];
  color: string;
  height: string;
};

export default function PlatformLink({
  platform,
  url,
  icons,
  color,
  height,
}: PlatformLinkProps) {
  const isFem = platform === "Frontend Mentor";
  const isDevto = platform === "Dev.to";
  const isSmall = height === "44px" ? true : false;

  let icon = icons[0];
  if (isFem) icon = icons[1];
  if (isDevto) icon = icons[1];

  return (
    <li>
      <a
        href={url}
        target="_blank"
        style={{ backgroundColor: color }}
        className={`flex items-center justify-start gap-2 mx-auto px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2
        ${isSmall ? "h-11" : "h-[56px]"}
        ${isFem ? "border border-borders text-dark_grey" : "text-white"}`}
      >
        {/* prettier-ignore */}
        <ReactSVG src={icon} className={`fill-white ${isSmall ? "size-4" : "size-5"}`} beforeInjection={(svg) => { svg.setAttribute("aria-label", `${platform} Logo`); }} />
        <span className="text-base">{platform}</span>
        {/* prettier-ignore */}
        <ReactSVG src="/assets/icon-arrow-right.svg" className={`ml-auto ${isFem ? "fill-grey" : "fill-white"}`} beforeInjection={(svg) => { svg.setAttribute("aria-label", `Arrow Right`); }} />
      </a>
    </li>
  );
}
