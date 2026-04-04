/**
 * Educational content for Gnome Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Gnome Sort. */
export const gnomeSortEducational: EducationalContent = {
  overview:
    "**Gnome Sort** (also called Stupid Sort) is a simple sorting algorithm inspired by the way a garden gnome sorts flower pots. It works similarly to Insertion Sort but uses **swaps instead of shifts**: the gnome compares the current element with the previous one, and if out of order, swaps them and steps back. If in order (or at the start), it steps forward.\n\nThe result is a single pointer that wanders left and right through the array until everything is sorted.",

  howItWorks:
    "The gnome maintains a single `position` pointer starting at index 0.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. If `position == 0`, move forward (nothing to the left to compare).\n" +
    "2. Compare `arr[position]` with `arr[position - 1]`.\n" +
    "3. If `arr[position] >= arr[position - 1]`, the pair is in order — move forward.\n" +
    "4. If `arr[position] < arr[position - 1]`, swap them and step backward.\n" +
    "5. Continue until `position == arrayLength`.\n\n" +
    "### Visualizing on [3, 2, 5, 1, 4]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    A[pos=1: 3>2? swap → 2,3,5,1,4]\n" +
    "    B[pos=0: at start, move fwd]\n" +
    "    C[pos=2: 3<5? fwd]\n" +
    "    D[pos=3: 5>1? swap → 2,3,1,5,4]\n" +
    "    E[pos=2: 3>1? swap → 2,1,3,5,4]\n" +
    "    F[pos=1: 2>1? swap → 1,2,3,5,4]\n" +
    "    A --> B --> C --> D --> E --> F\n" +
    "```\n\n" +
    "The pointer can zigzag many times — in the worst case it travels `O(n²)` total steps.",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n)` | Already sorted — pointer only moves forward |\n" +
    "| Average | `O(n²)` | Each new minimum travels all the way left |\n" +
    "| Worst | `O(n²)` | Reverse-sorted — every element traverses the full sorted prefix |\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a position counter and a temporary swap variable are needed, making Gnome Sort perfectly in-place.",

  bestAndWorstCase:
    "**Best case `O(n)`** occurs on an already-sorted array. The pointer only ever moves forward, making exactly `n - 1` comparisons and zero swaps.\n\n" +
    "**Worst case `O(n²)`** occurs on a reverse-sorted array. Each new element is smaller than all previously seen elements, so it must swap all the way back to position 0 before the pointer advances again. This produces a total step count of `1 + 2 + ... + (n-1) = n(n-1)/2`.\n\n" +
    "**Comparison with Insertion Sort:** Gnome Sort and Insertion Sort are algorithmically equivalent in the number of comparisons and swaps made. Insertion Sort uses a nested loop construct; Gnome Sort achieves the same result with a single pointer. Gnome Sort's simplicity is its virtue — it is arguably the simplest correct sorting algorithm possible.",

  realWorldUses: [
    "**Education:** The clearest possible illustration of how an insertion-style sort works — used in CS fundamentals courses.",
    "**Embedded or resource-constrained systems:** Minimal code footprint with no nested loops or auxiliary structures.",
    "**Algorithm animation:** The single wandering pointer produces visually intuitive animations for learners.",
    "**Correctness proofs:** Ideal algorithm for teaching formal loop invariant reasoning due to its simplicity.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Simplest possible implementation:** A single `while` loop with one conditional.",
      "**Stable:** Preserves relative order of equal elements (uses `>=` comparison).",
      "**In-place:** `O(1)` auxiliary memory.",
      "**Early termination:** `O(n)` on already-sorted input.",
    ],
    limitations: [
      "`O(n²)` average and worst case — not suitable for large or performance-sensitive datasets.",
      "No data-structure optimizations possible (unlike Insertion Sort with binary search for the insertion position).",
      "The pointer zigzag pattern makes it hard to parallelize.",
    ],
  },

  whenToUseIt:
    "Use **Gnome Sort** when simplicity of implementation is the primary goal and data sets are small (under ~20 elements). It is the go-to algorithm for teaching sorting invariants without any structural complexity.\n\nAvoid it for any dataset that needs real performance — Insertion Sort with binary search, Timsort, or any `O(n log n)` algorithm will outperform it significantly.",
};
