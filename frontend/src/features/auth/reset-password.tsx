import { NavLink } from 'react-router-dom';

export function ResetPassword() {
  return (
    <div className="flex items-center gap-1 text-sm">
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
