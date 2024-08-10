import Logo from "@/ui/Logo";
import Link from "next/link";

export default async function Layout({ children }) {
  return (
    <main className="max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section sm:bg-transparent sm:p-0 sm:shadow-none sm:flex sm:justify-center sm:flex-col sm:py-20">
      <Link href="/" className="flex justify-center mb-16 sm:mb-[51px]">
        <Logo size="large" />
      </Link>
      <div className="sm:bg-white sm:p-10 sm:rounded-xl sm:shadow-section">
        {children}
      </div>
    </main>
  );
}
