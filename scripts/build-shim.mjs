import { build } from 'esbuild';

await build({
  entryPoints: ['src/scripts/mraid-shim.ts'],
  outfile: 'public/mraid-shim.js',
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2018',
  minify: true,
  legalComments: 'none',
  banner: { js: '/* Generated from src/scripts/mraid-shim.ts */' },
});
