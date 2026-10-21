import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Usage: npm run add-project <slug>');
  process.exit(1);
}

const root = process.cwd();
const markdownPath = path.join(root, 'src', 'content', 'projects', `${slug}.md`);
const buildDir = path.join(root, 'public', 'builds', slug);

try {
  await access(markdownPath);
  console.error(`Project already exists: ${slug}`);
  process.exit(1);
} catch {
  // The slug is free.
}

const title = slug
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ');
const year = new Date().getFullYear();

const markdown = `---
title: ${title}
slug: ${slug}
summary: One-line summary of the build.
role: Your role on the project
year: ${year}
tech:
  - pixi
tags:
  - puzzle
featured: false
published: false
order: 50
build:
  path: builds/${slug}/index.html
  orientation: portrait
  fpsTarget: 60
  loadTimeMs: 500
poster: ../../assets/posters/placeholder.png
highlights:
  - Replace this highlight
challenges:
  - problem: Replace this problem.
    solution: Replace this solution.
---

Describe the project. Swap the poster for a file in \`src/assets/posters\`, and replace the HTML in \`public/builds/${slug}/index.html\` with the single-file build.
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title}</title>
<style>
  html, body { margin: 0; height: 100%; background: #121318; color: #f2efe8; font-family: sans-serif; }
  body { display: grid; place-items: center; }
  main { display: grid; gap: 16px; justify-items: center; }
  button { min-height: 44px; padding: 0 16px; border: 0; border-radius: 10px; background: #e2a45c; color: #1b140c; font: inherit; cursor: pointer; }
</style>
</head>
<body>
  <main>
    <h1>${title}</h1>
    <button id="go" type="button">Continue</button>
  </main>
  <script>
    document.getElementById('go').onclick = function () {
      var url = 'https://thesurok.github.io/portfolio/';
      if (window.mraid && typeof mraid.open === 'function') mraid.open(url);
      else if (window.FbPlayableAd && typeof FbPlayableAd.onCTAClick === 'function') FbPlayableAd.onCTAClick();
      else if (window.ExitApi && typeof ExitApi.exit === 'function') ExitApi.exit();
    };
  </script>
</body>
</html>
`;

await mkdir(buildDir, { recursive: true });
await writeFile(markdownPath, markdown);
await writeFile(path.join(buildDir, 'index.html'), html);
console.log(`Added ${slug}`);
console.log(`Markdown: src/content/projects/${slug}.md`);
console.log(`Build: public/builds/${slug}/index.html`);
