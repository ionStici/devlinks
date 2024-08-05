import Link from "next/link";
import SubmitButton from "./SubmitButton";

export default function Form({ children, header, action, btnText, footer }) {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-dark_grey mb-2 text-2xl font-bold md:text-[32px] md:leading-10">
          {header[0]}
        </h1>
        <p className="text-grey text-base">{header[1]}</p>
      </div>

      <form action={action} className="flex flex-col gap-6 mb-6">
        {children}

        <SubmitButton>{btnText}</SubmitButton>
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
    </>
  );
}
