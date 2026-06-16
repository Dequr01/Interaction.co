// ─────────────────────────────────────────────────────────────────────────────
// particleEngine.ts — high-performance particle engine
// Architecture ported from Sole Revival (proven 60fps):
//   • fillRect squares instead of arc (4× faster)
//   • distSq before sqrt (skip expensive math for most particles)
//   • willReadFrequently on offscreen canvas
//   • Fisher-Yates shuffle + hard cap
//   • Spring physics with per-particle ease
//   • Dual-color interpolation (theme color ↔ hover color)
// ─────────────────────────────────────────────────────────────────────────────

export type ParticleState =
  | 'chaos'
  | 'text:INTERACTION'
  | `image:${number}`
  | 'text:INTERACTION2';

// Performance budget
const DESKTOP_STEP = 4;
const MOBILE_STEP  = 5;
const DESKTOP_CAP  = 18_000;
const MOBILE_CAP   = 8_000;

const REPEL_RADIUS    = 90;
const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;

// ─────────────────────────────────────────────────────────────────────────────
// Particle — pure data class, no heap allocations in hot loop
// ─────────────────────────────────────────────────────────────────────────────
class Particle {
  x:  number;
  y:  number;
  ox: number; // origin x (target position)
  oy: number; // origin y (target position)

  // "resting" color (theme accent)
  br: number; bg_: number; bb: number;
  // "hover" color (slightly lighter tint, shows depth when scattered)
  hr: number; hg: number; hb: number;
  // current rendered color
  cr: number; cg: number; cb: number;

  size:     number;
  vx:       number;
  vy:       number;
  friction: number;
  ease:     number;
  opacity:  number;
  targetO:  number;

  constructor(
    x: number, y: number,
    br: number, bg: number, bb: number,
    hr: number, hg: number, hb: number,
    size: number,
    targetOpacity: number,
  ) {
    // Spawn slightly scattered from origin for a nice landing effect
    this.ox = x;
    this.oy = y;
    this.x  = x + (Math.random() - 0.5) * 80;
    this.y  = y + (Math.random() - 0.5) * 80;

    this.br = br; this.bg_ = bg; this.bb = bb;
    this.hr = hr; this.hg  = hg; this.hb = hb;
    this.cr = br; this.cg  = bg; this.cb = bb;

    this.size     = size;
    this.vx       = (Math.random() - 0.5) * 0.5;
    this.vy       = (Math.random() - 0.5) * 0.5;
    this.friction = 0.82;
    this.ease     = 0.14 + Math.random() * 0.08;
    this.opacity  = 0;
    this.targetO  = targetOpacity;
  }

  update(mouseX: number, mouseY: number, isChaos: boolean) {
    // Fade in
    if (this.opacity < this.targetO) {
      this.opacity += 0.012;
    }

    const dx     = mouseX - this.x;
    const dy     = mouseY - this.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < REPEL_RADIUS_SQ && distSq > 0) {
      const dist  = Math.sqrt(distSq);
      const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
      this.vx -= (dx / dist) * force * 2.0;
      this.vy -= (dy / dist) * force * 2.0;

      // Fade to hover color (slightly lighter)
      this.cr += (this.hr - this.cr) * 0.15;
      this.cg += (this.hg - this.cg) * 0.15;
      this.cb += (this.hb - this.cb) * 0.15;
    } else {
      // Spring back to resting color
      this.cr += (this.br - this.cr) * 0.04;
      this.cg += (this.bg_ - this.cg) * 0.04;
      this.cb += (this.bb - this.cb) * 0.04;
    }

    if (isChaos) {
      // In chaos: drift freely with gentle wrap
      this.x += this.vx;
      this.y += this.vy;
    } else {
      // Spring toward origin target
      const tx = this.ox - this.x;
      const ty = this.oy - this.y;
      const speed = Math.abs(this.vx) + Math.abs(this.vy);

      if (Math.abs(tx) < 0.4 && Math.abs(ty) < 0.4 && speed < 0.08) {
        // Snap clean: lock to exact target, kill residual velocity
        this.x  = this.ox;
        this.y  = this.oy;
        this.vx = 0;
        this.vy = 0;
      } else {
        this.x += tx * this.ease + this.vx;
        this.y += ty * this.ease + this.vy;
      }
    }

    this.vx *= this.friction;
    this.vy *= this.friction;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ParticleEngine — manages canvas, particle pool, and state transitions
// ─────────────────────────────────────────────────────────────────────────────
export class ParticleEngine {
  private canvas!: HTMLCanvasElement;
  private ctx!:    CanvasRenderingContext2D;
  // Offscreen canvas for pixel sampling — willReadFrequently avoids GPU stall
  private osCanvas: HTMLCanvasElement;
  private osCtx:    CanvasRenderingContext2D;

  private particles:  Particle[] = [];
  private state:      ParticleState = 'chaos';
  private frameId:    number = 0;
  private isDark:     boolean = false;
  private teamData:   any[]   = [];

  // Theme colors (decoded once, not per frame)
  private themeR = 26;  private themeG = 71;  private themeB = 176; // #1A47B0 light
  private hoverR = 96;  private hoverG = 165; private hoverB = 250; // #60A5FA lighter

  private mouseX = -9999;
  private mouseY = -9999;

  private step = DESKTOP_STEP;
  private cap  = DESKTOP_CAP;

  private resizeTimeout = 0;

  constructor(teamData: any[]) {
    this.teamData = teamData;

    // Create the offscreen canvas once
    this.osCanvas = document.createElement('canvas');
    const osCtx = this.osCanvas.getContext('2d', { willReadFrequently: true });
    if (!osCtx) throw new Error('Could not get 2d context');
    this.osCtx = osCtx;
  }

  public init(canvas: HTMLCanvasElement, isDark: boolean) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Could not get 2d context');
    this.ctx = ctx;

    this.isDark = isDark;
    this.updateThemeColors();

    const isMobile = window.innerWidth < 768;
    this.step = isMobile ? MOBILE_STEP : DESKTOP_STEP;
    this.cap  = isMobile ? MOBILE_CAP  : DESKTOP_CAP;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', this.handleResize);
    this.tick();
  }

  public destroy() {
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.frameId);
    clearTimeout(this.resizeTimeout);
  }

  public setMouse(x: number, y: number) {
    // Convert from page coords to canvas coords (accounts for CSS scaling)
    const rect   = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width  / rect.width;
    const scaleY = this.canvas.height / rect.height;
    this.mouseX  = (x - rect.left) * scaleX;
    this.mouseY  = (y - rect.top)  * scaleY;
  }

  public clearMouse() {
    this.mouseX = -9999;
    this.mouseY = -9999;
  }

  private handleResize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = window.setTimeout(() => {
      this.canvas.width  = window.innerWidth;
      this.canvas.height = window.innerHeight;
      if (this.state !== 'chaos') {
        this.setState(this.state);
      }
    }, 300);
  };

  private updateThemeColors() {
    if (this.isDark) {
      // Dark: bright blue accent → teal hover
      this.themeR = 96;  this.themeG = 165; this.themeB = 250; // #60A5FA
      this.hoverR = 147; this.hoverG = 210; this.hoverB = 255; // brighter
    } else {
      // Light: deep blue → sky blue hover
      this.themeR = 26;  this.themeG = 71;  this.themeB = 176; // #1A47B0
      this.hoverR = 59;  this.hoverG = 130; this.hoverB = 246; // #3B82F6
    }
  }

  public onThemeChange(isDark: boolean) {
    this.isDark = isDark;
    this.updateThemeColors();

    // Update all particles' resting + hover colors
    if (!this.state.startsWith('image:')) {
      for (const p of this.particles) {
        p.br = this.themeR; p.bg_ = this.themeG; p.bb = this.themeB;
        p.hr = this.hoverR; p.hg  = this.hoverG; p.hb = this.hoverB;
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Sample text glyphs into particle positions using offscreen canvas
  // ─────────────────────────────────────────────────────────────────────────
  private sampleText(text: string): Particle[] {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const os = this.osCanvas;
    const ctx = this.osCtx;

    os.width  = w;
    os.height = h;
    ctx.clearRect(0, 0, w, h);

    // Target right 50% of screen on desktop, centered on mobile (zoomed out)
    const isMobile = w < 1024;
    const maxTextW = isMobile ? w * 0.65 : w * 0.32;
    let fontSize = Math.min(w / 12, 100);
    ctx.font = `700 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
    ctx.letterSpacing = '0.04em';

    const measuredW = ctx.measureText(text).width;
    if (measuredW > maxTextW) {
      fontSize = fontSize * (maxTextW / measuredW);
      ctx.font = `700 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
    }

    ctx.fillStyle   = 'white';
    ctx.textAlign   = 'center';
    ctx.textBaseline = 'middle';
    const cx = isMobile ? w / 2 : w * 0.73;
    const cy = isMobile ? h * 0.28 : h / 2;
    ctx.fillText(text, cx, cy);

    const imgData = ctx.getImageData(0, 0, w, h).data;
    const out: Particle[] = [];
    const pSize = this.step * 0.32;

    for (let y = 0; y < h; y += this.step) {
      for (let x = 0; x < w; x += this.step) {
        const i = (y * w + x) * 4;
        if (imgData[i + 3] < 80) continue;
        out.push(new Particle(
          x, y,
          this.themeR, this.themeG, this.themeB,
          this.hoverR, this.hoverG, this.hoverB,
          pSize, 1,
        ));
      }
    }

    return out;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Sample image pixels into particle positions with full color
  // ─────────────────────────────────────────────────────────────────────────
  private sampleImage(img: HTMLImageElement): Particle[] {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const os = this.osCanvas;
    const ctx = this.osCtx;

    os.width  = w;
    os.height = h;
    ctx.clearRect(0, 0, w, h);

    const isMobile = w < 1024;
    // Portrait occupies ~16% of canvas width, centred within the left 50% zone (zoomed out)
    const scale   = isMobile ? 0.45 : 0.16;
    const imgW    = w * scale;
    const imgH    = imgW * (img.height / img.width);
    const leftZoneW = w * 0.5;
    const offsetX   = isMobile ? (w - imgW) / 2 : (leftZoneW - imgW) / 2;
    const offsetY   = (h - imgH) / 2;

    ctx.drawImage(img, offsetX, offsetY, imgW, imgH);
    const pixData = ctx.getImageData(0, 0, w, h).data;
    const out: Particle[] = [];
    const pSize = this.step * 0.32;

    for (let y = 0; y < h; y += this.step) {
      for (let x = 0; x < w; x += this.step) {
        const i     = (y * w + x) * 4;
        const alpha = pixData[i + 3];
        if (alpha < 50) continue;

        const r = pixData[i];
        const g = pixData[i + 1];
        const b = pixData[i + 2];
        if (r > 240 && g > 240 && b > 240) continue; // skip near-white bg

        // "hover" tint: desaturated grayscale version of the pixel
        const avg  = (r + g + b) / 3;
        const hr   = Math.min(255, avg * 1.2) | 0;
        const hg_  = Math.min(255, avg * 1.2) | 0;
        const hb   = Math.min(255, avg * 1.2) | 0;

        out.push(new Particle(x, y, r, g, b, hr, hg_, hb, pSize, alpha / 255));
      }
    }

    return out;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Spawn initial chaos particles
  // ─────────────────────────────────────────────────────────────────────────
  public spawnChaos() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const pSize = this.step * 0.32;
    this.particles = [];

    for (let i = 0; i < this.cap; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const p = new Particle(
        x, y,
        this.themeR, this.themeG, this.themeB,
        this.hoverR, this.hoverG, this.hoverB,
        pSize,
        Math.random() * 0.5 + 0.2,
      );
      // Random drift velocity
      p.vx = (Math.random() - 0.5) * 0.6;
      p.vy = (Math.random() - 0.5) * 0.6;
      this.particles.push(p);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Mutate existing particles to snap to new targets (no re-alloc)
  // ─────────────────────────────────────────────────────────────────────────
  private applyTargets(newParticles: Particle[]) {
    // Fisher-Yates shuffle the targets for staggered appearance
    for (let i = newParticles.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      const t = newParticles[i];
      newParticles[i] = newParticles[j];
      newParticles[j] = t;
    }
    const targets = newParticles.slice(0, this.cap);

    // Morph existing pool → new targets. If pool is bigger, extras scatter.
    const len = Math.max(this.particles.length, targets.length);
    const w   = this.canvas.width;
    const h   = this.canvas.height;

    for (let i = 0; i < this.particles.length; i++) {
      const p  = this.particles[i];
      const tg = targets[i % targets.length];

      p.ox = tg.ox;
      p.oy = tg.oy;
      p.br = tg.br;  p.bg_ = tg.bg_; p.bb = tg.bb;
      p.hr = tg.hr;  p.hg  = tg.hg;  p.hb = tg.hb;
      p.targetO = tg.targetO;
      // Stagger the ease so particles land at different times
      p.ease = 0.05 + Math.random() * 0.07;
    }

    // If we need more particles than we have, add them
    if (targets.length > this.particles.length) {
      for (let i = this.particles.length; i < targets.length && i < this.cap; i++) {
        const tg = targets[i];
        // Spawn from a random position so they fly in
        tg.x = Math.random() * w;
        tg.y = Math.random() * h;
        this.particles.push(tg);
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Public state machine
  // ─────────────────────────────────────────────────────────────────────────
  public setState(newState: ParticleState) {
    const prev = this.state;
    this.state = newState;

    if (newState === 'chaos') {
      const w = this.canvas.width;
      const h = this.canvas.height;
      for (const p of this.particles) {
        p.ox = Math.random() * w;
        p.oy = Math.random() * h;
        p.vx = (Math.random() - 0.5) * 1.5;
        p.vy = (Math.random() - 0.5) * 1.5;
        p.br = this.themeR; p.bg_ = this.themeG; p.bb = this.themeB;
        p.hr = this.hoverR; p.hg  = this.hoverG; p.hb = this.hoverB;
      }
      return;
    }

    if (newState === 'text:INTERACTION' || newState === 'text:INTERACTION2') {
      if (this.particles.length === 0) this.spawnChaos();
      const sampled = this.sampleText('INTERACTION');
      this.applyTargets(sampled);
      return;
    }

    if (newState.startsWith('image:')) {
      const idx = parseInt(newState.split(':')[1]);
      const src = this.teamData[idx]?.photo;
      if (!src) {
        // Fallback: just use text
        const name = this.teamData[idx]?.name || 'TEAM';
        const sampled = this.sampleText(name);
        this.applyTargets(sampled);
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Only apply if we're still on this state
        if (this.state === newState) {
          const sampled = this.sampleImage(img);
          this.applyTargets(sampled);
        }
      };
      img.src = src;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render loop
  // ─────────────────────────────────────────────────────────────────────────
  private tick = () => {
    const ctx      = this.ctx;
    const w        = this.canvas.width;
    const h        = this.canvas.height;
    const isChaos  = this.state === 'chaos';
    const mX       = this.mouseX;
    const mY       = this.mouseY;
    const len      = this.particles.length;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < len; i++) {
      const p = this.particles[i];
      p.update(mX, mY, isChaos);

      // Wrap in chaos so particles don't escape off-screen
      if (isChaos) {
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;
      }

      // fillRect squares: ~4× faster than arc
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle   = `rgb(${p.cr | 0},${p.cg | 0},${p.cb | 0})`;
      ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
    }

    ctx.globalAlpha = 1;
    this.frameId = requestAnimationFrame(this.tick);
  };
}
