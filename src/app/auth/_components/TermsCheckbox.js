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
      <label htmlFor="terms">
        I agree to the{" "}
        <Link
          className="text-sm text-purple px-[1px] rounded-sm focus:outline-none focus:ring-[1px] focus:ring-purple"
          href="/terms"
        >
          Terms and Conditions.
        </Link>
      </label>
    </div>
  );
}
