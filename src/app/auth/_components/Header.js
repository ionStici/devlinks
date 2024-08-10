export default function Header({ heading, content }) {
  return (
    <header className="mb-10">
      <h1 className="text-dark_grey mb-2 text-2xl font-bold sm:text-[32px] sm:leading-10">
        {heading}
      </h1>
      <p className="text-grey text-base">{content}</p>
    </header>
  );
}
