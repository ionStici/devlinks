import { platforms } from "@/data/platforms";
import Logo from "@/ui/Logo";
import PlatformLink from "@/ui/PlatformLink";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserByUsername } from "../../actions/getUserByUsername";
import { getUser } from "@/actions/auth";
import ProfileNotFound from "./_components/ProfileNotFound";
import ProfilePicture from "./_components/ProfilePicture";

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

  if (!data && params.user.startsWith("%40")) {
    return <ProfileNotFound username={paramUsername} />;
  }

  if (!data && !params.user.includes("%40")) notFound();

  const { email: username } = data;
  const { firstName, lastName, about, image, links } = data.user_metadata;
  const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${image}`;

  return (
    <div className="flex items-center justify-center xs:min-w-dvh xs:min-h-dvh xs:bg-profileGradient xs:px-6 xs:pt-[75px] xs:pb-[125px]">
      <div className="flex-grow">
        <Link
          className="hidden xs:block w-fit mx-auto mb-10 rounded-xl transition px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple"
          href="/"
        >
          <Logo size="large" />
        </Link>

        <section className="relative min-h-dvh min-w-dvh mx-auto bg-white px-6 py-12 xs:max-w-[375px] xs:min-h-[600px] xs:rounded-3xl xs:shadow-profileBox">
          <div className="absolute z-10 top-0 left-0 w-full h-[130px] bg-purple shadow-layout xs:rounded-t-3xl" />
          <div className="relative z-20 size-[138px] mx-auto mb-[25px] bg-white rounded-full border-4 border-white shadow-profileImage">
            <ProfilePicture image={image} imgUrl={imgUrl} username={username} />
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
            <ul className="space-y-5 max-w-[250px] mx-auto">
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
    </div>
  );
}
