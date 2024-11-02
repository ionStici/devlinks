import { useLocation } from 'react-router-dom';
import { UserNotFound } from '@/features/user/user-not-found';
import { NotFoundRoute } from '../not-found';

export function User() {
  const { pathname } = useLocation();

  if (!pathname.startsWith('/@')) return <NotFoundRoute />;

  if (!'user') return <UserNotFound />;

  return <div>User</div>;
}
