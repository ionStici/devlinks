import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../ui/logo';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-grey-light">
      <div
        className="
        max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section
        sm:flex sm:flex-col sm:justify-center sm:py-20
        sm:bg-transparent sm:p-0 sm:shadow-none"
      >
        <NavLink
          to="/auth/login"
          className="block w-fit mx-auto mb-16 sm:mb-[51px]
          transition duration-200 focus:outline-none rounded-xl
          ring-2 ring-transparent focus:ring-purple px-2 py-1"
        >
          <Logo size="large" />
        </NavLink>
        <div className="sm:bg-white sm:p-10 sm:rounded-xl sm:shadow-section">
          {children}
        </div>
      </div>
    </main>
  );
}
