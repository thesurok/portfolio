import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tech = z.enum(['pixi', 'three', 'spine', 'gsap', 'canvas', 'webgl', 'howler']);

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().regex(/^[a-z0-9-]+$/),
      summary: z.string(),
      role: z.string(),
      year: z.number().int(),
      tech: z.array(tech).min(1),
      tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1),
      featured: z.boolean().default(false),
      published: z.boolean().default(true),
      order: z.number().int().default(0),
      build: z.object({
        path: z.string(),
        orientation: z.enum(['portrait', 'landscape', 'both']),
        sizeKB: z.number().positive().optional(),
        fpsTarget: z.number().positive().optional(),
        loadTimeMs: z.number().positive().optional(),
      }),
      poster: image(),
      video: z.string().optional(),
      highlights: z.array(z.string()).default([]),
      challenges: z
        .array(
          z.object({
            problem: z.string(),
            solution: z.string(),
          }),
        )
        .default([]),
    }),
});

export const collections = { projects };
