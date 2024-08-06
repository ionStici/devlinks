import Logo from "@/components/ui/Logo";

export default function Layout({ children }) {
  return (
    <main className="max-w-[476px] mx-auto p-8 min-h-dvh bg-white shadow-section md:bg-transparent md:p-0 md:shadow-none md:flex md:justify-center md:flex-col md:py-20">
      <div className="flex justify-center mb-16 md:mb-[51px]">
        <Logo size="large" />
      </div>
      <div className="md:bg-white md:p-10 md:rounded-xl md:shadow-section">
        {children}
      </div>
    </main>
  );
}
