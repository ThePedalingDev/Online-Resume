import { CSSProperties } from 'react';

export interface GradualBlurProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  responsive?: boolean;
  target?: 'parent' | 'page';
  className?: string;
  style?: CSSProperties;
  preset?: string;
  hoverIntensity?: number;
  onAnimationComplete?: () => void;
}

declare const GradualBlur: React.FC<GradualBlurProps>;
export default GradualBlur;




