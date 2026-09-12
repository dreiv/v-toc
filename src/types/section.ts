/**
 * A single reading section of the field-notes essay.
 *
 * `index` is the section's zero-based position and doubles as the suffix
 * used to name its CSS view-timeline (`--section-${index}`), so the CSS-only
 * nav and the JS-driven nav stay in sync with the same source of truth.
 */
export interface Section {
  id: string
  index: number
  title: string
  paragraphs: string[]
}
