<script setup lang="ts">
import { sections } from '@/data/sections'
import FillerSectionTop from './FillerSectionTop.vue'
import FillerSectionSub from './FillerSectionSub.vue'
</script>

<template>
  <main class="pb-24">
    <component :is="section.level === 0 ? FillerSectionTop : FillerSectionSub" v-for="section in sections"
      :key="section.id" :section="section" />
  </main>
</template>
