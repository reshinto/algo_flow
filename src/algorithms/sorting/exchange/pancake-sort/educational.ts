/**
 * Educational content for Pancake Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Pancake Sort. */
export const pancakeSortEducational: EducationalContent = {
  overview:
    "**Pancake Sort** is a sorting algorithm that uses only one operation: a **flip** (prefix reversal) that reverses the order of the first `k` elements of the array. The name comes from the analogy of sorting a stack of pancakes by size using only a spatula — you can only flip the top portion of the stack at a time.\n\nTo sort an array of `n` elements, Pancake Sort makes at most `2(n - 1)` flips: for each unsorted position from right to left, find the maximum, flip it to the front, then flip it to its final sorted position.",

  howItWorks:
    "Pancake Sort places elements into their sorted positions from **right to left**, reducing the unsorted portion by one each round.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Find the index `maxIndex` of the maximum element in the unsorted portion (positions 0 to `unsortedSize - 1`).\n" +
    "2. If `maxIndex != 0`, flip the subarray `[0..maxIndex]` to bring the maximum to the front.\n" +
    "3. Flip the subarray `[0..unsortedSize - 1]` to move the maximum from the front to position `unsortedSize - 1`.\n" +
    "4. Decrement `unsortedSize` — that position is now sorted.\n" +
    "5. Repeat until `unsortedSize == 1`.\n\n" +
    "### Visualizing on [3, 6, 2, 5, 4, 1]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    A[3 6 2 5 4 1] -->|find max=6 at idx 1| B[flip 0..1 → 6 3 2 5 4 1]\n" +
    "    B -->|flip 0..5 → 1 4 5 2 3 6| C[6 sorted at end]\n" +
    "    C -->|find max=5 at idx 2| D[flip 0..2 → 5 4 1 2 3 6]\n" +
    "    D -->|flip 0..4 → 3 2 1 4 5 6| E[5 sorted]\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)` for all cases**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n²)` | Must scan for max each round — no short-circuit |\n" +
    "| Average | `O(n²)` | Each round scans up to `n` elements and performs up to 2 flips |\n" +
    "| Worst | `O(n²)` | `n-1` rounds of linear scans plus `O(n)` flip work per round |\n\n" +
    "**Number of flips:** At most `2(n - 1)` — a key theoretical metric since flips are the primitive operation.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "All operations are in-place. Only loop counters and a temporary swap variable are needed.",

  bestAndWorstCase:
    "**Best case** (already sorted) still requires `O(n²)` comparisons because the algorithm must scan for the maximum in each unsorted portion regardless of current order. However, it will make 0 flips if every maximum element is already at the end of its unsorted region.\n\n" +
    "**Worst case** is a reverse-sorted array where every element requires two flips (one to bring it to front, one to place it at the end), resulting in `2(n-1)` total flips.\n\n" +
    "**Theoretical interest:** The question of finding the minimum number of flips needed to sort any permutation (the *pancake number*) is an open combinatorics problem. Bill Gates co-authored a paper on this topic in 1979.",

  realWorldUses: [
    "**Theoretical CS and combinatorics:** The pancake problem is studied in graph theory as diameter calculations on the pancake graph.",
    "**Parallel prefix networks:** Flip operations map naturally to certain parallel interconnect topologies.",
    "**Educational tool:** Demonstrates that any sequence of primitive operations (here: prefix reversals) can be composed to sort — builds intuition for algorithm design.",
    "**Genome rearrangement:** The pancake sorting model has been applied to study chromosome rearrangements in bioinformatics.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Single primitive operation:** Sorting using only prefix reversals is theoretically elegant.",
      "**In-place:** `O(1)` auxiliary space.",
      "**Bounded flips:** At most `2(n - 1)` flips guarantees termination.",
    ],
    limitations: [
      "**`O(n²)` in all cases** — no best-case speedup for sorted or nearly-sorted input.",
      "Not stable: flips disrupt the relative order of equal elements.",
      "Practically slow compared to `O(n log n)` algorithms and even other simple `O(n²)` sorts due to the constant factor of flip operations.",
    ],
  },

  whenToUseIt:
    "Use **Pancake Sort** when studying combinatorics, sorting networks, or genome rearrangement models. It is rarely used in production software.\n\nAvoid it for any application requiring real sorting performance. Its primary value is educational and theoretical.",
};
