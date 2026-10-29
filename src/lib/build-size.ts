import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

function directoryBytes(dir: string): number {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    total += entry.isDirectory() ? directoryBytes(file) : statSync(file).size;
  }
  return total;
}

export function buildSizeKB(buildPath: string): number {
  const file = join(process.cwd(), 'public', buildPath);
  return Math.max(1, Math.round(directoryBytes(dirname(file)) / 1024));
}

export function formatBuildSize(sizeKB: number): string {
  if (sizeKB < 10240) return `${sizeKB} KB`;
  const mb = sizeKB / 1024;
  return `${mb >= 10 ? Math.round(mb) : mb.toFixed(1)} MB`;
}
