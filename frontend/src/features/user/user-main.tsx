import { Head } from '@/components/seo';
import { User } from '@/types/user';

export function UserMain({ user }: { user: User }) {
  const { username, name, about, image, links } = user;

  return (
    <div>
      <Head
        title={name || username}
        description={`${name && `${name} | `}${about}`}
      />
      {user.username}
    </div>
  );
}
