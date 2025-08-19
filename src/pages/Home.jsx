import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';
import Hologram from '../components/Hologram.jsx';

/**
 * Home page representing the cockpit HUD. It features a central hologram
 * that changes with the theme, a welcome message and a button to begin
 * exploring the portfolio. A subtle parallax effect moves the hologram
 * slightly in response to mouse movement to enhance depth.
 */
export default function Home() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  // Offsets for parallax effect
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // No need to toggle a special body class. The cockpit background and
  // starfield scroll now apply globally across all pages.

  useEffect(() => {
    function handleMouseMove(e) {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // ±10px
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setOffset({ x, y });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      {/* Text and button container with parallax effect */}
      <div
        className="relative z-10"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4">
          Welcome, Captain
        </h1>
        <p className="mb-6 text-sm md:text-base max-w-md mx-auto leading-relaxed opacity-80">
          You are about to embark on a journey through my universe of code and
          cycling adventures. Choose your path—light or dark—and begin the
          mission.
        </p>
        {/* Begin mission button */}
        <button
          onClick={() => navigate('/projects')}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-jedi-accent dark:border-sith-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-jedi-accent dark:text-sith-accent transition-all hover:bg-jedi-accent hover:text-jedi-background dark:hover:bg-sith-accent dark:hover:text-sith-background"
        >
          Begin Mission
        </button>
      </div>
      {/* Hologram positioned near the bottom centre of the viewport to align with the cockpit HUD */}
      <div className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2">
        <Hologram />
      </div>
      
    </main>
  );
}