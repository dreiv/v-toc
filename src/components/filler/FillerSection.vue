<script setup lang="ts">
import type { Section } from '@/types/section'
import { sectionTimelineName } from '@/utils/timeline'

defineProps<{ section: Section }>()
</script>

<template>
  <component
    :is="section.level === 0 ? 'section' : 'aside'"
    :id="section.id"
    class="section"
    :class="`section--level-${section.level}`"
    :style="{
      viewTimelineName: sectionTimelineName(section.index),
      viewTimelineInset: '10% 20%',
    }"
  >
    <component :is="section.level === 0 ? 'h2' : 'h3'" class="section__title">
      {{ section.title }}
    </component>
    <p v-for="(paragraph, i) in section.paragraphs" :key="i" class="section__paragraph">
      {{ paragraph }}
    </p>
  </component>
</template>

<style scoped>
.section {
  scroll-margin-top: 2rem;
  max-width: 34rem;
}

.section--level-0 {
  padding-block: 2.75rem 0.25rem;
  border-top: 1px solid var(--rule);
}

.section--level-0:first-of-type {
  border-top: none;
}

.section--level-1 {
  padding: 1rem 0 1rem 1.25rem;
  margin-block: 0.5rem;
  border-left: 2px solid var(--rule);
}

.section__title {
  font-family: var(--font-serif);
  font-weight: 600;
  color: var(--ink);
  line-height: 1.25;
  margin: 0 0 0.6rem;
}

.section--level-0 .section__title {
  font-size: clamp(1.35rem, 1.1rem + 0.9vw, 1.75rem);
}

.section--level-1 .section__title {
  font-size: 1.05rem;
  color: var(--ink-soft);
}

.section__paragraph {
  font-family: var(--font-serif);
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0 0 0.9rem;
}

.section--level-0 .section__paragraph {
  font-size: 1.0625rem;
}

.section--level-1 .section__paragraph {
  font-size: 0.95rem;
}
</style>
