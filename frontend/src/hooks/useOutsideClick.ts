import { useEffect, useRef, useCallback } from 'react';

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true
) {
  const ref = useRef<T | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler();
    },
    [handler]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, listenCapturing);
    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        listenCapturing
      );
    };
  }, [listenCapturing, handleClickOutside]);

  return ref;
}
