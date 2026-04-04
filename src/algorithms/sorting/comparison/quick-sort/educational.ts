/**
 * Educational content for Quick Sort (Lomuto).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Quick Sort. */
export const quickSortEducational: EducationalContent = {
  overview:
    "**Quick Sort** is a highly efficient, in-place, divide-and-conquer sorting algorithm developed by Tony Hoare in 1959. It selects a **pivot** element, partitions the array so that all elements less than or equal to the pivot are on its left and all greater elements are on its right, then recursively sorts each partition.\n\nThis implementation uses the **Lomuto partition scheme**, which chooses the last element as the pivot.",

  howItWorks:
    "Quick Sort alternates between partitioning and recursion.\n\n" +
    "### Step-by-Step Execution (Lomuto Scheme)\n" +
    "1. Pick the last element as the **pivot**.\n" +
    "2. Initialize a `partitionIndex` to point just before the low boundary.\n" +
    "3. Scan elements from `low` to `high - 1`.\n" +
    "4. If the scanned element is ≤ pivot, increment `partitionIndex` and swap it with the scanned element.\n" +
    "5. After the scan, swap the pivot into `partitionIndex + 1` — its final sorted position.\n" +
    "6. Recursively sort the left partition (indices `low` to `pivotIndex - 1`).\n" +
    "7. Recursively sort the right partition (indices `pivotIndex + 1` to `high`).\n\n" +
    "### Partitioning [3, 6, 8, 10, 1, 2] with pivot=2\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Scan phase - pivot=2\n" +
    "    A[3] -->|3 > 2, no swap| B[6]\n" +
    "    B -->|6 > 2, no swap| C[8]\n" +
    "    C -->|8 > 2, no swap| D[10]\n" +
    "    D -->|10 > 2, no swap| E[1]\n" +
    "    E -->|1 ≤ 2, swap to front| F[done]\n" +
    "    end\n" +
    "    subgraph Result after pivot placement\n" +
    "    G[1] --- H[2] --- I[3] --- J[6] --- K[8] --- L[10]\n" +
    "    end\n" +
    "    style H fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- Partition result: `[1, 2, 3, 6, 8, 10]` — `2` is in its final position\n" +
    "- Recurse on `[1]` (already sorted) and `[3, 6, 8, 10]`",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "- **Best Case:** `O(n log n)` — pivot always splits the array into two roughly equal halves.\n" +
    "- **Average Case:** `O(n log n)` — with random data, expected splits are balanced enough to yield `O(n log n)`.\n" +
    "- **Worst Case:** `O(n²)` — occurs when the pivot is always the minimum or maximum (e.g., already-sorted input with last-element pivot). Each partition has size 0 and n-1, creating `n` levels of recursion.\n\n" +
    "**Space Complexity: `O(log n)`**\n\n" +
    "In-place partitioning uses no extra arrays. The `O(log n)` space comes from the call stack depth in the average case, degrading to `O(n)` in the worst case.",

  bestAndWorstCase:
    "**Best case** `O(n log n)` occurs when every partition produces exactly equal halves, minimizing recursion depth to `log n` levels, each doing `O(n)` work.\n\n" +
    "**Worst case** `O(n²)` occurs with already-sorted or reverse-sorted input when using the last element as pivot. Every partition produces a 0-element and an n-1-element subarray, requiring `n` levels of recursion each doing `O(n)` work. **Randomized Quick Sort** mitigates this by picking a random pivot.",

  realWorldUses: [
    "**Language Standard Libraries:** C++ STL `std::sort` uses IntroSort (Quick Sort + Heap Sort), Java Arrays.sort uses dual-pivot Quick Sort for primitives.",
    "**Cache-Friendly In-Place Sorting:** Sequential memory access pattern during partitioning maximizes CPU cache utilization.",
    "**Database Query Engines:** Used for sorting result sets before JOIN operations and ORDER BY clauses.",
    "**Competitive Programming:** Default choice for large input sizes due to excellent average-case constants.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Fastest in practice:** Excellent cache behavior and small constant factors give Quick Sort the best real-world performance on average.",
      "**In-place:** Only `O(log n)` stack space, no auxiliary arrays needed.",
      "**Parallelizable:** Independent partitions can be recursed in parallel.",
    ],
    limitations: [
      "**`O(n²)` worst case:** Degenerate inputs (sorted arrays with last-element pivot) can cause quadratic performance.",
      "**Not stable:** Partitioning reorders equal elements.",
      "**Recursion depth:** Deep recursion on large inputs can cause stack overflow without tail-call optimization.",
    ],
  },

  whenToUseIt:
    "**Quick Sort** is the go-to choice for general-purpose in-memory sorting when stability is not required and average-case `O(n log n)` performance is acceptable. Pair it with a **random pivot** selection to neutralize worst-case inputs.\n\nFor guaranteed `O(n log n)` in all cases, prefer **Merge Sort**. For small arrays (under ~16 elements), **Insertion Sort** is faster.",
};
