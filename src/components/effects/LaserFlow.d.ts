import { CSSProperties } from 'react';

export interface LaserFlowProps {
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

declare const LaserFlow: React.FC<LaserFlowProps>;
export default LaserFlow;





