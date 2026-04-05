import type { EducationalContent } from "@/types";

export const minStackEducational: EducationalContent = {
  overview:
    "**Min Stack** (LeetCode 155) is a stack data structure that supports standard push, pop, and top operations alongside `getMin()` — all in **O(1)** time.\n\nThe trick is maintaining a second auxiliary stack in parallel with the main stack. Each position on the auxiliary stack records the minimum value *at that point in history*, so peeking its top always reveals the current minimum without scanning the entire main stack.",

  howItWorks:
    "The algorithm pairs every element in the main stack with a corresponding entry in a min-tracking stack:\n\n" +
    "1. **Push:** Add the new value to the main stack. Compare it with the auxiliary stack's top:\n" +
    "   - If the auxiliary stack is empty or `value ≤ top`, push `value` as the new minimum.\n" +
    "   - Otherwise duplicate the current top — the minimum has not changed.\n" +
    "2. **Pop:** Remove the top element from both stacks simultaneously.\n" +
    "3. **Top:** Return the top of the main stack.\n" +
    "4. **GetMin:** Return the top of the auxiliary min stack — always O(1).\n\n" +
    "### Example trace on `[5, 3, 7, 1, 8]`\n\n" +
    "```\n" +
    "push  mainStack       minTracker   getMin\n" +
    "5     [5]             [5]          5\n" +
    "3     [5, 3]          [5, 3]       3\n" +
    "7     [5, 3, 7]       [5, 3, 3]   3\n" +
    "1     [5, 3, 7, 1]    [5, 3, 3, 1] 1\n" +
    "8     [5, 3, 7, 1, 8] [5,3,3,1,1] 1\n" +
    "```\n\n" +
    "Popping 8: main → `[5,3,7,1]`, min → `[5,3,3,1]`, getMin still = 1.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)` per operation**\n\n" +
    "Push, pop, top, and getMin all operate directly on the stack top — constant time regardless of stack size. There is no search, scan, or rebalancing.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The auxiliary min stack stores exactly one entry per pushed element, doubling the space used relative to a plain stack. In the absolute worst case (e.g. `[5, 4, 3, 2, 1]` — a strictly decreasing sequence) every entry in the min stack holds a unique minimum.",

  bestAndWorstCase:
    "**Best case** — `O(1)` per operation, always. The auxiliary stack guarantees constant-time `getMin` regardless of input order, stack depth, or value distribution.\n\n" +
    "**Worst case (space)** — `O(n)` auxiliary space. A strictly decreasing input causes every auxiliary stack entry to hold a distinct minimum, maximising storage use.\n\n" +
    "Contrast with a naïve `getMin` that scans the main stack each call: `O(n)` time per query for a stack of size `n`.",

  realWorldUses: [
    "**Undo/redo systems:** Many editors track a secondary stack of 'minimum cost to undo' alongside the action history.",
    "**Expression evaluators:** Parsers that need O(1) access to the smallest pending operand or precedence level.",
    "**Streaming analytics:** Real-time dashboards that must report the running minimum of a sliding window without rescanning.",
    "**Interview preparation:** LeetCode 155 is a canonical stack-design problem asked at top-tier software companies.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "All four operations (push, pop, top, getMin) are strictly O(1) — no amortised overhead.",
      "Straightforward to implement and reason about — no complex data structure internals.",
      "The auxiliary-stack pattern generalises easily to O(1) getMax, getMedian (with two stacks), or getSecondMin.",
    ],
    limitations: [
      "Uses 2× the memory of a plain stack due to the parallel auxiliary stack.",
      "Only tracks the minimum for the current stack state — historical minimums after pops are lost once the entry is removed.",
      "Not thread-safe without additional synchronisation.",
    ],
  },

  whenToUseIt:
    "Use the min-stack pattern whenever you need O(1) minimum (or maximum) access on a stack-shaped data structure. If you only ever need the global minimum over a static array, a single linear scan suffices. For sliding-window minimums over a sequence (not a stack), prefer a monotonic deque instead.",
};
