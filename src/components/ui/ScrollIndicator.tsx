import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'glossy';
}

export function ScrollIndicator({ 
  targetId, 
  className = '',
  variant = 'glossy'
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show indicator when at top and there's more content below
      const hasMoreContent = documentHeight > windowHeight + 100; // 100px buffer
      const atTop = scrollTop < 100; // Show when near top
      const nearBottom = scrollTop + windowHeight >= documentHeight - 100; // Hide when near bottom
      
      // Show at end of sections (when scrolled down but not at very bottom)
      const scrolledDown = scrollTop > 200; // User has scrolled down significantly
      const atEndOfSection = scrollTop + windowHeight >= documentHeight - 300; // Near bottom but not at very bottom
      const showAtEnd = scrolledDown && atEndOfSection && !nearBottom && hasMoreContent;
      
      setIsVisible((atTop && hasMoreContent && !nearBottom) || showAtEnd);
    };

    // Check initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // Default: scroll down by viewport height
    window.scrollBy({ 
      top: window.innerHeight * 0.8,
      behavior: 'smooth' 
    });
  };

  if (!isVisible) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-background/60 backdrop-blur-sm border border-border/50 hover:bg-background/80';
      case 'glossy':
        return 'bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-md border border-primary/20 hover:from-background/90 hover:to-background/70 shadow-lg';
      default:
        return 'bg-background/80 backdrop-blur-sm border border-primary/20 hover:bg-background/90 shadow-md';
    }
  };

  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <button
        onClick={scrollToNext}
        className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-bounce ${getVariantStyles()}`}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
      </button>
      
      {/* Subtle pulse effect */}
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20 pointer-events-none"></div>
    </div>
  );
}

// Section-specific scroll indicator
export function SectionScrollIndicator({ 
  nextSectionId, 
  className = '' 
}: { 
  nextSectionId: string; 
  className?: string; 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = document.getElementById(nextSectionId);
      if (!currentSection) return;

      const rect = currentSection.getBoundingClientRect();
      const isInView = rect.top > window.innerHeight;
      setIsVisible(isInView);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextSectionId]);

  if (!isVisible) return null;

  const scrollToNext = () => {
    const element = document.getElementById(nextSectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex justify-center py-8 ${className}`}>
      <button
        onClick={scrollToNext}
        className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Continue to next section"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-medium">More below</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:scale-110 transition-transform" />
        </div>
      </button>
    </div>
  );
}
