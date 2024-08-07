import { ReactSVG } from "react-svg";

export default function DropDown({ platforms }) {
  return (
    <div className="absolute z-10 w-full h-[343px] overflow-y-scroll no-scrollbar bg-white rounded-lg border border-borders shadow-dropDown">
      <ul className="px-4 pt-3">
        {platforms.map((p) => {
          return (
            <li className="mb-3 pb-3 border-b border-borders">
              <button
                className="w-full flex items-center justify-start text-left gap-3 text-base text-dark_grey"
                type="button"
              >
                <ReactSVG src={p.icon} />
                <span>{p.platform}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
