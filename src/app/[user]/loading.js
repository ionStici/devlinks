"use client";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-dvh min-w-dvh py-2">
      <div className="rounded-full border-[12px] border-borders border-t-purple animate-spin h-[125px] w-[125px]" />
      <p className="text-2xl font-[500]">Searching User...</p>
    </div>
  );
}
