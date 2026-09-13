<template>
  <div class="fixed inset-s-0 inset-e-0 top-0 z-40 h-0.75 bg-rule" role="presentation">
    <div class="top-bar__fill h-full w-full origin-left scale-x-0 bg-accent-teal" />
  </div>
</template>

<style scoped>
@supports (animation-timeline: scroll()) {
  .top-bar__fill {
    animation: grow-fill linear forwards scroll(root);
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
  }
}
</style>
