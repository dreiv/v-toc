<script setup lang="ts">
import { sections } from '@/data/sections'
import { useRailItems } from '@/composables/useRailItems'
import { sectionTimelineName } from '@/utils/timeline'
import '@/assets/rail.css'

const { items } = useRailItems(sections)
</script>

<template>
  <nav class="toc toc--css" aria-label="Reading progress (CSS only)">
    <ul class="toc__list">
      <li v-for="item in items" :key="item.section.id" class="toc__item"
        :class="`toc__item--level-${item.section.level}`">
        <span v-if="item.hasJog" class="toc__rail-h" aria-hidden="true"
          :style="{ animationTimeline: sectionTimelineName(item.section.index) }" />
        <span class="toc__rail-v" aria-hidden="true"
          :style="{ animationTimeline: sectionTimelineName(item.section.index) }" />
        <a :href="`#${item.section.id}`" class="toc__link toc__link--css"
          :style="{ animationTimeline: sectionTimelineName(item.section.index) }">
          {{ item.section.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc__rail-v,
.toc__rail-h {
  position: absolute;
  background: transparent;
  pointer-events: none;
}

.toc__rail-v {
  top: 0;
  bottom: 0;
  width: 2px;
}

.toc__item--level-0 .toc__rail-v {
  left: -0.75rem;
}

.toc__item--level-1 .toc__rail-v {
  left: 0.5rem;
}

.toc__rail-h {
  top: 0;
  left: -0.75rem;
  width: 1.25rem;
  height: 2px;
}

@supports (animation-timeline: view()) {

  .toc__rail-v,
  .toc__rail-h {
    animation: bar-glow linear both;
    animation-range: cover 0% cover 100%;
  }

  .toc__link--css {
    animation: link-glow linear both;
    animation-range: cover 0% cover 100%;
  }
}

@keyframes bar-glow {
  0% {
    background: transparent;
  }

  15%,
  85% {
    background: var(--accent-teal);
  }

  100% {
    background: transparent;
  }
}

@keyframes link-glow {
  0% {
    color: var(--ink-faint);
    transform: translateX(0);
  }

  15%,
  85% {
    color: var(--ink);
    transform: translateX(5px);
  }

  100% {
    color: var(--ink-faint);
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {

  .toc__rail-v,
  .toc__rail-h,
  .toc__link--css {
    animation: none;
  }
}
</style>
