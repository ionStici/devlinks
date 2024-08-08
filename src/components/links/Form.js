"use client";

import { useState } from "react";
import Button from "./Button";
import GetStarted from "./GetStarted";
import LinkInput from "./LinkInput";

import { Reorder } from "framer-motion";

import { updateLinks } from "@/actions/updateLinks";

export default function Form({ links }) {
  const [clientLinks, setClientLinks] = useState([
    "GitHub%url",
    "Frontend Mentor%adf",
  ]);

  const current = Object.entries(clientLinks).map((t) => Object.keys(t[1])[0]);

  const remaining = platforms.reduce((acc, platform) => {
    if (!current.includes(platform.platform)) acc.push(platform);
    return acc;
  }, []);

  const handleAddLink = () => {
    setClientLinks((prev) => [...prev, { [remaining[0].platform]: "" }]);
  };

  return (
    <>
      <button
        onClick={handleAddLink}
        className="mb-6 border border-purple rounded-lg py-[10px] mx-6 md:mx-8 text-base font-semibold text-purple transition hover:bg-light_purple focus:outline-none focus:bg-light_purple"
      >
        + Add new link
      </button>

      {clientLinks.length === 0 && <GetStarted />}

      <form action={updateLinks} className="flex flex-col mx-6 flex-grow">
        <Reorder.Group
          axis="y"
          onReorder={setClientLinks}
          values={clientLinks}
          className="flex flex-col gap-6"
        >
          {clientLinks.map((link, i) => {
            return (
              <Reorder.Item key={link} value={link}>
                <LinkInput
                  index={i}
                  link={link}
                  platforms={platforms}
                  remaining={remaining}
                  setClientLinks={setClientLinks}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>

        <Button>Save</Button>
      </form>
    </>
  );
}

const platforms = [
  { platform: "GitHub", icon: "/assets/icon-github.svg" },
  { platform: "Frontend Mentor", icon: "/assets/icon-frontend-mentor.svg" },
  { platform: "Twitter", icon: "/assets/icon-twitter.svg" },
  { platform: "LinkedIn", icon: "/assets/icon-linkedin.svg" },
  { platform: "YouTube", icon: "/assets/icon-youtube.svg" },
  { platform: "Facebook", icon: "/assets/icon-facebook.svg" },
  { platform: "Twitch", icon: "/assets/icon-twitch.svg" },
  { platform: "Dev.to", icon: "/assets/icon-devto.svg" },
  { platform: "Codewars", icon: "/assets/icon-codewars.svg" },
  { platform: "Codepen", icon: "/assets/icon-codepen.svg" },
  { platform: "freeCodeCamp", icon: "/assets/icon-freecodecamp.svg" },
  { platform: "GitLab", icon: "/assets/icon-gitlab.svg" },
  { platform: "Hashnode", icon: "/assets/icon-hashnode.svg" },
  { platform: "Stack Overflow", icon: "/assets/icon-stack-overflow.svg" },
];
