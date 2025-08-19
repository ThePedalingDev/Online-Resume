import React, { useState, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hyperspace3D from './Hyperspace3D.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';

// Import your backgrounds here:
import HyperspaceBackground from './HyperspaceBackground.jsx';
import { ShootingStars } from './ui/ShootingStars';
import { StarsBackground } from './ui/StarsBackground';

export default function CockpitLayout({ children }) {
  const { theme } = useContext(ThemeContext);
  const jediColor = '#50b8ff';
  const sithColor = '#ff4050';
  const accentColor = theme === 'jedi' ? jediColor : sithColor;

  const [inHyperspace, setInHyperspace] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handles the cinematic crossfade
  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setInHyperspace((v) => !v);
      setTimeout(() => setIsTransitioning(false), 380); // duration must match overlay fade
    }, 350); // fade out to black, then change
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* --- GLOBAL COCKPIT STARFIELD/HYPERSPACE BACKGROUNDS --- */}
      <HyperspaceBackground />
      <div className="fixed inset-0 pointer-events-none z-0">
        <StarsBackground starCount={160} />
        <ShootingStars maxVisible={3} />
      </div>

      {/* --- 3D Streaks Overlay (hyperspace jump) --- */}
      <AnimatePresence>
        {inHyperspace && !isTransitioning && (
          <motion.div
            key="hyper"
            className="absolute inset-0 cockpit-window overflow-hidden z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ pointerEvents: "none" }}
          >
            <Hyperspace3D />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Black overlay for crossfade --- */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ background: '#000' }}
          />
        )}
      </AnimatePresence>

      {/* --- Hyperspace Toggle Button --- */}
      <button
        onClick={handleToggle}
        disabled={isTransitioning}
        className={`
          fixed top-5 left-5 z-50
          flex flex-col items-center justify-center
          w-12 h-12
          rounded-full
          transition-shadow
          border-2
          backdrop-blur
          ${isTransitioning ? 'opacity-60 cursor-wait' : 'opacity-100 cursor-pointer'}
        `}
        style={{
          background: 'rgba(0,0,0,0.85)',
          borderColor: accentColor,
          boxShadow: `0 0 12px 2px ${accentColor}bb`,
          color: accentColor,
        }}
        aria-label={inHyperspace ? "Exit Hyperspace" : "Enter Hyperspace"}
        tabIndex={0}
      >
        {/* Starburst SVG for hyperspace theme */}
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <circle
            cx="14" cy="14" r="10"
            fill={accentColor}
            fillOpacity="0.19"
            stroke={accentColor}
            strokeWidth="1.3"
          />
          <g stroke={accentColor} strokeWidth="2" strokeLinecap="round">
            <line x1="14" y1="3.5" x2="14" y2="0.5" />
            <line x1="14" y1="24.5" x2="14" y2="27.5" />
            <line x1="24.5" y1="14" x2="27.5" y2="14" />
            <line x1="3.5" y1="14" x2="0.5" y2="14" />
            <line x1="22" y1="6" x2="24" y2="4" />
            <line x1="6" y1="6" x2="4" y2="4" />
            <line x1="6" y1="22" x2="4" y2="24" />
            <line x1="22" y1="22" x2="24" y2="24" />
          </g>
          <circle
            cx="14" cy="14" r="3"
            fill={inHyperspace ? accentColor : "#181820"}
            stroke={accentColor}
            strokeWidth="1.3"
          />
        </svg>
        <span
          className="text-[10px] mt-1 font-bold select-none"
          style={{
            color: accentColor,
            textShadow: `0 0 7px ${accentColor}`,
            letterSpacing: 1,
          }}
        >
          {inHyperspace ? "Exit" : "Jump"}
        </span>
      </button>

      {/* --- Page content (always above background!) --- */}
      <div className="relative z-20 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
