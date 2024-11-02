import { type ReactNode } from 'react';

export function Footer({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="md:h-10" />
      <div className="border-t border-borders mt-6 mb-4 md:mb-6 md:mt-auto" />
      <div className="relative flex xs:justify-end gap-4 mx-6 md:mx-10">
        {children}
      </div>
    </>
  );
}
