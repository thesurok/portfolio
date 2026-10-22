const PHONE = { w: 390, h: 844, bezel: 12 };
const TABLET = { w: 834, h: 1112, bezel: 18 };
const MESSAGE_SOURCE = 'portfolio-build';

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

  const preview = root.dataset.preview ?? '';
  let preset: 'phone' | 'tablet' = 'phone';
  let landscape = root.dataset.orientation === 'landscape';
  let iframe: HTMLIFrameElement | null = null;
  let muted = false;
  let toastTimer = 0;
  let loadTimer = 0;

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
  };

  const openOverlay = () => {
    if (!prefersOverlay()) return;
    root.classList.add('is-open');
    closeButton?.removeAttribute('hidden');
    lockPage(true);
    closeButton?.focus();
  };

  const unload = (keepOverlay = false) => {
    window.clearTimeout(loadTimer);
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
    window.clearTimeout(loadTimer);
    iframe?.remove();
    iframe = null;
    loader.hidden = true;
    fallback.hidden = false;
    playButton.hidden = true;
    root.removeAttribute('aria-busy');
    setStatus('Build failed to load');
  };

  const markReady = () => {
    window.clearTimeout(loadTimer);
    if (!iframe || iframe.dataset.loaded === 'true') return;
    iframe.dataset.loaded = 'true';
    loader.hidden = true;
    root.removeAttribute('aria-busy');
    setStatus('Build ready');
  };

  const mount = () => {
    if (!preview || !screen) return;
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

    window.clearTimeout(loadTimer);
    iframe?.remove();
    const frame = document.createElement('iframe');
    frame.className = 'build-frame';
    frame.title = root.dataset.title || 'Interactive build';
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-pointer-lock');
    frame.setAttribute('allow', 'autoplay; fullscreen; accelerometer; gyroscope');
    frame.referrerPolicy = 'no-referrer';
    iframe = frame;
    screen.append(frame);

    loadTimer = window.setTimeout(() => {
      if (!frame.dataset.loaded) showError();
    }, 12000);

    frame.addEventListener('load', () => {
      const doc = frame.contentDocument;
      if (!doc || doc.title === 'Build preview') return;
      markReady();
    });

    // srcdoc inherits this page's CSP, which blocks eval(). These builds call eval,
    // so they have to load as their own document via preview.html.
    frame.src = preview;
  };

  playButton.addEventListener('click', () => {
    mount();
  });

  restartButton?.addEventListener('click', () => {
    unload(true);
    mount();
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
    mount();
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
  });

  window.addEventListener('message', (event) => {
    const frame = root.querySelector('iframe');
    if (!frame || event.source !== frame.contentWindow) return;
    if (event.origin !== 'null' && event.origin !== window.location.origin) return;
    const data = event.data as { source?: string; type?: string } | null;
    if (!data) return;
    if (data.source === 'portfolio-preview' && data.type === 'ready') {
      markReady();
      return;
    }
    if (data.source === 'portfolio-preview' && data.type === 'error') {
      showError();
      return;
    }
    if (data.source !== MESSAGE_SOURCE || data.type !== 'cta') return;
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
