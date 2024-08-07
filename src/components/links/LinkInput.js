"use client";

import { useState } from "react";
import { ReactSVG } from "react-svg";
import DropDown from "./DropDown";

export default function LinkInput() {
  const [activePlatform, setActivePlatform] = useState("github");

  return (
    <div className="bg-light_grey rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <button className="flex items-center gap-2 text-grey text-base font-bold">
          {/* prettier-ignore */}
          <ReactSVG src="/assets/icon-drag-and-drop.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", "Drag and Drop"); }} />
          <span>Link #1</span>
        </button>
        <button className="text-grey text-base">Remove</button>
      </div>

      <div className="relative mb-3">
        <label htmlFor="platform" className="block text-dark_grey text-xs mb-1">
          Platform
        </label>
        <input type="hidden" name="platform" id="platform" />

        <button type="button">
          <ReactSVG />
          <span>GitHub</span>
        </button>

        {/* <DropDown platforms={platforms} /> */}
      </div>

      <div className="relative">
        <label className="block text-dark_grey text-xs mb-1">
          <span>Link</span>
        </label>
        <input
          className="w-full h-12 rounded-lg border border-borders pl-[44px]"
          type="text"
        />
        {/* prettier-ignore */}
        <ReactSVG className="absolute left-4 bottom-4" src="/assets/icon-link.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", "Link"); }} />
      </div>
    </div>
  );
}

const platforms = [
  { platform: "GitHub", icon: "/assets/icon-github.svg" },
  { platform: "Frontend Mentor", icon: "/assets/icon-frontend-mentor.svg" },
  { platform: "Twitter", icon: "/assets/icon-twitter.svg" },
  { platform: "LinkedIn", icon: "/assets/icon-linkedin.svg" },
  { platform: "YouTube", icon: "/assets/icon-youtube.svg" },
  { platform: "Facebook", icon: "/assets/icon-facebook.svg" },
  { platform: "Twitch", icon: "/assets/icon-twitch.svg" },
  { platform: "Dev.to", icon: "/assets/icon-devto.svg" },
  { platform: "Codewars", icon: "/assets/icon-codewars.svg" },
  { platform: "Codepen", icon: "/assets/icon-codepen.svg" },
  { platform: "freeCodeCamp", icon: "/assets/icon-freecodecamp.svg" },
  { platform: "GitLab", icon: "/assets/icon-gitlab.svg" },
  { platform: "Hashnode", icon: "/assets/icon-hashnode.svg" },
  { platform: "Stack Overflow", icon: "/assets/icon-stack-overflow.svg" },
];
