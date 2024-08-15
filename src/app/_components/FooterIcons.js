"use client";

import { ReactSVG } from "react-svg";
import Link from "next/link";

export default function FooterIcons() {
  return (
    <div className="flex items-center gap-5">
      <Link
        className="rounded-full transition focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-8 hover:ring-2 hover:ring-purple hover:ring-offset-8"
        href="https://github.com/ionStici/devlinks"
      >
        <ReactSVG
          className="w-6 h-6 fill-purple"
          src="/platforms/icon-github.svg"
          beforeInjection={(svg) => {
            svg.setAttribute("aria-label", "GitHub Logo");
          }}
        />
      </Link>
      <Link
        className="rounded-full transition focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-8 hover:ring-2 hover:ring-purple hover:ring-offset-8"
        href="https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT"
      >
        <ReactSVG
          className="w-6 h-6"
          src="/platforms/icon-frontend-mentor-color.svg"
          beforeInjection={(svg) => {
            svg.setAttribute("aria-label", "Frontend Mentor Logo");
          }}
        />
      </Link>
    </div>
  );
}
