import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, type ReactNode } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

const options = {
  autoRaf: true,
  lerp: 0.08,
  wheelMultiplier: 0.8,
  smoothWheel: true,
  syncTouch: false,
  anchors: true,
  stopInertiaOnNavigate: true,
};

function LenisFrames() {
  useLenis(() => {
    ScrollTrigger.update();
    window.dispatchEvent(new Event('lenis-frame'));
  });
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const id = requestAnimationFrame(refresh);
    window.addEventListener('load', refresh);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('load', refresh);
    };
  }, []);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
      if (!anchor?.href) return;
      const url = new URL(anchor.href);
      const here = new URL(window.location.href);
      if (url.host !== here.host || url.pathname !== here.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (id !== 'top' && !document.getElementById(id)) return;
      event.preventDefault();
      if (here.hash !== url.hash) history.pushState(null, '', url.hash);
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);

  return (
    <ReactLenis root options={options}>
      <LenisFrames />
      {children}
    </ReactLenis>
  );
}
