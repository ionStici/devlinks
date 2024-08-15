import Image from "next/image";

export default function Feature({
  num,
  title,
  text,
  img,
  imgAlt,
  imgWidth,
  imgHeight,
}) {
  return (
    <div
      className={`md:flex md:items-center md:gap-20 ${
        num === "02" ? "flex-row-reverse" : ""
      }`}
    >
      <div className="mb-16 md:mb-0 md:w-[50%] md:flex-grow">
        <p className="text-[60px] font-extrabold tracking-[10px] text-borders mb-6 md:text-[85px] md:mb-12 lg:text-[100px]">
          {num}
        </p>
        <h3 className="mb-5 text-xl font-semibold md:text-2xl md:mb-2">
          {title}
        </h3>
        <p className="text-grey leading-7">{text}</p>
      </div>
      <div className="max-w-[400px] px-6 mx-auto md:max-w-[450px] md:w-[50%] md:flex-grow">
        <Image
          className="size-full"
          src={img}
          alt={imgAlt}
          width={imgWidth}
          height={imgHeight}
        />
      </div>
    </div>
  );
}
