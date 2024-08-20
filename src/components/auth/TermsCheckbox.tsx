import Link from "next/link";

export default function TermsCheckbox() {
  return (
    <div className="flex items-center gap-2">
      <input
        className="size-4 accent-purple flex-shrink-0"
        type="checkbox"
        name="terms"
        id="terms"
      />
      <label htmlFor="terms" className="text-sm">
        <span>I agree to the </span>
        <Link
          href="/terms"
          className="text-purple px-[1px] rounded-sm focus:outline-none focus:ring-[1px] focus:ring-purple"
        >
          Terms and Conditions.
        </Link>
      </label>
    </div>
  );
}
