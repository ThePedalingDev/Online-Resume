import { useEffect, useRef, useState } from 'react';

/** Types `text` out once when scrolled into view. The untyped remainder holds its space, so nothing reflows. */
export function TypedText({ text, speed = 95 }: { text: string; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [started, speed, text.length]);

  if (reduced) return <span ref={ref}>{text}</span>;

  return (
    <span ref={ref} className="typed">
      <span>{text.slice(0, count)}</span>
      <span className="typed-caret" aria-hidden="true" />
      <span className="typed-rest">{text.slice(count)}</span>
    </span>
  );
}
