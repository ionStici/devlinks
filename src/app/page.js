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
          <Link href="/edit/links">Edit Links</Link>
        </li>
        <li>
          <Link href="/edit/profile">Edit Profile</Link>
        </li>
        <li>
          <Link href="/auth/change-password">Change Password</Link>
        </li>
        <li>
          <Link href="/auth/delete-account">Delete Account</Link>
        </li>
      </ul>
    </div>
  );
}
