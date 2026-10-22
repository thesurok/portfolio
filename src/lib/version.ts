import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const { version } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8')) as {
  version: string;
};

function revision(): string {
  try {
    return execSync('git rev-parse --short HEAD', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return 'unknown';
  }
}

function builtAt(): string {
  return `${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`;
}

// Baked in at build time so a deploy can be checked against the footer.
export const siteVersion = import.meta.env.PROD
  ? `${version} · ${revision()} · ${builtAt()}`
  : 'dev';
