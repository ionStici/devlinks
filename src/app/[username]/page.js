import { getUser } from "@/actions/auth";
import { getUserByUsername } from "@/actions/getUserByUsername";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const paramUsername = params.username.split("%40")[1];
  let data;

  const loggedInUser = await getUser();
  const loggedInUsername = loggedInUser?.email?.split("@")[1];

  if (loggedInUser && paramUsername === loggedInUsername) data = loggedInUser;

  if (!data) {
    data = await getUserByUsername(paramUsername);
  }

  if (!data) notFound();

  const user = {
    username: data.email,
    email: data.user_metadata.email,
    firstName: data.user_metadata.firstName,
    lastName: data.user_metadata.lastName,
    image: data.user_metadata.image,
    links: data.user_metadata.links,
  };

  console.log(user);

  return (
    <div>
      <ul>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>{user.firstName}</li>
        <li>{user.lastName}</li>
        <li>{user.image}</li>
        {user.links.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </div>
  );
}
