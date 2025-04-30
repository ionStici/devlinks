import React from 'react';
import { NavigationBar } from '@/features/editor/navigation-bar';
import { PhoneMockup } from '@/features/editor/phone-mockup';

export function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="sm:p-6 pb-10 sm:pb-12 min-h-dvh bg-grey-light">
      <NavigationBar />
      <div className="max-w-[1392px] flex gap-6 m-4 sm:m-0 md:mx-auto">
        <section className="hidden lg:flex items-center justify-center rounded-xl shadow-section bg-white md:h-[834px] min-w-[348px] max-w-[560px] flex-grow">
          <PhoneMockup />
        </section>
        <section className="w-full flex flex-col md:min-h-[874px] lg:min-h-[834px] max-w-[808px] mx-auto pt-6 pb-4 md:pt-10 md:pb-6 rounded-xl shadow-section bg-white flex-grow">
          {children}
        </section>
      </div>
    </main>
  );
}
