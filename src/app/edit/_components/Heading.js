import { logOut } from "@/app/edit/_actions/auth";

export default async function Heading({ title, text }) {
  return (
    <div className="relative mb-10 mx-6 md:mx-10">
      {/* TEMPORARY */}
      <form className="absolute right-0" action={logOut}>
        <button>Log Out</button>
      </form>
      {/* END TEMPORARY */}

      <h1 className="text-2xl font-bold text-dark_grey mb-2 md:text-[2rem] md:leading-10">
        {title}
      </h1>
      <p className="text-base text-grey">{text}</p>
    </div>
  );
}
