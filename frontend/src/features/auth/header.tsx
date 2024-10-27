type HeaderProps = {
  heading: string;
  content: string;
};

export default function Header({ heading, content }: HeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-dark-grey text-2xl font-bold sm:text-[32px] sm:leading-10 mb-2">
        {heading}
      </h1>
      <p className="text-grey text-base">{content}</p>
    </header>
  );
}
