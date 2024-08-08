import Image from "next/image";

export default function GetStarted() {
  return (
    <div className="bg-light_grey rounded-xl mx-6 px-5 py-[46.5px] sm:py-[82.5px] lg:py-[62.5px]">
      <div className="relative w-[125px] h-[80px] sm:w-[250px] sm:h-[161px] mx-auto mb-6 sm:mb-10">
        <Image src="/assets/illustration-empty.svg" fill alt="" />
      </div>
      <div className="text-center max-w-[488px] mx-auto">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
          Let's get you started
        </h2>
        <p className="text-base text-grey">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
