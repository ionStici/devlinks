type Props = { username: string; name: string; about: string };

export function NameAbout({ username, name, about }: Props) {
  return (
    <div className="text-center mb-14">
      <h1 className="mb-2 font-bold text-[2rem] leading-10 text-dark_grey">
        {name || username}
      </h1>
      {about && <p className="text-base font-normal text-grey">{about}</p>}
    </div>
  );
}
