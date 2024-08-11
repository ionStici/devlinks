import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-dvh min-w-dvh py-2">
      <div className="rounded-full border-[12px] border-borders border-t-purple animate-spin h-[125px] w-[125px]" />
      <p className="text-2xl font-[500]">Loading...</p>
    </div>
    // <div>
    //   <ul>
    //     <li>
    //       <Link href="/auth/login">Login</Link>
    //     </li>
    //     <li>
    //       <Link href="/auth/signup">Sign Up</Link>
    //     </li>
    //     <li>
    //       <Link href="/edit/links">Edit Links</Link>
    //     </li>
    //     <li>
    //       <Link href="/edit/profile">Edit Profile</Link>
    //     </li>
    //     <li>
    //       <Link href="/auth/change-password">Change Password</Link>
    //     </li>
    //     <li>
    //       <Link href="/auth/delete-account">Delete Account</Link>
    //     </li>
    //   </ul>
    // </div>
  );
}
