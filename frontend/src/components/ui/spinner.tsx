export function Spinner() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full min-h-dvh py-2">
      <div className="size-28 rounded-full border-4 border-borders border-t-purple animate-spin" />
      <p className="text-2xl">Loading...</p>
    </div>
  );
}
