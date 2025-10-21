import { useRef, useEffect } from 'react';

interface LaserFlowProps {
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const LaserFlow = ({
  horizontalBeamOffset = 0.0,
  verticalBeamOffset = 0.0,
  color = '#FF79C6',
  className = '',
  style = {}
}: LaserFlowProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawLaserBeams = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, width, height);
      
      const time = timeRef.current * 0.001;
      
      // Create multiple laser beams
      for (let i = 0; i < 3; i++) {
        const offset = i * Math.PI * 0.6;
        const beamWidth = 2 + Math.sin(time + offset) * 1;
        const opacity = 0.3 + Math.sin(time * 0.5 + offset) * 0.2;
        
        // Horizontal beams
        ctx.beginPath();
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = beamWidth;
        ctx.lineCap = 'round';
        
        const y1 = height * (0.2 + horizontalBeamOffset + Math.sin(time * 0.3 + offset) * 0.1);
        const y2 = height * (0.8 + horizontalBeamOffset + Math.sin(time * 0.3 + offset + Math.PI) * 0.1);
        
        ctx.moveTo(0, y1);
        ctx.lineTo(width, y2);
        ctx.stroke();
        
        // Vertical beams
        ctx.beginPath();
        const x1 = width * (0.2 + verticalBeamOffset + Math.cos(time * 0.4 + offset) * 0.1);
        const x2 = width * (0.8 + verticalBeamOffset + Math.cos(time * 0.4 + offset + Math.PI) * 0.1);
        
        ctx.moveTo(x1, 0);
        ctx.lineTo(x2, height);
        ctx.stroke();
      }
      
      // Add some particle effects
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.2 + i) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.3 + i * 0.5) * 0.5 + 0.5) * height;
        const size = 1 + Math.sin(time + i) * 0.5;
        const particleOpacity = 0.1 + Math.sin(time * 2 + i) * 0.05;
        
        ctx.beginPath();
        ctx.fillStyle = `${color}${Math.floor(particleOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      timeRef.current = performance.now();
      drawLaserBeams();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [horizontalBeamOffset, verticalBeamOffset, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`laser-flow ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        ...style
      }}
    />
  );
};

export default LaserFlow;
