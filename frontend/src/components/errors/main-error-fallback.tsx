import { NavLink } from 'react-router-dom';
import Logo from '../ui/logo';

export function MainErrorFallback() {
  return (
    <main className="bg-grey-light" role="alert">
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
            <p className="text-grey mb-2">Oops, something went wrong</p>
            <h1 className="text-2xl font-semibold text-dark-grey mb-10 border-b-2 border-red px-2">
              500 - Internal Error
            </h1>
            <p className="text-grey text-base mb-2">We suggest to</p>
            <NavLink
              to="/"
              className="flex items-center justify-center w-[200px] h-[46px] rounded-lg bg-purple text-white transition duration-200 focus:outline-none hover:bg-purple-hover hover:shadow-input ring-[2px] ring-transparent ring-offset-2 focus:ring-purple"
            >
              Try Again!
            </NavLink>
          </section>
        </div>
      </div>
    </main>
  );
}
