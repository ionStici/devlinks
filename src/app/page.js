import FeaturesSection from "./_components/FeaturesSection";
import HeroSection from "./_components/HeroSection";

export default function page() {
  return (
    <main className="max-w-[1100px] mx-auto">
      <HeroSection />

      <div aria-hidden="true" className="h-40" />

      <FeaturesSection />

      <div aria-hidden="true" className="h-40" />
    </main>
  );
}
