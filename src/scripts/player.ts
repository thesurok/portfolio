const PHONE = { w: 390, h: 844, bezel: 12 };
const TABLET = { w: 834, h: 1112, bezel: 18 };
const MESSAGE_SOURCE = 'portfolio-build';

interface FittedPlayer extends HTMLElement {
  __fit?: () => void;
}

interface ActivePlayer {
  root: HTMLElement;
  unload: () => void;
}

let active: ActivePlayer | null = null;

function prefersOverlay(): boolean {
  return window.matchMedia('(max-width: 800px)').matches;
}

function setPressed(root: HTMLElement, preset: 'phone' | 'tablet', landscape: boolean): void {
  const portraitButton = root.querySelector<HTMLButtonElement>('[data-preset="phone-portrait"]');
  const landscapeButton = root.querySelector<HTMLButtonElement>('[data-preset="phone-landscape"]');
  const tabletButton = root.querySelector<HTMLButtonElement>('[data-preset="tablet"]');
  portraitButton?.setAttribute('aria-pressed', String(preset === 'phone' && !landscape));
  landscapeButton?.setAttribute('aria-pressed', String(preset === 'phone' && landscape));
  tabletButton?.setAttribute('aria-pressed', String(preset === 'tablet'));
  root.querySelector('[data-device]')?.setAttribute('data-preset', preset);
}

function applyFrame(
  root: HTMLElement,
  preset: 'phone' | 'tablet',
  landscape: boolean,
): void {
  const base = preset === 'phone' ? PHONE : TABLET;
  const width = landscape ? base.h : base.w;
  const height = landscape ? base.w : base.h;
  root.style.setProperty('--w', String(width));
  root.style.setProperty('--h', String(height));
  root.style.setProperty('--bezel', `${base.bezel}px`);
  setPressed(root, preset, landscape);
  (root as FittedPlayer).__fit?.();
}

function lockPage(locked: boolean): void {
  document.documentElement.classList.toggle('player-lock', locked);
}

function focusable(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('button, a[href], iframe')].filter((element) => {
    if (element.hidden || element.getAttribute('aria-hidden') === 'true') return false;
    if (element instanceof HTMLButtonElement && element.disabled) return false;
    return element.getClientRects().length > 0;
  });
}

function initPlayer(root: HTMLElement): void {
  if (root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';

  const playButton = root.querySelector<HTMLButtonElement>('[data-play]');
  const loader = root.querySelector<HTMLElement>('[data-loader]');
  const fallback = root.querySelector<HTMLElement>('[data-fallback]');
  const screen = root.querySelector<HTMLElement>('[data-screen]');
  const status = root.querySelector<HTMLElement>('[data-status]');
  const toast = root.querySelector<HTMLElement>('[data-toast]');
  const closeButton = root.querySelector<HTMLButtonElement>('[data-close]');
  const restartButton = root.querySelector<HTMLButtonElement>('[data-restart]');
  const rotateButton = root.querySelector<HTMLButtonElement>('[data-rotate]');
  const fullscreenButton = root.querySelector<HTMLButtonElement>('[data-fullscreen]');
  const muteButton = root.querySelector<HTMLButtonElement>('[data-mute]');
  if (!playButton || !loader || !fallback || !screen || !status || !toast) return;

  const src = root.dataset.src ?? '';
  const shim = root.dataset.shim ?? '';
  let preset: 'phone' | 'tablet' = 'phone';
  let landscape = root.dataset.orientation === 'landscape';
  let iframe: HTMLIFrameElement | null = null;
  let abort: AbortController | null = null;
  let muted = false;
  let toastTimer = 0;

  const setStatus = (message: string) => {
    status.textContent = message;
  };

  const showToast = (message: string) => {
    toast.hidden = false;
    toast.textContent = message;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2600);
  };

  const overlayOpen = () => root.classList.contains('is-open') || root.classList.contains('is-fullscreen');

  const closeOverlay = () => {
    root.classList.remove('is-open');
    closeButton?.setAttribute('hidden', '');
    if (!root.classList.contains('is-fullscreen')) lockPage(false);
    (root as FittedPlayer).__fit?.();
  };

  const openOverlay = () => {
    if (!prefersOverlay()) return;
    root.classList.add('is-open');
    closeButton?.removeAttribute('hidden');
    lockPage(true);
    (root as FittedPlayer).__fit?.();
    closeButton?.focus();
  };

  const unload = (keepOverlay = false) => {
    abort?.abort();
    abort = null;
    iframe?.remove();
    iframe = null;
    muted = false;
    loader.hidden = true;
    fallback.hidden = true;
    playButton.hidden = false;
    restartButton?.setAttribute('disabled', '');
    muteButton?.setAttribute('disabled', '');
    muteButton?.setAttribute('aria-pressed', 'false');
    if (muteButton) muteButton.textContent = 'Mute';
    root.removeAttribute('aria-busy');
    setStatus('');
    if (!keepOverlay) closeOverlay();
    if (active?.root === root) active = null;
  };

  const showError = () => {
    iframe?.remove();
    iframe = null;
    loader.hidden = true;
    fallback.hidden = false;
    playButton.hidden = true;
    root.removeAttribute('aria-busy');
    setStatus('Build failed to load');
  };

  const mount = async () => {
    if (!src || !shim || !screen) return;
    if (active && active.root !== root) active.unload();
    active = { root, unload: () => unload(false) };
    muted = false;
    fallback.hidden = true;
    playButton.hidden = true;
    loader.hidden = false;
    root.setAttribute('aria-busy', 'true');
    setStatus('Loading build');
    restartButton?.removeAttribute('disabled');
    muteButton?.removeAttribute('disabled');
    openOverlay();

    abort?.abort();
    const controller = new AbortController();
    abort = controller;
    iframe?.remove();
    const frame = document.createElement('iframe');
    frame.className = 'build-frame';
    frame.title = root.dataset.title || 'Interactive build';
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-pointer-lock');
    frame.setAttribute('allow', 'autoplay; fullscreen; accelerometer; gyroscope');
    frame.referrerPolicy = 'no-referrer';
    iframe = frame;
    screen.append(frame);

    const timeout = window.setTimeout(() => {
      if (!frame.dataset.loaded) showError();
    }, 12000);

    try {
      const response = await fetch(src, { signal: controller.signal });
      if (!response.ok) throw new Error(String(response.status));
      let html = await response.text();
      if (!html.trim()) throw new Error('empty');
      const baseHref = new URL('./', new URL(src, window.location.href)).href;
      const shimHref = new URL(shim, window.location.href).href;
      const injection = `<script>window.__portfolioParentOrigin=${JSON.stringify(window.location.origin)};<\/script><base href="${baseHref}"><script src="${shimHref}"><\/script>`;
      if (/<head[^>]*>/i.test(html)) {
        html = html.replace(/<head[^>]*>/i, (match) => `${match}${injection}`);
      } else {
        html = `<!DOCTYPE html><html><head>${injection}</head><body>${html}</body></html>`;
      }
      frame.addEventListener('load', () => {
        window.clearTimeout(timeout);
        frame.dataset.loaded = 'true';
        loader.hidden = true;
        root.removeAttribute('aria-busy');
        setStatus('Build ready');
      });
      frame.srcdoc = html;
    } catch (error) {
      window.clearTimeout(timeout);
      if ((error as { name?: string }).name === 'AbortError') return;
      showError();
    }
  };

  playButton.addEventListener('click', () => {
    void mount();
  });

  restartButton?.addEventListener('click', () => {
    unload(true);
    void mount();
  });

  rotateButton?.addEventListener('click', () => {
    landscape = !landscape;
    applyFrame(root, preset, landscape);
  });

  root.querySelector('[data-preset="phone-portrait"]')?.addEventListener('click', () => {
    preset = 'phone';
    landscape = false;
    applyFrame(root, preset, landscape);
  });
  root.querySelector('[data-preset="phone-landscape"]')?.addEventListener('click', () => {
    preset = 'phone';
    landscape = true;
    applyFrame(root, preset, landscape);
  });
  root.querySelector('[data-preset="tablet"]')?.addEventListener('click', () => {
    preset = 'tablet';
    applyFrame(root, preset, landscape);
  });

  fullscreenButton?.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement === root) {
        await document.exitFullscreen();
      } else if (root.requestFullscreen) {
        await root.requestFullscreen();
      }
    } catch {
      // Fullscreen can be denied. The mobile overlay still covers the screen.
    }
  });

  muteButton?.addEventListener('click', () => {
    muted = !muted;
    muteButton.setAttribute('aria-pressed', String(muted));
    muteButton.textContent = muted ? 'Unmute' : 'Mute';
    iframe?.contentWindow?.postMessage(
      { source: 'portfolio-player', type: 'mute', muted },
      window.location.origin,
    );
  });

  closeButton?.addEventListener('click', () => {
    unload(false);
    playButton.focus();
  });

  fallback.querySelector('[data-retry]')?.addEventListener('click', () => {
    unload(true);
    void mount();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.fullscreenElement === root) {
      event.preventDefault();
      void document.exitFullscreen();
      return;
    }
    if (event.key === 'Escape' && root.classList.contains('is-open')) {
      event.preventDefault();
      unload(false);
      playButton.focus();
      return;
    }
    if (event.key !== 'Tab' || !overlayOpen()) return;
    const items = focusable(root);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === root;
    root.classList.toggle('is-fullscreen', on);
    if (fullscreenButton) fullscreenButton.textContent = on ? 'Exit full screen' : 'Full screen';
    fullscreenButton?.setAttribute('aria-pressed', String(on));
    if (!on && !root.classList.contains('is-open')) lockPage(false);
    (root as FittedPlayer).__fit?.();
  });

  window.addEventListener('message', (event) => {
    const frame = root.querySelector('iframe');
    if (!frame || event.source !== frame.contentWindow) return;
    if (event.origin !== 'null' && event.origin !== window.location.origin) return;
    const data = event.data as { source?: string; type?: string } | null;
    if (!data || data.source !== MESSAGE_SOURCE || data.type !== 'cta') return;
    showToast('CTA clicked');
  });

  root.dataset.playerBound = 'true';
}

function bootPlayers(): void {
  document.querySelectorAll<HTMLElement>('[data-build-player]').forEach(initPlayer);
}

document.addEventListener('astro:page-load', bootPlayers);
bootPlayers();

export {};
