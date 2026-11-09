import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { parseCountTarget } from '@/components/motion/parseCount';

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  locale?: string;
};

function formatCount(n: number, prefix: string, suffix: string, locale: string) {
  return `${prefix}${Math.round(n).toLocaleString(locale)}${suffix}`;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** count-up recipe — motion-anything */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  durationMs = 900,
  className,
  locale = 'en-ZA',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => formatCount(0, prefix, suffix, locale));
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || ran.current) return;

    const finish = () => {
      ran.current = true;
      setDisplay(formatCount(value, prefix, suffix, locale));
    };

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      finish();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        ran.current = true;
        let start: number | null = null;
        const step = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / durationMs, 1);
          const eased = 1 - (1 - p) ** 3;
          setDisplay(formatCount(value * eased, prefix, suffix, locale));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [durationMs, locale, prefix, suffix, value]);

  return (
    <span ref={ref} className={cn('motion-count', className)}>
      {display}
    </span>
  );
}

type CountUpTextProps = {
  text: string;
  className?: string;
  durationMs?: number;
  fallback?: ReactNode;
};

/** Animate when `text` parses as a number; otherwise render unchanged. */
export function CountUpText({ text, className, durationMs, fallback }: CountUpTextProps) {
  const parsed = parseCountTarget(text);
  if (!parsed) return <>{fallback ?? text}</>;
  return (
    <CountUp
      value={parsed.value}
      prefix={parsed.prefix}
      suffix={parsed.suffix}
      className={className}
      durationMs={durationMs}
    />
  );
}
