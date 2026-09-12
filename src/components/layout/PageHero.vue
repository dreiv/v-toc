<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
</script>

<template>
  <header class="hero">
    <p class="hero__eyebrow">field notes · progress navigation</p>
    <h1 class="hero__title">A rail in the margin</h1>
    <p class="hero__lede">
      A short, scrollable essay about the small vertical rail that tracks where you are in a long
      page — rebuilt two ways below: once with Vue and a scroll composable, once with nothing but
      CSS scroll-driven animations.
    </p>
    <p class="hero__cue">
      <ChevronDown :size="16" aria-hidden="true" />
      keep scrolling
    </p>
  </header>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
  max-width: 38rem;
  padding: 4rem 1.5rem;
  margin-inline: auto;
}

.hero__eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-teal);
}

.hero__title {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 1.9rem + 3vw, 4rem);
  font-weight: 600;
  line-height: 1.05;
  color: var(--ink);
}

.hero__lede {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 32rem;
}

.hero__cue {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--ink-faint);
  margin-top: 1.5rem;
}
</style>
