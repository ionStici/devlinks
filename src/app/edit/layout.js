import { getUser } from "@/app/edit/_actions/auth";
import { redirect } from "next/navigation";
import NavigationBar from "./_components/NavigationBar";
import PhoneMockup from "./_components/PhoneMockup";

export default async function Layout({ children }) {
  const user = await getUser();
  if (!user) redirect("/auth/login");

  return (
    <main className="sm:m-6">
      <NavigationBar username={user.email} />
      <div className="max-w-[1392px] flex gap-6 m-4 sm:m-0 md:mx-auto">
        <PhoneMockup user={user.user_metadata} />
        <section className="w-full flex flex-col md:min-h-[874px] lg:min-h-[834px] max-w-[808px] mx-auto pt-6 pb-4 md:pt-10 md:pb-6 rounded-xl shadow-section bg-white flex-grow">
          {children}
        </section>
      </div>
    </main>
  );
}
