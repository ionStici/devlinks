import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions",
  description:
    "Read the Terms and Conditions for using devlinks, our friendly link-sharing platform. Understand your rights, responsibilities, and how we work together to keep devlinks a safe and enjoyable space for everyone.",
};

export default function Page() {
  return (
    <section className="flex flex-col gap-10 max-w-[720px] px-6 py-20 mx-auto text-dark_grey">
      <div>
        <h1 className="text-3xl font-bold">
          <Link className="text-purple" href="/">
            devlinks{" "}
          </Link>
          <span>| Terms and Conditions</span>
        </h1>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Welcome to devlinks!</h2>
        <p>
          Thank you for using devlinks, a fun and easy way to create your
          personalized developer profile. These Terms and Conditions
          (&quot;Terms&quot;) govern your use of our platform. By signing up for
          an account or using devlinks, you agree to these Terms, so please read
          them carefully.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-5">
          1. Your devlinks Account
        </h2>
        <h3 className="text-xl font-semibold mb-2">Creating an Account</h3>
        <p className="mb-5">
          To use devlinks, you&apos;ll need to create an account. During
          sign-up, we&apos;ll ask for some basic information such as a username
          and password. This helps personalize your experience and lets others
          connect with you.
        </p>
        <h3 className="text-xl font-semibold mb-2">
          Keeping Your Account Secure
        </h3>
        <p className="mb-5">
          You&apos;re responsible for keeping your account details safe. Please
          choose a strong password and don&apos;t share it with others. If you
          suspect any unauthorized use of your account, let us know right away.
        </p>
        <h3 className="text-xl font-semibold mb-2">Your Responsibilities</h3>
        <p>
          We want devlinks to be a positive and supportive space. Please be
          respectful when using the platform. This means no harmful content, no
          impersonating others, and no using devlinks for anything illegal.
          Let&apos;s keep it friendly!
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-5">2. Your Content</h2>
        <h3 className="text-xl font-semibold mb-2">What You Own</h3>
        <p className="mb-5">
          Anything you create on devlinks, like your profile details, images,
          and social links, is yours. You retain full ownership of your content.
          By uploading it to devlinks, you grant us a non-exclusive license to
          display and share it as part of the service.
        </p>
        <h3 className="text-xl font-semibold mb-2">Respecting Others</h3>
        <p>
          Please make sure that the content you upload doesn&apos;t violate
          anyone else&apos;s rights or privacy. If you use images or other
          content that you didn&apos;t create, make sure you have permission to
          use them.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-5">3. Privacy and Data</h2>
        <h3 className="text-xl font-semibold mb-2">What We Collect</h3>
        <p className="mb-5">
          To help you create your profile and manage your links, we collect some
          personal information like your name, username, profile picture,
          &quot;About You&quot; section, and social links. We only use this
          information to provide and improve the devlinks experience.
        </p>
        <h3 className="text-xl font-semibold mb-2">How We Use Your Data</h3>
        <p className="mb-5">
          Your data is used to personalize your profile and let others see what
          you want to share.
        </p>
        <h3 className="text-xl font-semibold mb-2">Keeping Your Data Safe</h3>
        <p>
          We care about your privacy and take steps to protect your information.
          While no system is 100% secure, we do our best to keep your data safe
          and sound.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-5">4. Using devlinks</h2>
        <h3 className="text-xl font-semibold mb-2">Enjoying the Service</h3>
        <p className="mb-5">
          We hope you love using devlinks as much as we do! While we aim to
          provide a smooth and reliable experience, please understand that
          devlinks is provided &quot;as is.&quot; We can&apos;t guarantee that
          the service will be free of errors or interruptions, but we&apos;ll do
          our best to fix any issues that arise.
        </p>
        <h3 className="text-xl font-semibold mb-2">Limitations of Liability</h3>
        <p>
          We&apos;re here to help, but we&apos;re not responsible for any
          damages that result from using devlinks. If something goes wrong,
          we&apos;ll work with you to resolve the issue, but our liability is
          limited.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-5">5. Termination</h2>
        <h3 className="text-xl font-semibold mb-2">Your Right to Leave</h3>
        <p className="mb-5">
          If you ever decide to stop using devlinks, you can delete your account
          at any time. We&apos;ll be sad to see you go, but we understand!
        </p>
        <h3 className="text-xl font-semibold mb-2">
          Our Right to End the Service
        </h3>
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these Terms. We&apos;ll do our best to be fair, and we&apos;ll let you
          know if there&apos;s an issue.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          6. Changes to These Terms
        </h2>
        <p>
          We may update these Terms from time to time to reflect changes in our
          service or for other operational, legal, or regulatory reasons. If we
          make changes, we&apos;ll notify you by posting the new Terms on our
          website. Your continued use of devlinks after these changes means you
          accept the updated Terms.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">7. Governing Law</h2>
        <p>
          These Terms are governed by the general principles of fairness,
          respect, and the open spirit of the internet. We aim to resolve any
          issues with open communication and mutual understanding, and we hope
          it never comes to a formal dispute!
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p className="mb-5">
          If you have any questions, concerns, or just want to say hi, feel free
          to reach out at devlinks.fun@gmail.com
        </p>
      </div>
    </section>
  );
}
