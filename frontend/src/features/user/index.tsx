import { NotFoundRoute } from '@/app/routes/not-found';
import { Spinner } from '@/components/ui/spinner';
import { useLocation } from 'react-router-dom';
import { useFindProfile } from './use-find-profile-api';
import { UserError } from './user-error';
import { UserMain } from './user-main';

export function User() {
  const { pathname } = useLocation();
  const username = pathname.replace('/@', '');
  const { data: user, isPending, error } = useFindProfile(username);

  if (!pathname.startsWith('/@') || !username) return <NotFoundRoute />;

  if (isPending) return <Spinner />;

  if (error) return <UserError username={username} message={error.message} />;

  if (user) return <UserMain user={user} />;

  return <NotFoundRoute />;
}
