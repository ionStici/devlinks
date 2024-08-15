import CtaSection from "./_components/CtaSection";
import FeaturesSection from "./_components/FeaturesSection";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";

export default function page() {
  return (
    <div className="bg-light_grey md:px-10 md:py-20">
      <main
        id="home"
        className="max-w-[1100px] mx-auto bg-white shadow-section rounded-2xl"
      >
        <HeroSection />
        <div aria-hidden="true" className="h-40" />
        <FeaturesSection />
        <div aria-hidden="true" className="h-40" />
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
}
