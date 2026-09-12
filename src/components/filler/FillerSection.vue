<script setup lang="ts">
import { inject, onMounted, onUnmounted, useTemplateRef } from 'vue'
import type { Section } from '@/types/section'
import { SectionRegistryKey } from '@/composables/sectionRegistry'

const props = defineProps<{ section: Section }>()

const rootEl = useTemplateRef<HTMLElement>('root')
const registry = inject(SectionRegistryKey)

onMounted(() => {
  if (rootEl.value) registry?.register(props.section.id, rootEl.value)
})

onUnmounted(() => {
  registry?.unregister(props.section.id)
})
</script>

<template>
  <section
    :id="section.id"
    ref="root"
    :data-section-id="section.id"
    :style="{ viewTimelineName: `--section-${section.index}` }"
    class="section"
  >
    <p class="section__marker" aria-hidden="true">{{
      String(section.index + 1).padStart(2, '0')
    }}</p>
    <h2 class="section__title">{{ section.title }}</h2>
    <p v-for="(paragraph, i) in section.paragraphs" :key="i" class="section__paragraph">
      {{ paragraph }}
    </p>
  </section>
</template>

<style scoped>
.section {
  scroll-margin-top: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  max-width: 38rem;
  padding: 4rem 1.5rem;
  margin-inline: auto;
  border-top: 1px solid var(--rule);
}

.section__marker {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  color: var(--accent-rust);
}

.section__title {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 1.1rem + 1.4vw, 2.1rem);
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.section__paragraph {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--ink-soft);
  max-width: 34rem;
}
</style>
