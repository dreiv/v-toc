import { computed, onMounted, onScopeDispose, ref, watchEffect } from 'vue'
import { useEventListener, useWindowScroll } from '@vueuse/core'
import type { Section } from '@/types/section'
import type { SectionRegistry } from './sectionRegistry'

/**
 * Drives the JavaScript version of the progress rail.
 *
 * - `progress` is how far through the whole document the reader has
 *   scrolled, 0 to 1 — used to grow the fill line behind the dots.
 * - `activeId` is the section currently occupying the centre band of the
 *   viewport — used to highlight the matching dot.
 */
export function useScrollProgress(sections: Section[], registry: SectionRegistry) {
  const { y } = useWindowScroll()
  const maxScroll = ref(1)

  const measure = () => {
    maxScroll.value = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  }

  const progress = computed(() => {
    const fraction = y.value / maxScroll.value
    return Math.min(Math.max(fraction, 0), 1)
  })

  const activeId = ref<string | null>(sections[0]?.id ?? null)
  let observer: IntersectionObserver | undefined

  const observeAll = () => {
    observer?.disconnect()
    observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        const id = mostVisible ? (mostVisible.target as HTMLElement).dataset.sectionId : undefined
        if (id) activeId.value = id
      },
      // A thin band around the vertical centre: a section only becomes
      // "active" once it has reached the middle of the screen.
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 1] },
    )

    registry.elements.forEach((el) => observer?.observe(el))
  }

  onMounted(() => {
    measure()
    observeAll()
  })

  useEventListener('resize', measure)

  // Re-observe whenever sections mount/unmount (e.g. hot reload, dynamic content).
  const stopWatch = watchEffect(() => {
    // Touch .size so this re-runs when the registry's contents change.
    void registry.elements.size
    observeAll()
  })

  onScopeDispose(() => {
    observer?.disconnect()
    stopWatch()
  })

  return { progress, activeId }
}
