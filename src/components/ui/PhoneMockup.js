import Image from "next/image";

export default function PhoneMockup() {
  return (
    <section className="hidden lg:flex items-center justify-center rounded-xl shadow-section bg-white md:h-[834px] min-w-[348px] max-w-[560px] flex-grow">
      <div>
        <Image
          src="/assets/illustration-phone-mockup.svg"
          alt="Phone Mockup"
          width={308}
          height={632}
        />
      </div>
    </section>
  );
}
