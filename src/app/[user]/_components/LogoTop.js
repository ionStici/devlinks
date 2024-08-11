import Logo from "@/ui/Logo";
import Link from "next/link";

export default function LogoTop() {
  return (
    <div className="hidden xs:flex justify-center w-full absolute z-20 left-[50%] translate-x-[-50%] -top-[100px]">
      <Link
        className="rounded-lg transition px-[6px] focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-4"
        href="/"
      >
        <Logo size="large" />
      </Link>
    </div>
  );
}
