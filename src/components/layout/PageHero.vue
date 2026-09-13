<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
</script>

<template>
  <header class="mx-auto flex min-h-screen max-w-152 flex-col justify-center gap-5 px-6 py-16">
    <p class="font-mono text-xs text-accent-teal">field notes · progress navigation</p>
    <h1 class="text-[clamp(2.5rem,1.9rem+3vw,4rem)] font-serif font-semibold leading-[1.05] text-ink">
      A rail in the margin
    </h1>
    <p class="max-w-lg font-serif text-[1.15rem] leading-[1.65] text-ink-soft">
      A short essay about the table-of-contents nav that also tracks your place in a long page —
      the list of links doubles as the marker, and the line connecting them snakes sideways at
      every subsection. Rebuilt two ways below: once with Vue measuring real DOM positions, once
      with nothing but CSS scroll-driven animations.
    </p>
    <p class="mt-6 flex items-center gap-[0.4rem] font-mono text-[0.8rem] text-ink-faint">
      <ChevronDown :size="16" aria-hidden="true" />
      keep scrolling
    </p>
  </header>
</template>
