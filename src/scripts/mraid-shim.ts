interface MraidListener {
  (value?: boolean | string): void;
}

interface MraidApi {
  getVersion: () => string;
  getState: () => string;
  isViewable: () => boolean;
  addEventListener: (name: string, callback: MraidListener) => void;
  removeEventListener: (name: string, callback: MraidListener) => void;
  open: (url?: string) => void;
  close: () => void;
  openStoreUrl: (url?: string) => void;
  expand: () => void;
  resize: () => void;
  getPlacementType: () => string;
  getExpandProperties: () => { width: number; height: number; useCustomClose: boolean; isModal: boolean };
  setExpandProperties: (value: unknown) => void;
  getResizeProperties: () => Record<string, unknown>;
  setResizeProperties: (value: unknown) => void;
  useCustomClose: (value?: boolean) => void;
  playVideo: (url?: string) => void;
  storePicture: (url?: string) => void;
  createCalendarEvent: (event: unknown) => void;
  supports: (feature: string) => boolean;
  getScreenSize: () => { width: number; height: number };
  getMaxSize: () => { width: number; height: number };
  getCurrentPosition: () => { x: number; y: number; width: number; height: number };
  getDefaultPosition: () => { x: number; y: number; width: number; height: number };
  getCurrentAppOrientation: () => { orientation: string; locked: boolean };
}

declare global {
  interface Window {
    mraid?: MraidApi;
    FbPlayableAd?: { onCTAClick: () => void };
    ExitApi?: { exit: () => void };
    dapi?: {
      isReady: () => boolean;
      openStoreUrl: (url?: string) => void;
      addEventListener: (name: string, callback: () => void) => void;
      removeEventListener: (name: string, callback: () => void) => void;
      getAudioVolume: () => number;
    };
    webkitAudioContext?: typeof AudioContext;
    __portfolioParentOrigin?: string;
  }
}

const listeners: Record<string, MraidListener[]> = {};
const audioContexts: AudioContext[] = [];
let state = 'loading';
let muted = false;

function emit(url?: string): void {
  const payload = { source: 'portfolio-build', type: 'cta', url: url ?? '' };
  try {
    if (window.parent && window.parent !== window) {
      const target = window.__portfolioParentOrigin || '*';
      window.parent.postMessage(payload, target);
      return;
    }
  } catch {
    // The build is top-level. Show the toast here.
  }
  showLocalToast();
}

function showLocalToast(): void {
  let toast = document.getElementById('portfolio-cta-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-cta-toast';
    toast.setAttribute('role', 'status');
    toast.textContent = 'CTA clicked';
    toast.style.cssText =
      'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);padding:10px 14px;border-radius:999px;background:#181a20;color:#f2efe8;font:14px/1.2 sans-serif;z-index:99999;';
    document.body.append(toast);
  }
  toast.hidden = false;
}

function dispatch(name: string): void {
  for (const callback of listeners[name] ?? []) {
    try {
      callback(name === 'viewableChange' ? true : undefined);
    } catch {
      // A build listener should not break the shim.
    }
  }
}

function patchAudio(): void {
  const Native = window.AudioContext ?? window.webkitAudioContext;
  if (!Native || (Native as { __portfolioPatched?: boolean }).__portfolioPatched) return;

  const Wrapped = function WrappedAudio(
    this: AudioContext,
    ...args: ConstructorParameters<typeof AudioContext>
  ): AudioContext {
    const context = new Native(...args);
    audioContexts.push(context);
    if (muted) void context.suspend();
    return context;
  } as unknown as typeof AudioContext;

  Wrapped.prototype = Native.prototype;
  (Wrapped as { __portfolioPatched?: boolean }).__portfolioPatched = true;
  window.AudioContext = Wrapped;
  if (window.webkitAudioContext) window.webkitAudioContext = Wrapped;

  const play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function playMuted(this: HTMLMediaElement) {
    if (muted) {
      this.muted = true;
      this.volume = 0;
    }
    return play.call(this);
  };
}

function applyMute(next: boolean): void {
  muted = next;
  document.querySelectorAll('audio, video').forEach((node) => {
    const media = node as HTMLMediaElement;
    media.muted = muted;
    if (muted) media.volume = 0;
  });
  for (const context of audioContexts) {
    if (muted) void context.suspend();
    else void context.resume();
  }
}

const size = () => ({ width: window.innerWidth, height: window.innerHeight });

const mraid: MraidApi = {
  getVersion: () => '3.0',
  getState: () => state,
  isViewable: () => true,
  addEventListener: (name, callback) => {
    listeners[name] = listeners[name] ?? [];
    listeners[name].push(callback);
    if (state === 'default' && (name === 'ready' || name === 'viewableChange')) callback(true);
  },
  removeEventListener: (name, callback) => {
    listeners[name] = (listeners[name] ?? []).filter((item) => item !== callback);
  },
  open: (url) => emit(url),
  close: () => emit(),
  openStoreUrl: (url) => emit(url),
  expand: () => undefined,
  resize: () => undefined,
  getPlacementType: () => 'inline',
  getExpandProperties: () => ({ width: 0, height: 0, useCustomClose: false, isModal: false }),
  setExpandProperties: () => undefined,
  getResizeProperties: () => ({}),
  setResizeProperties: () => undefined,
  useCustomClose: () => undefined,
  playVideo: () => undefined,
  storePicture: () => undefined,
  createCalendarEvent: () => undefined,
  supports: () => false,
  getScreenSize: () => ({ width: window.screen.width, height: window.screen.height }),
  getMaxSize: size,
  getCurrentPosition: () => ({ x: 0, y: 0, ...size() }),
  getDefaultPosition: () => ({ x: 0, y: 0, ...size() }),
  getCurrentAppOrientation: () => ({
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    locked: false,
  }),
};

patchAudio();
window.mraid = window.mraid ?? mraid;
window.FbPlayableAd = window.FbPlayableAd ?? { onCTAClick: () => emit() };
window.ExitApi = window.ExitApi ?? { exit: () => emit() };
window.dapi = window.dapi ?? {
  isReady: () => true,
  openStoreUrl: (url) => emit(url),
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  getAudioVolume: () => (muted ? 0 : 1),
};

window.addEventListener('message', (event: MessageEvent) => {
  const data = event.data as { source?: string; type?: string; muted?: boolean } | null;
  if (event.origin !== window.location.origin || !data) return;
  if (data.source === 'portfolio-player' && data.type === 'mute') applyMute(Boolean(data.muted));
});

function markReady(): void {
  if (state === 'default') return;
  state = 'default';
  dispatch('ready');
  dispatch('viewableChange');
}

if (document.readyState === 'complete') markReady();
else window.addEventListener('load', markReady, { once: true });

export {};
