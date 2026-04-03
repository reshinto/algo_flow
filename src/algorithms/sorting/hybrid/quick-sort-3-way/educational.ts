/**
 * Educational content for Quick Sort 3-Way.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Quick Sort 3-Way. */
export const quickSort3WayEducational: EducationalContent = {
  overview:
    "**3-Way Quick Sort** is an optimized variant of Quick Sort that handles arrays with many duplicate values exceptionally well. Instead of partitioning into two regions (less-than and greater-than), it uses **Dutch National Flag** partitioning to create **three regions**: elements less than the pivot, elements equal to the pivot, and elements greater than the pivot.\n\nElements equal to the pivot are placed in their final sorted positions in a single pass, skipping them in all subsequent recursive calls. This makes 3-Way Quick Sort run in `O(n)` time on arrays with all identical elements and `O(n log n)` average on random input.",

  howItWorks:
    "3-Way Quick Sort uses three pointers to partition in place.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Choose a pivot (typically the first element).\n" +
    "2. Maintain three regions: `[low..lt-1]` < pivot, `[lt..gt]` = pivot, `[gt+1..high]` > pivot.\n" +
    "3. Walk `currentPointer` from `low` to `greaterThanPointer`:\n" +
    "   - If element < pivot: swap with `lessThanPointer`, advance both pointers.\n" +
    "   - If element > pivot: swap with `greaterThanPointer`, shrink the right boundary.\n" +
    "   - If element = pivot: advance `currentPointer` only.\n" +
    "4. Recursively sort `[low..lt-1]` and `[gt+1..high]` — the equal region is already done.\n\n" +
    "### Visualizing 3-Way Partition on [3, 1, 3, 3, 2, 5]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph After partition with pivot=3\n" +
    "    A[1] --- B[2] --- C[3] --- D[3] --- E[3] --- F[5]\n" +
    "    end\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- All three `3`s land in the middle partition in one pass — they are never touched again.\n" +
    "- Only `[1, 2]` and `[5]` need further recursion.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n)` — all elements equal; entire array is the pivot region, no recursion.\n" +
    "- **Average Case:** `O(n log n)` — same as standard Quick Sort on random input.\n" +
    "- **Worst Case:** `O(n²)` — sorted array with all distinct values and always choosing the first element as pivot.\n\n" +
    "**Space Complexity: `O(log n)`**\n\n" +
    "In-place partitioning; the recursion stack depth is `O(log n)` on average.",

  bestAndWorstCase:
    "**Best case** is an array where all (or most) elements equal the pivot: the entire array collapses into a single equal-to partition in `O(n)` and no further sorting is needed.\n\n" +
    "**Worst case** is a reverse-sorted array of distinct elements with a poor pivot strategy (e.g., always first element): every partition has one element in each less-than and greater-than bucket, producing `O(n²)` comparisons. Randomizing the pivot before partitioning mitigates this to `O(n log n)` expected.",

  realWorldUses: [
    "**Java's Arrays.sort() for object arrays:** Java uses a variant of 3-way quick sort (dual-pivot) as its default sort for primitive arrays.",
    "**Databases with low-cardinality columns:** Sorting a column with many repeated values (e.g., status codes) benefits dramatically from duplicate skipping.",
    "**Sorting strings with common prefixes:** The 3-way partition can be applied character-by-character (ternary quick sort) for efficient string sorting.",
    "**Competitive programming:** Handles the classic problem of sorting arrays with many duplicates without worst-case degradation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**`O(n)` on arrays with all equal elements** — handles degenerate duplicate cases optimally.",
      "**In-place:** Only `O(log n)` stack space.",
      "**Faster than 2-way Quick Sort** on inputs with many repeated values.",
      "**Cache-friendly:** Sequential memory access pattern during partitioning.",
    ],
    limitations: [
      "**`O(n²)` worst case** without pivot randomization on sorted inputs.",
      "**Not stable:** Element order within equal partitions may change.",
      "Overhead from maintaining three pointers makes it marginally slower than 2-way Quick Sort on arrays with all distinct values.",
    ],
  },

  whenToUseIt:
    "Use **3-Way Quick Sort** when your dataset may contain many repeated values — it dramatically outperforms 2-way Quick Sort in such cases. It is the preferred variant whenever the key distribution is skewed or has low cardinality.\n\nFor datasets with all distinct values and no duplicates, standard 2-way Quick Sort with randomized pivot has slightly lower overhead.",
};
