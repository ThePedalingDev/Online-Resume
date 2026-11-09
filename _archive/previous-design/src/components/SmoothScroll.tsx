import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { beginAnchorNav, endAnchorNav } from '@/lib/anchorNav';

const options = {
  // Lenis is driven by the GSAP ticker (see SmoothScroll) so both share one clock.
  autoRaf: false,
  lerp: 0.1,
  wheelMultiplier: 1,
  smoothWheel: true,
  syncTouch: false,
  anchors: false,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
};

/** Expo ease-out: quick start, long soft landing. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Sticky page headers (the home page's .hdr) must not cover the section a link jumps to. */
function headerOffset() {
  return document.querySelector<HTMLElement>('.hdr')?.offsetHeight ?? 0;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollToHash(lenis: Lenis | null | undefined, hash: string, immediate = false) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  const reduced = prefersReducedMotion();
  const el = id === '' || id === 'top' ? null : document.getElementById(id);
  if ((id !== '' && id !== 'top') && !el) return;

  beginAnchorNav();
  const finish = () => {
    lenis?.start();
    endAnchorNav();
  };

  if (reduced || !lenis) {
    if (!el || id === 'top') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      el.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
    finish();
    return;
  }

  lenis.scrollTo(!el || id === 'top' ? 0 : el, {
    offset: id === 'top' ? 0 : -headerOffset(),
    duration: 1.2,
    easing: easeOutExpo,
    immediate: immediate || reduced,
    force: true,
    programmatic: true,
    onComplete: finish,
  });
  window.setTimeout(finish, 4000);
}

function LenisAnchors() {
  const lenis = useLenis();

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
      window.requestAnimationFrame(() => scrollToHash(lenis, url.hash));
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [lenis]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const go = () => {
      ScrollTrigger.refresh();
      scrollToHash(lenis, hash, true);
    };
    const timer = window.setTimeout(go, 0);
    window.addEventListener('load', go);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', go);
    };
  }, [lenis]);

  return null;
}

function NativeAnchors() {
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
      scrollToHash(null, url.hash, true);
    };
    window.addEventListener('click', onClick, true);
    const hash = window.location.hash;
    if (hash) {
      window.requestAnimationFrame(() => scrollToHash(null, hash, true));
    }
    return () => window.removeEventListener('click', onClick, true);
  }, []);
  return null;
}

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
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduced) return;
    const tick = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <>
        <NativeAnchors />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root ref={lenisRef} options={options}>
      <LenisFrames />
      <LenisAnchors />
      {children}
    </ReactLenis>
  );
}
