<script setup lang="ts">
import { sections } from '@/data/sections'
import FillerSectionTop from './FillerSectionTop.vue'
import FillerSectionSub from './FillerSectionSub.vue'
</script>

<template>
  <main class="content">
    <component :is="section.level === 0 ? FillerSectionTop : FillerSectionSub" v-for="section in sections"
      :key="section.id" :section="section" />
  </main>
</template>

<style scoped>
.content {
  padding-bottom: 6rem;
}
</style>
