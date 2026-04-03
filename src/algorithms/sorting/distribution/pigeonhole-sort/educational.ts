/**
 * Educational content for Pigeonhole Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Pigeonhole Sort. */
export const pigeonholeSortEducational: EducationalContent = {
  overview:
    "**Pigeonhole Sort** is a non-comparison integer sorting algorithm closely related to Counting Sort. It works by allocating one 'pigeonhole' (counter slot) for every distinct value in the input range `[min, max]`, distributing each element into its pigeonhole, then collecting elements back out in sorted order.\n\nThe name comes from the **pigeonhole principle**: if there are `n` pigeons and `m` holes, at least one hole has more than one pigeon — directly mapping to how duplicate values share a slot.",

  howItWorks:
    "Pigeonhole Sort executes in three passes:\n\n" +
    "### Pass 1 — Place\n" +
    "For each element in the input, compute its hole position as `value - min` and increment that slot's counter.\n\n" +
    "### Pass 2 — Collect\n" +
    "Walk the holes array from index 0 to the end. For each hole with count `c`, write `c` copies of `holeIndex + min` back into the output.\n\n" +
    "### Visualizing Pigeonhole Sort on [8, 3, 2, 7, 4, 6, 8]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    A[8 3 2 7 4 6 8] -->|place| B[holes: 2=1, 3=1, 4=1, 6=1, 7=1, 8=2]\n" +
    "    B -->|collect| C[2 3 4 6 7 8 8]\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Place pass:** `holes[0]=1(2), holes[1]=1(3), holes[2]=1(4), holes[4]=1(6), holes[5]=1(7), holes[6]=2(8)`\n" +
    "- **Collect pass:** Emit each value as many times as its count → `[2, 3, 4, 6, 7, 8, 8]` ✓",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + range)`**\n\n" +
    "- **Best Case:** `O(n + range)` — single place pass `O(n)`, single collect pass `O(range)`.\n" +
    "- **Average Case:** `O(n + range)` — always two linear scans; no dependence on distribution.\n" +
    "- **Worst Case:** `O(n + range)` — consistent; however, if `range >> n`, the collect pass dominates.\n\n" +
    "Where `range = max - min + 1`.\n\n" +
    "**Space Complexity: `O(range)`**\n\n" +
    "The holes array requires one integer slot per distinct value in the range — no extra `n`-sized output array is needed beyond the in-place rewrite.",

  bestAndWorstCase:
    "**Best case** is `O(n + range)` when `range` is small (e.g., sorting boolean-like values or small integer domains). For instance, sorting 10,000 integers all between 0 and 100 takes `O(n + 100)` — effectively `O(n)`.\n\n" +
    "**Worst case** is also `O(n + range)` but becomes impractical when `range >> n`. Sorting 10 integers drawn from the range 0–1,000,000 requires allocating and scanning a 1-million-entry holes array — `O(1,000,000)` work for only 10 elements. Counting Sort suffers the same limitation.",

  realWorldUses: [
    "**Small integer domain sorting:** Sorting exam scores (0–100), dice rolls (1–6), or age groups — any small, bounded integer range.",
    "**Frequency analysis:** The place pass is identical to building a frequency histogram, making it dual-purpose for data analysis.",
    "**Deduplication:** After sorting, consecutive equal elements are grouped, enabling `O(n + range)` deduplication.",
    "**Hash table collision reduction:** Pigeonhole reasoning underlies birthday-paradox analysis used in hash function design.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Simplest possible non-comparison sort** — two loops, no recursion, no complex data structures.",
      "**Linear time** when `range = O(n)` — unbeatable asymptotic performance.",
      "**Stable** — equal elements are emitted in the order they were placed (by value, not original position), but all occurrences are preserved.",
    ],
    limitations: [
      "**Only works on integers** — no floating-point or object keys without transformation.",
      "`O(range)` space is impractical when the value range greatly exceeds the input size.",
      "Degrades to `O(range)`-dominant runtime when values are sparse across a wide range.",
    ],
  },

  whenToUseIt:
    "Use **Pigeonhole Sort** when sorting integers (or values mappable to integers) from a small, known range where `range` is not dramatically larger than `n`. It is the simplest possible `O(n + range)` sort and requires minimal code.\n\nPrefer Counting Sort for the same use cases when you need a stable sort with guaranteed output-array semantics, and prefer Radix Sort when the range is large but the digit count is small.",
};
