import { onMounted, reactive, shallowRef, type ComponentPublicInstance } from 'vue'
import { useEventListener } from '@vueuse/core'
import type { Section } from '@/types/section'

// A section counts as "on screen" if any part falls between 10% and 80% down
// the viewport. The band is deliberately loose so two short, adjacent
// sections can both qualify.
const TOP_MARGIN = 0.1
const BOTTOM_MARGIN = 0.2

interface ItemMeta {
  id: string
  target: HTMLElement
  pathStart: number
  pathEnd: number
}

/**
 * Drives the JS rail: builds one SVG path through every nav link's real
 * on-screen position (jogging sideways wherever indentation changes), then
 * on scroll highlights the stretch spanning every currently-visible section.
 */
export function useProgressPath(items: Section[]) {
  const pathEl = shallowRef<SVGPathElement>()
  const svgEl = shallowRef<SVGSVGElement>()
  const linkEls = new Map<string, HTMLElement>()
  const visibleIds = reactive(new Set<string>())

  let itemMeta: ItemMeta[] = []
  let pathLength = 0
  let lastStart = -1
  let lastEnd = -1

  // The template-ref callback hands back a broad union; only a real element
  // is useful.
  function setLinkEl(id: string, el: Element | ComponentPublicInstance | null) {
    if (el instanceof HTMLElement) linkEls.set(id, el)
    else linkEls.delete(id)
  }

  function measure() {
    const path = pathEl.value
    const svg = svgEl.value
    if (!path || !svg) return

    // Measured against the marker SVG's own box rather than via
    // offsetLeft/offsetTop: those are relative to the nearest *positioned*
    // ancestor, which can be an individual <li> rather than the nav as a
    // whole. getBoundingClientRect side-steps that.
    const svgRect = svg.getBoundingClientRect()

    const measured: ItemMeta[] = []
    const segments: Array<string | number> = []
    let pathIndent: number | undefined

    for (const item of items) {
      const anchor = linkEls.get(item.id)
      const target = document.getElementById(item.id)
      if (!anchor || !target) continue

      const anchorRect = anchor.getBoundingClientRect()
      const x = anchorRect.left - svgRect.left - 5
      const y = anchorRect.top - svgRect.top
      const height = anchorRect.height

      let pathStart: number
      if (measured.length === 0) {
        segments.push('M', x, y, 'L', x, y + height)
        pathStart = 0
      } else {
        if (pathIndent !== x) segments.push('L', pathIndent as number, y)
        segments.push('L', x, y)
        path.setAttribute('d', segments.join(' '))
        pathStart = path.getTotalLength()
        segments.push('L', x, y + height)
      }

      pathIndent = x
      path.setAttribute('d', segments.join(' '))
      measured.push({ id: item.id, target, pathStart, pathEnd: path.getTotalLength() })
    }

    itemMeta = measured
    pathLength = path.getTotalLength()
    sync()
  }

  function sync() {
    const path = pathEl.value
    if (!path) return

    const windowHeight = window.innerHeight
    let pathStart = pathLength
    let pathEnd = 0
    let visibleCount = 0

    visibleIds.clear()

    for (const item of itemMeta) {
      const bounds = item.target.getBoundingClientRect()
      const isVisible =
        bounds.bottom > windowHeight * TOP_MARGIN && bounds.top < windowHeight * (1 - BOTTOM_MARGIN)

      if (!isVisible) continue

      pathStart = Math.min(item.pathStart, pathStart)
      pathEnd = Math.max(item.pathEnd, pathEnd)
      visibleCount += 1
      visibleIds.add(item.id)
    }

    if (visibleCount > 0 && pathStart < pathEnd) {
      if (pathStart !== lastStart || pathEnd !== lastEnd) {
        path.setAttribute('stroke-dashoffset', '1')
        path.setAttribute(
          'stroke-dasharray',
          `1, ${pathStart}, ${pathEnd - pathStart}, ${pathLength}`,
        )
        path.setAttribute('opacity', '1')
      }
    } else {
      path.setAttribute('opacity', '0')
    }

    lastStart = pathStart
    lastEnd = pathEnd
  }

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  onMounted(() => {
    // Give the browser a frame (and web fonts a chance) to settle layout
    // before the first measurement, so the path lines up with real text.
    requestAnimationFrame(measure)
    document.fonts?.ready?.then(measure).catch(() => {})
  })

  useEventListener('resize', measure)
  useEventListener('scroll', sync, { passive: true })

  return { pathEl, svgEl, setLinkEl, visibleIds, goTo }
}
