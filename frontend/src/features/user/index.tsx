import { NotFoundRoute } from '@/app/routes/not-found';
import { Spinner } from '@/components/ui/spinner';
import { User as UserType } from '@/types/user';
import { useLocation } from 'react-router-dom';
import { HeadWrapper } from './head-wrapper';
import { Links } from './links';
import { NameAbout } from './name-about';
import { ProfilePicture } from './profile-picture';
import { SectionWrapper } from './section-wrapper';
import { useFindProfile } from './use-find-profile-api';
import { UserError } from './user-error';

export function User() {
  const { pathname } = useLocation();
  const un = pathname.replace('/@', '');
  const { data: user, isPending, error } = useFindProfile(un);

  if (!pathname.startsWith('/@') || !un) return <NotFoundRoute />;

  if (isPending) return <Spinner />;

  if (error) return <UserError username={un} errorMessage={error.message} />;

  const { username, name, about, image, links } = user as UserType;

  if (user) {
    return (
      <HeadWrapper username={username} name={name} about={about}>
        <SectionWrapper>
          <ProfilePicture image={image} username={username} />
          <NameAbout username={username} name={name} about={about} />
          <Links links={links} />
        </SectionWrapper>
      </HeadWrapper>
    );
  }

  return <NotFoundRoute />;
}
