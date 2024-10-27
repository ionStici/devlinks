import { NavLink } from "react-router-dom";

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
        <NavLink
          to="/terms"
          className="text-purple px-[1px] rounded-sm focus:outline-none ring-[1px] ring-transparent focus:ring-purple"
        >
          Terms and Conditions.
        </NavLink>
      </label>
    </div>
  );
}
