"use client";

import LinkInput from "./LinkInput";
import Button from "./Button";
import GetStarted from "./GetStarted";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { updateLinks } from "@/actions/updateLinks";
import { platforms as allPlatforms } from "@/data/platforms";

export default function Form({ links: serverLinks }) {
  const [clientLinks, setClientLinks] = useState([...serverLinks]);
  const usedPlatforms = clientLinks.map((link) => link.split("%")[0]);

  const unusedPlatforms = allPlatforms.reduce((acc, platform) => {
    if (!usedPlatforms.includes(platform.platform)) acc.push(platform);
    return acc;
  }, []);

  const addNewLink = () => {
    setClientLinks((prev) => [...prev, `${unusedPlatforms[0].platform}%`]);
  };

  return (
    <>
      <button
        onClick={addNewLink}
        className="mb-6 border border-purple rounded-lg py-[10px] mx-6 md:mx-8 text-base font-semibold text-purple transition hover:bg-light_purple focus:outline-none focus:bg-light_purple"
      >
        + Add new link
      </button>

      {clientLinks.length === 0 && <GetStarted />}

      <form action={updateLinks} className="flex flex-col flex-grow">
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
        <Button active={clientLinks.length > 0}>Save</Button>
      </form>
    </>
  );
}
