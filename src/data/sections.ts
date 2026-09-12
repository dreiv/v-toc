import type { Section } from '@/types/section'

/**
 * Filler copy for the demo. Written specifically for this page rather than
 * lorem ipsum, so the scroll feels like reading something instead of
 * padding. Each entry becomes one full-height section of the essay.
 */
const content: Array<Pick<Section, 'id' | 'title' | 'paragraphs'>> = [
  {
    id: 'origins',
    title: 'A memory from the margins',
    paragraphs: [
      'Years ago a small demo made the rounds: a slim vertical rail sitting quietly in the corner of the screen, a line of dots standing in for the sections of a page. As you scrolled, a thread climbed the rail behind them, and whichever dot the thread had just passed lit up. Nothing about it announced itself. It just sat there, correct, the whole time.',
      'What stayed with me was not the visual trick but the honesty of it. The rail never lied about where you were. It did not need a moment to catch up, and it did not need you to click anything to know your place. It was a small, patient instrument, built for a single job.',
      'This page is an attempt to sit with that memory long enough to rebuild it twice: once the way it was likely made at the time, driven by scroll math and a bit of Vue, and once the way the browser can now do it almost entirely on its own.',
    ],
  },
  {
    id: 'scrollspy',
    title: 'The trouble with watching scroll',
    paragraphs: [
      'The obvious way to know where a reader is on a long page is to ask, constantly. Attach a handler to the scroll event, read the position, compare it against the top of every section, and decide who wins. It works, in the sense that it produces an answer.',
      'The trouble is the asking itself. A scroll handler fires far more often than any human needs a decision made, and if that handler does anything more than trivial arithmetic, the page starts to stutter under its own bookkeeping. Developers spent a long time throttling, debouncing, and reading layout in careful batches just to keep this one small feature from costing more than it earned.',
      'None of that effort was wasted, exactly, but it was effort spent compensating for asking the wrong question. The right question was never "where is the reader right now, this millisecond" — it was "which section are they currently inside of," and that is a question about state, not about motion.',
    ],
  },
  {
    id: 'circles',
    title: 'Circles, lines, thresholds',
    paragraphs: [
      'A progress rail is a small piece of information design before it is a piece of code. The dots stand for sections, evenly spaced regardless of how long each section actually runs, because the reader does not care how many words a section took — they care how many are left.',
      'The connecting line matters as much as the dots. Without it, the rail is a list. With it, the rail becomes a single continuous object that happens to have some named stops along the way, which is a much better model of what reading actually feels like: one motion, occasionally passing a landmark.',
      'The active dot needs to be legible from across the room — larger, brighter, or both — because it answers the one question the whole component exists to answer. Everything else on the rail is supporting cast.',
    ],
  },
  {
    id: 'intersection',
    title: 'What the browser already knows',
    paragraphs: [
      "IntersectionObserver was built to answer a version of the same question the old scroll handlers were struggling with: is this element visible, and how visible. Instead of polling on every frame, you describe the visibility condition you care about once, and the browser tells you when it changes.",
      'A common trick for "which section is the reader in" is to shrink the observed area to a thin band near the vertical center of the viewport, so a section only counts as current once it has actually reached the middle of the screen, not the moment its top edge peeks into view. It turns a naive first-to-appear race into something closer to the reader\'s actual attention.',
      'It is still JavaScript, and it still runs on the main thread, but it runs on the browser\'s terms rather than on a timer of your own invention. That distinction is most of what separates a scrollspy that feels expensive from one you forget is running at all.',
    ],
  },
  {
    id: 'timelines',
    title: 'A timeline instead of a listener',
    paragraphs: [
      'Scroll-driven animation asks a different question again: what if scroll position were not an event to react to, but a clock to animate against? A normal CSS animation runs against wall-clock time. `animation-timeline: scroll()` swaps that clock for the scroll offset of a container, so the animation simply is a function of where you are on the page.',
      'There is no handler, no per-frame callback, and no JavaScript keeping the two in sync, because there was never anything to keep in sync — the browser\'s own compositor reads scroll position and paints the corresponding animation frame directly. The progress bar at the very top of this page is one keyframe, a scaleX from zero to one, told to use the document as its timeline instead of a stopwatch.',
      'It is a small change of vocabulary with a large effect on where the work happens. The result is a bar that has never once caused a layout recalculation on your behalf.',
    ],
  },
  {
    id: 'viewtimeline',
    title: 'Naming a piece of the page',
    paragraphs: [
      'A document-wide scroll timeline gets you a single dial. To get a rail with nine independent dots, each aware of its own section, each section can be given a `view-timeline-name` — a small label like `--section-4` — that turns the moment that element travels through the viewport into its own private timeline.',
      'Any element elsewhere on the page can then animate against that name using `animation-timeline: --section-4`, regardless of where it sits in the document. The dot in the rail and the paragraph it represents do not need to know about each other beyond sharing that one string.',
      'It is a quietly elegant piece of indirection: the content declares where it is willing to be watched from, and the decoration elsewhere subscribes to that declaration, with the browser doing the introduction.',
    ],
  },
  {
    id: 'twodials',
    title: 'Two dials on one page',
    paragraphs: [
      'The two techniques compose rather than compete. A single `scroll(root)` timeline is the right tool for anything that should track the whole document at once — a top bar, a percentage counter, a background that slowly shifts hue from first paragraph to last.',
      'A `view-timeline` per section is the right tool for anything that should care about one particular passage of the page — a dot that glows while its section is on screen, a heading that settles into place as it arrives, a pull quote that fades before it leaves.',
      'The rail on this page, in its CSS-only mode, uses both at once: the thread behind the dots is one global dial, and each dot\'s own highlight is nine small private ones, all running without a single scroll listener between them.',
    ],
  },
  {
    id: 'degrade',
    title: 'Degrading without breaking',
    paragraphs: [
      'Not every browser understands `animation-timeline` yet, so anything built on it needs a plan for what happens in its absence — not a broken bar, just a bar that quietly stops moving and stays out of the way. Wrapping the enhancement in an `@supports (animation-timeline: scroll())` block keeps the fallback from ever looking like a mistake.',
      'The same courtesy is owed to readers who have asked their operating system for less motion. A `prefers-reduced-motion` query turns the pulsing dot into a plain, static one — the information the rail carries survives even when the animation that usually delivers it does not.',
      'Progressive enhancement has always meant this: build the version that works everywhere first, then let capable browsers do a little more, without ever making the extra part load-bearing.',
    ],
  },
  {
    id: 'revisited',
    title: 'The rail, revisited',
    paragraphs: [
      'Both rails on this page answer the same question the original demo answered: where am I, and how far is there left to go. One answers it with a composable, an IntersectionObserver, and a scroll listener from VueUse. The other answers it with nine named timelines and no JavaScript at all once the page has loaded.',
      'Neither is more correct than the other. The JavaScript version can make judgment calls a stylesheet cannot — deciding which of several overlapping sections is the "real" current one, for instance — while the CSS version costs nothing once painted and never drifts out of sync with the compositor.',
      'Use the switch in the corner to feel the difference for yourself. Then scroll back up, slowly, and watch the thread climb the rail either way.',
    ],
  },
]

export const sections: Section[] = content.map((entry, index) => ({
  ...entry,
  index,
}))
