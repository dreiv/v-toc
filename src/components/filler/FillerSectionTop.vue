<script setup lang="ts">
import type { Section } from '@/types/section'
import { sectionTimelineName } from '@/utils/timeline'

defineProps<{ section: Section }>()
</script>

<template>
  <section :id="section.id" class="max-w-136 scroll-mt-8 border-t border-rule pt-11 pb-1 first-of-type:border-t-0"
    :style="{
      viewTimelineName: sectionTimelineName(section.index),
      viewTimelineInset: '10% 20%',
    }">
    <h2
      class="m-0 mb-[0.6rem] font-serif text-[clamp(1.35rem,1.1rem+0.9vw,1.75rem)] leading-tight font-semibold text-ink">
      {{ section.title }}
    </h2>
    <p v-for="(paragraph, i) in section.paragraphs" :key="i"
      class="m-0 mb-[0.9rem] font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
      {{ paragraph }}
    </p>
  </section>
</template>
