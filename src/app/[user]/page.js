import { platforms } from "@/data/platforms";
import PlatformLink from "@/ui/PlatformLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getUser, getUserByUsername } from "../../actions/getUser";

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

  if (!data) data = await getUserByUsername(paramUsername);

  console.log(params.user.includes("%40"));

  if (!data && params.user.includes("%40")) return "Profile Not Found";

  if (!data && !params.user.includes("%40")) notFound();

  const { email: username } = data;
  const { firstName, lastName, about, image, links } = data.user_metadata;
  const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${image}`;

  return (
    <>
      <div className="flex items-center justify-center min-h-dvh px-6 pt-[100px] pb-[150px] bg-profileGradient">
        <section className="relative max-w-[375px] min-h-[600px] mx-auto px-6 py-12 flex-grow bg-white rounded-3xl shadow-profileBox">
          <div className="absolute z-10 top-0 left-0 w-full h-[130px] bg-purple rounded-t-3xl shadow-layout" />
          <div className="relative z-20 size-[138px] mx-auto mb-[25px] bg-white rounded-full border-4 border-white shadow-profileImage">
            <Image
              className="object-cover rounded-full"
              src={image ? imgUrl : `/assets/default-profile-picture.svg`}
              alt={`${username} profile picture`}
              fill
              sizes="130px"
              priority={true}
            />
          </div>

          <div className="text-center mb-14">
            <h1 className="mb-2 font-bold text-[2rem] leading-10 text-dark_grey">
              {firstName || lastName
                ? `${firstName} ${lastName}`
                : username.split("@")[1]}
            </h1>
            {about && (
              <p className="text-base font-normal text-grey">{about}</p>
            )}
          </div>

          {links.length > 0 && (
            <ul className="space-y-5">
              {links.map((link) => {
                const platform = link.split("%")[0];
                const url = link.split("%")[1];
                const { icon, iconMod, color } = platforms.find(
                  ({ platform: platformTitle }) => {
                    return platformTitle === platform;
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
        </section>
      </div>
    </>
  );
}
