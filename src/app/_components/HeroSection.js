import Link from "next/link";
import Image from "next/image";
import Logo from "@/ui/Logo";

export default function HeroSection() {
  return (
    <section className="pt-6">
      <header className="max-w-[660px] mx-auto flex items-center justify-between px-6 mb-20">
        <Link
          className="rounded-lg focus:outline-none focus:ring-2 focus:ring-purple py-[2px] pl-1 pr-[6px] -ml-1"
          href="/"
        >
          <Logo size="large" />
        </Link>
        <Link
          className="font-semibold text-purple border-2 border-purple rounded-lg py-2 px-[16px] transition hover:!bg-purple hover:text-white focus:outline-none focus:bg-light_purple"
          href="/auth/login"
        >
          Login
        </Link>
      </header>

      <div className="max-w-[660px] mx-auto mb-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Your Developer Profile Hub</h1>
        <p className="text-grey">
          Create and share your personalized profile with links to all your
          developer platforms.
        </p>
      </div>

      <div>
        <div className="bg-light_purple">
          <div className="max-w-[350px] mx-auto px-14 py-8 mb-16">
            <Image
              className="size-full"
              src="/assets/illustration-profile.svg"
              alt="Illustration Developer Profile"
              width={525}
              height={610}
            />
          </div>
        </div>

        <div className="flex flex-col items-center max-w-[225px] mx-auto sm:max-w-[470px] sm:items-start">
          <p className="mb-3 text-lg text-grey sm:ml-[58px]">Be a part of it</p>
          <div className="w-full sm:flex sm:justify-between">
            <Link
              className="flex items-center justify-center max-w-[225px] w-full h-14 text-xl font-semibold text-white bg-purple rounded-lg mb-5 transition focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-4"
              href="/auth/signup"
            >
              Create Your Profile
            </Link>
            <Link
              className="flex items-center justify-center max-w-[225px] w-full h-14 text-lg font-medium text-purple border-2 border-purple rounded-lg transition hover:bg-light_purple focus:outline-none focus:bg-light_purple"
              href="#features"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
