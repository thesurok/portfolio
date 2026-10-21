interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

type HeroVariant = 'background' | 'widget';

const LINK = 120;
const FRAME_MS = 1000 / 60;

function particle(): Particle {
  return {
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00018,
    vy: (Math.random() - 0.5) * 0.00018,
    r: 1.2 + Math.random() * 1.8,
  };
}

function countFor(width: number, height: number): number {
  return Math.max(20, Math.min(80, Math.round((width * height) / 4500)));
}

export function mountHero(canvas: HTMLCanvasElement, variant: HeroVariant = 'widget'): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  if (reduce || saveData) return () => undefined;

  const context = canvas.getContext('2d');
  if (!context) return () => undefined;

  const strength = variant === 'background' ? 0.42 : 1;
  const particles: Particle[] = [];
  let frame = 0;
  let last = 0;
  let running = true;
  let visible = true;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (rect.width < 2 || rect.height < 2) return;
    const next = countFor(rect.width, rect.height);
    while (particles.length < next) particles.push(particle());
    if (particles.length > next) particles.length = next;
  };

  const draw = (time: number) => {
    if (!running) return;
    frame = window.requestAnimationFrame(draw);
    if (!visible || document.hidden) {
      last = 0;
      return;
    }
    const step = (last === 0 ? FRAME_MS : Math.min(time - last, 50)) / FRAME_MS;
    last = time;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const style = getComputedStyle(canvas);
    const line = style.getPropertyValue('--accent').trim() || '#e2a45c';
    const dot = style.getPropertyValue('--text').trim() || '#f2efe8';
    context.clearRect(0, 0, width, height);
    for (const item of particles) {
      item.x += item.vx * step;
      item.y += item.vy * step;
      if (item.x < 0 || item.x > 1) item.vx *= -1;
      if (item.y < 0 || item.y > 1) item.vy *= -1;
    }
    context.lineWidth = 1;
    context.strokeStyle = line;
    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      if (!a) continue;
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        if (!b) continue;
        const dx = (a.x - b.x) * width;
        const dy = (a.y - b.y) * height;
        const distance = Math.hypot(dx, dy);
        if (distance < LINK) {
          context.globalAlpha = strength * 0.28 * (1 - distance / LINK);
          context.beginPath();
          context.moveTo(a.x * width, a.y * height);
          context.lineTo(b.x * width, b.y * height);
          context.stroke();
        }
      }
    }
    context.fillStyle = dot;
    for (const item of particles) {
      context.globalAlpha = strength * 0.85;
      context.beginPath();
      context.arc(item.x * width, item.y * height, item.r, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
  });
  const resizeObserver = new ResizeObserver(resize);
  resize();
  observer.observe(canvas);
  resizeObserver.observe(canvas);
  frame = window.requestAnimationFrame(draw);

  return () => {
    running = false;
    window.cancelAnimationFrame(frame);
    observer.disconnect();
    resizeObserver.disconnect();
  };
}
