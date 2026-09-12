<script setup lang="ts">
// No script needed: the fill is driven entirely by animation-timeline: scroll().
</script>

<template>
  <div class="top-bar" role="presentation">
    <div class="top-bar__fill" />
  </div>
</template>

<style scoped>
.top-bar {
  position: fixed;
  inset-inline: 0;
  top: 0;
  height: 3px;
  background: var(--rule);
  z-index: 40;
}

.top-bar__fill {
  height: 100%;
  width: 100%;
  background: var(--accent-teal);
  transform-origin: left;
  transform: scaleX(0);
}

/* Progressive enhancement: only animate where the browser understands it. */
@supports (animation-timeline: scroll()) {
  .top-bar__fill {
    animation: grow-fill linear forwards;
    animation-timeline: scroll(root);
  }
}

@keyframes grow-fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .top-bar__fill {
    animation: none;
    transform: scaleX(0);
  }
}
</style>
