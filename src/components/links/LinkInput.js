"use client";

import { ReactSVG } from "react-svg";
import Image from "next/image";
import { useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function LinkInput({ link }) {
  const test1 = Object.keys(link);
  const test2 = Object.values(link);
  console.log(test1, test2);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState("GitHub");
  const icon = platforms.filter((p) => p.platform === currentPlatform)[0].icon;

  const handleClick = ({ target }) => {
    setCurrentPlatform(target.textContent);
    setIsOpen(false);
  };

  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <div className="bg-light_grey rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          className="flex items-center gap-2 text-grey text-base font-bold"
        >
          {/* prettier-ignore */}
          <ReactSVG src="/assets/icon-drag-and-drop.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", "Drag and Drop"); }} />
          <span>Link #1</span>
        </button>
        <button type="button" className="text-grey text-base">
          Remove
        </button>
      </div>

      <div className="relative mb-3">
        <p className="block text-dark_grey text-xs mb-1">Platform</p>

        <button
          className="flex items-center w-full h-12 rounded-lg border border-borders bg-white px-4"
          type="button"
          onClick={() => setIsOpen((p) => !p)}
        >
          <Image
            className="mr-3"
            src={icon}
            alt="Platform Logo"
            width={16}
            height={16}
          />
          <span className="text-dark_grey text-base">{currentPlatform}</span>
          <Image
            className={`ml-auto transition ${isOpen ? "rotate-180" : ""}`}
            src="/assets/icon-chevron-down.svg"
            alt="Arrow"
            width={14}
            height={9}
          />
        </button>

        {isOpen && (
          <div className="overflow-hidden" ref={ref}>
            <div className="absolute z-10 top-[84px] w-full h-[343px] overflow-y-scroll no-scrollbar bg-white rounded-lg border border-borders shadow-dropDown">
              <ul className="px-4 pt-3">
                {platforms.map((p) => {
                  return (
                    <li
                      key={p.platform}
                      className="mb-3 pb-3 border-b border-borders"
                    >
                      <button
                        className="w-full flex items-center justify-start text-left gap-3 text-base text-dark_grey hover:text-purple group"
                        type="button"
                        onClick={handleClick}
                      >
                        <ReactSVG
                          className="fill-grey group-hover:fill-purple pointer-events-none"
                          src={p.icon}
                        />
                        {p.platform}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-dark_grey text-xs mb-1">
          <span>Link</span>
        </label>
        <input
          className="w-full h-12 rounded-lg border border-borders pl-[44px]"
          type="text"
          name={currentPlatform}
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
