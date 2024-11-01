export function Spinner() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full min-h-dvh py-2">
      <div className="size-28 rounded-full border-8 border-borders border-t-purple animate-spin" />
      <p className="text-2xl font-medium">Loading...</p>
    </div>
  );
}
