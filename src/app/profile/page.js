import { getUser } from "@/actions/auth";

export default async function Page() {
  const user = await getUser();

  return <div>Profile</div>;
}
