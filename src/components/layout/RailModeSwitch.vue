<script setup lang="ts">
import { Binary, Cpu } from '@lucide/vue'
import type { RailMode } from '@/types/rail-mode'

defineProps<{ modelValue: RailMode }>()
defineEmits<{ 'update:modelValue': [value: RailMode] }>()

const options: Array<{ value: RailMode; label: string; icon: typeof Cpu }> = [
  { value: 'js', label: 'Vue + scroll', icon: Cpu },
  { value: 'css', label: 'CSS only', icon: Binary },
]
</script>

<template>
  <div
    class="fixed bottom-[clamp(1rem,3vw,2rem)] left-1/2 z-30 flex -translate-x-1/2 gap-1 rounded-full border border-rule bg-paper p-1 shadow-[0_6px_20px_-8px_rgb(36_38_31/0.25)]"
    role="radiogroup" aria-label="Progress rail implementation">
    <button v-for="option in options" :key="option.value" type="button" role="radio"
      :aria-checked="modelValue === option.value"
      class="flex cursor-pointer items-center gap-[0.4rem] rounded-full border-0 px-[0.9rem] py-2 font-mono text-[0.72rem] transition-colors duration-150 ease-[ease] focus-visible:outline focus-visible:outline-accent-teal focus-visible:outline-offset-2"
      :class="modelValue === option.value ? 'bg-ink text-paper' : 'bg-transparent text-ink-faint'"
      @click="$emit('update:modelValue', option.value)">
      <component :is="option.icon" :size="14" aria-hidden="true" />
      {{ option.label }}
    </button>
  </div>
</template>
