type TinySpinnerProps = {
  classes?: string;
};

export function TinySpinner({
  classes = 'border-t-purple border-white',
}: TinySpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`${classes} size-6 border-4 border-t-4 rounded-full animate-spin`}
    />
  );
}
