"use client";

import Image from "next/image";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { ReactSVG } from "react-svg";

export default function LinkInput({
  index,
  link,
  serverLinks,
  setClientLinks,
  allPlatforms,
  unusedPlatforms,
}) {
  const platform = link.split("%")[0];
  const url = link.split("%")[1];

  const [newUrl, setNewUrl] = useState("");

  const icon = allPlatforms.find((p) => p.platform === platform).icon;
  const dragControls = useDragControls();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false), false);

  const changePlatform = ({ target }) => {
    setClientLinks((prev) => {
      const newLinks = [...prev];

      const potentialUrl = serverLinks
        .find((link) => {
          return link.split("%")[0] === target.textContent;
        })
        ?.split("%")[1];

      console.log(potentialUrl);

      newLinks[index] = `${target.textContent}%${
        potentialUrl ? potentialUrl : ""
      }`;

      return newLinks;
    });
  };

  const removeLink = () => {
    setClientLinks((prev) => {
      const newLinks = [...prev];
      newLinks.splice(index, 1);
      return newLinks;
    });
  };

  return (
    <Reorder.Item value={link} dragListener={false} dragControls={dragControls}>
      <div className="bg-light_grey rounded-xl p-5 shadow-box">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            className="flex items-center gap-2 text-grey text-base font-bold"
            onPointerDown={(event) => dragControls.start(event)}
          >
            {/* prettier-ignore */}
            <ReactSVG src="/assets/icon-drag-and-drop.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", "Drag and Drop"); }} />
            <span>Link #{index + 1}</span>
          </button>
          <button
            onClick={removeLink}
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
            <div
              className="absolute z-10 top-[84px] w-full overflow-y-scroll no-scrollbar bg-white rounded-lg border border-borders shadow-dropDown"
              ref={ref}
            >
              <ul className="px-4 py-1 divide-y divide-borders">
                {unusedPlatforms.map((p) => {
                  return (
                    <li key={p.platform}>
                      <button
                        className="w-full h-12 flex items-center justify-start text-left gap-3 text-base text-dark_grey hover:text-purple group"
                        type="button"
                        onClick={changePlatform}
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
            onChange={({ target }) => setNewUrl(target.value)}
          />
          {/* prettier-ignore */}
          <ReactSVG className="absolute left-4 bottom-4" src="/assets/icon-link.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", "Link"); }} />
        </div>
      </div>
    </Reorder.Item>
  );
}
