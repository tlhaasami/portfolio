import React from 'react';

interface BallpitProps {
  className?: string;
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  colors?: string[];
}

declare const Ballpit: React.ComponentType<BallpitProps>;
export default Ballpit;
