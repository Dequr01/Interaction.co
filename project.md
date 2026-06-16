# Interaction — Website Architecture Spec
**For Antigravity implementation | CTO-authored | Plain reference doc**

---

## Stack

- **Framework:** Next.js 15 App Router
- **Styling:** Tailwind CSS v4 + CSS custom properties for theme engine
- **Animation:** GSAP (ScrollTrigger, timeline) + custom Canvas API particle engine
- **Fonts:** Google Fonts — display: `Cormorant Garamond` (elegant, editorial) | body: `Inter` | mono accent: `Space Mono`
- **Data:** `team.json` flat file — no CMS, no DB, single source of truth for team section
- **Theme:** CSS custom property engine, smooth animated transitions between light/dark

---

## Theme Engine

### Token System (predefined, exhaustive, no edge case left undefined)

```css
/* Light Mode */
--color-bg:           #FFFFFF
--color-bg-secondary: #F0F4FF
--color-surface:      #FFFFFF
--color-surface-blur: rgba(255, 255, 255, 0.6)
--color-border:       rgba(37, 99, 235, 0.15)
--color-text-primary: #0A0A0A
--color-text-secondary: #3B3B3B
--color-text-muted:   #6B7280
--color-accent:       #2563EB        /* bright blue */
--color-accent-soft:  rgba(37, 99, 235, 0.12)
--color-accent-glow:  rgba(37, 99, 235, 0.35)
--particle-color:     #2563EB
--particle-glow:      rgba(37, 99, 235, 0.6)

/* Dark Mode */
--color-bg:           #0A0000
--color-bg-secondary: #120000
--color-surface:      #1A0000
--color-surface-blur: rgba(20, 0, 0, 0.6)
--color-border:       rgba(220, 38, 38, 0.2)
--color-text-primary: #FAF5F5
--color-text-secondary: #D1C0C0
--color-text-muted:   #9B7A7A
--color-accent:       #DC2626        /* red */
--color-accent-soft:  rgba(220, 38, 38, 0.12)
--color-accent-glow:  rgba(220, 38, 38, 0.35)
--particle-color:     #DC2626
--particle-glow:      rgba(220, 38, 38, 0.6)
```

### Theme Switch Behavior
- Toggle lives in the pill nav (icon button, right side)
- On toggle: `document.documentElement` class switches `light` ↔ `dark`
- All CSS vars transition via: `transition: background-color 600ms ease, color 600ms ease, border-color 600ms ease`
- Particle engine listens to theme change event → smoothly interpolates particle color over 800ms (lerp per frame, not a hard swap)
- Persisted to `localStorage` key `interaction-theme`
- Default: respect `prefers-color-scheme`, fallback to dark

---

## Particle Engine

**Single shared Canvas instance** — fixed position, `z-index: 0`, full viewport, pointer-events none. All three particle formations (hero text, team photo, about company name) are states of the same engine. The canvas never unmounts.

### Engine Architecture

```
ParticleEngine class
├── init(canvas)              — set up canvas, resize observer
├── spawnParticles(count)     — create particle pool
├── setState(newState)        — drives all transitions
│   ├── 'chaos'               — random scatter, pre-formation
│   ├── 'text:INTERACTION'    — snap to letter pixel map
│   ├── 'image:{index}'       — snap to team photo pixel map
│   └── 'text:INTERACTION2'   — about section formation
├── sampleTarget(type, data)  — pixel-sample text or image → target positions
├── tick()                    — rAF loop, lerp particles toward targets
└── onThemeChange(colors)     — interpolate particle color smoothly
```

### Particle Properties (per particle)
```js
{
  x, y,           // current position
  tx, ty,         // target position
  vx, vy,         // velocity
  size,           // 1–3px, randomized per particle, jitters on chaos state
  opacity,        // 0–1
  color,          // interpolates with theme
  delay,          // staggered snap delay (0–800ms) for chaotic-then-snap feel
}
```

### Formation Logic
- **Chaos state:** particles at random positions, slow drift, slight size oscillation
- **Snap to target:** each particle gets a `delay` value. On trigger, after delay expires, particle lerps toward `(tx, ty)` with easing `1 - e^(-k*t)`. Fast approach, soft land.
- **Text sampling:** render text to offscreen canvas, sample every Nth pixel for a position, assign to particles
- **Image sampling:** load team photo → draw to offscreen canvas → sample pixels by luminance → assign positions + tint particles toward sampled color
- **Particle count:** 4000 particles (enough for both text clarity and photo impression)
- **Transition between states:** old targets → new targets, no despawn/respawn. Smooth morph.

---

## Section 1 — Hero

### Layout
```
[fullscreen viewport]
  [canvas — fixed behind everything]
  [centered content column]
    [particle-formed letters: INTERACTION]  ← canvas draws this
    [quote — slides up from bottom on formation complete]
    "Your vision, our Innovation."
```

### Sequence
1. Page load → particles spawn in chaos state (600ms)
2. Particles snap to spell `INTERACTION` — chaotic stagger, all locked in by t=2400ms
3. 200ms hold after last particle lands
4. Quote fades + slides up from `translateY(40px)` → `translateY(0)` over 700ms
5. Nav pill fades in from top simultaneously with quote

### Typography
- `INTERACTION` rendered on canvas (not DOM text) — Cormorant Garamond, bold, tracked
- Quote: DOM element, `font-family: 'Cormorant Garamond'`, `font-style: italic`, `font-size: clamp(1.2rem, 3vw, 2rem)`, `letter-spacing: 0.15em`, `color: var(--color-text-secondary)`
- Quote sits ~80px below the canvas text region

### Scroll behavior
- On scroll past hero threshold → particles receive new setState call for first team member
- ScrollTrigger pin hero section until particle morph to first team photo is complete

---

## Nav — Pill Style

### Structure
```
[pill container — fixed top center]
  [logo: "Interaction" — Space Mono, small caps]
  [nav links: Work · Team · About · Contact]
  [theme toggle icon]
```

### Specs
- `backdrop-filter: blur(20px) saturate(180%)`
- `background: var(--color-surface-blur)`
- `border: 1px solid var(--color-border)`
- `border-radius: 9999px`
- `padding: 10px 24px`
- Enters hero section via fade from top, delayed until quote animation completes
- On scroll down past hero: pill shrinks slightly (`scale(0.96)`), increases blur
- Active link underline: 2px `var(--color-accent)` dot below, not underline
- Mobile: pill collapses to logo + hamburger → slide-down drawer (not another pill)

---

## Section 2 — Team

### Data Contract — `team.json`
```json
[
  {
    "id": 1,
    "name": "Full Name",
    "designation": "Role Title",
    "about": "One or two sentences. Keep it tight.",
    "photo": "/team/member-1.jpg",
    "links": {
      "linkedin": "https://...",
      "twitter": "https://...",
      "github": "https://..."
    }
  }
]
```
All fields optional except `id`, `name`, `photo`. Links object only renders present keys.

### Particle-to-Photo Transition (per member)
- ScrollTrigger fires when member section enters viewport
- Engine receives `setState('image:0')` → particles morph from current state to pixel-map of `photo`
- Particle colors tint toward dominant hues of that photo (sampled on load)
- Transition duration: ~1200ms
- Each member gets their own ScrollTrigger pin — scroll is locked during morph

### Member Card Layout (DOM layer, above canvas)
```
[full viewport section — pinned during morph]
  [left half — particle canvas shows photo impression]
  [right half — member info card]
    [name — Cormorant Garamond, 3rem, light weight]
    [designation — Space Mono, 0.75rem, uppercase, accent color]
    [about — Inter, 1rem, muted color, max 3 lines]
    [links — icon row, accent color on hover]
```

### Responsive layout
- Above 768px: side-by-side (canvas left, info right)
- Below 768px: canvas top (40vh), info below
- The only file to update for new members: `team.json` + drop photo in `/public/team/`

---

## Section 3 — About

### Layout
```
[fullscreen section]
  [canvas — particles form "INTERACTION" again, center of section]
  [glassmorphism card — centered, overlaid on particles]
    [company tagline]
    [one paragraph about]
    [founded / location / stat chips]
```

### Glassmorphism Card
- `backdrop-filter: blur(24px) saturate(160%)`
- `background: var(--color-surface-blur)`
- `border: 1px solid var(--color-border)`
- `border-radius: 24px`
- `box-shadow: 0 8px 48px var(--color-accent-glow)`
- **Mouse refraction effect:** on `mousemove` over card, apply `transform: perspective(800px) rotateX(Ydeg) rotateY(Xdeg)` — max tilt ±8deg, smooth lerp follow
- **Border light sweep:** on mouse enter, a `conic-gradient` border traces the card edge following cursor position
- Card is NOT transparent to the point of unreadable — content stays legible at all theme states

### Particle formation (about section)
- ScrollTrigger fires on section enter
- Particles morph from last team member photo → spell `INTERACTION` centered behind card
- Same engine, same 4000 particles
- After formation: particles drift very slowly (ambient breathing motion), do not scatter

---

## File Structure

```
/app
  /page.tsx              — single page, sections stacked
  /layout.tsx            — theme provider, font load
/components
  /ParticleCanvas.tsx    — canvas engine wrapper, singleton
  /Nav.tsx               — pill nav
  /HeroSection.tsx       — quote DOM layer, trigger logic
  /TeamSection.tsx       — reads team.json, renders member cards
  /AboutSection.tsx      — card + mouse tilt logic
/lib
  /particleEngine.ts     — full engine class
  /themeEngine.ts        — token switching, localStorage, event emitter
  /samplePixels.ts       — text + image pixel sampling utilities
/public
  /team/                 — member photos go here
  team.json              — single source of truth for team data
/styles
  /globals.css           — all CSS vars, theme classes, base resets
```

---

## Animation Timing Reference

| Event | Duration | Easing |
|---|---|---|
| Particle chaos spawn | 600ms | ease-out |
| Particle snap to INTERACTION | 0–800ms stagger per particle | exponential decay |
| Quote slide up | 700ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Nav pill enter | 500ms | ease-out |
| Theme color transition | 600ms | ease |
| Particle color lerp on theme | 800ms | linear per frame |
| Particle morph to photo | 1200ms | exponential decay |
| Particle morph team → about | 1200ms | exponential decay |
| Card mouse tilt | 120ms | linear (live follow) |

---

## Edge Cases Defined

- **No photo found:** fallback to accent-color solid fill pixel map (initials rendered)
- **Reduced motion:** `prefers-reduced-motion: reduce` → skip all particle animation, show static text + static images, card tilt disabled
- **Mobile particle count:** halved to 2000 on viewport width < 768px (performance)
- **Theme flash on load:** inline script in `<head>` reads localStorage before React hydrates → sets class on `<html>` synchronously
- **team.json missing link keys:** only render link icons for keys present in object
- **Particle engine resize:** ResizeObserver on canvas → re-sample targets on resize, re-morph without full restart
- **Scroll during morph:** input locked via pointer-events on scroll container until morph completes (ScrollTrigger pin handles this)
- **Image CORS for pixel sampling:** all photos served from `/public/team/` — same origin, no CORS issue

---

## Antigravity Implementation Notes

- Build `particleEngine.ts` first, test in isolation before wiring sections
- `samplePixels.ts` is the hardest utility — text sampling and image sampling are two separate functions, both return `Array<{x: number, y: number}>`
- `ParticleCanvas` is a singleton — use React context to expose `setState` to all sections
- ScrollTrigger pins must be cleaned up on unmount (`trigger.kill()`)
- All GSAP imports: `gsap/ScrollTrigger`, register plugin in layout
- Do not use `framer-motion` — GSAP only for orchestration, React state for card tilt
- `team.json` imported directly in `TeamSection.tsx` via `import teamData from '@/public/team.json'`