export function apiUrl(path: string): string {
  const configured = (import.meta.env.VITE_API_BASE as string | undefined)?.trim();
  const base = configured
    ? configured.replace(/\/$/, '')
    : import.meta.env.DEV
      ? ''
      : 'https://api.markusfourie.dev';
  return `${base}${path}`;
}
