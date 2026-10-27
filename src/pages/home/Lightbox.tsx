import { useEffect, useRef, useState } from 'react';
import type { GalleryItem } from '@/pages/home/gallery';

/**
 * Native <dialog> lightbox: Esc, focus trap and focus return come from showModal().
 * Shows the small thumbnail at once, then swaps in the full-size file once it has loaded.
 */
export function Lightbox({ item, onClose }: { item: GalleryItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [fullReady, setFullReady] = useState<string | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (!item && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;
    let live = true;
    const img = new Image();
    img.src = item.src;
    img.onload = () => {
      if (live) setFullReady(item.src);
    };
    return () => {
      live = false;
    };
  }, [item]);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item ? `Photo: ${item.caption}` : 'Photo'}
      data-lenis-prevent
      onClose={() => {
        document.documentElement.style.overflow = '';
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      {item ? (
        <figure>
          <img src={fullReady === item.src ? item.src : item.thumb} alt={item.alt} />
          <figcaption>{item.caption}</figcaption>
        </figure>
      ) : null}
      <button type="button" className="lightbox-close" onClick={() => ref.current?.close()} aria-label="Close photo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </dialog>
  );
}
