<script setup lang="ts">
import { provide, ref } from 'vue'
import { createSectionRegistry, SectionRegistryKey } from '@/composables/sectionRegistry'
import PageHero from '@/components/layout/PageHero.vue'
import RailModeSwitch, { type RailMode } from '@/components/layout/RailModeSwitch.vue'
import FillerContent from '@/components/filler/FillerContent.vue'
import ProgressNavJs from '@/components/progress-nav/ProgressNavJs.vue'
import ProgressNavCss from '@/components/progress-nav/ProgressNavCss.vue'
import TopProgressBar from '@/components/progress-nav/TopProgressBar.vue'

provide(SectionRegistryKey, createSectionRegistry())

const mode = ref<RailMode>('js')
</script>

<template>
  <TopProgressBar />
  <PageHero />
  <FillerContent />

  <ProgressNavJs v-if="mode === 'js'" />
  <ProgressNavCss v-else />

  <RailModeSwitch v-model="mode" />
</template>
