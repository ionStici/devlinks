import Link from "next/link";

export default function NavLogo() {
  return (
    <div className="flex justify-center w-full absolute z-20 left-[50%] translate-x-[-50%] -bottom-20 xs:-top-[75px] border-t-2 py-5 border-borders">
      <Link href="/">
        <Logo size="large" />
      </Link>
    </div>
  );
}
