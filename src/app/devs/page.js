import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { email } = await getUser();
  redirect(`/devs/${email.split("@")[0]}`);
}
