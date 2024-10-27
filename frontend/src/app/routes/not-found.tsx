import Logo from "@/components/ui/logo";
import { NavLink } from "react-router-dom";

export function NotFoundRoute() {
  return (
    <main className="bg-grey-light">
      <div
        className="
          max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section
          sm:bg-transparent sm:p-0 sm:shadow-none
          sm:flex sm:flex-col sm:justify-center sm:py-20"
      >
        <NavLink
          to="/"
          className="
            block w-fit mx-auto mb-16 sm:mb-[51px] rounded-xl px-2 py-1
            transition focus:outline-none ring-2 ring-transparent focus:ring-purple"
        >
          <Logo size="large" />
        </NavLink>
        <div className="sm:bg-white sm:p-10 sm:rounded-xl sm:shadow-section">
          <section>
            <h1>404 - Page Not Found</h1>
            <p>Whoops! This link is missing in action.</p>
            <NavLink to="/">Find your way!</NavLink>
          </section>
        </div>
      </div>
    </main>
  );
}
