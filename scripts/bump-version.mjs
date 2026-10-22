import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Patch bumps on every commit. Set SKIP_VERSION_BUMP=1 to leave package.json alone
// (for example while amending a commit that already has the right version).
if (process.env.SKIP_VERSION_BUMP === '1') process.exit(0);

const file = 'package.json';

function gitOutput(args) {
  try {
    return execSync(`git ${args}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch {
    return null;
  }
}

function bump(text) {
  const { version } = JSON.parse(text);
  if (typeof version !== 'string' || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`package.json version must look like 1.2.3 (found ${version})`);
  }
  const [major, minor, patch] = version.split('.').map(Number);
  const next = `${major}.${minor}.${patch + 1}`;
  const updated = text.replace(/("version"\s*:\s*")[^"]+(")/, `$1${next}$2`);
  if (updated === text) throw new Error('Could not find the version field in package.json');
  return { previous: version, next, updated };
}

const head = gitOutput(`show HEAD:${file}`);
const headVersion = head ? JSON.parse(head).version : null;
const work = readFileSync(file, 'utf8');
const workVersion = JSON.parse(work).version;

// A version edited by hand in this commit stays as written.
if (headVersion && workVersion !== headVersion) process.exit(0);

const working = bump(work);
writeFileSync(file, working.updated);

const index = gitOutput(`show :${file}`) ?? work;
const staged = bump(index);
const blob = join(tmpdir(), `portfolio-version-${process.pid}.json`);
writeFileSync(blob, staged.updated);
const hash = execSync(`git hash-object -w -- "${blob}"`, { encoding: 'utf8' }).trim();
execSync(`git update-index --cacheinfo 100644,${hash},${file}`);
