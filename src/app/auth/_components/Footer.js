import Link from "next/link";

export default function Footer({ username, content, btnText, href }) {
  return (
    <footer className="text-center sm:flex sm:justify-center sm:gap-1">
      <p className="text-grey text-base">
        {username && (
          <span className="text-purple font-semibold">{username} </span>
        )}
        <span>{content}</span>
      </p>
      {btnText && href && (
        <Link
          className="text-base text-purple px-[2px] rounded-sm focus:outline-none focus:ring-[1px] focus:ring-purple"
          href={href}
        >
          {btnText}
        </Link>
      )}
    </footer>
  );
}
