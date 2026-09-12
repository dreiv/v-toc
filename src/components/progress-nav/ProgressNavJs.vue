<script setup lang="ts">
import { inject } from 'vue'
import { sections } from '@/data/sections'
import { SectionRegistryKey } from '@/composables/sectionRegistry'
import { useScrollProgress } from '@/composables/useScrollProgress'
import '@/assets/rail.css'

const registry = inject(SectionRegistryKey)
if (!registry) throw new Error('ProgressNavJs must be mounted below a section registry provider')

const { progress, activeId } = useScrollProgress(sections, registry)

function goToSection(id: string) {
  registry?.elements.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <nav class="rail" aria-label="Reading progress">
    <div class="rail__frame">
      <div class="rail__track" />
      <div class="rail__fill" :style="{ transform: `scaleY(${progress})` }" />
      <ol class="rail__list">
        <li v-for="section in sections" :key="section.id">
          <button
            type="button"
            class="rail__dot"
            :class="{ 'rail__dot--active': activeId === section.id }"
            :aria-current="activeId === section.id ? 'true' : undefined"
            :aria-label="section.title"
            @click="goToSection(section.id)"
          >
            <span class="rail__dot-core" />
            <span class="rail__tooltip">{{ section.title }}</span>
          </button>
        </li>
      </ol>
    </div>
  </nav>
</template>

<style scoped>
.rail__dot--active .rail__dot-core {
  background: var(--accent-rust);
  border-color: var(--accent-rust);
  transform: scale(1.35);
}
</style>
