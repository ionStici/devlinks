import { User } from '@/types/user';

export function UserMain({ user }: { user: User }) {
  return <div>{user.username}</div>;
}
