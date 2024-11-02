import { Platform as PlatformData } from '@/types/platform';
import {
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { ReactSVG } from 'react-svg';
import iconDragAndDrop from '@/assets/icons/icon-drag-and-drop.svg';
import iconChevronDown from '@/assets/icons/icon-chevron-down.svg';
import iconLink from '@/assets/icons/icon-link.svg';

type LinkInputProps = {
  index: number;
  link: string;
  allPlatforms: PlatformData[];
  unusedPlatforms: PlatformData[];
  setClientLinks: Dispatch<SetStateAction<string[]>>;
  serverLinks: string[];
};

export function LinkInput({
  index,
  link,
  serverLinks,
  setClientLinks,
  allPlatforms,
  unusedPlatforms,
}: LinkInputProps) {
  const platform = link.split('%')[0];
  const url = link.split('%')[1];

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(url);
  const [inputError, setInputError] = useState('');

  const platformData = allPlatforms.find(({ platform: p }) => p === platform)!;
  const { icon, placeholder, domains } = platformData;

  const dragControls = useDragControls();
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const handleValidation = () => {
    if (domains.length === 0 || input === '') return;

    if (!domains.some((domain) => input.toLowerCase().includes(domain))) {
      setInputError('Invalid URL');
    }
  };

  const changePlatform = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.currentTarget as HTMLButtonElement;
    const platformName = buttonElement.textContent || '';

    setClientLinks((prev: string[]) => {
      const newLinks = [...prev];

      const potentialUrl = serverLinks
        .find((link) => link.split('%')[0] === platformName)
        ?.split('%')[1];

      newLinks[index] = `${platformName}%${potentialUrl || ''}`;
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
      <div className="bg-grey-light rounded-xl p-5 shadow-box">
        <div className="flex items-center justify-between mb-3">
          <button
            tabIndex={-1}
            type="button"
            className="select-none flex items-center gap-2 text-grey text-base font-bold"
            onPointerDown={(event) => dragControls.start(event)}
          >
            {/* prettier-ignore */}
            <ReactSVG className="select-none" src={iconDragAndDrop} beforeInjection={(svg) => { svg.setAttribute("aria-label", "Drag and Drop"); }} />
            <span className="select-none">Link #{index + 1}</span>
          </button>
          <button
            onClick={removeLink}
            type="button"
            className="text-grey text-base px-[2px] transition duration-200 hover:text-red focus:outline-none focus:text-red hover:shadow-remove"
          >
            Remove
          </button>
        </div>

        <div className="mb-3">
          <p className="block text-dark-grey text-xs mb-1">Platform</p>
          <button
            className={`flex items-center w-full min-h-12 py-2 rounded-lg border border-borders bg-white px-4 text-left transition duration-200 focus:outline-none ${
              isOpen || unusedPlatforms.length === 0
                ? ''
                : 'hover:border-purple hover:shadow-input focus:border-purple'
            }`}
            type="button"
            onClick={openDropDown}
          >
            {/* prettier-ignore */}
            <ReactSVG src={icon} className="fill-grey mr-3 w-4 h-4" beforeInjection={(svg) => { svg.setAttribute("aria-label", `${platform} Logo`); }} />
            <span className="text-dark-grey text-base mr-3">{platform}</span>
            {/* prettier-ignore */}
            <ReactSVG className={`ml-auto transition ${isOpen ? "rotate-180" : ""}`} src={iconChevronDown} beforeInjection={(svg) => { svg.setAttribute("aria-label", 'Arrow'); }} />
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
                          className="w-full h-12 px-4 rounded-lg flex items-center justify-start gap-3 text-left text-base bg-white text-dark-grey hover:text-purple group transition duration-200 relative focus:z-10 focus:outline-none ring-2 ring-transparent focus:ring-purple focus:scale-105 active:ring-0 active:scale-100"
                          type="button"
                          onClick={changePlatform}
                        >
                          {/* prettier-ignore */}
                          <ReactSVG src={p.icon} className="w-4 h-4 fill-grey group-hover:fill-purple pointer-events-none" beforeInjection={(svg) => { svg.setAttribute("aria-label", `${p.platform} Logo`); }} />
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
            className="block text-dark-grey text-xs mb-1"
          >
            Link
          </label>
          <input
            className={`w-full h-12 rounded-lg border border-borders pl-[44px] pr-3 text-base text-dark-grey placeholder-dark-grey/50 transition duration-200 hover:border-purple hover:shadow-input focus:outline-none focus:border-purple ${
              inputError ? '!border-red !shadow-none' : ''
            }`}
            type="text"
            name={platform}
            id={platform}
            defaultValue={url}
            placeholder={placeholder}
            onChange={({ target }) => setInput(target.value)}
            onBlur={handleValidation}
            onFocus={() => setInputError('')}
          />
          {inputError && (
            <p className="absolute right-0 top-0 sm:top-auto sm:bottom-2 sm:py-2 sm:right-3 text-red text-xs sm:bg-white">
              {inputError}
            </p>
          )}
          {/* prettier-ignore */}
          <ReactSVG className="absolute left-4 bottom-4" src={iconLink} beforeInjection={(svg) => { svg.setAttribute("aria-label", "Link"); }} />
        </div>
      </div>
    </Reorder.Item>
  );
}
