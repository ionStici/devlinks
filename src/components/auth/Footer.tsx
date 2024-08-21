import Link from "next/link";

type FooterProps = {
  text: string;
  btn: string;
  href: string;
};

export default function Footer({ text, btn, href }: FooterProps) {
  return (
    <footer className="text-center sm:flex sm:justify-center sm:gap-1">
      <p className="text-grey text-base">{text}</p>
      <Link
        href={href}
        className="text-base text-purple pl-[2px] pr-[3px] rounded-[3px] focus:outline-none focus:ring-[1px] focus:ring-purple"
      >
        {btn}
      </Link>
    </footer>
  );
}
