import capeFriends from '@/assets/images/cape-friends.webp';
import cradleStageRace from '@/assets/images/cradle-stage-race.webp';
import deskSetup from '@/assets/images/desk-setup.webp';
import longRide from '@/assets/images/long-ride.webp';
import raceReady from '@/assets/images/race-ready.webp';
import roadRide from '@/assets/images/road-ride.webp';
import startAreaDawn from '@/assets/images/start-area-dawn.webp';
import sworksUpgrades from '@/assets/images/sworks-upgrades.webp';
import transBaviaans from '@/assets/images/trans-baviaans.webp';
import trailseekerWellington from '@/assets/images/trailseeker-wellington.webp';
import winterRide from '@/assets/images/winter-ride.webp';

const MATTHEW_LINKEDIN = 'https://www.linkedin.com/in/matthew-waldeck-a77884255/';

/** 800px thumbnails shown in the grid; the full-size file loads only when a photo is opened. */
const thumbs = import.meta.glob<string>('@/assets/images/thumbs/*.webp', { eager: true, import: 'default' });
const thumb = (name: string) => thumbs[`/src/assets/images/thumbs/${name}.webp`];

export type GalleryItem = {
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Optional link wrapped around part of the caption. */
  captionLink?: { text: string; href: string };
  fit?: 'cover' | 'contain';
  objectPosition?: string;
};

/** Per-shot framing tuned so faces, bikes, and UI crops stay in frame. */
export const lifeGallery: GalleryItem[] = [
  {
    src: trailseekerWellington,
    thumb: thumb('trailseeker-wellington'),
    width: 1200,
    height: 799,
    alt: 'Trailseeker #6, Wellington',
    caption: 'Trailseeker #6, Wellington · 12 Sep 2026',
    objectPosition: 'center 28%',
  },
  {
    src: capeFriends,
    thumb: thumb('cape-friends'),
    width: 960,
    height: 1280,
    alt: 'Markus Fourie and Matthew Waldeck cycling on the Cape Peninsula',
    caption: 'Cape Peninsula, with Matthew Waldeck',
    captionLink: { text: 'Matthew Waldeck', href: MATTHEW_LINKEDIN },
    objectPosition: 'center 42%',
  },
  {
    src: deskSetup,
    thumb: thumb('desk-setup'),
    width: 768,
    height: 1024,
    alt: 'The home desk',
    caption: 'The home desk',
    objectPosition: 'center 45%',
  },
  {
    src: sworksUpgrades,
    thumb: thumb('sworks-upgrades'),
    width: 1000,
    height: 1333,
    alt: "Markus's S-Works mountain bike, freshly upgraded",
    caption: 'My S-Works, freshly upgraded',
    objectPosition: 'center 38%',
  },
  {
    src: raceReady,
    thumb: thumb('race-ready'),
    width: 768,
    height: 1024,
    alt: 'Race morning',
    caption: 'Race morning',
    objectPosition: 'center 22%',
  },
  {
    src: longRide,
    thumb: thumb('long-ride'),
    width: 620,
    height: 1024,
    alt: 'A long gravel day',
    caption: 'A long gravel day',
    objectPosition: 'center 35%',
  },
  {
    src: cradleStageRace,
    thumb: thumb('cradle-stage-race'),
    width: 1000,
    height: 1500,
    alt: 'Markus Fourie riding a wooded singletrack at a stage race, number 97',
    caption: 'Cradle stage race',
    objectPosition: 'center 35%',
  },
  {
    src: transBaviaans,
    thumb: thumb('trans-baviaans'),
    width: 1400,
    height: 1120,
    alt: 'Markus Fourie riding a wet gravel road at the Trans Baviaans, with other riders behind',
    caption: 'Trans Baviaans · 2024',
    objectPosition: '42% center',
  },
  {
    src: startAreaDawn,
    thumb: thumb('start-area-dawn'),
    width: 1400,
    height: 1050,
    alt: 'Markus Fourie with his mountain bike in a race start area at first light',
    caption: 'The start area at first light',
    objectPosition: '69% center',
  },
  {
    src: roadRide,
    thumb: thumb('road-ride'),
    width: 1000,
    height: 1334,
    alt: 'A selfie on a road bike, riding down a suburban street in the sun',
    caption: 'A training ride on the road bike',
    objectPosition: 'center 30%',
  },
  {
    src: winterRide,
    thumb: thumb('winter-ride'),
    width: 1000,
    height: 1334,
    alt: 'A selfie on a winter ride, on a tree-lined lane in a balaclava and orange glasses',
    caption: 'A cold morning ride',
    objectPosition: 'center 40%',
  },
];
