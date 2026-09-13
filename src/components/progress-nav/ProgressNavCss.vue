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
        <span class="toc__rail" :class="{ 'toc__rail--indent': item.indented }" aria-hidden="true"
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
.toc__rail {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -0.75rem;
  width: 1.25rem;
  box-sizing: border-box;
  pointer-events: none;
  border: 0 solid transparent;
}

.toc__item--level-0 .toc__rail {
  border-left-width: 2px;
}

.toc__item--level-1 .toc__rail {
  border-right-width: 2px;
}

.toc__rail--indent {
  border-top-width: 2px;
}

@supports (animation-timeline: view()) {
  .toc__rail {
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
    border-color: transparent;
  }

  15%,
  85% {
    border-color: var(--accent-teal);
  }

  100% {
    border-color: transparent;
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

  .toc__rail,
  .toc__link--css {
    animation: none;
  }
}
</style>
