import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section id="features" className="max-w-[510px] mx-auto px-6">
      <div className="mb-20">
        <p className="uppercase tracking-widest text-sm text-purple font-semibold mb-1">
          Features
        </p>
        <h2 className="text-3xl font-bold">How devlinks Works</h2>
      </div>

      <div className="flex flex-col gap-28">
        <div>
          <div className="mb-16">
            <p className="text-[60px] font-bold tracking-[10px] text-borders mb-6">
              01
            </p>
            <h3 className="mb-5 text-xl font-semibold">
              Build a Profile That Showcases Your Skills
            </h3>
            <p className="text-grey">
              Personalize your profile with a photo, bio, and key details to
              highlight your developer journey. Make an impact with a
              well-crafted digital identity.
            </p>
          </div>
          <div className="max-w-[400px] px-6 mx-auto">
            <Image
              className="size-full"
              src="/assets/illustration-signup.svg"
              alt="Illustration Signup"
              width={751}
              height={539}
            />
          </div>
        </div>

        <div>
          <div className="mb-16">
            <p className="text-[60px] font-bold tracking-[10px] text-borders mb-6">
              02
            </p>
            <h3 className="mb-5 text-xl font-semibold">
              Link All Your Developer Accounts
            </h3>
            <p className="text-grey">
              Easily add and manage up to 15 social links, including GitHub,
              LinkedIn, and more. Centralize your online presence in one place.
            </p>
          </div>
          <div className="max-w-[400px] px-6 mx-auto">
            <Image
              className="size-full"
              src="/assets/illustration-profile-links.svg"
              alt="Illustration Signup"
              width={538}
              height={520}
            />
          </div>
        </div>

        <div>
          <div className="mb-16">
            <p className="text-[60px] font-bold tracking-[10px] text-borders mb-6">
              03
            </p>
            <h3 className="mb-5 text-xl font-semibold">
              Share and Get Noticed
            </h3>
            <p className="text-grey">
              Obtain a unique URL to share your profile anywhere — on resumes,
              portfolios, or social media. Keep your developer identity
              accessible and visible.
            </p>
          </div>
          <div className="max-w-[400px] px-6 mx-auto">
            <Image
              className="size-full"
              src="/assets/illustration-share.svg"
              alt="Illustration Share"
              width={723}
              height={494}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
