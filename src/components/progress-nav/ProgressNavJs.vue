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

    <svg ref="svgEl" class="pointer-events-none absolute inset-0 z-[-1] h-full w-full overflow-visible"
      aria-hidden="true">
      <path ref="pathEl" class="stroke-accent-teal transition-[stroke-dasharray,opacity] duration-300 ease-[ease]"
        stroke-width="2" fill="transparent" stroke-dasharray="0, 0, 0, 1000" stroke-linecap="round"
        stroke-linejoin="round" opacity="0" />
    </svg>
  </nav>
</template>
