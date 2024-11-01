import { NavLink } from 'react-router-dom';

export function ResetPasswordLink() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm">
      <p>Forgot your password? </p>
      <NavLink
        to="/auth/reset-password"
        className="text-purple px-[1px] rounded-sm focus:outline-none ring-[1px] ring-transparent focus:ring-purple"
      >
        Request Password Reset
      </NavLink>
    </div>
  );
}
