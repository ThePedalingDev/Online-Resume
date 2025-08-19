import React, { createContext, useState, useEffect } from 'react';

/**
 * ThemeContext provides a simple light/dark mode across the app. The two
 * available themes correspond to the Jedi (light side) and Sith (dark side).
 * Components can consume this context to determine which palette and
 * artwork to display. The theme preference is persisted in localStorage
 * so that returning visitors retain their last choice.
 */
export const ThemeContext = createContext({
  theme: 'jedi',
  toggleTheme: () => {},
  isJumping: false,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('jedi');
  const [isJumping, setIsJumping] = useState(false);

  // Load the saved theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('portfolioTheme');
    if (stored === 'sith' || stored === 'jedi') {
      setTheme(stored);
    }
  }, []);

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem('portfolioTheme', theme);
    // Toggle the dark class on the root element for Tailwind
    if (theme === 'sith') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  /**
   * Toggles between Jedi and Sith themes. A temporary jump state is set
   * that can be used to trigger hyperspace animations in consuming
   * components. The jump state resets after a short delay.
   */
  function toggleTheme() {
  setIsJumping(true);
  setTheme((prev) => (prev === 'jedi' ? 'sith' : 'jedi'));
  // End the hyperspace jump after 700ms (matches the Framer Motion animation)
  setTimeout(() => setIsJumping(false), 700); // or 1000
}


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isJumping }}>
      {children}
    </ThemeContext.Provider>
  );
}