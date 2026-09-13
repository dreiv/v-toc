<script setup lang="ts">
import type { Section } from '@/types/section'
import { sectionTimelineName } from '@/utils/timeline'

defineProps<{ section: Section }>()
</script>

<template>
  <section :id="section.id" class="section section--top" :style="{
    viewTimelineName: sectionTimelineName(section.index),
    viewTimelineInset: '10% 20%',
  }">
    <h2 class="section__title">{{ section.title }}</h2>
    <p v-for="(paragraph, i) in section.paragraphs" :key="i" class="section__paragraph">
      {{ paragraph }}
    </p>
  </section>
</template>

<style scoped src="./filler-section-shared.css"></style>
<style scoped>
.section--top {
  padding-block: 2.75rem 0.25rem;
  border-top: 1px solid var(--rule);
}

.section--top:first-of-type {
  border-top: none;
}

.section--top .section__title {
  font-size: clamp(1.35rem, 1.1rem + 0.9vw, 1.75rem);
}

.section--top .section__paragraph {
  font-size: 1.0625rem;
}
</style>
