import React from 'react';
import { ShootingStars } from '../components/ui/ShootingStars'; // Adjust path
import { StarsBackground } from '../components/ui/StarsBackground'; // Adjust path

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <StarsBackground starCount={160} />
      <ShootingStars count={6} />
    </div>
  );
}
