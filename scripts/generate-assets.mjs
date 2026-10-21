import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const posterDir = path.join(root, 'src', 'assets', 'posters');
const publicDir = path.join(root, 'public');
await mkdir(posterDir, { recursive: true });

const colors = ['#e2a45c', '#6cb6a6', '#e07a7a', '#7aa2e3', '#d6c48a', '#c58be0'];

function svg(body, width = 1600, height = 1000) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`,
  );
}

function dots(cols, rows, ox, oy, gap, r) {
  let body = '';
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const fill = colors[(x + y * 2) % colors.length];
      body += `<circle cx="${ox + x * gap}" cy="${oy + y * gap}" r="${r}" fill="${fill}"/>`;
    }
  }
  return body;
}

const posters = {
  lattice: `<rect width="1600" height="1000" fill="#14161c"/>${dots(7, 5, 280, 180, 170, 48)}`,
  driftline: `<rect width="1600" height="1000" fill="#14161c"/><path d="M0 760h1600" stroke="#2a241c" stroke-width="120"/><path d="M0 620 C 300 520, 520 700, 800 600 S 1300 480, 1600 560" fill="none" stroke="#6cb6a6" stroke-width="18"/><rect x="220" y="560" width="36" height="90" fill="#e2a45c"/><rect x="640" y="500" width="34" height="150" fill="#7aa2e3"/><rect x="980" y="470" width="34" height="180" fill="#e07a7a"/><rect x="1280" y="530" width="34" height="120" fill="#d6c48a"/>`,
  'orbit-glass': `<rect width="1600" height="1000" fill="#101114"/><circle cx="800" cy="500" r="280" fill="none" stroke="#e2a45c" stroke-width="18"/><circle cx="800" cy="500" r="180" fill="#1c2430" stroke="#6cb6a6" stroke-width="10"/><circle cx="800" cy="500" r="70" fill="#e2a45c"/><ellipse cx="800" cy="500" rx="360" ry="120" fill="none" stroke="#f2efe8" stroke-opacity="0.35" stroke-width="8"/>`,
  'reel-room': `<rect width="1600" height="1000" fill="#14161c"/>${[0, 1, 2]
    .map((index) => {
      const x = 360 + index * 320;
      return `<rect x="${x}" y="140" width="220" height="720" rx="28" fill="#0d0e12" stroke="#e2a45c" stroke-opacity="0.7"/><circle cx="${x + 110}" cy="360" r="46" fill="${colors[index]}"/><rect x="${x + 64}" y="560" width="92" height="92" fill="${colors[index + 2]}"/>`;
    })
    .join('')}`,
  'kinetic-stack': `<rect width="1600" height="1000" fill="#14161c"/><rect x="0" y="860" width="1600" height="40" fill="#2a241c"/>${[0, 1, 2, 3, 4]
    .map((index) => `<circle cx="${620 + (index % 3) * 90}" cy="${780 - Math.floor(index / 3) * 100 - (index % 2) * 20}" r="${70 - index * 4}" fill="${colors[index]}"/>`)
    .join('')}<circle cx="900" cy="240" r="54" fill="#e2a45c"/>`,
  'signal-bloom': `<rect width="1600" height="1000" fill="#101114"/>${Array.from({ length: 80 }, (_, index) => {
    const angle = index * 2.399;
    const radius = 40 + (index % 12) * 28;
    const x = 800 + Math.cos(angle) * radius;
    const y = 500 + Math.sin(angle) * radius * 0.72;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${3 + (index % 4)}" fill="${index % 2 ? '#e2a45c' : '#6cb6a6'}"/>`;
  }).join('')}`,
  fold: `<rect width="1600" height="1000" fill="#14161c"/>${Array.from({ length: 16 }, (_, index) => {
    const x = 420 + (index % 4) * 190;
    const y = 140 + Math.floor(index / 4) * 190;
    const on = [0, 1, 4, 6, 9, 11, 14].includes(index);
    return `<rect x="${x}" y="${y}" width="150" height="150" rx="24" fill="${on ? '#e2a45c' : '#1c1e26'}"/>`;
  }).join('')}`,
  placeholder: `<rect width="1600" height="1000" fill="#14161c"/><rect x="180" y="180" width="1240" height="640" rx="32" fill="none" stroke="#e2a45c" stroke-width="8" stroke-dasharray="18 16"/>`,
};

for (const [name, body] of Object.entries(posters)) {
  await sharp(svg(body)).png().toFile(path.join(posterDir, `${name}.png`));
}

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#17181d"/><path d="M16 6.5 25.5 13.5 16 26.5 6.5 13.5Z" fill="#e2a45c"/><path d="M6.5 13.5h19L16 6.5Z" fill="#f0c48a"/></svg>`;
for (const [file, size] of [
  ['favicon-16.png', 16],
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(Buffer.from(mark)).resize(size, size).png().toFile(path.join(publicDir, file));
}

const og = svg(
  `<rect width="1200" height="630" fill="#101114"/>
   <circle cx="930" cy="320" r="180" fill="none" stroke="#e2a45c" stroke-width="14"/>
   <circle cx="930" cy="320" r="90" fill="#6cb6a6"/>
   <text x="80" y="250" fill="#e2a45c" font-family="Segoe UI, Arial, sans-serif" font-size="28" letter-spacing="3">INTERACTIVE / HTML5 GAME DEVELOPER</text>
   <text x="80" y="360" fill="#f2efe8" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="600">Oleh Novytskyi</text>
   <text x="80" y="440" fill="#a8a297" font-family="Segoe UI, Arial, sans-serif" font-size="32">Real-time 2D and 3D for the browser and mobile</text>`,
  1200,
  630,
);
await sharp(og).png().toFile(path.join(publicDir, 'og.png'));

const lines = [
  ['Oleh Novytskyi', 22, 36],
  ['Interactive / HTML5 Game Developer', 13, 28],
  ['', 11, 16],
  ['8 years building high-performance real-time 2D/3D', 12, 20],
  ['experiences for the browser and mobile.', 12, 28],
  ['', 11, 12],
  ['Skills', 14, 24],
  ['Reel and spin mechanics, animation timelines (GSAP, Spine),', 11, 18],
  ['particle effects, state machines, asset budgets,', 11, 16],
  ['cross-device rendering, WebGL shaders.', 11, 24],
  ['', 11, 12],
  ['Tools', 14, 24],
  ['PixiJS, Three.js, WebGL, GSAP, Spine, TypeScript.', 11, 24],
  ['', 11, 12],
  ['Location', 14, 24],
  ['Ukraine', 11, 24],
  ['', 11, 12],
  ['GitHub', 14, 24],
  ['https://github.com/thesurok', 11, 20],
];

function pdfEscape(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

let stream = 'BT\n';
lines.forEach((line, index) => {
  const [text, size, gap] = line;
  if (index === 0) stream += `/F1 ${size} Tf\n72 740 Td\n(${pdfEscape(text)}) Tj\n`;
  else stream += `/F1 ${size} Tf\n0 -${gap} Td\n(${pdfEscape(text)}) Tj\n`;
});
stream += 'ET\n';

const objects = [
  '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
  '2 0 obj\n<< /Type /Pages /Count 1 /Kids [3 0 R] >>\nendobj\n',
  '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n',
  `4 0 obj\n<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream\nendobj\n`,
  '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
];

let body = '%PDF-1.4\n';
const offsets = [0];
for (const object of objects) {
  offsets.push(Buffer.byteLength(body));
  body += object;
}
const xrefAt = Buffer.byteLength(body);
let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let index = 1; index <= objects.length; index += 1) {
  xref += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
}
const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`;
await sharp(svg('<rect width="1" height="1" fill="#000"/>', 1, 1)).metadata();
const { writeFile } = await import('node:fs/promises');
await writeFile(path.join(publicDir, 'cv.pdf'), Buffer.from(body + xref + trailer));
console.log('Assets written');
