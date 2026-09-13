<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { sections } from '@/data/sections'
import { sectionTimelineName } from '@/utils/timeline'
import type { RailMode } from '@/types/rail-mode'
import PageHero from '@/components/layout/PageHero.vue'
import RailModeSwitch from '@/components/layout/RailModeSwitch.vue'
import FillerContent from '@/components/filler/FillerContent.vue'
import ProgressNavJs from '@/components/progress-nav/ProgressNavJs.vue'
import ProgressNavCss from '@/components/progress-nav/ProgressNavCss.vue'
import TopProgressBar from '@/components/progress-nav/TopProgressBar.vue'

const mode = ref<RailMode>('js')

const rootEl = useTemplateRef<HTMLDivElement>('root')
const timelineScopeValue = sections.map((section) => sectionTimelineName(section.index)).join(', ')

onMounted(() => { rootEl.value?.style.setProperty('timeline-scope', timelineScopeValue) })
</script>

<template>
  <div ref="root" class="app-root">
    <TopProgressBar />

    <div class="ps-6 pe-6 min-[55rem]:ml-60">
      <PageHero />
      <FillerContent />
    </div>

    <ProgressNavJs v-if="mode === 'js'" />
    <ProgressNavCss v-else />

    <RailModeSwitch v-model="mode" />
  </div>
</template>
