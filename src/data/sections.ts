import type { Section } from '@/types/section'

/**
 * Filler copy for the demo. Mixes top-level sections (`level: 0`) with short
 * nested subsections (`level: 1`): the indent change makes the nav line
 * zigzag, and the short subsections let two or three headings share the
 * viewport.
 */
const content: Array<Pick<Section, 'id' | 'level' | 'title' | 'paragraphs'>> = [
  {
    id: 'origins',
    level: 0,
    title: 'A memory from the margins',
    paragraphs: [
      'Years ago a small demo made the rounds: a plain list of section titles sitting quietly in the corner of the page, with a thin line running down beside it. Scroll, and the line grew to trace whichever titles were currently on screen, no dots or icons involved — just the table of contents, doing double duty as the progress indicator.',
      'What stayed with me was the restraint. It never needed a moment to catch up, never asked you to click anything to know where you were, and never dressed up as more than what it was: a list of headings that happened to know which of them you were reading.',
    ],
  },
  {
    id: 'scrollspy',
    level: 0,
    title: 'The trouble with watching scroll',
    paragraphs: [
      'The obvious way to know where a reader is on a long page is to ask, constantly: attach a handler to the scroll event, read the position, compare it against every section, and decide who wins. It works, in the sense that it produces an answer.',
    ],
  },
  {
    id: 'throttling',
    level: 1,
    title: 'Debounce, throttle, repeat',
    paragraphs: [
      'The trouble is the asking itself. A scroll handler fires far more often than any human needs a decision made, so a lot of early scrollspy code exists purely to slow itself down — throttling to once every few frames, debouncing until scrolling settles, all to avoid doing real work at an unreasonable rate.',
    ],
  },
  {
    id: 'batching',
    level: 1,
    title: 'Reading layout in batches',
    paragraphs: [
      'The other half of the effort went into reading `getBoundingClientRect` without triggering a layout thrash — batching every read before any write, because interleaving the two forces the browser to recalculate geometry it had only just finished calculating.',
    ],
  },
  {
    id: 'text-rail',
    level: 0,
    title: 'A rail made of the words themselves',
    paragraphs: [
      'None of that effort was wasted, but it was effort spent compensating for a design that never needed a separate visual marker at all. The original demo\'s nav is just an unordered list of real links, styled like any table of contents; the "progress" part is an SVG line drawn behind that same list, and the highlighted stretch of it lines up with whichever links are current.',
      "That's the detail this rebuild keeps: no circles standing in for content, no icon doing the section's job for it. The line follows the text, because the text is the nav.",
    ],
  },
  {
    id: 'intersection',
    level: 0,
    title: 'What the browser already knows',
    paragraphs: [
      'IntersectionObserver was built to answer a version of the same question scroll handlers were struggling with: is this element visible, and how visible. Describe the condition once, and the browser reports back only when it changes, on its own schedule rather than on a timer of your invention.',
    ],
  },
  {
    id: 'centre-band',
    level: 1,
    title: 'A band, not a point',
    paragraphs: [
      'The original demo does something slightly looser than an intersection threshold: a section counts as "on screen" if any part of it falls inside a band from 10% down to 80% of the viewport height. That band is generous on purpose — wide enough that two adjacent, shortish sections can both qualify at once.',
    ],
  },
  {
    id: 'drawing-the-path',
    level: 0,
    title: 'Drawing the path once',
    paragraphs: [
      'The rail itself is a single SVG `<path>`, built once on load and again on resize by walking every nav link in order and reading its actual on-screen position — no coordinates hand-authored anywhere.',
    ],
  },
  {
    id: 'vertical-strokes',
    level: 1,
    title: 'Vertical strokes per item',
    paragraphs: [
      "For each link, the path grows a short vertical stroke spanning that link's own height, at that link's own horizontal position. Stacked in document order, those strokes alone would already produce a plain vertical line for a flat list.",
    ],
  },
  {
    id: 'horizontal-jogs',
    level: 1,
    title: 'A jog at every indent change',
    paragraphs: [
      "The zigzag only appears where indentation changes between one item and the next: the path adds a short horizontal segment connecting the previous x position to the new one before continuing downward. It's this jog, repeated at every level change, that gives the line its snake-like shape.",
    ],
  },
  {
    id: 'highlighting-a-range',
    level: 0,
    title: 'Highlighting more than one item at a time',
    paragraphs: [
      'Once the full path length is known, showing progress is a `stroke-dasharray` trick: measure how far along the path the first currently-visible item starts and the last one ends, then draw a single visible dash spanning exactly that range and hide the rest.',
      'Because the highlighted span is a min-to-max across every visible item rather than a single nearest one, two or three sections on screen together light up as one continuous stretch of line — which is the whole reason this page keeps its paragraphs short enough for that to happen regularly.',
    ],
  },
  {
    id: 'timelines',
    level: 0,
    title: 'A timeline instead of a listener',
    paragraphs: [
      "Scroll-driven animation asks a different question again: what if scroll position were a clock to animate against, rather than an event to react to? `animation-timeline: scroll()` swaps an animation's usual wall-clock timer for the scroll offset of a container, so the animation simply is a function of where you are on the page — no handler keeping the two in sync, because there was never anything to keep in sync.",
    ],
  },
  {
    id: 'viewtimeline',
    level: 0,
    title: 'Naming a piece of the page',
    paragraphs: [
      'A document-wide scroll timeline gives a single dial. To let each nav item track its own section independently, that section can be given a `view-timeline-name` — a label like `--section-4` — turning the moment that element travels through the viewport into its own private timeline that anything else on the page can subscribe to by name.',
    ],
  },
  {
    id: 'twodials',
    level: 0,
    title: 'Two dials, one page',
    paragraphs: [
      'The two techniques compose rather than compete. A single `scroll(root)` timeline suits anything tracking the whole document at once — the bar at the very top of this page. A `view-timeline` per section suits anything that should care about one particular passage — the CSS-only rail below highlights each item independently this way, which is also why several of its segments can glow at once with no coordination between them.',
    ],
  },
  {
    id: 'degrade',
    level: 0,
    title: 'Degrading without breaking',
    paragraphs: [
      "Not every browser understands `animation-timeline` yet, so the CSS-only rail keeps its enhancement inside an `@supports (animation-timeline: view())` block — where it's missing, the list is still a perfectly ordinary set of anchor links. The same courtesy is owed to `prefers-reduced-motion`: the information the rail carries should survive even when the animation delivering it is turned off.",
    ],
  },
  {
    id: 'revisited',
    level: 0,
    title: 'The rail, revisited',
    paragraphs: [
      'Both rails on this page answer the same question the original demo answered: where am I, and what else is currently in view. One answers it with an SVG path measured in JavaScript on scroll and resize; the other answers it with fifteen independent view-timelines and no scroll listener at all.',
      'Use the switch below to feel the difference, then scroll slowly back up and watch how each one treats a moment when two headings share the screen.',
    ],
  },
]

export const sections: Section[] = content.map((entry, index) => ({
  ...entry,
  index,
}))
