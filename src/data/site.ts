export const site = {
  name: 'Oleh Novytskyi',
  role: 'Senior JavaScript Game Engineer',
  pitch:
    '8 years building high-performance HTML5 games and interactive applications with PixiJS and Three.js.',
  location: 'Uzhhorod, Ukraine',
  email: 'oleh.novytskyi@proton.me',
  phone: '+380506366681',
  github: 'https://github.com/thesurok',
  linkedin: 'https://www.linkedin.com/in/oleg-novytskyi',
  telegram: '',
} as const;

export const skills = [
  'HTML5 games in PixiJS and Three.js',
  'Playable ads for acquisition channels',
  'Internal tools and game engines',
  'Browser performance and optimization',
  'Animation pipelines into Three.js',
  'Client–server game state',
] as const;

export const tools = ['JavaScript', 'PixiJS', 'Three.js', 'Blender', 'Webpack', 'Node.js'] as const;

export const experience = [
  {
    period: '2019 — Present',
    title: 'Software Engineer',
    company: 'PlayToMax',
    points: [
      'Built over 300 playable ads across genres, reaching millions of active users. The projects on this site are the ones outside NDA.',
      'Designed internal tools and game engines that shortened production and made iteration faster.',
      'Mentored developers and grew technical skill across the team.',
      'Shipped builds for Meta Ads, Google Ads, TikTok, AppLovin (MAX), Unity Ads, Liftoff, Moloco, and other user-acquisition channels.',
    ],
  },
] as const;

export const education = [
  {
    period: '2006 — 2011',
    title: "Master's degree in Statistics",
    school: 'Oles Honchar Dnipro National University',
    location: 'Dnipro, Ukraine',
  },
] as const;

export const languages = [
  { name: 'English', level: 'C1' },
  { name: 'Ukrainian', level: 'Native' },
] as const;

export const otherProjects = [
  {
    title: 'Sword Play',
    url: 'https://www.youtube.com/playables/UgkxFQtI21tiK7V0FmAFLgU2Ew2ZUwqhN9KU',
    body: 'Reimplemented a Unity game in Three.js for the browser, including a converter that brought Unity animations onto skinned meshes. The sword slice depended on Unity math and was rebuilt with the tools available.',
  }
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
