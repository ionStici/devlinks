export const emailRegex = /^$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
export const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{8,64}$/;
export const nameRegex = /^$|^[a-zA-Zà-ÿÀ-ß'`-]{1,50}$/;
export const platformsRegex = {
  githubRegex: /^https:\/\/github\.com/,
  frontendMentorRegex: /^https:\/\/www\.frontendmentor\.io/,
  twitterRegex: /^https:\/\/twitter\.com/,
  linkedinRegex: /^https:\/\/www\.linkedin\.com/,
  youtubeRegex: /^https:\/\/www\.youtube\.com/,
  facebookRegex: /^https:\/\/www\.facebook\.com/,
  twitchRegex: /^https:\/\/www\.twitch\.tv/,
  devtoRegex: /^https:\/\/dev\.to/,
  codewarsRegex: /^https:\/\/www\.codewars\.com/,
  codepenRegex: /^https:\/\/codepen\.io/,
  freecodecampRegex: /^https:\/\/www\.freecodecamp\.org/,
  gitlabRegex: /^https:\/\/gitlab\.com/,
  hashnodeRegex: /^https:\/\/hashnode\.com/,
  stackoverflowRegex: /^https:\/\/stackoverflow\.com/,
};
