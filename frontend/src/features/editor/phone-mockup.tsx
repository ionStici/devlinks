import { useUser } from '@/lib/auth';
import illusPhoneMockup from '@/assets/illustrations/illustration-phone-mockup.svg';
import { PlatformButton } from '@/components/ui/platform-button';
import { platforms } from '@/data/platforms';
import { useRef } from 'react';

export function PhoneMockup() {
  const imgBox = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { name, about, image, links } = user;

  return (
    <div className="relative">
      <img
        src={illusPhoneMockup}
        alt="Phone Mockup"
        width={308}
        height={632}
        className="w-[308px] h-[632px]"
      />

      {image && (
        <div
          ref={imgBox}
          className="absolute left-[50%] translate-x-[-50%] top-[60px] size-[104px] border-4 border-purple rounded-full"
        >
          <img
            src={image}
            alt={`${name} Profile Picture`}
            className="object-cover rounded-full size-full"
            width={96}
            height={96}
            onError={() => imgBox.current?.classList.add('hidden')}
          />
        </div>
      )}

      {name && (
        <div className="absolute left-[50%] translate-x-[-50%] top-[179px] w-[250px] text-center bg-white">
          <p className="truncate text-dark-grey text-lg font-semibold">
            {name}
          </p>
        </div>
      )}

      {about && (
        <div className="absolute left-[50%] translate-x-[-50%] top-[210px] w-[250px] text-center bg-white">
          <p className="truncate text-grey text-sm">{about}</p>
        </div>
      )}

      {links.length > 0 && (
        <div className="py-1 absolute left-[50%] top-[275px] translate-x-[-50%] w-[250px] max-h-[310px] overflow-scroll scrollbar-hide bg-white">
          <ul tabIndex={-1} className="w-[237px] mx-auto space-y-5">
            {links.map((link) => {
              const platform = link.split('%')[0];
              const url = link.split('%')[1];
              const height = '44px';

              const { icon, iconMod, color } = platforms.find(
                ({ platform: platformName }) => {
                  return platformName === platform;
                }
              )!;

              return (
                <PlatformButton
                  key={link}
                  platform={platform}
                  url={url}
                  icons={[icon, iconMod]}
                  color={color}
                  height={height}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
