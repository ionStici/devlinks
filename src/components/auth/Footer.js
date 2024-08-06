import Link from "next/link";

export default function Footer({ text, btn, href }) {
  return (
    <div className="text-center md:flex md:justify-center md:gap-1">
      <p className="text-grey text-base md:mb-0">{text}</p>
      <Link
        className="text-base text-purple px-[2px] rounded-sm focus:outline-none focus:ring-[1px] focus:ring-purple"
        href={href}
      >
        {btn}
      </Link>
    </div>
  );
}
