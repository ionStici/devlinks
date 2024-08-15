"use client";

import Logo from "@/ui/Logo";
import Link from "next/link";
import FooterIcons from "./FooterIcons";

export default function Footer() {
  return (
    <footer className="px-6 py-24 sm:pt-20 lg:pt-22 md:px-10 lg:flex lg:justify-between">
      <div className="flex items-center gap-5 mb-20 lg:mb-0 lg:flex-col lg:items-start">
        <Link
          className="border-r border-borders pr-5 lg:border-r-0 lg:border-b lg:pr-0 lg:pb-5 transition focus:outline-none focus:scale-105 hover:scale-105"
          href="#home"
        >
          <Logo size="large" />
        </Link>
        <FooterIcons />
      </div>

      <div className="sm:flex sm:justify-between lg:w-[66%]">
        <div className="mb-20 sm:mb-0">
          <p className="text-xl font-medium mb-2">Quick Links</p>
          <ul className="text-lg text-grey pl-6 list-disc marker:text-grey space-y-1">
            {[
              { title: "Login", href: "/auth/login" },
              { title: "Signup", href: "/auth/signup" },
              { title: "Terms of Service", href: "/terms" },
              { title: "Profile Example", href: "/@ionstici" },
            ].map(({ title, href }) => {
              return (
                <li key={title}>
                  <Link
                    className="border-b border-transparent px-[2px] pb-[1px] transition hover:border-purple hover:text-purple focus:outline-none focus:border-purple focus:text-purple"
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="max-w-[410px] sm:max-w-[350px] md:max-w-[405px] lg:max-w-[300px]">
          <p className="text-xl font-medium mb-2">About Devlinks</p>
          <p className="text-grey">
            <span className="font-semibold leading-7">devlinks </span>
            is a web app crafted as a solution to a Frontend Mentor challenge,
            designed to help developers create and share personalized profiles
            with ease.
          </p>
        </div>
      </div>
    </footer>
  );
}
