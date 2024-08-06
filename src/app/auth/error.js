"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p className="text-grey text-base mb-2">
        The server has something to say
      </p>
      <h1 className="text-2xl font-semibold text-dark_grey mb-10 border-b-2 border-red px-2">
        {error.message}
      </h1>
      <p className="text-grey text-base mb-2">We suggest to</p>
      <button
        onClick={reset}
        className="w-[200px] h-[46px] rounded-lg bg-purple text-white text-base disabled:bg-borders hover:bg-purple_hover hover:shadow-input transition disabled:shadow-none focus:outline-none focus:ring-[2px] focus:ring-purple focus:ring-offset-2"
      >
        Try Again!
      </button>
    </div>
  );
}
