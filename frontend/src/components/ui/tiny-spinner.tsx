type TinySpinner = {
  classes?: string;
};

export default function TinySpinner({ classes }: TinySpinner) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`${
        classes ? classes : "border-t-purple border-white"
      } w-6 h-6 border-4 border-t-4 rounded-full animate-spin`}
    />
  );
}
