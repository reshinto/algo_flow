import type { EducationalContent } from "@/types";

export const rotateArrayCyclicEducational: EducationalContent = {
  overview:
    "**Rotate Array (Cyclic Replacement)** rotates an array of length `n` to the right by `k` positions in **O(n)** time and **O(1)** space by directly placing each element into its final destination and following the resulting displacement chain.\n\n" +
    "Each element moves exactly once — it is carried to its rotated position, displacing the element already there, which is then carried to its own rotated position, and so on. This displacement chain forms a **cycle** that eventually returns to the starting index.",

  howItWorks:
    "### Core Idea: Follow the Cycle\n\n" +
    "1. Start at index `s`. Save `carry = array[s]`.\n" +
    "2. Compute `destination = (currentIndex + k) % n`.\n" +
    "3. Save the element at `destination`, write `carry` there.\n" +
    "4. Set `carry` to the saved element, advance `currentIndex = destination`.\n" +
    "5. Repeat until `currentIndex` returns to `s` — one cycle is complete.\n" +
    "6. Advance `s` to the next start and repeat until all `n` elements have been placed.\n\n" +
    "### Cycle Structure\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Start at index 0, carry = arr[0]"]\n' +
    '    B["destination = (0 + k) % n"]\n' +
    '    C["Place carry → arr[destination]"]\n' +
    '    D["Carry displaced value, move to destination"]\n' +
    '    E{"Back to start?"}\n' +
    '    F["Cycle done → advance start"]\n' +
    '    G["All n elements placed?"]\n' +
    "    A --> B --> C --> D --> E\n" +
    "    E -- No --> B\n" +
    "    E -- Yes --> F --> G\n" +
    "    G -- No --> A\n" +
    '    G -- Yes --> H["Done"]\n' +
    "```\n\n" +
    "### Example\n\n" +
    "Array `[1, 2, 3, 4, 5, 6]`, `k = 2`:\n" +
    "- Cycle from index 0: 1→2, 3→4, 5→6, 1→0 (places indices 0,2,4)\n" +
    "- Cycle from index 1: 2→3, 4→5, 6→1, 2→1 (places indices 1,3,5)\n" +
    "- Result: `[5, 6, 1, 2, 3, 4]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every element is visited and placed exactly once, regardless of how many cycles exist. The total number of placement operations equals `n`.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single `carryValue` variable is used in addition to the output array. No auxiliary arrays are allocated — all placements happen in-place on the result.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — Even when `k = 1` (single cycle through all elements), each element is placed exactly once.\n\n" +
    "**Worst Case: `O(n)`** — There is no degenerate input. The algorithm always performs exactly `n` element placements, split across however many cycles GCD(n, k) dictates.\n\n" +
    "**Number of Cycles:** The array decomposes into exactly `GCD(n, k)` independent cycles, each of length `n / GCD(n, k)`. When `GCD(n, k) = 1` (e.g., `n=6, k=1`), there is one long cycle visiting all elements; when `GCD(n, k) = n` (i.e., `k = 0`), no rotation is needed.",

  realWorldUses: [
    "**Circular Buffer Rotation:** Efficiently reordering elements in a ring buffer, such as cycling log entries or sliding-window data streams.",
    "**In-Place Scheduling:** Rotating task queues or round-robin scheduling lists without extra allocation.",
    "**Signal Processing:** Circular shift of time-domain samples when working with fixed-size buffers in audio or sensor firmware.",
    "**Matrix Operations:** Row or column cyclic shifts in dense numerical computing (e.g., BLAS-like routines).",
    "**Competitive Programming:** A standard primitive for in-place rotation that avoids the O(n) extra space of a naive copy approach.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "True O(1) extra space — the only variable outside the array is a single carry value.",
      "Exactly n write operations regardless of k — optimal for write-expensive storage.",
      "Elegant mathematical structure: the cycle decomposition is determined by GCD(n, k).",
      "No reversal phases needed, making it conceptually direct once the cycle idea is understood.",
    ],
    limitations: [
      "Harder to reason about than the three-reversal method, especially regarding the number-of-cycles termination condition.",
      "Cache performance can be poor for large k, as elements jump by k positions rather than scanning sequentially.",
      "Requires tracking `cyclesCompleted` separately to know when all elements have been placed — a subtle off-by-one risk.",
    ],
  },

  whenToUseIt:
    "**Use Cyclic Replacement when** you need O(1) extra space and exactly n writes — ideal for memory-constrained systems or write-expensive storage media.\n\n" +
    "**Prefer the three-reversal method when** readability and cache locality matter more, as it accesses memory sequentially.\n\n" +
    "**Avoid it when** the array is effectively read-only and you can afford an O(n) copy — a simple slice with offset is clearest in that case.",
};
