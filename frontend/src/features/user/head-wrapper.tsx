import { Head } from '@/components/seo';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  name: string;
  username: string;
  about: string;
};

export function HeadWrapper({ children, name, username, about }: Props) {
  return (
    <>
      <Head
        title={name || username}
        description={`${name && `${name} | `}${about}`}
      />
      <main>{children}</main>
    </>
  );
}
