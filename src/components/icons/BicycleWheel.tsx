interface BicycleWheelProps {
  className?: string;
}

export function BicycleWheel({ className = "w-8 h-8" }: BicycleWheelProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rim */}
      <circle cx="50" cy="50" r="45" strokeWidth="3" />
      
      {/* Inner rim */}
      <circle cx="50" cy="50" r="40" strokeWidth="1.5" opacity="0.6" />
      
      {/* Hub (center) */}
      <circle cx="50" cy="50" r="5" fill="currentColor" />
      
      {/* Spokes - 12 spokes evenly distributed */}
      {/* Top spoke */}
      <line x1="50" y1="50" x2="50" y2="5" strokeWidth="1" />
      
      {/* 30° */}
      <line x1="50" y1="50" x2="72" y2="13" strokeWidth="1" />
      
      {/* 60° */}
      <line x1="50" y1="50" x2="89" y2="27" strokeWidth="1" />
      
      {/* Right spoke */}
      <line x1="50" y1="50" x2="95" y2="50" strokeWidth="1" />
      
      {/* 120° */}
      <line x1="50" y1="50" x2="89" y2="73" strokeWidth="1" />
      
      {/* 150° */}
      <line x1="50" y1="50" x2="72" y2="87" strokeWidth="1" />
      
      {/* Bottom spoke */}
      <line x1="50" y1="50" x2="50" y2="95" strokeWidth="1" />
      
      {/* 210° */}
      <line x1="50" y1="50" x2="28" y2="87" strokeWidth="1" />
      
      {/* 240° */}
      <line x1="50" y1="50" x2="11" y2="73" strokeWidth="1" />
      
      {/* Left spoke */}
      <line x1="50" y1="50" x2="5" y2="50" strokeWidth="1" />
      
      {/* 300° */}
      <line x1="50" y1="50" x2="11" y2="27" strokeWidth="1" />
      
      {/* 330° */}
      <line x1="50" y1="50" x2="28" y2="13" strokeWidth="1" />
    </svg>
  );
}


