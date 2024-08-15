import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="bg-purple shadow-layout px-6 pt-10 pb-12 text-white md:px-10 md:py-20">
      <h2 className="mb-3 text-3xl font-semibold md:text-4xl">
        Ready to Build Your Developer Presence?
      </h2>
      <p className="text-light_grey mb-10 md:mb-16 md:text-lg">
        Join devlinks today and start creating a profile that showcases your
        skills and connects you with the tech community.
      </p>
      <Link
        className="flex items-center justify-center bg-white text-purple h-14 md:h-16 rounded-lg text-lg md:text-2xl font-medium mb-3 shadow-profileBox md:mb-6 transition hover:-translate-y-1 hover:scale-[1.02] active:-translate-y-0 active:scale-[1] focus:outline-none focus:ring-8 focus:ring-light_purple focus:ring-inset"
        href="/auth/signup"
      >
        Create Your Profile
      </Link>

      <p className="text-borders text-center md:text-lg">
        Get started in minutes. It's free and easy to use.
      </p>
    </section>
  );
}
