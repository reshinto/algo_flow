import type { EducationalContent } from "@/types";

export const rotateArrayEducational: EducationalContent = {
  overview:
    "**Rotate Array (Reversal Method)** rotates an array of `n` elements to the right by `k` positions " +
    "using three in-place reversals. It achieves `O(n)` time and `O(1)` space, making it optimal compared to " +
    "extra-array approaches. The key insight is that rotating by `k` positions is equivalent to reversing " +
    "three carefully chosen segments of the array.",

  howItWorks:
    "Given an array and rotation count `k`, the algorithm proceeds in three phases:\n\n" +
    "1. **Normalize**: Compute `effectiveRotation = k % n` to handle cases where `k >= n`.\n" +
    "2. **Phase 1 — Reverse entire array**: Reverse `array[0..n-1]`.\n" +
    "3. **Phase 2 — Reverse left segment**: Reverse `array[0..effectiveRotation-1]`.\n" +
    "4. **Phase 3 — Reverse right segment**: Reverse `array[effectiveRotation..n-1]`.\n\n" +
    "Each reversal uses two pointers (left and right) that swap elements while converging inward.\n\n" +
    "### The Key Insight\n\n" +
    "Rotating right by `k` moves the last `k` elements to the front. Reversing the whole array " +
    "places those elements at the front but in reverse order. Reversing the first `k` and the remaining " +
    "`n-k` elements independently restores their correct order.\n\n" +
    "### Walkthrough with `[1, 2, 3, 4, 5, 6, 7]`, `k=3`\n\n" +
    "| Phase        | Array               | Description                        |\n" +
    "|--------------|---------------------|------------------------------------|\n" +
    "| Initial      | [1, 2, 3, 4, 5, 6, 7] | k=3, effectiveRotation=3         |\n" +
    "| Full reverse | [7, 6, 5, 4, 3, 2, 1] | reverse entire array              |\n" +
    "| Left reverse | [5, 6, 7, 4, 3, 2, 1] | reverse [0..2] = [7,6,5] → [5,6,7] |\n" +
    "| Right reverse| [5, 6, 7, 1, 2, 3, 4] | reverse [3..6] = [4,3,2,1] → [1,2,3,4] |\n\n" +
    "**Result**: `[5, 6, 7, 1, 2, 3, 4]`\n\n" +
    "### Three-Reversal Diagram (`[1,2,3,4,5,6,7]`, k=3)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["[1, 2, 3, 4, 5, 6, 7]"] -->|"reverse all"| B["[7, 6, 5, 4, 3, 2, 1]"]\n' +
    '  B -->|"reverse [0..2]"| C["[5, 6, 7, 4, 3, 2, 1]"]\n' +
    '  C -->|"reverse [3..6]"| D["[5, 6, 7, 1, 2, 3, 4]"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Reversing the full array brings the last `k` elements to the front but in reverse order. Two targeted reversals restore both segments to their correct forward order.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each of the three reversal phases processes at most `n/2` swaps. Combined, the total number of " +
    "element swaps is at most `n` (each element is swapped at most once across all three phases). " +
    "This is optimal — any in-place rotation must touch every element at least once.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of pointer and temporary variables are used. No auxiliary arrays are allocated, " +
    "making this approach memory-optimal regardless of input size.",

  bestAndWorstCase:
    "**All cases are `O(n)`** — the three reversals always perform work proportional to `n`.\n\n" +
    "- **`k = 0` or `k = n`**: Detected early via `effectiveRotation = 0` — returns immediately in `O(1)`.\n" +
    "- **`k = n/2`**: The most balanced case; each of the three reversals handles `n/2` elements.\n" +
    "- **`k = 1`**: Phase 2 reverses a single element (no-op), Phase 1 and 3 do most of the work.\n\n" +
    "### Compared to Other Rotation Methods\n\n" +
    "| Method             | Time   | Space  | In-place |\n" +
    "|--------------------|--------|--------|----------|\n" +
    "| Extra array copy   | O(n)   | O(n)   | No       |\n" +
    "| One-by-one shift   | O(n×k) | O(1)   | Yes      |\n" +
    "| Reversal method    | O(n)   | O(1)   | Yes      |\n" +
    "| Juggling algorithm | O(n)   | O(1)   | Yes      |",

  realWorldUses: [
    "**Circular Buffer Management:** Rotating the read/write head in ring buffer implementations for streaming data.",
    "**Image Processing:** Rotating pixel rows in bitmap transformations without allocating a second buffer.",
    "**Scheduling Systems:** Rotating process or task queues so that the next `k` tasks become the top-priority group.",
    "**Game Development:** Rotating a deck of cards or a tile map cyclically during gameplay.",
    "**String Manipulation:** Checking whether one string is a rotation of another by applying rotation and comparing.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time and `O(1)` space — matches the theoretical lower bounds for in-place rotation.",
      "Simple to implement with just three reversal passes using the same subroutine.",
      "Handles `k >= n` gracefully via the modulo normalization step.",
      "No recursion — safe for large arrays without stack overflow risk.",
      "Works on any data type since it only uses swaps, not arithmetic.",
    ],
    limitations: [
      "Not stable for non-primitive types — relative ordering within the rotated segment may not be preserved if elements compare equal.",
      "Three separate passes may have worse cache locality than a single-pass copy-based approach on small arrays.",
      "Slightly harder to reason about correctness compared to the straightforward extra-array method.",
      "Cannot efficiently answer multiple rotation queries — each query costs `O(n)`; a deque or offset pointer is better for that.",
    ],
  },

  whenToUseIt:
    "Use the **Reversal Method** when you need to rotate an array in-place with `O(1)` extra space. " +
    "It is the standard interview solution for *rotate array* problems.\n\n" +
    "Look for constraints that prohibit extra memory allocation or require an in-place operation.\n\n" +
    "**Do not use** when you need to support fast random-access into multiple rotated views — " +
    "use an offset/index trick instead. Also avoid when you need to rotate a linked list — " +
    "pointer re-linking is more efficient there.",
};
