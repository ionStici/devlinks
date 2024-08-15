import Image from "next/image";
import Feature from "./Feature";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="max-w-[510px] mx-auto px-6 md:max-w-full md:px-10"
    >
      <div className="mb-20 md:mb-24">
        <p className="uppercase tracking-widest text-sm text-purple font-semibold mb-1 md:text-base">
          Features
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">How devlinks Works</h2>
      </div>

      <div className="flex flex-col gap-28">
        <Feature
          num="01"
          title="Build a Profile That Showcases Your Skills"
          text="Personalize your profile with a photo, bio, and key details to
              highlight your developer journey. Make an impact with a
              well-crafted digital identity."
          img="/assets/illustration-signup.svg"
          imgAlt="Illustration Signup"
          imgWidth={751}
          imgHeight={540}
        />
        <Feature
          num="02"
          title="Link All Your Developer Accounts"
          text="Easily add and manage up to 15 social links, including GitHub,
              LinkedIn, and more. Centralize your online presence in one place."
          img="/assets/illustration-profile-links.svg"
          imgAlt="Illustration Signup"
          imgWidth={538}
          imgHeight={520}
        />
        <Feature
          num="03"
          title="Share and Get Noticed"
          text="Obtain a unique URL to share your profile anywhere — on resumes,
              portfolios, or social media. Keep your developer identity
              accessible and visible."
          img="/assets/illustration-share.svg"
          imgAlt="Illustration Share"
          imgWidth={722}
          imgHeight={494}
        />
      </div>
    </section>
  );
}
