// prettier-ignore
export const emailRegex = /^[A-Za-z0-9._%+-]{1,50}@[A-Za-z0-9.-]{1,25}\.[A-Za-z]{2,}/;
// Regex for email validation

export const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{8,96}$/;
// 1. Total length 8-96
// 2. Can include: uppercase/lowercase letters, numbers, and the following special characters: !@#$%^&*()_+=-

// prettier-ignore
export const usernameRegex = /^(?=.{4,16}$)(?!.*--)(?=.*[a-zA-Z])[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
// 1. Total length: 4-16
// 2. Can include: at least one letter (uppercase/lowercase), numbers, and optionally dashes
// 3. Cannot contain consecutive dashes (--), cannot start or end with a dash

export const nameRegex = /^$|^[a-zA-Zà-ÿÀ-ß'`-\s]{1,30}$/;
// 1. Empty string allowed & Length constraint 15 chars
// 2. Can include: Spaces + Uppercase/Lowercase Accented Characters + Special Characters '`-

// prettier-ignore
export const aboutYouRegex = /^$|^[a-zA-Z0-9\s!@#$%^&*()_+=\-[\]{};':"\\|,.<>\/?`~]{1,125}$/;
// 1. Empty string allowed & Total length 1-125 characters.
// 2. Can include: Lowercase/uppercase letters, numbers, and special characters: !@#$%^&*()_+=-[]{};':"\\|,.<>/?~
