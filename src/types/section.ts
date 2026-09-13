/**
 * A single reading section of the field-notes essay.
 *
 * `index` is the zero-based position; it also names the section's CSS
 * view-timeline (`--section-${index}`) so both nav variants share one source
 * of truth.
 *
 * `level` mirrors the nav entry's indent (0 = top-level, 1 = subsection).
 * It's what gives the rail its zigzag: the line indents sideways wherever
 * level changes between two consecutive items.
 */
export interface Section {
  id: string
  index: number
  level: 0 | 1
  title: string
  paragraphs: string[]
}
