import Logo from "./Logo";
import Link from "next/link";

export default function Form({ children, header, action, btnText, footer }) {
  return (
    <section className="max-w-[476px] mx-auto bg-white min-h-dvh p-8 shadow-sm md:bg-transparent md:p-0 md:shadow-none md:flex md:justify-center md:flex-col md:py-20">
      <div className="flex justify-center mb-16 md:mb-[51px]">
        <Logo size="large" />
      </div>

      <div className="md:bg-white md:p-10 md:rounded-xl md:shadow-sm">
        <div className="mb-10">
          <h1 className="text-dark_grey mb-2 text-2xl font-bold md:text-[32px] md:leading-10">
            {header[0]}
          </h1>
          <p className="text-grey text-base">{header[1]}</p>
        </div>

        <form action={action} className="flex flex-col gap-6 mb-6">
          {children}

          <button className="h-[46px] rounded-lg bg-purple text-white text-base hover:bg-purple_hover hover:shadow-input transition focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2">
            {btnText}
          </button>
        </form>

        <div className="text-center md:flex md:justify-center md:gap-1">
          <p className="text-grey text-base md:mb-0">{footer[0]}</p>
          <Link
            className="text-base text-purple px-[2px] rounded-sm focus:outline-none focus:ring-[1px] focus:ring-purple"
            href={footer[2]}
          >
            {footer[1]}
          </Link>
        </div>
      </div>
    </section>
  );
}
