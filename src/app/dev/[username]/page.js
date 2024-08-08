import { adminAuthClient } from "@/utils/supabase/admin";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { data, error } = await adminAuthClient.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (error) throw new Error(error.message);

  const userData = data.users.find((user) => {
    return user.email.split("@")[1] === params.username.split("%40")[1];
  });

  if (!userData) notFound();

  const user = {
    username: userData.email,
    email: userData.user_metadata.email,
    firstName: userData.user_metadata.firstName,
    lastName: userData.user_metadata.lastName,
    image: userData.user_metadata.image,
    links: userData.user_metadata.links,
  };

  return <div>{user.username}</div>;
}
