import { statSync } from 'node:fs';
import { join } from 'node:path';

export function buildSizeKB(buildPath: string): number {
  const file = join(process.cwd(), 'public', buildPath);
  return Math.max(1, Math.round(statSync(file).size / 1024));
}
