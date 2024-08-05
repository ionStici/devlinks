import Logo from "@/components/auth/Logo";

export default function Layout({ children }) {
  return (
    <section className="max-w-[476px] mx-auto bg-white min-h-dvh p-8 shadow-section md:bg-transparent md:p-0 md:shadow-none md:flex md:justify-center md:flex-col md:py-20">
      <div className="flex justify-center mb-16 md:mb-[51px]">
        <Logo size="large" />
      </div>
      {children}
    </section>
  );
}
