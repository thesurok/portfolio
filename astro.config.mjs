import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thesurok.github.io',
  base: '/portfolio',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // One stylesheet for every page. Split CSS chunks are emitted but not linked
  // into the static HTML with the current Vite/Rolldown build.
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
});
