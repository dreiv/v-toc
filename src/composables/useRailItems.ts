import { computed, type ComputedRef } from 'vue'
import type { Section } from '@/types/section'

export interface RailItem {
  section: Section
  /**
   * True when this item's indent level differs from the previous item's, i.e.
   * the connecting line needs a horizontal "indent" segment before it. This is
   * static geometry derived once from the section list — not a runtime
   * measurement — which is what lets the CSS-only rail stay listener-free.
   */
  indented: boolean
}

/**
 * Derives which items carry a horizontal indent. Mirrors `useProgressPath` (the
 * JS rail) so both variants share the same "when does the line indent" rule.
 */
export function useRailItems(sections: Section[]): { items: ComputedRef<RailItem[]> } {
  const items = computed<RailItem[]>(() =>
    sections.map((section, i) => ({
      section,
      indented: i > 0 && sections[i - 1]!.level !== section.level,
    })),
  )

  return { items }
}
