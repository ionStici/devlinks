type HeadingProps = {
  title: string;
  text: string;
};

export function Heading({ title, text }: HeadingProps) {
  return (
    <div className="relative mb-10 mx-6 md:mx-10">
      <h1 className="text-2xl font-bold text-dark_grey mb-2 md:text-[2rem] md:leading-10">
        {title}
      </h1>
      <p className="text-base text-grey">{text}</p>
    </div>
  );
}
