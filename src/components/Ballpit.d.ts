import React from 'react';

interface BallpitProps {
  className?: string;
  count?: number;
  countMobile?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  colors?: string[];
  size?: string;
  paused?: boolean;
  onLoaded?: () => void;
}

declare const Ballpit: React.ComponentType<BallpitProps>;
export default Ballpit;
