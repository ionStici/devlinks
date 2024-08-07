import Image from "next/image";
import { getUser } from "@/actions/auth";

export default async function PhoneMockup() {
  const user = await getUser();
  const { user_metadata } = user;
  const { email, firstName, lastName, image, links } = user_metadata;
  const imgUrl = `https://jkyhtwrybkepbzpwanme.supabase.co/storage/v1/object/public/avatars/${image}`;

  return (
    <section className="hidden lg:flex items-center justify-center rounded-xl shadow-section bg-white md:h-[834px] min-w-[348px] max-w-[560px] flex-grow">
      <div className="relative">
        <Image
          src="/assets/illustration-phone-mockup.svg"
          alt="Phone Mockup"
          width={308}
          height={632}
        />

        {image && (
          <div className="absolute left-[50%] translate-x-[-50%] top-[60px] size-[104px] border-4 border-purple rounded-full">
            <Image
              src={imgUrl}
              alt="Profile Picture"
              fill
              className="object-cover rounded-full"
              sizes="96px"
            />
          </div>
        )}

        {(firstName || lastName) && (
          <div className="absolute left-[50%] translate-x-[-50%] top-[179px] w-[250px] text-center bg-white ">
            <p className="truncate text-dark_grey text-lg font-semibold">
              {firstName} {lastName}
            </p>
          </div>
        )}

        {email && (
          <div className="absolute left-[50%] translate-x-[-50%] top-[210px] w-[250px] text-center bg-white">
            <p className="truncate text-grey text-sm">{email}</p>
          </div>
        )}

        {links.length > 0 && (
          <ul>
            {links.map((link) => (
              <li></li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
