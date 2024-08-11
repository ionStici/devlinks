import { redirect } from "next/navigation";
import { getUser } from "./auth/_actions/auth";

export default async function Page() {
  const user = await getUser();
  if (user) redirect("/edit/profile");
  if (!user) redirect("/auth/login");
}
