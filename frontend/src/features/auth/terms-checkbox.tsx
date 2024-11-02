import { type FieldValues, type UseFormRegister } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

type TermsCheckboxProps = {
  register: UseFormRegister<FieldValues>;
};

export function TermsCheckbox({ register }: TermsCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        className="size-4 accent-purple flex-shrink-0"
        type="checkbox"
        {...register('terms')}
        id="terms"
      />
      <label htmlFor="terms" className="text-sm">
        <span>I agree to the </span>
        <NavLink
          to="/terms"
          className="text-purple px-[1px] rounded-sm focus:outline-none ring-[1px] ring-transparent focus:ring-purple"
        >
          Terms and Conditions
        </NavLink>
      </label>
    </div>
  );
}
