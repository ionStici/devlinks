"use client";

import Link from "next/link";
import Logo from "@/ui/Logo";

export default function Error({ error, reset }) {
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
          <p className="text-grey text-base mb-2">
            The server has something to say
          </p>
          <h1 className="text-2xl font-semibold text-dark_grey mb-10 border-b-2 border-red px-2">
            {error.message}
          </h1>
          <p className="text-grey text-base mb-2">We suggest to</p>
          <button
            onClick={reset}
            className="w-[200px] h-[46px] rounded-lg bg-purple text-white text-base disabled:bg-borders hover:bg-purple_hover hover:shadow-input transition disabled:shadow-none focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2"
          >
            Try Again!
          </button>
        </section>
      </div>
    </main>
  );
}
