export type CmsKey = 'hero' | 'about' | 'journey' | 'cycling' | 'gallery' | 'stack' | 'gearCoding' | 'gearCycling' | 'docs';

export type CmsResponse<T> = {
  key: CmsKey;
  value: T | null;
  updatedAt: string | null;
};

function stripEmDashes<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replaceAll(' \u2014 ', ' · ').replaceAll('\u2014', '-') as T;
  }
  if (Array.isArray(value)) return value.map((item) => stripEmDashes(item)) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) out[key] = stripEmDashes(child);
    return out as T;
  }
  return value;
}

export async function fetchContent<T>(key: CmsKey, signal?: AbortSignal): Promise<CmsResponse<T>> {
  const res = await fetch(`/api/content/${key}`, { signal, credentials: 'include' });
  if (!res.ok) throw new Error(`Content load failed (${res.status})`);
  return stripEmDashes((await res.json()) as CmsResponse<T>);
}

