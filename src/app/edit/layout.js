import NavigationBar from "@/components/ui/NavigationBar";
import PhoneMockup from "@/components/ui/PhoneMockup";

export default function Layout({ children }) {
  return (
    <main className="sm:m-6">
      <NavigationBar />
      <div className="max-w-[1392px] flex gap-6 md:mx-auto m-4 sm:m-0">
        <PhoneMockup />
        {children}
      </div>
    </main>
  );
}
