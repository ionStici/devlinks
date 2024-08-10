// prettier-ignore
export const platformsRegex = [ /^https:\/\/(www\.)?github\.com/, /^https:\/\/(www\.)?frontendmentor\.io/, /^https:\/\/(www\.)?twitter\.com/, /^https:\/\/(www\.)?linkedin\.com/, /^https:\/\/(www\.)?youtube\.com/, /^https:\/\/(www\.)?facebook\.com/, /^https:\/\/(www\.)?twitch\.tv/, /^https:\/\/(www\.)?dev\.to/, /^https:\/\/(www\.)?codewars\.com/, /^https:\/\/(www\.)?codepen\.io/, /^https:\/\/(www\.)?freecodecamp\.org/, /^https:\/\/(www\.)?gitlab\.com/, /^https:\/\/(www\.)?hashnode\.com/, /^https:\/\/(www\.)?stackoverflow\.com/, ];

export const nameRegex = /^$|^[a-zA-Zà-ÿÀ-ß'`-]{1,50}$/;
export const aboutRegex = "";

// prettier-ignore
export const usernameRegex = /^(?=.{4,16}$)(?!.*--)(?=.*[a-zA-Z])[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
// 1. Total length: 4-16
// 2. Can include: at least one letter (uppercase/lowercase), numbers, and optionally dashes
// 3. Cannot contain consecutive dashes (--), cannot start or end with a dash

export const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{8,64}$/;
// 1. Total length 8-64
// 2. Can include: uppercase/lowercase letters, numbers, and the following special characters: !@#$%^&*()_+=-
