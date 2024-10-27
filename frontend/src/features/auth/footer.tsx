import { NavLink } from "react-router-dom";

type FooterProps = {
  text: string;
  btn: string;
  href: string;
};

export default function Footer({ text, btn, href }: FooterProps) {
  return (
    <footer className="text-center sm:flex sm:justify-center sm:gap-1">
      <p className="text-grey text-base">{text}</p>
      <NavLink
        to={href}
        className="text-base text-purple pl-[2px] pr-[3px] rounded-[3px] transition duration-200 focus:outline-none ring-[1px] ring-transparent focus:ring-purple"
      >
        {btn}
      </NavLink>
    </footer>
  );
}
