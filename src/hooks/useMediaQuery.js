import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}
