// EMAIL REGEX
export const emailRegex =
  /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,48}[A-Za-z0-9])?@(?:[A-Za-z0-9-]{1,23}[A-Za-z0-9])\.[A-Za-z]{2,}$/;

// PASSWORD REGEX
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,96}$/;
// At least one lowercase letter
// At least one uppercase letter
// At least one number
// At least one special character
// Length between 8 and 96 characters
// Limited special characters set
// No spaces or other characters

// USERNAME REGEX
export const usernameRegex =
  /^(?=.{4,16}$)(?!.*--)(?=.*[a-zA-Z])[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
// Length between 4-16 characters
// Must contain at least one letter
// Must start with a letter & Cannot start with a number
// Can contain letters, numbers, and hyphens
// Cannot contain consecutive hyphens (--)
// Cannot start or end with a hyphen
// Hyphens can only appear between alphanumeric characters
// Case-sensitive (both uppercase and lowercase letters allowed)
