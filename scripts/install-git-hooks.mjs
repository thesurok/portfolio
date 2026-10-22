import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

let hooksDir;
try {
  hooksDir = execSync('git rev-parse --git-path hooks', { encoding: 'utf8' }).trim();
} catch {
  process.exit(0);
}

mkdirSync(hooksDir, { recursive: true });
writeFileSync(
  `${hooksDir}/pre-commit`,
  `#!/bin/sh
cd "$(git rev-parse --show-toplevel)" || exit 1
node scripts/bump-version.mjs
`,
);
