import { computed, type ComputedRef } from 'vue'
import type { Section } from '@/types/section'

export interface RailItem {
  section: Section
  indented: boolean
}

export function useRailItems(sections: Section[]): { items: ComputedRef<RailItem[]> } {
  const items = computed<RailItem[]>(() =>
    sections.map((section, i) => ({
      section,
      indented: i > 0 && sections[i - 1]!.level !== section.level,
    })),
  )

  return { items }
}
