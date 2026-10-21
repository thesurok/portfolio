import type { CollectionEntry } from 'astro:content';

export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL;
  if (!path || path === '/') return base;
  return `${base}${path.replace(/^\/+/, '')}`;
}

export function projectHref(slug: string): string {
  return withBase(`work/${slug}/`);
}

export function sortProjects<T extends { data: { order: number; title: string } }>(
  projects: T[],
): T[] {
  return [...projects].sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

export function visibleProjects<T extends { data: { order: number; title: string; published: boolean } }>(
  projects: T[],
): T[] {
  return sortProjects(projects.filter((project) => project.data.published));
}

export function isActive(pathname: string, href: string): boolean {
  const clean = (value: string) => {
    const path = value.split('#')[0]?.split('?')[0] ?? '';
    if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
    return path || '/';
  };
  const current = clean(pathname);
  const target = clean(href);
  const base = clean(import.meta.env.BASE_URL);
  if (target === base) return current === base;
  return current === target || current.startsWith(`${target}/`);
}

export type ProjectEntry = CollectionEntry<'projects'>;
