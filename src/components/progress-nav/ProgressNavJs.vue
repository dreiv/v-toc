<script setup lang="ts">
import { sections } from '@/data/sections'
import { useProgressPath } from '@/composables/useProgressPath'
import '@/assets/rail.css'

const { pathEl, svgEl, setLinkEl, visibleIds, goTo } = useProgressPath(sections)
</script>

<template>
  <nav class="toc" aria-label="Reading progress">
    <ul class="toc__list">
      <li v-for="section in sections" :key="section.id" class="toc__item"
        :class="[`toc__item--level-${section.level}`, { 'toc__item--visible': visibleIds.has(section.id) }]">
        <a :ref="(el) => setLinkEl(section.id, el)" :href="`#${section.id}`" class="toc__link"
          @click.prevent="goTo(section.id)">
          {{ section.title }}
        </a>
      </li>
    </ul>

    <svg ref="svgEl" class="toc__marker" aria-hidden="true">
      <path ref="pathEl" stroke-width="2" fill="transparent" stroke-dasharray="0, 0, 0, 1000" stroke-linecap="round"
        stroke-linejoin="round" opacity="0" />
    </svg>
  </nav>
</template>

<style scoped>
.toc__marker {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: visible;
}

.toc__marker path {
  stroke: var(--accent-teal);
  transition:
    stroke-dasharray 0.3s ease,
    opacity 0.3s ease;
}
</style>
