export default function Header({ heading, content }) {
  return (
    <div className="mb-10">
      <h1 className="text-dark_grey mb-2 text-2xl font-bold md:text-[32px] md:leading-10">
        {heading}
      </h1>
      <p className="text-grey text-base">{content}</p>
    </div>
  );
}
