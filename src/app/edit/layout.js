import NavigationBar from "@/components/ui/NavigationBar";
import PhoneMockup from "@/components/ui/PhoneMockup";

export default function Layout({ children }) {
  return (
    <main className="sm:m-6">
      <NavigationBar />
      <div className="max-w-[1392px] flex gap-6 m-4 sm:m-0 md:mx-auto">
        <PhoneMockup />
        <section className="flex flex-col md:min-h-[874px] lg:min-h-[834px] max-w-[808px] mx-auto pt-6 pb-4 md:pt-10 md:pb-6 rounded-xl shadow-section bg-white flex-grow">
          {children}
        </section>
      </div>
    </main>
  );
}
