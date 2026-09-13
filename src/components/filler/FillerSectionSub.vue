<script setup lang="ts">
import type { Section } from '@/types/section'
import { sectionTimelineName } from '@/utils/timeline'

defineProps<{ section: Section }>()
</script>

<template>
  <aside :id="section.id" class="section section--sub" :style="{
    viewTimelineName: sectionTimelineName(section.index),
    viewTimelineInset: '10% 20%',
  }">
    <h3 class="section__title">{{ section.title }}</h3>
    <p v-for="(paragraph, i) in section.paragraphs" :key="i" class="section__paragraph">
      {{ paragraph }}
    </p>
  </aside>
</template>

<style scoped src="./filler-section-shared.css"></style>
<style scoped>
.section--sub {
  padding: 1rem 0 1rem 1.25rem;
  margin-block: 0.5rem;
  border-left: 2px solid var(--rule);
}

.section--sub .section__title {
  font-size: 1.05rem;
  color: var(--ink-soft);
}

.section--sub .section__paragraph {
  font-size: 0.95rem;
}
</style>
