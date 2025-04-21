import { Spinner } from '@/components/ui/spinner';
import { FetchUserError } from '@/features/user/fetch-user-error';
import { useFindProfile } from '@/features/user/use-find-profile-api';
import { useLocation } from 'react-router-dom';
import { NotFoundRoute } from '../not-found';
import { UserMain } from '@/features/user/user-main';

export function User() {
  const { pathname } = useLocation();
  const username = pathname.replace('/@', '');
  const { data: user, isPending, error } = useFindProfile(username);

  if (!pathname.startsWith('/@') || !username) {
    return <NotFoundRoute />;
  }

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <FetchUserError username={username} errorMessage={error.message} />;
  }

  if (user) {
    return <UserMain user={user} />;
  }

  return <NotFoundRoute />;
}
