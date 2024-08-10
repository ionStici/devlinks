import { platforms } from "@/data/platforms";
import PlatformLink from "@/ui/PlatformLink";
import Image from "next/image";

export default async function PhoneMockup({ user }) {
  const { firstName, lastName, about, image, links } = user;
  const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${image}`;

  return (
    <section className="hidden lg:flex items-center justify-center rounded-xl shadow-section bg-white md:h-[834px] min-w-[348px] max-w-[560px] flex-grow">
      <div className="relative">
        <Image
          src="/assets/illustration-phone-mockup.svg"
          alt="Phone Mockup"
          width={308}
          height={632}
          priority={true}
        />

        {image && (
          <div className="absolute left-[50%] translate-x-[-50%] top-[60px] size-[104px] border-4 border-purple rounded-full">
            <Image
              src={imgUrl}
              alt={`${firstName} ${lastName} Profile Picture`}
              fill
              className="object-cover rounded-full"
              sizes="96px"
              priority={true}
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

        {about && (
          <div className="absolute left-[50%] translate-x-[-50%] top-[210px] w-[250px] text-center bg-white">
            <p className="truncate text-grey text-sm">{about}</p>
          </div>
        )}

        {links.length > 0 && (
          <ul
            tabIndex={-1}
            className="py-1 absolute left-[50%] top-[275px] translate-x-[-50%] w-[260px] max-h-[310px] overflow-scroll no-scrollbar space-y-5 bg-white"
          >
            {links.map((link) => {
              const platform = link.split("%")[0];
              const url = link.split("%")[1];
              const { icon, iconMod, color } = platforms.find(
                ({ platform: platformName }) => {
                  return platformName === platform;
                }
              );

              return (
                <PlatformLink
                  key={link}
                  platform={platform}
                  url={url}
                  icons={[icon, iconMod]}
                  color={color}
                  height="44px"
                />
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}