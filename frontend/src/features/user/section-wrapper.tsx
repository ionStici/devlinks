import Logo from '@/components/ui/logo';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export function SectionWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-center justify-center xs:min-w-dvh xs:min-h-dvh xs:bg-profileGradient
      xs:px-6 xs:pt-[75px] xs:pb-[125px]"
    >
      <div className="flex-grow">
        <NavLink
          className="hidden xs:block w-fit mx-auto mb-10 rounded-xl transition px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple"
          to="/"
        >
          <Logo size="large" />
        </NavLink>

        <section className="relative min-h-dvh min-w-dvh mx-auto bg-white px-6 py-12 xs:max-w-[375px] xs:min-h-[600px] xs:rounded-3xl xs:shadow-profileBox">
          {children}
        </section>

        <div className="xs:hidden flex items-center justify-center border-t border-borders shadow-box pt-6 pb-10">
          <NavLink
            to="/"
            className="w-fit rounded-xl transition px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple"
          >
            <Logo size="large" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
