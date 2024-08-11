import { platforms } from "@/data/platforms";
import PlatformLink from "@/ui/PlatformLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getUser, getUserByUsername } from "./_actions/getUser";
import LogoBottom from "./_components/LogoBottom";
import LogoTop from "./_components/LogoTop";
import Navigation from "./_components/Navigation";

export async function generateMetadata({ params }) {
  return {
    title: `${params.user.split("%40")[1]} Developer Profile`,
    description: `Check out ${
      params.user.split("%40")[1]
    }'s devlinks profile to see their latest projects and connect across various platforms like GitHub, LinkedIn, and more. Stay updated with their work in the tech world.`,
  };
}

export default async function Page({ params }) {
  const paramUsername = params.user.split("%40")[1];
  let data;

  const loggedInUser = await getUser();
  const loggedInUsername = loggedInUser?.email?.split("@")[1];

  const isLoggedInUser = loggedInUser && paramUsername === loggedInUsername;

  if (isLoggedInUser) data = loggedInUser;

  if (!data) {
    data = await getUserByUsername(paramUsername);
  }

  if (!data) notFound();

  const { email: username } = data;
  const { firstName, lastName, about, image, links } = data.user_metadata;
  const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${image}`;

  return (
    <>
      <div className="relative bg-white min-h-dvh xs:flex xs:items-center xs:justify-center xs:pt-[175px] xs:pb-[200px]">
        <section className="relative w-full xs:max-w-[350px] min-h-[570px] mx-auto bg-white pt-14 xs:pt-12 pb-12 xs:rounded-3xl xs:shadow-profileBox">
          <LogoTop />
          {/* {isLoggedInUser && <Navigation />} */}
          {image && (
            <div className="xs:shadow-layout absolute z-10 top-0 left-0 w-full h-[125px] bg-purple xs:rounded-t-3xl" />
          )}
          <div
            className={`relative z-30 p-1 rounded-full size-[120px] mx-auto mb-[21px]
            ${image ? "bg-purple" : "bg-transparent"}`}
          >
            <div className="relative z-40 size-full border-4 border-white rounded-full">
              <Image
                className="object-cover rounded-full z-50"
                src={image ? imgUrl : `/assets/default-profile-picture.svg`}
                alt={`${username} profile picture`}
                fill
                sizes="104px"
                priority={true}
              />
            </div>
          </div>

          <div className="text-center px-6 mb-14">
            <h1 className="mb-2 font-bold text-[2rem] leading-10 text-dark_grey">
              {firstName || lastName
                ? `${firstName} ${lastName}`
                : username.split("@")[1]}
            </h1>
            <p className="text-base font-normal text-grey">{about}</p>
          </div>

          {links.length > 0 && (
            <ul className="space-y-5">
              {links.map((link) => {
                const platform = link.split("%")[0];
                const url = link.split("%")[1];

                const { icon, iconMod, color } = platforms.find(
                  ({ platform: title }) => {
                    return title === platform;
                  }
                );

                return (
                  <PlatformLink
                    key={link}
                    platform={platform}
                    url={url}
                    icons={[icon, iconMod]}
                    color={color}
                    height="56px"
                  />
                );
              })}
            </ul>
          )}
          <LogoBottom />
        </section>
      </div>
    </>
  );
}
