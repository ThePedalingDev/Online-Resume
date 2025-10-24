import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface ShinyTextProps {
  text: string;
  className?: string;
  duration?: number;
  disabled?: boolean;
}

export function ShinyText({
  text,
  className = '',
  duration = 2,
  disabled = false,
}: ShinyTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!textRef.current || disabled) return;

    const timeline = gsap.timeline({ repeat: -1 });
    
    timeline.to(textRef.current, {
      backgroundPosition: '200% center',
      duration,
      ease: 'none',
    });
  }, { scope: textRef, dependencies: [duration, disabled] });

  const shinyStyle = {
    background: disabled 
      ? 'inherit'
      : 'linear-gradient(110deg, currentColor 45%, rgba(255, 255, 255, 0.8) 50%, currentColor 55%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '-100% center',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: disabled ? 'inherit' : 'transparent',
  };

  return (
    <span 
      ref={textRef} 
      className={`inline-block ${className}`}
      style={shinyStyle}
    >
      {text}
    </span>
  );
}







