/**
 * Educational content for Exchange Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Exchange Sort. */
export const exchangeSortEducational: EducationalContent = {
  overview:
    "**Exchange Sort** is the simplest possible comparison-based sorting algorithm. For each element at position `outerIndex`, it compares that element with **every subsequent element** and immediately swaps if they are out of order. After the inner loop completes, the element at `outerIndex` holds the smallest value from that position onward.\n\nUnlike Selection Sort (which finds the minimum first, then swaps once), Exchange Sort swaps immediately on every out-of-order comparison — making it a pure exchange-based algorithm but with more swaps than necessary.",

  howItWorks:
    "Exchange Sort uses two nested loops with an immediate swap on any out-of-order pair.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. For `outerIndex` from 0 to `n - 2`:\n" +
    "2. For `innerIndex` from `outerIndex + 1` to `n - 1`:\n" +
    "3. Compare `arr[outerIndex]` with `arr[innerIndex]`.\n" +
    "4. If `arr[outerIndex] > arr[innerIndex]`, swap them immediately.\n" +
    "5. After the inner loop, `arr[outerIndex]` holds the smallest remaining element — mark it sorted.\n\n" +
    "### Visualizing on [4, 3, 1, 2]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    A[4 3 1 2] -->|4>3? swap| B[3 4 1 2]\n" +
    "    B -->|3>1? swap| C[1 4 3 2]\n" +
    "    C -->|1>2? no| D[1 is sorted]\n" +
    "    D -->|4>3? swap| E[1 3 4 2]\n" +
    "    E -->|3>2? swap| F[1 2 4 3]\n" +
    "    F -->|2 is sorted| G[4>3? swap → 1 2 3 4]\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "    style G fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Note: Exchange Sort makes more swaps than Selection Sort because it swaps every time it finds a smaller element rather than waiting to find the minimum.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)` for all cases**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n²)` | Inner loop always runs to completion — no early exit |\n" +
    "| Average | `O(n²)` | `n(n-1)/2` comparisons unconditionally |\n" +
    "| Worst | `O(n²)` | Same comparison count regardless of input order |\n\n" +
    "**Number of comparisons:** Always exactly `n(n-1)/2` — identical to Selection Sort.\n\n" +
    "**Number of swaps:** Up to `n(n-1)/2` in worst case (every comparison swaps) — worse than Selection Sort's `n-1` swaps.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Fully in-place with only loop counters and a temporary swap variable.",

  bestAndWorstCase:
    "**Best case `O(n²)` comparisons** — Exchange Sort always performs exactly `n(n-1)/2` comparisons because the inner loop has no early-exit condition. However, on an already-sorted array, zero swaps occur.\n\n" +
    "**Worst case** (reverse-sorted) results in `n(n-1)/2` swaps as well — every comparison triggers a swap.\n\n" +
    "**Comparison with Selection Sort:** Both algorithms make the same number of comparisons. However, Selection Sort performs at most `n-1` swaps (one per outer iteration after finding the minimum), while Exchange Sort may perform up to `n(n-1)/2` swaps. For write-expensive media like flash storage, Selection Sort is strictly preferable.\n\n" +
    "**Comparison with Bubble Sort:** Both compare adjacent pairs eventually, but Bubble Sort compares only adjacent elements while Exchange Sort compares `arr[outerIndex]` with all subsequent elements — making their swap patterns different even at identical complexity.",

  realWorldUses: [
    "**Educational tool:** The most direct illustration of what 'exchange-based sorting' means — every comparison may produce a swap.",
    "**Teaching algorithm analysis:** Ideal for introducing the concept of comparing best/average/worst case swap counts vs. comparison counts.",
    "**Theoretical baseline:** Used as a reference point when analyzing the efficiency improvements of Selection Sort, Insertion Sort, and Bubble Sort.",
    "**Minimal code contexts:** When code size is paramount and correctness is more important than speed — the implementation is just 6 lines.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Absolute simplicity:** The most straightforward sorting implementation possible.",
      "**In-place:** `O(1)` auxiliary memory.",
      "**Correct:** Provably sorts any input by the loop invariant that after `k` outer iterations, positions `0..k-1` hold their final sorted values.",
    ],
    limitations: [
      "**Excessive swaps:** Up to `n(n-1)/2` swaps — far more than Selection Sort's `n-1`.",
      "Always `O(n²)` — no early termination or data-dependent speedup.",
      "**Not stable:** Swapping `arr[outerIndex]` with distant `arr[innerIndex]` can disrupt equal elements.",
      "Strictly inferior to Selection Sort in write-efficiency for identical comparison count.",
    ],
  },

  whenToUseIt:
    "Use **Exchange Sort** for educational purposes or when you need the smallest possible correct sorting implementation and swap count does not matter. It is the canonical example of a naive exchange-based sort.\n\nIn any real application, Selection Sort (fewer swaps), Insertion Sort (better on nearly-sorted), or any `O(n log n)` algorithm will outperform it.",
};
