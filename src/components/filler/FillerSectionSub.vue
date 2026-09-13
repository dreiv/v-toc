<script setup lang="ts">
import type { Section } from '@/types/section'
import { sectionTimelineName } from '@/utils/timeline'

defineProps<{ section: Section }>()
</script>

<template>
  <aside :id="section.id" class="my-2 max-w-136 scroll-mt-8 border-l-2 border-rule py-4 pl-5" :style="{
    viewTimelineName: sectionTimelineName(section.index),
    viewTimelineInset: '10% 20%',
  }">
    <h3 class="m-0 mb-[0.6rem] font-serif text-[1.05rem] leading-tight font-semibold text-ink-soft">
      {{ section.title }}
    </h3>
    <p v-for="(paragraph, i) in section.paragraphs" :key="i"
      class="m-0 mb-[0.9rem] font-serif text-[0.95rem] leading-[1.7] text-ink-soft">
      {{ paragraph }}
    </p>
  </aside>
</template>
