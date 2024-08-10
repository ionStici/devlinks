"use client";

import Logo from "@/ui/Logo";

export default function Error({ error, reset }) {
  return (
    <main className="max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section md:bg-transparent md:p-0 md:shadow-none md:flex md:justify-center md:flex-col md:py-20">
      <div className="flex justify-center mb-16 md:mb-[51px]">
        <Logo size="large" />
      </div>
      <div className="md:bg-white md:p-10 md:rounded-xl md:shadow-section">
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
