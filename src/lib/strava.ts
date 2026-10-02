import { apiUrl } from '@/lib/api';

export type StravaStatBlock = {
  label: string;
  val: string;
  unit: string;
  sub: string;
};

export type StravaSummary = {
  source: 'strava';
  updatedAt: string;
  ytd: {
    rideCount: number;
    distanceKm: number;
    elevationM: number;
    timeHours: number;
  } | null;
  blocks: StravaStatBlock[] | null;
  lastRide: {
    id: number;
    name: string;
    startDate: string;
    distanceKm: number;
    elevationM: number;
    movingMinutes: number;
    avgSpeedKmh: number | null;
  } | null;
};

export type StravaUnavailable = {
  error: string;
  code: string;
  setup?: {
    hasClient: boolean;
    hasSecret: boolean;
    hasRefreshToken: boolean;
    authUrl: string;
  };
};

export async function fetchStravaSummary(signal?: AbortSignal): Promise<StravaSummary> {
  const res = await fetch(apiUrl('/api/strava/summary'), { signal });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as StravaUnavailable | null;
    const message = body?.error || `Request failed (${res.status})`;
    const err = new Error(message) as Error & { detail?: StravaUnavailable };
    if (body) err.detail = body;
    throw err;
  }
  const data = (await res.json()) as StravaSummary;
  const clean = (value: string) => value.replaceAll(' \u2014 ', ' · ').replaceAll('\u2014', '-');
  return {
    ...data,
    blocks: data.blocks?.map((block) => ({
      ...block,
      label: clean(block.label),
      val: clean(block.val),
      unit: clean(block.unit),
      sub: clean(block.sub),
    })) ?? null,
    lastRide: data.lastRide ? { ...data.lastRide, name: clean(data.lastRide.name) } : null,
  };
}

