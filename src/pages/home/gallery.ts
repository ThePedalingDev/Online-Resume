import capeFriends from '@/assets/images/cape-friends.webp';
import deskSetup from '@/assets/images/desk-setup.webp';
import longRide from '@/assets/images/long-ride.webp';
import raceReady from '@/assets/images/race-ready.webp';
import sworksUpgrades from '@/assets/images/sworks-upgrades.webp';
import trailseekerWellington from '@/assets/images/trailseeker-wellington.webp';

export type GalleryItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
};

/** Per-shot framing tuned so faces, bikes, and UI crops stay in frame. */
export const lifeGallery: GalleryItem[] = [
  {
    src: trailseekerWellington,
    width: 1200,
    height: 799,
    alt: 'Trailseeker #6, Wellington',
    caption: 'Trailseeker #6, Wellington · 12 Sep 2026',
    objectPosition: 'center 28%',
  },
  {
    src: capeFriends,
    width: 960,
    height: 1280,
    alt: 'Markus Fourie and Matthew Waldeck cycling on the Cape Peninsula',
    caption: 'Cape Peninsula, with Matthew Waldeck',
    objectPosition: 'center 42%',
  },
  {
    src: deskSetup,
    width: 768,
    height: 1024,
    alt: 'The home desk',
    caption: 'The home desk',
    objectPosition: 'center 45%',
  },
  {
    src: sworksUpgrades,
    width: 1000,
    height: 1333,
    alt: "Markus's S-Works mountain bike, freshly upgraded",
    caption: 'My S-Works, freshly upgraded',
    objectPosition: 'center 38%',
  },
  {
    src: raceReady,
    width: 768,
    height: 1024,
    alt: 'Race morning',
    caption: 'Race morning',
    objectPosition: 'center 22%',
  },
  {
    src: longRide,
    width: 620,
    height: 1024,
    alt: 'A long gravel day',
    caption: 'A long gravel day',
    objectPosition: 'center 35%',
  },
];
