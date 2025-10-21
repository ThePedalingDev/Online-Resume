import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface StaggerRevealProps {
  children: ReactNode;
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerReveal({
  children,
  stagger = 0.1,
  duration = 0.6,
  delay = 0,
  className = '',
  once = true,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.children;

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play none none reset',
        },
      }
    );
  }, { scope: containerRef, dependencies: [stagger, duration, delay, once] });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

