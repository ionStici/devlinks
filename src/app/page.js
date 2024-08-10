import Link from "next/link";

export default function Page() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/auth/login">Login</Link>
        </li>
        <li>
          <Link href="/auth/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/edit/links">Links</Link>
        </li>
        <li>
          <Link href="/edit/profile">Login</Link>
        </li>
        <li>
          <Link href="/auth/reset-password">Reset Password</Link>
        </li>
        <li>
          <Link href="/auth/delete-account">Delete Account</Link>
        </li>
      </ul>
    </div>
  );
}
