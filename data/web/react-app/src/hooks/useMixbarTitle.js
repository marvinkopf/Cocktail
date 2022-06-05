import { useEffect, useRef } from "react";

export function useMixbarTitle(title) {
  useEffect(() => {
    document.title = "MIXBAR";
    if (title) {
      document.title += ` | ${title}`;
    }
  }, [title]);
}
