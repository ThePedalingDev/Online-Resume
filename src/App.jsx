import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import HyperspaceBackground from "./components/HyperspaceBackground.jsx";
import CockpitLayout from "./components/CockpitLayout.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import HUDNavigation from "./components/HUDNavigation.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import '@fortawesome/fontawesome-svg-core/styles.css';



import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import About from "./pages/About.jsx";
import SkillTree from "./pages/SkillTree.jsx";
import Cycling from "./pages/Cycling.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";

import { ShootingStars } from "./components/ui/ShootingStars";
import { StarsBackground } from "./components/ui/StarsBackground";

export default function App() {
  return (
    <ThemeProvider>
      {/* Scroll restoration on route change */}
      <ScrollToTop />

      {/* Hyperspace background effect */}
      <HyperspaceBackground />

      {/* Global star backgrounds - fixed behind all content */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <StarsBackground starCount={160} />
        <ShootingStars maxVisible={3} />
      </div>

      {/* Main cockpit layout wraps all pages and UI */}
      <CockpitLayout>
        <ThemeToggle />

        {/* Your app routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/skill-tree" element={<SkillTree />} />
          <Route path="/cycling" element={<Cycling />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Bottom HUD navigation */}
        <HUDNavigation />
      </CockpitLayout>
    </ThemeProvider>
  );
}
