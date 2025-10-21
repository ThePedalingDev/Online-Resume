import { ReactNode } from 'react';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
    [key: string]: any;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
    [key: string]: any;
  };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  onLetterAnimationComplete?: () => void;
}

declare const SplitText: React.FC<SplitTextProps>;
export default SplitText;

