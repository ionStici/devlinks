export default function Input({ type, name, label, value }) {
  return (
    <div className="sm:flex sm:items-center">
      <label
        htmlFor={name}
        className="block mb-1 text-xs text-dark_grey sm:mb-0 sm:text-base sm:text-grey"
      >
        {label}
      </label>
      <input
        className="w-full h-12 px-4 rounded-lg border border-borders text-base sm:w-[344px] sm:ml-auto"
        name={name}
        id={name}
        type={type}
        defaultValue={value}
      />
    </div>
  );
}
