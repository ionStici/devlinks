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

  const platformData = allPlatforms.find(({ platform: p }) => p === platform);
  const { icon, placeholder, regex } = platformData;

  const dragControls = useDragControls();
  const ref = useOutsideClick(() => setIsOpen(false), false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(url);
  const [inputError, setInputError] = useState("");

  const handleValidation = () => {
    if (input === "") {
      setInputError("Can't be empty");
    } else if (!regex.test(input)) setInputError("Invalid URL");
  };

  const changePlatform = ({ target }) => {
    setClientLinks((prev) => {
      const newLinks = [...prev];

      const potentialUrl = serverLinks
        .find((link) => link.split("%")[0] === target.textContent)
        ?.split("%")[1];

      newLinks[index] = `${target.textContent}%${potentialUrl || ""}`;
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

  const openDropDown = () => {
    if (unusedPlatforms.length === 0) return;
    setIsOpen((p) => !p);
  };

  return (
    <Reorder.Item value={link} dragListener={false} dragControls={dragControls}>
      <div className="bg-light_grey rounded-xl p-5 shadow-box">
        <div className="flex items-center justify-between mb-3">
          <button
            tabIndex={-1}
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
            className="text-grey text-base px-[2px] transition hover:text-red focus:outline-none focus:text-red hover:shadow-remove"
          >
            Remove
          </button>
        </div>

        <div className="mb-3">
          <p className="block text-dark_grey text-xs mb-1">Platform</p>
          <button
            className={`flex items-center w-full min-h-12 py-2 rounded-lg border border-borders bg-white px-4 text-left transition focus:outline-none ${
              isOpen || unusedPlatforms.length === 0
                ? ""
                : "hover:border-purple hover:shadow-input focus:border-purple"
            }`}
            type="button"
            onClick={openDropDown}
          >
            {/* prettier-ignore */}
            <ReactSVG src={icon} className="fill-grey mr-3" beforeInjection={(svg) => { svg.setAttribute("aria-label", `${platform} Logo`); }} />
            <span className="text-dark_grey text-base mr-3">{platform}</span>
            {/* prettier-ignore */}
            <ReactSVG className={`ml-auto transition ${isOpen ? "rotate-180" : ""}`} src="/assets/icon-chevron-down.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", 'Arrow'); }} />
          </button>
          <div className="relative">
            {isOpen && (
              <div
                className="absolute z-10 top-4 w-full bg-white rounded-lg border border-borders shadow-dropDown"
                ref={ref}
              >
                <ul className="divide-y divide-borders">
                  {unusedPlatforms.map((p) => {
                    return (
                      <li key={p.platform}>
                        <button
                          className="w-full h-12 px-4 rounded-lg flex items-center justify-start gap-3 text-left text-base bg-white text-dark_grey hover:text-purple group transition relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple focus:scale-105 active:ring-0 active:scale-100"
                          type="button"
                          onClick={changePlatform}
                        >
                          {/* prettier-ignore */}
                          <ReactSVG src={p.icon} className="fill-grey group-hover:fill-purple pointer-events-none" beforeInjection={(svg) => { svg.setAttribute("aria-label", `${p.platform} Logo`); }} />
                          {p.platform}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor={platform}
            className="block text-dark_grey text-xs mb-1"
          >
            Link
          </label>
          <input
            className={`w-full h-12 rounded-lg border border-borders pl-[44px] text-base text-dark_grey placeholder-dark_grey/50 transition hover:border-purple hover:shadow-input focus:outline-none focus:border-purple ${
              inputError ? "!border-red !shadow-none" : ""
            }`}
            type="text"
            name={platform}
            id={platform}
            defaultValue={url}
            placeholder={placeholder}
            onChange={({ target }) => setInput(target.value)}
            onBlur={handleValidation}
            onFocus={() => setInputError(false)}
          />
          {inputError && (
            <p className="absolute right-0 top-0 sm:top-auto sm:bottom-4 sm:right-3 text-red text-xs">
              {inputError}
            </p>
          )}
          {/* prettier-ignore */}
          <ReactSVG className="absolute left-4 bottom-4" src="/assets/icon-link.svg" beforeInjection={(svg) => { svg.setAttribute("aria-label", "Link"); }} />
        </div>
      </div>
    </Reorder.Item>
  );
}
