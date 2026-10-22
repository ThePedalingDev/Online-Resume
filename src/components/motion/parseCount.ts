export type ParsedCount = {
  value: number;
  prefix: string;
  suffix: string;
};

/** Parse display strings like "1,234" or "$12k" into count-up targets. */
export function parseCountTarget(raw: string): ParsedCount | null {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === '-') return null;
  const match = trimmed.match(/^([^\d]*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const value = Number.parseFloat(match[2].replace(/,/g, ''));
  if (!Number.isFinite(value)) return null;
  return { value, prefix: match[1], suffix: match[3] };
}
