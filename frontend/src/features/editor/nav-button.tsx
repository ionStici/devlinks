import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

type NavButtonProps = {
  children: React.ReactNode;
  icon: string;
  href: string;
};

export function NavButton({ children, icon, href }: NavButtonProps) {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <li className={`rounded-lg ${isActive ? 'bg-purple-light' : ''}`}>
      <NavLink
        to={href}
        className={`flex items-center gap-2 py-[11px] px-[27px] group text-grey font-semibold rounded-lg transition duration-200 focus:outline-none ring-2 ring-transparent ring-inset hover:text-purple hover:!ring-0 ${
          isActive
            ? 'text-purple focus:!ring-0 ring-transparent'
            : 'focus:ring-purple'
        }`}
        tabIndex={isActive ? -1 : 0}
      >
        <ReactSVG
          src={icon}
          beforeInjection={(svg) => {
            svg.setAttribute('aria-label', String(children));
          }}
          className={`transition duration-200 ${
            isActive ? 'fill-purple' : 'fill-grey group-hover:fill-purple'
          } `}
        />
        <span className="hidden md:inline">{children}</span>
      </NavLink>
    </li>
  );
}
