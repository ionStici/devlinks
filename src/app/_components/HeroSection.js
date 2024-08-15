import Link from "next/link";
import Image from "next/image";
import Logo from "@/ui/Logo";

export default function HeroSection() {
  return (
    <section className="pt-6 md:pt-10">
      <header className="flex items-center justify-between mb-20 px-6 md:px-10">
        <Link
          className="rounded-lg focus:outline-none focus:ring-2 focus:ring-purple py-[2px] pl-1 pr-[6px] -ml-1"
          href="/"
        >
          <Logo size="large" />
        </Link>
        <Link
          className="font-semibold text-purple border-2 border-purple rounded-lg py-2 px-[16px] md:text-lg md:px-5 transition hover:!bg-purple hover:text-white focus:outline-none focus:ring-4 focus:ring-light_purple focus:ring-inset"
          href="/auth/login"
        >
          Login
        </Link>
      </header>

      <div className="mb-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3 md:text-5xl md:mb-4">
          Your Developer Profile Hub
        </h1>
        <p className="text-grey md:text-lg">
          Create and share your personalized profile with links to all your
          developer platforms.
        </p>
      </div>

      <div className="bg-light_purple">
        <div className="max-w-[350px] mx-auto px-14 py-8 mb-16 md:max-w-[375px]">
          <Image
            className="size-full"
            src="/assets/illustration-profile.svg"
            alt="Illustration Developer Profile"
            width={525}
            height={610}
          />
        </div>
      </div>

      <div className="flex flex-col items-center max-w-[225px] mx-auto sm:max-w-[470px] sm:items-start md:max-w-[550px]">
        <p className="mb-3 text-lg text-grey sm:ml-[78px]">Be a part of it</p>
        <div className="w-full sm:flex gap-5">
          <Link
            className="flex items-center justify-center w-full h-14 md:h-16 text-xl font-semibold text-white bg-purple rounded-lg mb-5 sm:mb-0 transition focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-4 hover:ring-2 hover:ring-purple hover:ring-offset-4"
            href="/auth/signup"
          >
            Create Your Profile
          </Link>
          <Link
            className="flex items-center justify-center w-full h-14 md:h-16 text-lg font-medium text-purple border-2 border-purple rounded-lg transition hover:ring-8 hover:ring-light_purple hover:ring-inset focus:outline-none focus:ring-8 focus:ring-light_purple focus:ring-inset"
            href="#features"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
