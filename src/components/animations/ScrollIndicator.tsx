import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  showDelay?: number;
  className?: string;
}

export function ScrollIndicator({ showDelay = 3000, className = '' }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  
  useEffect(() => {
    let timeoutId: number;
    let lastScrollTime = Date.now();

    const checkScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if near the top (within first 200px)
      const isAtTop = scrollTop < 200;
      
      // Check if near bottom (within last 300px)
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 300;
      
      setIsNearBottom(isAtBottom);
      
      // Update last scroll time
      lastScrollTime = Date.now();
      
      // Hide indicator when scrolling or at bottom
      if (!isAtTop || isAtBottom) {
        setIsVisible(false);
        clearTimeout(timeoutId);
      } else {
        // Show indicator after delay if at top and stationary
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (Date.now() - lastScrollTime >= showDelay && isAtTop && !isAtBottom) {
            setIsVisible(true);
          }
        }, showDelay);
      }
    };

    // Initial check
    checkScroll();

    // Check on scroll
    const handleScroll = () => {
      checkScroll();
    };

    // Check on mouse movement (to detect if user is active)
    const handleMouseMove = () => {
      lastScrollTime = Date.now();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [showDelay]);

  if (!isVisible || isNearBottom) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none ${className}`}
      style={{
        animation: 'bounce 2s ease-in-out infinite',
      }}
    >
      <div className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Scroll Down
        </span>
        <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
          <ChevronDown className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
}

