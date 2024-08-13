export default function TinySpinner({ classes }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`${classes} w-6 h-6 border-4 border-t-4 border-t-purple border-white rounded-full animate-spin`}
    />
  );
}
