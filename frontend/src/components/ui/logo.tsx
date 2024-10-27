type LogoProps = {
  size: "large" | "medium" | "small";
};

export default function Logo({ size }: LogoProps) {
  return (
    <>
      {size === "large" && (
        <img
          src="/assets/logo-devlinks-large.svg"
          className="w-[183px] h-10"
          alt="Devlinks Logo"
          width="183"
          height="40"
        />
      )}
      {size === "medium" && (
        <img
          src="/assets/logo-devlinks-large.svg"
          className="w-[146px] h-8"
          alt="Devlinks Logo"
          width="146"
          height="32"
        />
      )}
      {size === "small" && (
        <img
          src="/assets/logo-devlinks-small.svg"
          className="size-8"
          alt="Devlinks Logo"
          width="32"
          height="32"
        />
      )}
    </>
  );
}
