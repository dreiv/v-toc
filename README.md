# v-toc — progress rail demo

A small Vue 3 + TypeScript page rebuilding the classic
[hakim.se/progress-nav](https://lab.hakim.se/progress-nav/) vertical progress rail two ways, plus
~10 screen-heights of original filler copy to scroll through. Switch between the two with the
control at the bottom of the page.

- **Vue + scroll** (`ProgressNavJs.vue`) — a `useProgressPath` composable ports the original demo's
  own algorithm: it walks the real nav links, measures their on-screen positions, and draws one
  SVG path that indents sideways at every indent change. On scroll it finds every section currently
  inside a 10%–80% viewport band and highlights the single stretch of path spanning from the
  first one to the last, via a `stroke-dasharray` trick — so two sections on screen together light
  up as one continuous run.
- **CSS only** (`ProgressNavCss.vue`) — no scroll listener, no measurement, no reactive state.
  Each nav item gets its own vertical (and, where indentation changes, horizontal) line segment,
  and both the segment and its link text animate against that section's own named `view-timeline`
  (`view-timeline-name: --section-N` set on the `<section>`/`<aside>`, consumed via
  `animation-timeline: --section-N`). Because every item watches only its own timeline, several
  can highlight at once with no coordination between them. Navigation is plain `<a href="#id">`
  with `scroll-behavior: smooth`. Named timelines only reach sibling subtrees when an ancestor
  declares them, so `App.vue` sets `timeline-scope` once, generated from the same section list.
- The **top bar** is always CSS-only, as the simplest possible demonstration of
  `animation-timeline: scroll()`.

Both rails render the _same_ table-of-contents text (a real `<nav><ul><li><a>` list, not
decorative dots), reading from one `src/data/sections.ts` — including which items are nested
subsections, which is what gives the connecting line its zigzag. Content sections are normal
flowing prose (no forced full-viewport padding), so it's common for two or three headings to sit
in the viewport together.

## Browser support

Scroll-driven animations (`animation-timeline`, `view-timeline-name`, `timeline-scope`) are a
newer CSS feature. Where unsupported, everything wrapped in `@supports (animation-timeline: ...)`
simply stays static instead of breaking — the top bar sits at zero, nav items keep their resting
style, and the CSS-only rail is still fully usable as a set of anchor links. `prefers-reduced-motion`
is also respected.

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
