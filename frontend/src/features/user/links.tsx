import { PlatformButton } from '@/components/ui/platform-button';
import { platforms } from '@/data/platforms';

export function Links({ links }: { links: string[] }) {
  return (
    links.length > 0 && (
      <ul className="space-y-5 max-w-[250px] mx-auto">
        {links.map((link) => {
          const platform = link.split('%')[0];
          const url = link.split('%')[1];

          const foundPlatform = platforms.find(
            ({ platform: platformTitle }) => platformTitle === platform
          );

          if (!foundPlatform) return null;

          const { icon, iconMod, color } = foundPlatform;

          return (
            <PlatformButton
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
    )
  );
}
