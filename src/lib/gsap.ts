import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Default GSAP settings
gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  start: 'top 85%',
  end: 'bottom 15%',
});

export { gsap, ScrollTrigger, ScrollToPlugin };



