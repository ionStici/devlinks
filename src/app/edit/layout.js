import NavigationBar from "@/components/ui/NavigationBar";
import PhoneMockup from "@/components/ui/PhoneMockup";

export default function Layout({ children }) {
  return (
    <main className="md:m-6">
      <NavigationBar />

      <div className="max-w-[1392px] flex gap-6 m-4 md:my-6 md:mx-auto rounded-xl">
        <section className="hidden items-center justify-center bg-white min-w-[348px] max-w-[560px] flex-grow">
          <PhoneMockup />
        </section>

        {children}
      </div>
    </main>
  );
}
