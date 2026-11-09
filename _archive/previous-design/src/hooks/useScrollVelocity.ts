import { useEffect, useRef, useState } from 'react';

interface ScrollData {
  velocity: number;
  direction: 'up' | 'down';
  position: number;
  isScrolling: boolean;
}

export function useScrollVelocity(sensitivity = 1) {
  const [scrollData, setScrollData] = useState<ScrollData>({
    velocity: 0,
    direction: 'down',
    position: 0,
    isScrolling: false,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const velocityRef = useRef(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastTime.current;

      // Calculate velocity (pixels per millisecond)
      const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) * sensitivity : 0;
      
      // Smooth velocity using exponential moving average
      velocityRef.current = velocityRef.current * 0.7 + velocity * 0.3;

      const direction = deltaY > 0 ? 'down' : 'up';

      setScrollData({
        velocity: velocityRef.current,
        direction,
        position: currentScrollY,
        isScrolling: true,
      });

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set isScrolling to false after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollData((prev) => ({
          ...prev,
          isScrolling: false,
          velocity: 0,
        }));
      }, 150);

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;

      // Update CSS variable for use in animations using setProperty
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          '--scroll-velocity',
          Math.min(velocityRef.current, 1).toString()
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sensitivity]);

  return scrollData;
}

// Hook for parallax effect based on scroll velocity
export function useParallaxVelocity(intensity = 1) {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const scrollData = useScrollVelocity();

  useEffect(() => {
    // Calculate parallax offset based on velocity
    const offset = scrollData.velocity * 50 * intensity * (scrollData.direction === 'down' ? 1 : -1);
    setParallaxOffset(offset);
  }, [scrollData, intensity]);

  return parallaxOffset;
}
