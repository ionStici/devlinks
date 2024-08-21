import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler();
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [listenCapturing, handler]);

  return ref;
}
