import { ReactNode, CSSProperties } from 'react';

export interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  particleSpeed?: number;
  particleSize?: number;
  particleColor?: string;
  hoverIntensity?: number;
}

declare const MagicBento: React.FC<MagicBentoProps>;
export default MagicBento;

