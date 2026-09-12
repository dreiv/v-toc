import { reactive, type InjectionKey } from 'vue'

/**
 * Tracks the live DOM element behind each section id.
 *
 * This is the single seam between "content" (FillerSection registers itself)
 * and "navigation" (ProgressNavJs reads the map to observe/scroll to
 * elements) — neither side needs to know how the other is implemented.
 */
export interface SectionRegistry {
  elements: Map<string, HTMLElement>
  register: (id: string, el: HTMLElement) => void
  unregister: (id: string) => void
}

export const SectionRegistryKey: InjectionKey<SectionRegistry> = Symbol('section-registry')

export function createSectionRegistry(): SectionRegistry {
  const elements = reactive(new Map<string, HTMLElement>())

  return {
    elements,
    register(id, el) {
      elements.set(id, el)
    },
    unregister(id) {
      elements.delete(id)
    },
  }
}
