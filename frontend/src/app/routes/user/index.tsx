import { useLocation } from 'react-router-dom';

export function User() {
  const { pathname } = useLocation();
  if (!pathname.startsWith('/@')) notFound('User not Found');

  return <div>User</div>;
}
