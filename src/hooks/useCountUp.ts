// src/hooks/useCountUp.ts
import { useEffect, useState, useRef } from "react";

/**
 * Count-up hook.
 * - target: final number to reach
 * - duration: total ms for animation
 * - start: boolean that controls when to start (useful with IntersectionObserver)
 */
export default function useCountUp(target: number, duration = 1200, start = true) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start) return;
    if (started.current) return;
    started.current = true;

    let current = 0;
    const frameMs = 16;
    const steps = Math.max(1, Math.round(duration / frameMs));
    const increment = target / steps;

    const id = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(Math.round(target));
        clearInterval(id);
      } else {
        setValue(Math.floor(current));
      }
    }, frameMs);

    return () => clearInterval(id);
  }, [target, duration, start]);

  return value;
}
