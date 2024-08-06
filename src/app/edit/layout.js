import NavigationBar from "@/components/ui/NavigationBar";
import PhoneMockup from "@/components/ui/PhoneMockup";

export default function Layout({ children }) {
  return (
    <main>
      <div className="mt-6 md:mx-6">
        <NavigationBar />
      </div>
      <div className="m-4 md:m-6">{children}</div>
    </main>
  );
}
