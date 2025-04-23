import { User } from '@/types/user';
import { HeadWrapper } from './head-wrapper';
import { SectionWrapper } from './section-wrapper';
import { ProfilePicture } from './profile-picture';
import { NameAbout } from './name-about';
import { Links } from './links';

export function UserMain({ user }: { user: User }) {
  const { username, name, about, image, links } = user;

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
