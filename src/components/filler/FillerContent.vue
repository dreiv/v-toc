<script setup lang="ts">
import { sections } from '@/data/sections'
import FillerSection from './FillerSection.vue'
</script>

<template>
  <main class="content">
    <FillerSection v-for="section in sections" :key="section.id" :section="section" />
  </main>
</template>

<style scoped>
.content {
  padding-bottom: 6rem;
}
</style>
