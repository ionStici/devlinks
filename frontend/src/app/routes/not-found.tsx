import { Head } from '@/components/seo';
import Logo from '@/components/ui/logo';
import { NavLink } from 'react-router-dom';

export function NotFoundRoute() {
  return (
    <main className="bg-grey-light">
      <Head
        title="Page not Found"
        description="This page does not exist or was moved."
      />
      <div
        className="
        max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section
        sm:flex sm:flex-col sm:justify-center sm:py-20
        sm:bg-transparent sm:p-0 sm:shadow-none"
      >
        <NavLink
          to="/"
          className="block w-fit mx-auto mb-16 sm:mb-[51px]
          transition duration-200 focus:outline-none rounded-xl
          ring-2 ring-transparent focus:ring-purple px-2 py-1"
        >
          <Logo size="large" />
        </NavLink>
        <div className="sm:bg-white sm:p-10 sm:rounded-xl sm:shadow-section">
          <section className="flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-semibold text-dark-grey mb-5 border-b-2 border-red px-2">
              404 - Page Not Found
            </h1>
            <p className="text-grey text-xl mb-10">
              Whoops! This link is missing in action.
            </p>
            <NavLink
              to="/"
              className="flex items-center justify-center
              w-[200px] h-[46px] rounded-lg bg-purple text-white 
              transition duration-200 hover:bg-purple-hover hover:shadow-input
              focus:outline-none ring-[2px] ring-offset-2 ring-transparent focus:ring-purple"
            >
              Find your way!
            </NavLink>
          </section>
        </div>
      </div>
    </main>
  );
}
