import React, { useState } from 'react';
import { projects } from '../data/projects.js'; // Your projects array
import { motion } from 'framer-motion';

// If you have these two components, import them. Otherwise, comment/remove.
import { ShootingStars } from '../components/ui/ShootingStars';
import { StarsBackground } from '../components/ui/StarsBackground';

// Emojis for planets
const planetEmojis = [
  "🌎", "🪐", "🌕", "🌑", "🌙", "🛸", "⭐", "🌟"
];

const orbitRadii = [90, 120, 160, 200, 240, 280, 320, 360]; // px from center
const orbitSpeeds = [19, 16, 14, 11, 8, 6, 5, 4]; // seconds per orbit

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative min-h-screen py-16 px-4 overflow-hidden">
      {/* Star background sits BEHIND everything */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <StarsBackground starCount={160} />
        <ShootingStars count={6} />
      </div>

      <h2 className="mb-12 text-center text-4xl font-bold uppercase tracking-wide relative z-10">
        Solar System of Projects
      </h2>

      {/* Main content container with solar system and details side by side */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-7xl mx-auto">
        {/* Solar system container */}
        <div className="relative h-[520px] w-[520px] max-w-full rounded-full z-10 flex-shrink-0">
          {/* Sun in the center */}
          <div
            className="absolute left-1/2 top-1/2 z-10"
            style={{
              transform: 'translate(-50%, -50%)',
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff900 55%, #ffb300 85%, #ed7c16 100%)',
              boxShadow: '0 0 80px 15px #ffb300cc, 0 0 160px 20px #fff90066',
              border: '3px solid #fffc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 'bold',
              color: '#ffe600',
              letterSpacing: 1,
              userSelect: 'none'
            }}
          >
            ☀️
          </div>
          {/* Planets */}
          {projects.map((project, idx) => {
            const orbit = orbitRadii[idx % orbitRadii.length];
            const duration = orbitSpeeds[idx % orbitSpeeds.length];
            return (
              <motion.button
                key={project.id}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: 54,
                  height: 54,
                  fontSize: 36,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  transform: `translate(-50%, -50%) rotate(${(idx * 360 / projects.length)}deg) translate(${orbit}px)`,
                  zIndex: 2,
                  cursor: 'pointer',
                  animation: `orbit-${idx} ${duration}s linear infinite`,
                  filter: "drop-shadow(0 0 8px #fff8) drop-shadow(0 0 18px #7cf1) drop-shadow(0 0 24px #ffe15b80)"
                }}
                onClick={() => setActive(project)}
                whileHover={{ scale: 1.33 }}
                aria-label={project.name}
              >
                {planetEmojis[idx % planetEmojis.length]}
                {/* Project name overlay underneath the emoji - counter-rotates to stay upright */}
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 pointer-events-none"
                  style={{ zIndex: 3 }}
                >
                  <span
                    className="inline-block"
                    style={{ animation: `counter-${idx} ${duration}s linear infinite` }}
                  >
                    <span className="text-xs font-medium text-white/90 bg-black/60 px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm" style={{ textShadow: '0 0 8px rgba(0,0,0,0.8)' }}>
                      {project.name}
                    </span>
                  </span>
                </div>
              </motion.button>
            );
          })}
          {/* Orbit rings */}
          {projects.map((_, idx) => {
            const orbit = orbitRadii[idx % orbitRadii.length];
            return (
              <div
                key={`orbit-${idx}`}
                className="absolute rounded-full border border-white/10 pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  width: orbit * 2,
                  height: orbit * 2,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                }}
              />
            );
          })}
          {/* Orbit keyframes (unique for each planet) */}
          <style>{`
            ${projects.map((_, idx) => `
              @keyframes orbit-${idx} {
                0% { transform: translate(-50%, -50%) rotate(0deg) translate(${orbitRadii[idx % orbitRadii.length]}px); }
                100% { transform: translate(-50%, -50%) rotate(360deg) translate(${orbitRadii[idx % orbitRadii.length]}px); }
              }
              @keyframes counter-${idx} {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(-360deg); }
              }
            `).join('\n')}
          `}</style>
        </div>

        {/* Details panel - now positioned to the right */}
        <div className="w-full lg:w-96 rounded-lg bg-black/50 p-6 shadow-inner min-h-[400px] backdrop-blur-sm z-10 relative flex-shrink-0">
          {active ? (
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-semibold">{active.name}</h3>
                <button
                  onClick={() => setActive(null)}
                  className="text-sm underline hover:text-jedi-accent dark:hover:text-sith-accent"
                >
                  Clear
                </button>
              </div>
              <p className="mt-2 text-sm opacity-90">{active.description}</p>
              <div className="mt-3 flex gap-4 text-sm">
                {active.demo && (
                  <a
                    href={active.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-jedi-accent dark:hover:text-sith-accent"
                  >
                    Live Demo
                  </a>
                )}
                {active.repo && (
                  <a
                    href={active.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-jedi-accent dark:hover:text-sith-accent"
                  >
                    Source Code
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm opacity-70 text-center">Select a planet to view project details.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
