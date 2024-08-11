// prettier-ignore
export const aboutYouRegex = /^$|^[a-zA-Z0-9\s!@#$%^&*()_+=\-[\]{};':"\\|,.<>\/?`~]{1,125}$/;
// 1. Empty string allowed & Total length 1-125 characters.
// 2. Can include: Lowercase/uppercase letters, numbers, and special characters: !@#$%^&*()_+=-[]{};':"\\|,.<>/?~

export const nameRegex = /^$|^[a-zA-Zà-ÿÀ-ß'`-]{1,15}$/;
// 1. Empty string allowed & If not empty, the string must be between 1 and 15 chars long
// 2. Can include: Uppercase/Lowercase Accented Characters + Special Characters '`-

// prettier-ignore
export const usernameRegex = /^(?=.{4,16}$)(?!.*--)(?=.*[a-zA-Z])[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
// 1. Total length: 4-16
// 2. Can include: at least one letter (uppercase/lowercase), numbers, and optionally dashes
// 3. Cannot contain consecutive dashes (--), cannot start or end with a dash

export const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{8,64}$/;
// 1. Total length 8-64
// 2. Can include: uppercase/lowercase letters, numbers, and the following special characters: !@#$%^&*()_+=-
