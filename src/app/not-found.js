import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section sm:bg-transparent sm:p-0 sm:shadow-none sm:flex sm:justify-center sm:flex-col sm:py-20">
      <Link
        href="/"
        className="block w-fit mx-auto mb-16 sm:mb-[51px] rounded-lg transition px-[6px] focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-4"
      >
        <Logo size="large" />
      </Link>
      <div className="sm:bg-white sm:p-10 sm:rounded-xl sm:shadow-section">
        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-semibold text-dark_grey mb-5 border-b-2 border-red px-2">
            404 - Page Not Found
          </h1>
          <p className="text-grey text-xl mb-10">
            Whoops! This link is missing in action.
          </p>
          <Link
            href="/"
            className="flex items-center justify-center w-[200px] h-[46px] rounded-lg bg-purple text-white text-base hover:bg-purple_hover hover:shadow-input transition focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2"
          >
            Find your way!
          </Link>
        </section>
      </div>
    </main>
  );
}
