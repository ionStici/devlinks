import Link from "next/link";

export default function Footer({ username, content, btnText, href }) {
  return (
    <footer className="text-center sm:flex sm:justify-center sm:gap-1">
      <p className="text-grey text-base">
        {username && (
          <Link
            href={`/${username}`}
            className="text-purple font-semibold rounded-[4px] px-[2px] mr-[2px] focus:outline-none focus:ring-1 focus:ring-purple"
          >
            {username}
          </Link>
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
