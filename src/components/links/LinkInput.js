"use client";

import { ReactSVG } from "react-svg";
import Image from "next/image";
import { useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Reorder, useDragControls } from "framer-motion";

export default function LinkInput({
  index,
  link,
  setClientLinks,
  platforms,
  remaining,
  controls,
}) {
  const platform = link.split("%")[0];
  const url = link.split("%")[1];

  const [isOpen, setIsOpen] = useState(false);

  const icon = platforms.find((p) => p.platform === platform).icon;

  const handleClick = ({ target }) => {
    console.log(target.textContent);

    setClientLinks((prev) => {
      const test = [...prev];
      test[index] = { [target.textContent]: "url" };
      return test;
    });
    // setIsOpen(false);
  };

  const handleRemoveLink = ({ target }) => {
    const test = [...prev];
    test[index] = { [target.textContent]: "url" };
    return test;
  };

  const ref = useOutsideClick(() => setIsOpen(false), false);

  const dragControls = useDragControls();

  return (
    <div className="bg-light_grey rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          className="flex items-center gap-2 text-grey text-base font-bold"
        >
          {/* prettier-ignore */}
          <ReactSVG src="/assets/icon-drag-and-drop.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", "Drag and Drop"); }} />
          <span>Link #{index + 1}</span>
        </button>
        <button
          onClick={handleRemoveLink}
          type="button"
          className="text-grey text-base"
        >
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
          <span className="text-dark_grey text-base">{platform}</span>
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
                {remaining.map((p) => {
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
          name={platform}
          defaultValue={url}
        />
        {/* prettier-ignore */}
        <ReactSVG className="absolute left-4 bottom-4" src="/assets/icon-link.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", "Link"); }} />
      </div>
    </div>
  );
}
