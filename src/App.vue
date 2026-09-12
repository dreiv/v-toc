<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { sections } from '@/data/sections'
import { sectionTimelineName } from '@/utils/timeline'
import PageHero from '@/components/layout/PageHero.vue'
import RailModeSwitch, { type RailMode } from '@/components/layout/RailModeSwitch.vue'
import FillerContent from '@/components/filler/FillerContent.vue'
import ProgressNavJs from '@/components/progress-nav/ProgressNavJs.vue'
import ProgressNavCss from '@/components/progress-nav/ProgressNavCss.vue'
import TopProgressBar from '@/components/progress-nav/TopProgressBar.vue'

const mode = ref<RailMode>('js')

// The CSS-only rail references each section's view-timeline by name from a
// sibling subtree (the <nav>, not a descendant of the <section>s). Named
// timelines only cross into sibling subtrees when an ancestor declares them
// with `timeline-scope`, so this app root lists every name once.
//
// Set via setProperty rather than a Vue :style binding: timeline-scope is
// new enough that relying on a camelCase `style.timelineScope` IDL accessor
// is riskier than calling setProperty directly.
const rootEl = useTemplateRef<HTMLDivElement>('root')
const timelineScopeValue = sections.map((section) => sectionTimelineName(section.index)).join(', ')

onMounted(() => {
  rootEl.value?.style.setProperty('timeline-scope', timelineScopeValue)
})
</script>

<template>
  <div ref="root" class="app-root">
    <TopProgressBar />

    <div class="page">
      <PageHero />
      <FillerContent />
    </div>

    <ProgressNavJs v-if="mode === 'js'" />
    <ProgressNavCss v-else />

    <RailModeSwitch v-model="mode" />
  </div>
</template>

<style scoped>
.page {
  padding-inline: 1.5rem;
}

@media (min-width: 55rem) {
  .page {
    margin-left: 15rem;
  }
}
</style>
