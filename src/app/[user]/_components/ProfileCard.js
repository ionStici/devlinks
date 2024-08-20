import ProfilePicture from "./ProfilePicture";
import PlatformLink from "@/ui/PlatformLink";
import { platforms } from "@/data/platforms";

export default function ProfileCard({
  username,
  firstName,
  lastName,
  about,
  image,
  imgUrl,
  links,
}) {
  return (
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
        {about && <p className="text-base font-normal text-grey">{about}</p>}
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
  );
}
