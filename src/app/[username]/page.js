import { getUser } from "@/actions/auth";
import { getUserByUsername } from "@/actions/getUserByUsername";
import Image from "next/image";
import { notFound } from "next/navigation";
import { platforms } from "@/data/platforms";
import Link from "next/link";
import PlatformLink from "@/components/ui/PlatformLink";

export async function generateMetadata({ params }) {
  return { title: `${params.username.split("%40")[1]} Profile` };
}

export default async function Page({ params }) {
  const paramUsername = params.username.split("%40")[1];
  let data;

  const loggedInUser = await getUser();
  const loggedInUsername = loggedInUser?.email?.split("@")[1];

  if (loggedInUser && paramUsername === loggedInUsername) data = loggedInUser;

  if (!data) {
    data = await getUserByUsername(paramUsername);
  }

  if (!data) notFound();

  const { email: username } = data;
  const { email, firstName, lastName, image, links } = data.user_metadata;
  const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${image}`;

  return (
    <div>
      <nav>
        <Link href="/edit/links">Back to Editor</Link>
      </nav>

      <div className="bg-white min-h-dvh xs:min-h-auto xs:bg-transparent">
        <section className="max-w-[350px] min-h-[569px] mx-auto bg-white pt-11 pb-12 xs:rounded-3xl xs:shadow-profileBox">
          <div
            className={`relative border-4 rounded-full w-[112px] h-[112px] mx-auto mb-[29px] ${
              image ? "border-purple" : "border-transparent"
            }`}
          >
            <Image
              className="object-cover rounded-full"
              src={image ? imgUrl : `/assets/default-profile-picture.svg`}
              alt={`${username} profile picture`}
              fill
              sizes="104px"
              priority={true}
            />
          </div>

          <div className="text-center px-4 mb-14">
            <h1 className="mb-2 font-bold text-[2rem] leading-10 text-dark_grey">
              {firstName || lastName
                ? `${firstName} ${lastName}`
                : username.split("@")[1]}
            </h1>
            <p className="text-base text-grey">{email}</p>
          </div>

          {links.length > 0 && (
            <ul className="space-y-5">
              {links.map((link) => {
                const platform = link.split("%")[0];
                const url = link.split("%")[1];

                const { icon, color } = platforms.find(
                  ({ platform: title }) => {
                    return title === platform;
                  }
                );

                return (
                  <PlatformLink
                    key={link}
                    platform={platform}
                    url={url}
                    icon={icon}
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
