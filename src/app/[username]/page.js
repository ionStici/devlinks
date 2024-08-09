import { getUser } from "@/actions/auth";
import { getUserByUsername } from "@/actions/getUserByUsername";
import Image from "next/image";
import { notFound } from "next/navigation";
import { platforms } from "@/data/platforms";
import Link from "next/link";

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
  const hasData = email || firstName || lastName;

  return (
    <div>
      <nav>
        <Link href="/edit/links">Back to Editor</Link>
      </nav>

      <div className="bg-white min-h-dvh sm:min-h-auto sm:bg-transparent">
        <section className="max-w-[350px] min-h-[569px] mx-auto bg-white pt-11 mb-12 sm:rounded-3xl sm:shadow-profileBox">
          <div
            className={`relative border-4 border-purple rounded-full w-[112px] h-[112px] mx-auto mb-[29px] ${
              !image ? "bg-empty border-empty" : ""
            }`}
          >
            {image && (
              <Image
                className="object-cover rounded-full"
                src={imgUrl}
                alt={`${username} profile picture`}
                fill
                sizes="104px"
                priority={true}
              />
            )}
          </div>

          <div className={`text-center px-4 ${hasData ? "mb-14" : "h-[16px]"}`}>
            {hasData && (
              <>
                <h1 className="mb-2 font-bold text-[2rem] leading-10 text-dark_grey">
                  {firstName} {lastName}
                </h1>
                <p className="text-base text-grey">{email}</p>
              </>
            )}
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
                  <li key={link}>
                    <a
                      style={{ backgroundColor: color }}
                      className="flex items-center justify-center w-[237px] h-[56px] mx-auto rounded-lg"
                      href={url}
                      target="_blank"
                    >
                      <span className="text-base text-white">{platform}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
