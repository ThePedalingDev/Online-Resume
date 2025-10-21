import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const getInitialPosition = () => {
      switch (direction) {
        case 'up':
          return { y: 30, x: 0 };
        case 'down':
          return { y: -30, x: 0 };
        case 'left':
          return { x: -40, y: 0 };
        case 'right':
          return { x: 40, y: 0 };
        case 'none':
          return { x: 0, y: 0 };
        default:
          return { y: 30, x: 0 };
      }
    };

    const initial = getInitialPosition();

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        ...initial,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play none none reset',
        },
      }
    );
  }, { scope: containerRef, dependencies: [direction, delay, duration, once] });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

