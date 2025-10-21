import React, { useRef, useEffect, useState } from 'react';
import './MagicBento.css';

interface MagicBentoProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
  particleSpeed?: number;
  particleSize?: number;
  particleColor?: string;
  hoverIntensity?: number;
  animationDuration?: number;
  staggerDelay?: number;
}

const MagicBento: React.FC<MagicBentoProps> = ({
  children,
  className = '',
  style = {},
  particleCount = 20,
  particleSpeed = 0.5,
  particleSize = 2,
  particleColor = '#3b82f6',
  hoverIntensity = 1.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = particlesRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initialParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * particleSpeed * 2,
      vy: (Math.random() - 0.5) * particleSpeed * 2,
      size: Math.random() * particleSize + 1,
      opacity: Math.random() * 0.5 + 0.3,
      life: Math.random() * 100 + 50
    }));
    setParticles(initialParticles);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update position
          particle.x += particle.vx * (isHovered ? hoverIntensity : 1);
          particle.y += particle.vy * (isHovered ? hoverIntensity : 1);
          
          // Bounce off edges
          if (particle.x <= 0 || particle.x >= canvas.width) {
            particle.vx *= -1;
          }
          if (particle.y <= 0 || particle.y >= canvas.height) {
            particle.vy *= -1;
          }
          
          // Keep particles in bounds
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
          
          // Update life
          particle.life -= 0.5;
          if (particle.life <= 0) {
            particle.life = Math.random() * 100 + 50;
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
          }
          
          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.opacity * (particle.life / 100);
          ctx.fillStyle = particleColor;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          
          return particle;
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleSpeed, particleSize, particleColor, hoverIntensity, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`magic-bento-container ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={particlesRef}
        className="magic-bento-particles"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div className="magic-bento-content" style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default MagicBento;
