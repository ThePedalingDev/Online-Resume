import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

// 1️⃣ Streaks function goes here!
function Streaks() {
  return (
    <>
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = Math.random() * 360;
        const length = 60 + Math.random() * 50; // px
        const duration = 0.55 + Math.random() * 0.3;
        const delay = Math.random() * 0.17;
        const width = 1.3 + Math.random() * 1.7; // px
        const opacity = 0.72 + Math.random() * 0.18;

        const shadow = `
          0 0 8px 2px white,
          0 0 20px 7px white,
          0 0 45px 14px white
        `;
        return (
          <motion.div
            key={i}
            initial={{
              opacity,
              scaleX: 0.15,
              y: 0,
              rotate: angle,
              left: '50%',
              top: '50%',
            }}
            animate={{
              opacity: [opacity, opacity * 0.85, 0.14, 0],
              scaleX: [0.15, 1.1, 1.3],
              y: [-5, -length * 4, -length * 8],
            }}
            transition={{
              duration,
              delay,
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
            className="absolute rounded-full z-50 pointer-events-none"
            style={{
              width: `${width}px`,
              height: `${length}px`,
              background: `radial-gradient(ellipse at 50% 30%, white 0%, white 45%, transparent 100%)`,
              boxShadow: shadow,
              filter: 'blur(0.9px) brightness(1.8)',
              transformOrigin: '0 100%',
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </>
  );
}

// 2️⃣ Now your background uses <Streaks />
export default function HyperspaceBackground() {
  const { isJumping } = useContext(ThemeContext);
  return (
    <AnimatePresence>
      {isJumping && (
        <motion.div
          key="jump"
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48, ease: 'easeOut' }}
        >
          <Streaks />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34vw] h-[34vw] rounded-full bg-white/10 blur-3xl z-40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
