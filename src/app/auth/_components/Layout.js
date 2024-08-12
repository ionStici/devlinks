import Logo from "@/ui/Logo";
import Link from "next/link";

export default async function Layout({ children }) {
  return (
    <main className="max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section sm:bg-transparent sm:p-0 sm:shadow-none sm:flex sm:justify-center sm:flex-col sm:py-20">
      <Link
        href="/"
        className="block w-fit mx-auto mb-16 sm:mb-[51px] rounded-xl transition px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple"
      >
        <Logo size="large" />
      </Link>
      <div className="sm:bg-white sm:p-10 sm:rounded-xl sm:shadow-section">
        {children}
      </div>
    </main>
  );
}
