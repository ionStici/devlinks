import { useAuth } from '@/lib/auth';

export function ProfileRoute() {
  const { user } = useAuth();

  return <p>profile</p>;
}
