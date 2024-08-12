"use client";

import { platforms as allPlatforms } from "@/data/platforms";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { updateLinks } from "../_actions/updateLinks";
import GetStarted from "./GetStarted";
import LinkInput from "./LinkInput";
import FooterButtons from "./FooterButtons";

export default function LinksForm({ links: serverLinks }) {
  const [clientLinks, setClientLinks] = useState([...serverLinks]);
  const sorted = clientLinks.map((link) => link.split("%")[0]);

  const usedPlatforms = clientLinks.map((link) => link.split("%")[0]);

  const unusedPlatforms = allPlatforms.reduce((acc, platform) => {
    if (!usedPlatforms.includes(platform.platform)) acc.push(platform);
    return acc;
  }, []);

  const addNewLink = () => {
    setClientLinks((prev) => {
      if (prev.length === allPlatforms.length) return prev;

      const platform = unusedPlatforms[0].platform;

      const potentialUrl = serverLinks
        .find((link) => link.split("%")[0] === platform)
        ?.split("%")[1];

      return [...prev, `${platform}%${potentialUrl || ""}`];
    });
  };

  return (
    <>
      <button
        onClick={addNewLink}
        className="mb-6 border border-purple rounded-lg py-[10px] mx-6 md:mx-10 text-base font-semibold text-purple transition hover:bg-light_purple focus:outline-none focus:bg-light_purple"
      >
        + Add new link
      </button>

      {clientLinks.length === 0 && <GetStarted />}

      <form action={updateLinks} className="flex flex-col flex-grow">
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
        <FooterButtons />
      </form>
    </>
  );
}
