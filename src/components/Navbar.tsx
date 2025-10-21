import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, User, Briefcase, Code2, Mail, Share2, BookOpen, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { BicycleWheel } from '@/components/icons/BicycleWheel';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: User },
    { label: 'Projects', path: '/projects', icon: Briefcase },
    { label: 'Skills', path: '/skills', icon: Code2 },
    { label: 'Blog', path: '/blog', icon: BookOpen },
    { label: 'Social', path: '/social', icon: Share2 },
    { label: 'Contact', path: '/contact', icon: Mail },
  ];

  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Animate theme toggle
  useGSAP(() => {
    if (themeButtonRef.current) {
      gsap.to(themeButtonRef.current, {
        rotation: theme === 'dark' ? 180 : 0,
        duration: 0.3,
        ease: 'power2.inOut',
        overwrite: true, // Prevent animation conflicts
      });
    }
  }, [theme]);

  // Animate logo rotation
  useGSAP(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  // Handle scroll to toggle navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8; // 80% of viewport height
      const scrollPosition = window.scrollY;
      setIsTransparent(scrollPosition < heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isTransparent 
        ? 'bg-transparent border-transparent backdrop-blur-none shadow-none' 
        : 'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    }`}>
      <div className="w-full px-[var(--container-padding)]">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Animated Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative hover:scale-110 transition-transform">
              <div ref={logoRef} className={isTransparent ? 'drop-shadow-lg' : ''}>
                <BicycleWheel className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold text-foreground group-hover:text-primary transition-colors ${isTransparent ? 'drop-shadow-lg text-shadow-lg' : ''}`}>
                Markus Fourie
              </span>
              <span className={`text-xs text-muted-foreground -mt-0.5 ${isTransparent ? 'drop-shadow-lg text-shadow-lg' : ''}`}>
                Full-Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`text-base flex items-center gap-2 group hover:-translate-y-0.5 transition-all duration-200 ${isTransparent ? 'drop-shadow-lg text-shadow-lg' : ''}`}
                  >
                    <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            {/* Theme Toggle */}
            <div className="ml-4 hover:scale-105 transition-transform">
              <button
                ref={themeButtonRef}
                onClick={toggleTheme}
                className={`p-2 rounded-lg border ${isTransparent ? 'bg-background/50 backdrop-blur-sm border-primary/20' : 'bg-background'} hover:bg-accent transition`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <div className="hover:scale-110 transition-transform">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border bg-background hover:bg-accent transition"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent focus:outline-none hover:scale-110 transition-transform"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden overflow-hidden transition-all duration-300">
            <div className="bg-background/95 backdrop-blur-sm border-t border-border/50 rounded-b-lg shadow-lg">
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-base flex items-center gap-2 hover:-translate-x-1 transition-transform hover:bg-accent/50"
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
