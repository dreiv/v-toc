<script setup lang="ts">
// Deliberately no reactive state and no scroll handling here: every visual
// change on this rail — the fill line growing, each dot lighting up — is
// computed by the browser's compositor from CSS alone. The only per-item
// value Vue supplies is which named view-timeline a dot should watch, which
// mirrors the `view-timeline-name` that FillerSection already sets on its
// matching <section>.
import { sections } from '@/data/sections'
import '@/assets/rail.css'
</script>

<template>
  <nav class="rail rail--css" aria-label="Reading progress (CSS only)">
    <div class="rail__frame">
      <div class="rail__track" />
      <div class="rail__fill rail__fill--css" />
      <ol class="rail__list">
        <li v-for="section in sections" :key="section.id">
          <a
            :href="`#${section.id}`"
            class="rail__dot"
            :aria-label="section.title"
            :style="{ animationTimeline: `--section-${section.index}` }"
          >
            <span class="rail__dot-core" />
            <span class="rail__tooltip">{{ section.title }}</span>
          </a>
        </li>
      </ol>
    </div>
  </nav>
</template>

<style scoped>
.rail__fill--css {
  transform: scaleY(0);
}

@supports (animation-timeline: scroll()) {
  .rail__fill--css {
    animation: grow-fill-y linear forwards;
    animation-timeline: scroll(root);
  }
}

@keyframes grow-fill-y {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

/* Each dot watches its own section's view-timeline (named via inline style)
   and pulses while that section occupies the viewport. */
@supports (animation-timeline: view()) {
  .rail--css .rail__dot-core {
    animation: dot-focus linear both;
    animation-range: cover 0% cover 100%;
  }
}

@keyframes dot-focus {
  0%,
  100% {
    background: var(--paper);
    border-color: var(--ink-faint);
    transform: scale(1);
  }
  50% {
    background: var(--accent-rust);
    border-color: var(--accent-rust);
    transform: scale(1.35);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rail__fill--css,
  .rail--css .rail__dot-core {
    animation: none;
  }

  .rail__fill--css {
    transform: scaleY(0);
  }
}
</style>
