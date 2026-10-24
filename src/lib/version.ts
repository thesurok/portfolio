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

// Baked in when the page is rendered. The patch number is raised by
// scripts/bump-version.mjs on each commit. The build time is local-only.
const release = `${version} · ${revision()}`;
export const siteVersion = import.meta.env.PROD ? release : `${release} · ${builtAt()}`;
