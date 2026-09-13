import { onMounted, reactive, shallowRef, type ComponentPublicInstance } from 'vue'
import { useEventListener } from '@vueuse/core'
import type { Section } from '@/types/section'

const TOP_MARGIN = 0.1
const BOTTOM_MARGIN = 0.2
const ANCHOR_X_OFFSET = 5

interface ItemMeta {
  id: string
  target: HTMLElement
  pathStart: number
  pathEnd: number
}

export function useProgressPath(items: Section[]) {
  const pathEl = shallowRef<SVGPathElement>()
  const svgEl = shallowRef<SVGSVGElement>()
  const linkEls = new Map<string, HTMLElement>()
  const visibleIds = reactive(new Set<string>())

  let itemMeta: ItemMeta[] = []
  let pathLength = 0
  let lastStart = -1
  let lastEnd = -1

  function setLinkEl(id: string, el: Element | ComponentPublicInstance | null) {
    if (el instanceof HTMLElement) linkEls.set(id, el)
    else linkEls.delete(id)
  }

  function measure() {
    const path = pathEl.value
    const svg = svgEl.value
    if (!path || !svg) return

    const svgRect = svg.getBoundingClientRect()

    const measured: ItemMeta[] = []
    const segments: Array<string | number> = []
    let pathIndent: number | undefined

    for (const item of items) {
      const anchor = linkEls.get(item.id)
      const target = document.getElementById(item.id)
      if (!anchor || !target) continue

      const anchorRect = anchor.getBoundingClientRect()
      const x = anchorRect.left - svgRect.left - ANCHOR_X_OFFSET
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
    requestAnimationFrame(measure)
    document.fonts?.ready?.then(measure).catch(() => {})
  })

  useEventListener('resize', measure)
  useEventListener('scroll', sync, { passive: true })

  return { pathEl, svgEl, setLinkEl, visibleIds, goTo }
}
