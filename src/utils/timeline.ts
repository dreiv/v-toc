/**
 * The CSS `view-timeline-name` for a section, e.g. `--section-4`.
 *
 * Single source of truth: the section that *declares* the timeline and every
 * consumer that *subscribes* to it (the CSS-only rail's bars/links, and the
 * app root's `timeline-scope`) must agree on the exact string, so they all
 * derive it from here.
 */
export function sectionTimelineName(index: number): string {
  return `--section-${index}`
}
