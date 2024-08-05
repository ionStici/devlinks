import Image from "next/image";

const emailIcon = "/assets/icon-email.svg";
const passwordIcon = "/assets/icon-password.svg";

export default function Input({
  label,
  type,
  name,
  placeholder,
  autoComplete,
}) {
  const icon = type === "email" ? emailIcon : passwordIcon;

  return (
    <div className="relative flex flex-col">
      <label className="mb-1 text-dark_grey text-xs" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="border border-borders h-12 rounded-lg pl-[44px] text-base focus:outline-none focus:shadow-input focus:border-purple hover:border-purple"
      />
      <Image
        src={icon}
        alt="Email"
        width={16}
        height={16}
        className="absolute left-4 bottom-4 pointer-events-none"
      />
    </div>
  );
}
