/**
 * Educational content for Circle Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Circle Sort. */
export const circleSortEducational: EducationalContent = {
  overview:
    "**Circle Sort** is a recursive sorting algorithm that compares elements at the **outermost positions** of a segment and works inward toward the center — like closing a circle. After comparing all pairs in a segment, it recursively applies the same process to the left and right halves. Full passes repeat until no swaps occur.\n\nIt was described by H. Sourceforge in 2014 and achieves `O(n log n log n)` expected time complexity — better than Bubble Sort but with a more interesting recursive structure.",

  howItWorks:
    "Circle Sort operates on a segment `[leftIndex, rightIndex]` by moving two pointers (`low` and `high`) from the edges toward the center.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Set `low = leftIndex`, `high = rightIndex`.\n" +
    "2. Compare `arr[low]` and `arr[high]`. If out of order, swap.\n" +
    "3. Increment `low`, decrement `high`. Repeat until `low >= high`.\n" +
    "4. If `low == high` (odd-length segment), compare `arr[low]` with `arr[low + 1]` and swap if needed.\n" +
    "5. Recursively circle-sort the left half `[leftIndex, midpoint]` and right half `[midpoint+1, rightIndex]`.\n" +
    "6. Repeat the full pass until no swaps occur across the entire array.\n\n" +
    "### Visualizing on [5, 3, 1, 4, 2]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[Full segment: 5 3 1 4 2]\n" +
    "    B[Compare edges: 5↔2 → swap → 2 3 1 4 5]\n" +
    "    C[Compare 3↔4 → no swap]\n" +
    "    D[Mid 1 → left half: 2 3 1, right half: 4 5]\n" +
    "    E[Left: compare 2↔1 → swap → 1 3 2]\n" +
    "    F[Repeat until no swaps]\n" +
    "    A --> B --> C --> D --> E --> F\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n log n log n)` | Few full passes needed on nearly-sorted data |\n" +
    "| Average | `O(n log n log n)` | Each pass has `O(n log n)` work, and `O(log n)` passes on average |\n" +
    "| Worst | `O(n log n log n)` | Expected bound — no proven worst case beyond this |\n\n" +
    "**Space Complexity: `O(log n)`**\n\n" +
    "The recursive call stack depth is `O(log n)` due to the halving at each level. No other auxiliary structures are used.",

  bestAndWorstCase:
    "**Expected complexity `O(n log n log n)`** is the theoretical analysis. In practice, Circle Sort often performs comparably to Merge Sort on random data due to the efficient large-distance comparisons in early passes.\n\n" +
    "**Best case** occurs on already-sorted data, where the first full pass discovers no swaps and terminates after `O(n log n)` comparisons.\n\n" +
    "**Practical behavior:** Circle Sort tends to converge quickly on random inputs and is competitive with simpler `O(n log n)` algorithms for moderate array sizes. Its recursive structure means it benefits from cache locality on contiguous subarrays.",

  realWorldUses: [
    "**Educational tool:** Demonstrates recursive divide-and-conquer comparison strategies beyond the standard merge/quicksort paradigm.",
    "**Algorithmic research:** Used as a test case for analysis of sorting networks with recursive structure.",
    "**Small to medium datasets:** Competitive performance with zero auxiliary space makes it viable for embedded scenarios.",
    "**Teaching recursion:** The circular comparison pattern provides an intuitive visual for recursive decomposition.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Better than `O(n²)`** — `O(n log n log n)` expected beats all quadratic sorts.",
      "**In-place (nearly):** `O(log n)` stack space only — no heap allocation.",
      "**Simple termination:** Outer while loop with a `swapped` flag.",
      "**Early termination:** Stops immediately when a full pass produces no swaps.",
    ],
    limitations: [
      "**Not stable:** Edge-inward comparisons can disrupt relative order of equal elements.",
      "**No proven worst-case guarantee** tighter than `O(n log n log n)` — theoretical analysis is incomplete.",
      "**Recursive overhead:** Function call stack for each subdivision adds constant overhead vs. iterative algorithms.",
      "Slower than Merge Sort, Heap Sort, and Timsort for large datasets.",
    ],
  },

  whenToUseIt:
    "Use **Circle Sort** when you want a simple recursive sort that outperforms `O(n²)` algorithms without needing auxiliary memory beyond the stack. It is a good educational subject for studying recursive comparison strategies.\n\nFor production use, prefer Timsort or Introsort — they offer better worst-case guarantees and stability.",
};
