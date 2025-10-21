import { ReactNode, CSSProperties } from 'react';

export interface MagicBentoProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
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
  particleSpeed?: number;
  particleSize?: number;
  particleColor?: string;
  hoverIntensity?: number;
}

declare const MagicBento: React.FC<MagicBentoProps>;
export default MagicBento;

