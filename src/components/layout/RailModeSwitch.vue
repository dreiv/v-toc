<script setup lang="ts">
import { Binary, Cpu } from '@lucide/vue'

export type RailMode = 'js' | 'css'

defineProps<{ modelValue: RailMode }>()
defineEmits<{ 'update:modelValue': [value: RailMode] }>()
</script>

<template>
  <div class="switch" role="radiogroup" aria-label="Progress rail implementation">
    <button
      type="button"
      role="radio"
      :aria-checked="modelValue === 'js'"
      class="switch__option"
      :class="{ 'switch__option--active': modelValue === 'js' }"
      @click="$emit('update:modelValue', 'js')"
    >
      <Cpu :size="14" aria-hidden="true" />
      Vue + observer
    </button>
    <button
      type="button"
      role="radio"
      :aria-checked="modelValue === 'css'"
      class="switch__option"
      :class="{ 'switch__option--active': modelValue === 'css' }"
      @click="$emit('update:modelValue', 'css')"
    >
      <Binary :size="14" aria-hidden="true" />
      CSS only
    </button>
  </div>
</template>

<style scoped>
.switch {
  position: fixed;
  bottom: clamp(1rem, 3vw, 2rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 999px;
  box-shadow: 0 6px 20px -8px rgb(36 38 31 / 0.25);
  z-index: 30;
}

.switch__option {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--ink-faint);
  background: none;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.switch__option--active {
  background: var(--ink);
  color: var(--paper);
}

.switch__option:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}
</style>
