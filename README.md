# v-toc — progress rail demo

A small Vue 3 + TypeScript page rebuilding the classic
[hakim.se/progress-nav](https://lab.hakim.se/progress-nav/) vertical progress rail two ways, plus
~10 screen-heights of original filler copy to scroll through. Switch between the two with the
control at the bottom of the page.

- **Vue + observer** (`ProgressNavJs.vue`) — a `useScrollProgress` composable computes overall
  scroll progress (`@vueuse/core`'s `useWindowScroll`) and the currently-active section
  (`IntersectionObserver`, centred on the viewport). Sections register themselves in a small
  shared registry (`sectionRegistry.ts`) so the nav never has to query the DOM directly.
- **CSS only** (`ProgressNavCss.vue`) — no scroll listener, no observer, no reactive state. The
  fill line uses `animation-timeline: scroll(root)`; each dot watches its own section via a named
  `view-timeline` (`view-timeline-name: --section-N` set on the `<section>`, consumed with
  `animation-timeline: --section-N` on the dot). Navigation is plain `<a href="#id">` anchors with
  `scroll-behavior: smooth`.
- The **top bar** is always CSS-only, as the simplest possible demonstration of
  `animation-timeline: scroll()`.

Both rails read from the same `src/data/sections.ts`, so content, ids, and ordering can't drift
apart between them.

## Browser support

Scroll-driven animations (`animation-timeline: scroll()` / `view()`) are a newer CSS feature.
Where unsupported, everything wrapped in `@supports (animation-timeline: ...)` simply stays static
instead of breaking — the top bar sits at zero, dots keep their resting style, and the CSS-only
rail is still fully usable as a set of anchor links. `prefers-reduced-motion` is also respected.

## Stack

Vue 3 (`<script setup>`, TypeScript), Vite, Tailwind CSS v4 (via `@tailwindcss/vite`), `@vueuse/core`
for the scroll/resize plumbing, `@lucide/vue` for icons.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint

```sh
npm run lint
```
