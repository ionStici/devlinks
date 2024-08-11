import Logo from "@/ui/Logo";
import Link from "next/link";

export default function LogoBottom() {
  return (
    <div className="flex justify-center w-full mt-20 xs:hidden">
      <Link
        className="rounded-lg transition px-[6px] focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-4"
        href="/"
      >
        <Logo size="large" />
      </Link>
    </div>
  );
}
