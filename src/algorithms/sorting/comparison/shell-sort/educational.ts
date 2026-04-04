/**
 * Educational content for Shell Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Shell Sort. */
export const shellSortEducational: EducationalContent = {
  overview:
    "**Shell Sort** is a generalization of Insertion Sort invented by Donald Shell in 1959. Instead of comparing adjacent elements, it compares elements separated by a **gap**. The gap starts large, allowing elements to move long distances quickly, and shrinks down to 1 — at which point the final pass is a standard Insertion Sort on a nearly-sorted array.\n\nShell Sort overcomes Insertion Sort's main weakness: the need to shift elements one position at a time.",

  howItWorks:
    "Shell Sort reduces the movement cost of Insertion Sort by pre-sorting the array at coarse granularity before fine-tuning.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Choose a gap sequence (this implementation uses `gap = n/2`, halving each pass).\n" +
    "2. For the current gap, perform an insertion sort on all subsequences of elements spaced `gap` apart.\n" +
    "3. This means: for each element at `outerIndex`, compare it with the element `gap` positions before it and shift if needed.\n" +
    "4. After one gap pass, elements that are far out of place have been moved much closer to their final position.\n" +
    "5. Halve the gap and repeat.\n" +
    "6. When `gap == 1`, perform a final standard insertion sort — now very fast because the array is nearly sorted.\n\n" +
    "### Gap Passes for [8, 5, 3, 7, 1, 4]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[Initial: 8 5 3 7 1 4] -->|gap=3| B[Compare positions 0-3, 1-4, 2-5]\n" +
    "    B -->|sort with gap=3| C[7 1 3 8 5 4]\n" +
    "    C -->|gap=1| D[Standard insertion sort on nearly-sorted array]\n" +
    "    D -->|sorted| E[1 3 4 5 7 8]\n" +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Gap=3:** Compare `[8,7]`, `[5,1]`, `[3,4]` etc. — large elements jump over 3 positions at once.\n" +
    "- **Gap=1:** Final insertion sort on the pre-sorted array runs very efficiently.",

  timeAndSpaceComplexity:
    "**Time Complexity** (depends heavily on gap sequence)\n\n" +
    "- **Best Case:** `O(n log n)` — when the array is already sorted, each gap pass makes no swaps and the final insertion sort is `O(n)`.\n" +
    "- **Average Case:** `O(n^(3/2))` with the Shell gap sequence `n/2, n/4, ..., 1` — proven empirically, exact analysis is open.\n" +
    "- **Worst Case:** `O(n²)` with the Shell gap sequence; better sequences like Hibbard's (`2^k - 1`) give `O(n^(3/2))` worst case.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "In-place sort. Only constant extra storage for `currentValue`, `gapSize`, and loop indices.",

  bestAndWorstCase:
    "**Best case** `O(n log n)` occurs on an already-sorted array: each gap pass performs comparisons but zero swaps, and the final gap-1 pass is `O(n)`.\n\n" +
    "**Worst case** `O(n²)` can occur with the simple halving gap sequence on adversarial inputs. Improved gap sequences (Ciura: `1, 4, 10, 23, 57, 132, ...`) achieve better worst-case performance and are preferred in production.",

  realWorldUses: [
    "**Embedded Systems:** `O(1)` space and better practical speed than simple `O(n²)` sorts make it popular in resource-constrained firmware.",
    "**uClibc and µC/OS:** Used as the standard sort in several lightweight C standard library implementations.",
    "**Moderate Dataset Preprocessing:** Outperforms Insertion Sort on datasets of 100–10,000 elements without the overhead of recursive algorithms.",
    "**Educational Bridging:** Naturally demonstrates how gap-based techniques evolve from simple insertion sort toward more sophisticated divide-and-conquer algorithms.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Faster than `O(n²)` sorts in practice:** Gap-based movement reduces the total number of shifts dramatically.",
      "**`O(1)` space:** Purely in-place with no recursion overhead.",
      "**Simple implementation:** No complex data structures, just a gap sequence and an insertion sort inner loop.",
    ],
    limitations: [
      "**Not stable:** Gap-based swaps can change the relative order of equal elements.",
      "**Gap-sequence dependent:** Performance varies significantly with different gap sequences; optimal gaps are still an open research problem.",
      "**Outclassed at scale:** For large datasets, `O(n log n)` algorithms (Merge Sort, Heap Sort) consistently win.",
    ],
  },

  whenToUseIt:
    "Use **Shell Sort** for medium-sized datasets (hundreds to low thousands of elements) where `O(1)` space is required and the overhead of recursive algorithms is undesirable — particularly in **embedded or firmware environments**.\n\nFor large datasets, prefer Merge Sort (stable, `O(n log n)` guaranteed) or Quick Sort (fast in practice). For small datasets, plain Insertion Sort has lower constant factors.",
};
