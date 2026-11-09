import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  offset = 0,
  className = '',
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: containerRef, dependencies: [speed, offset] });

  return (
    <div ref={containerRef} className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  );
}

