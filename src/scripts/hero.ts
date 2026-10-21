interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function mountHero(canvas: HTMLCanvasElement): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  if (reduce || saveData) return () => undefined;

  const context = canvas.getContext('2d');
  if (!context) return () => undefined;

  const particles: Particle[] = Array.from({ length: 36 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00018,
    vy: (Math.random() - 0.5) * 0.00018,
    r: 1.2 + Math.random() * 1.8,
  }));

  let frame = 0;
  let running = true;
  let visible = true;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = () => {
    if (!running) return;
    frame = window.requestAnimationFrame(draw);
    if (!visible || document.hidden) return;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    context.clearRect(0, 0, width, height);
    for (const particle of particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
      if (particle.y < 0 || particle.y > 1) particle.vy *= -1;
    }
    context.lineWidth = 1;
    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      if (!a) continue;
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        if (!b) continue;
        const dx = (a.x - b.x) * width;
        const dy = (a.y - b.y) * height;
        const distance = Math.hypot(dx, dy);
        if (distance < 120) {
          context.strokeStyle = `rgba(226, 164, 92, ${0.28 * (1 - distance / 120)})`;
          context.beginPath();
          context.moveTo(a.x * width, a.y * height);
          context.lineTo(b.x * width, b.y * height);
          context.stroke();
        }
      }
    }
    for (const particle of particles) {
      context.fillStyle = 'rgba(242, 239, 232, 0.85)';
      context.beginPath();
      context.arc(particle.x * width, particle.y * height, particle.r, 0, Math.PI * 2);
      context.fill();
    }
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
