export const site = {
  name: 'Oleh Novytskyi',
  role: 'Interactive / HTML5 Game Developer',
  pitch:
    '8 years building high-performance real-time 2D/3D experiences for the browser and mobile.',
  location: 'Ukraine',
  email: '',
  github: 'https://github.com/thesurok',
  linkedin: '',
  telegram: '',
} as const;

export const skills = [
  'Reel and spin mechanics',
  'Animation timelines (GSAP / Spine)',
  'Particle FX',
  'State machines',
  'Asset and performance budgets',
  'Cross-device rendering',
  'WebGL shaders',
] as const;

export const tools = ['PixiJS', 'Three.js', 'WebGL', 'GSAP', 'Spine', 'TypeScript'] as const;

export const experience = [
  {
    period: '2023 — Present',
    title: 'Interactive developer',
    body: 'Real-time 2D and 3D for the browser and mobile. Reel systems, shader scenes, and strict budgets for memory, file size, and first frame.',
  },
  {
    period: '2018 — 2023',
    title: 'HTML5 game developer',
    body: 'Mini-games and interactive builds, including playable ads, shipped as single-file HTML. PixiJS, GSAP, and Spine carried the animation work.',
  },
] as const;

export const techLabels = {
  pixi: 'PixiJS',
  three: 'Three.js',
  spine: 'Spine',
  gsap: 'GSAP',
  canvas: 'Canvas',
  webgl: 'WebGL',
  howler: 'Howler',
} as const;

export type TechId = keyof typeof techLabels;

export function tagLabel(tag: string): string {
  const custom: Record<string, string> = {
    '3d': '3D',
    'match-3': 'Match-3',
    'casino-style': 'Casino-style',
    playable: 'Playable ad',
  };
  return custom[tag] ?? tag.charAt(0).toUpperCase() + tag.slice(1);
}
