type HeaderProps = {
  heading: string;
  content: string;
};

export function Header({ heading, content }: HeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-2xl sm:text-[32px] sm:leading-10 font-bold text-dark-grey mb-2">
        {heading}
      </h1>
      <p className="text-grey text-base">{content}</p>
    </header>
  );
}
