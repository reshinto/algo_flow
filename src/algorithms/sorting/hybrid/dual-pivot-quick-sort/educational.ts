/**
 * Educational content for Dual-Pivot Quick Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Dual-Pivot Quick Sort. */
export const dualPivotQuickSortEducational: EducationalContent = {
  overview:
    "**Dual-Pivot Quick Sort** uses **two pivot elements** to partition the array into **three regions**: elements less than pivot1, elements between pivot1 and pivot2, and elements greater than pivot2. This creates smaller sub-problems per recursion level compared to single-pivot Quick Sort.\n\nThis algorithm is used by **Java's `Arrays.sort()`** for primitive arrays since Java 7. It was discovered by Vladimir Yaroslavskiy and consistently outperforms single-pivot Quick Sort in practice due to better cache behavior and fewer comparisons.",

  howItWorks:
    "Dual-Pivot Quick Sort partitions using two boundary pointers moving inward simultaneously.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Choose the **first** and **last** elements as pivot1 and pivot2; ensure pivot1 ≤ pivot2.\n" +
    "2. Use three pointers: `lessThan`, `current`, and `greaterThan`.\n" +
    "3. Walk `current` inward:\n" +
    "   - If element < pivot1: swap with `lessThan`, advance both.\n" +
    "   - If element > pivot2: scan `greaterThan` inward past elements > pivot2, swap.\n" +
    "   - Otherwise: element is in the middle region, advance `current` only.\n" +
    "4. Place pivot1 at `lessThan - 1` and pivot2 at `greaterThan + 1`.\n" +
    "5. Recursively sort three sub-arrays.\n\n" +
    "### Visualizing Dual-Pivot Partition on [3, 9, 1, 7, 2, 8, 5]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph pivot1=3, pivot2=5\n" +
    "    A[1] --- B[2] --- C[3] --- D[...middle...] --- E[5] --- F[9] --- G[8] --- H[7]\n" +
    "    end\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "    style A fill:#1d4ed8,stroke:#3b82f6\n" +
    "    style B fill:#1d4ed8,stroke:#3b82f6\n" +
    "```\n\n" +
    "After one pass, `3` and `5` are in their final positions. Three sub-arrays are processed next.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n log n)` — two balanced pivots create roughly equal thirds per level.\n" +
    "- **Average Case:** `O(n log n)` — empirically fewer comparisons than single-pivot Quick Sort.\n" +
    "- **Worst Case:** `O(n²)` — degenerate inputs (e.g., sorted array with equal pivots) cause imbalanced partitions.\n\n" +
    "**Space Complexity: `O(log n)`**\n\n" +
    "In-place partitioning with `O(log n)` recursion stack depth.",

  bestAndWorstCase:
    "**Best case** is well-distributed random input: two good pivots split the array into roughly equal thirds, producing a recursion tree of depth `O(log₃ n)` — slightly shallower than single-pivot's `O(log₂ n)`.\n\n" +
    "**Worst case** arises when pivot1 = pivot2 (all equal elements, or specifically chosen pivots are identical), reducing to single-pivot Quick Sort behavior and potentially `O(n²)` on adversarial input. Java's implementation avoids this with a carefully tuned pivot selection strategy.",

  realWorldUses: [
    "**Java `Arrays.sort()` for primitives:** Used since Java 7 as the default sort for `int[]`, `long[]`, `double[]` and other primitive array types.",
    "**High-performance sorting libraries:** Consistently outperforms single-pivot Quick Sort in benchmark suites on modern hardware.",
    "**Database engines:** Used in sort-merge join operations where primitive data must be sorted in-memory.",
    "**Research baseline:** Dual-pivot Quick Sort is the reference implementation against which newer sorting variants are compared.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Fewer comparisons** than single-pivot Quick Sort on average due to better partition balance.",
      "**Cache-friendly:** Three-way scan has good memory locality.",
      "**In-place:** `O(log n)` auxiliary space.",
      "**Production-proven:** Java's default for primitive array sorting since 2009.",
    ],
    limitations: [
      "**`O(n²)` worst case** without careful pivot selection.",
      "**Not stable:** Relative order of equal elements is not preserved.",
      "More complex to implement correctly than single-pivot Quick Sort.",
      "Two pivots require careful edge-case handling (e.g., pivot1 = pivot2, or subarray size ≤ 2).",
    ],
  },

  whenToUseIt:
    "Use **Dual-Pivot Quick Sort** as a drop-in replacement for single-pivot Quick Sort when sorting primitive data types in-place and average-case performance is the priority. It is particularly effective on modern CPUs where its cache access pattern outperforms alternatives.\n\nFor stability or worst-case guarantees, use Merge Sort or Tim Sort instead.",
};
