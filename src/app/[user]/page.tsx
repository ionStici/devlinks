import { getUserByUsername } from "@/actions/getUserByUsername";
import { notFound } from "next/navigation";

type ParamsUser = {
  user: string;
};

export default async function Page({ params }: { params: ParamsUser }) {
  if (!params.user.startsWith("%40")) notFound();

  const userData = await getUserByUsername(params.user.split("%40")[1]);

  if (!userData) return <p>User Not Found</p>;

  const { username, name, about, image, links } = userData;

  return <div>{name}</div>;
}
