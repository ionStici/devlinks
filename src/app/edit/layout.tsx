import { getUserData } from "@/actions/getUserData";
import NavigationBar from "@/components/edit/NavigationBar";
import PhoneMockup from "@/components/edit/PhoneMockup";
import { type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default async function PageLayout({ children }: LayoutProps) {
  const userData = await getUserData();

  return (
    <main className="sm:m-6">
      <NavigationBar username={userData.username} />
      <div className="max-w-[1392px] flex gap-6 m-4 sm:m-0 md:mx-auto">
        <PhoneMockup userData={userData} />
        <section className="w-full flex flex-col md:min-h-[874px] lg:min-h-[834px] max-w-[808px] mx-auto pt-6 pb-4 md:pt-10 md:pb-6 rounded-xl shadow-section bg-white flex-grow">
          {children}
        </section>
      </div>
    </main>
  );
}
