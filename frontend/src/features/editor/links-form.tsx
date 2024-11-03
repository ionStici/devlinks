import { platforms as allPlatforms } from '@/data/platforms';
import { Platform as PlatformData } from '@/types/platform';
import { Reorder } from 'framer-motion';
import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import GetStarted from './get-started';
import { LinkInput } from './link-input';

type LinksFormsProps = {
  children: ReactNode;
  links: string[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function LinksForms({
  children,
  links: serverLinks,
  onSubmit,
}: LinksFormsProps) {
  const [clientLinks, setClientLinks] = useState<string[]>([...serverLinks]);
  const sorted = clientLinks.map((link: string) => link.split('%')[0]);

  useEffect(() => {
    setClientLinks([...serverLinks]);
  }, [serverLinks]);

  const usedPlatforms = clientLinks.map((link) => link.split('%')[0]);

  const unusedPlatforms = allPlatforms.reduce(
    (acc: PlatformData[], platform) => {
      if (!usedPlatforms.includes(platform.platform)) acc.push(platform);
      return acc;
    },
    []
  );

  const addNewLink = () => {
    setClientLinks((prev) => {
      if (prev.length === allPlatforms.length) return prev;

      const platform = unusedPlatforms[0].platform;

      const potentialUrl = serverLinks
        .find((link) => link.split('%')[0] === platform)
        ?.split('%')[1];

      return [...prev, `${platform}%${potentialUrl || ''}`];
    });
  };

  return (
    <>
      <button
        onClick={addNewLink}
        className="mb-6 border border-purple rounded-lg py-[10px] mx-6 md:mx-10 text-base font-semibold text-purple transition duration-200 hover:bg-purple-light focus:outline-none focus:bg-purple-light"
      >
        + Add new link
      </button>

      {clientLinks.length === 0 && <GetStarted />}

      <form className="flex flex-col flex-grow" onSubmit={onSubmit}>
        <input type="hidden" name="sorted" value={sorted} />

        <Reorder.Group
          axis="y"
          onReorder={setClientLinks}
          values={clientLinks}
          className="space-y-6 mx-6 md:mx-10"
        >
          {clientLinks.map((link, i) => {
            return (
              <LinkInput
                key={link}
                index={i}
                link={link}
                allPlatforms={allPlatforms}
                unusedPlatforms={unusedPlatforms}
                setClientLinks={setClientLinks}
                serverLinks={serverLinks}
              />
            );
          })}
        </Reorder.Group>

        {children}
      </form>
    </>
  );
}
