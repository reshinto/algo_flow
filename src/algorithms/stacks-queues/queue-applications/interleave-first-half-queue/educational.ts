import type { EducationalContent } from "@/types";

export const interleaveFirstHalfQueueEducational: EducationalContent = {
  overview:
    "**Interleave First Half Queue** reorders a queue by weaving the first half and second half together — element by element. Given `[1, 2, 3, 4, 5, 6]`, the result is `[1, 4, 2, 5, 3, 6]`: position 0 from the first half, position 0 from the second half, position 1 from the first half, position 1 from the second half, and so on.\n\nThe trick is that only a queue and a stack are available — no random access. The algorithm routes elements through the stack to preserve order while using the queue's FIFO structure to sequence the interleave.",

  howItWorks:
    "The algorithm runs in five phases, each using only queue and stack operations:\n\n" +
    "1. **Move first half to stack** — dequeue the first `n/2` elements and push them onto a stack. The stack reverses the order.\n" +
    "2. **Restore reversed first half to queue rear** — pop all stack elements and enqueue them at the rear. The queue now holds: `[second half | reversed first half]`.\n" +
    "3. **Rotate second half to rear** — dequeue and re-enqueue the first `n/2` elements (which are the original second half). The queue becomes: `[original first half (reversed) | original second half]`.\n" +
    "4. **Move first half (reversed) to stack again** — dequeue the first `n/2` elements (the reversed first half) and push them onto the stack. The stack now holds first-half elements in original order (top = first element).\n" +
    "5. **Interleave** — alternately pop from the stack (first-half elements in order) and dequeue from the queue (second-half elements in order) to produce the final interleaved sequence.\n\n" +
    "### Example trace on `[1, 2, 3, 4, 5, 6]`\n\n" +
    "```\n" +
    "After phase 1:  queue=[4,5,6]        stack=[1,2,3] (top=3)\n" +
    "After phase 2:  queue=[4,5,6,3,2,1]  stack=[]\n" +
    "After phase 3:  queue=[3,2,1,4,5,6]  stack=[]\n" +
    "After phase 4:  queue=[4,5,6]        stack=[3,2,1] (top=1)\n" +
    "After phase 5:  result=[1,4,2,5,3,6]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each element is touched a constant number of times across the five phases — each phase iterates over at most `n` elements. Total work is linear.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The auxiliary stack holds up to `n/2` elements at a time. Combined with the input queue, total extra space is `O(n)`.",

  bestAndWorstCase:
    "**Best case** — an empty input or a single element: no phases execute meaningful work and the result is returned immediately in `O(1)`.\n\n" +
    "**Worst case** — any non-empty input: all five phases execute, each touching every element once, yielding `O(n)` time. There is no early termination possible.\n\n" +
    "Both odd-length and even-length inputs are handled correctly — an odd-length queue leaves one element in the queue after the interleave loop, which is appended at the end.",

  realWorldUses: [
    "**Printer spoolers:** Interleaving jobs from two queues (e.g. color and black-and-white) for alternating output without random access.",
    "**Network packet scheduling:** Merging two ordered packet streams into a single alternating sequence for fair bandwidth sharing.",
    "**Shuffle algorithms:** Creating a riffle-shuffle effect on ordered sequences using only stack and queue primitives.",
    "**Embedded systems:** Situations where only LIFO and FIFO buffers are available in hardware and array indexing is not permitted.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Uses only O(n/2) extra space for the stack — no full copy of the array required.",
      "Works within strict data-structure constraints (no random access needed).",
      "Each phase has a clear, single responsibility that is easy to reason about and test.",
    ],
    limitations: [
      "Requires five distinct passes over the data — constant factor is higher than a direct index-based interleave.",
      "Only correct for even-length inputs when a strict interleave is expected; odd-length leaves one element appended at the end.",
      "The multi-phase approach makes it harder to parallelize compared to direct index manipulation.",
    ],
  },

  whenToUseIt:
    "Use this algorithm when you must interleave two halves of a sequence and are constrained to stack and queue operations — for example, when modelling restricted memory architectures or when teaching data-structure composition. If you have direct array access, a simple two-pointer in-place swap is simpler and faster in practice.",
};
