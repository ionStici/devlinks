import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>
        <Link href="/auth/login">Login</Link>
      </div>
      <div>
        <Link href="/auth/signup">Sign Up</Link>
      </div>
    </>
  );
}
