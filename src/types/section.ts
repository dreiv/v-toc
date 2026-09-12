/**
 * A single reading section of the field-notes essay.
 *
 * `index` is the section's zero-based position and doubles as the suffix
 * used to name its CSS view-timeline (`--section-${index}`), so the CSS-only
 * nav and the JS-driven nav stay in sync with the same source of truth.
 *
 * `level` mirrors the indent level of the matching nav entry — 0 for a
 * top-level heading, 1 for a subsection nested under the previous one. It's
 * what gives the rail its zigzag ("snake") shape: the connecting line jogs
 * sideways wherever level changes between two consecutive items.
 */
export interface Section {
  id: string
  index: number
  level: 0 | 1
  title: string
  paragraphs: string[]
}
