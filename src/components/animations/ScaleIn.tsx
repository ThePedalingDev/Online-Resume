import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  scale?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  scale = 0.9,
}: ScaleInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        scale,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play none none reset',
        },
      }
    );
  }, { scope: containerRef, dependencies: [delay, duration, once, scale] });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

