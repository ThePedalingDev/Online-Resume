import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const canUseDom = typeof window !== 'undefined';

if (canUseDom && typeof gsap.registerPlugin === 'function') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  gsap.defaults({
    ease: 'power2.out',
    duration: 0.6,
  });

  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
    start: 'top 85%',
    end: 'bottom 15%',
  });
}

export { gsap, ScrollTrigger, ScrollToPlugin };
