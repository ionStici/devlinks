import Image from "next/image";

export default function Logo({ size }) {
  return (
    <>
      {size === "large" && (
        <Image
          src="/assets/logo-devlinks-large.svg"
          alt="Devlinks Logo"
          width="183"
          height="40"
          priority={true}
        />
      )}
      {size === "small" && (
        <Image
          src="/assets/logo-devlinks-small.svg"
          alt="Devlinks Logo"
          width="32"
          height="32"
          priority={true}
        />
      )}
    </>
  );
}
