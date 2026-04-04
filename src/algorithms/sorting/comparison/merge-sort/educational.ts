/**
 * Educational content for Merge Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Merge Sort. */
export const mergeSortEducational: EducationalContent = {
  overview:
    "**Merge Sort** is a classic divide-and-conquer sorting algorithm invented by John von Neumann in 1945. It recursively splits the array into halves until each subarray has one element, then merges adjacent subarrays back together in sorted order.\n\nBecause merging two sorted arrays is an `O(n)` operation, and the divide step creates `log n` levels, the total time is always `O(n log n)` regardless of input order.",

  howItWorks:
    "Merge Sort operates in two clear phases: **divide** and **merge**.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. **Divide:** Split the array at the midpoint into left and right halves.\n" +
    "2. Recursively sort the left half.\n" +
    "3. Recursively sort the right half.\n" +
    "4. **Merge:** Compare the first elements of each sorted half.\n" +
    "5. Take the smaller element and place it into the output array.\n" +
    "6. Advance the pointer in the half that contributed the element.\n" +
    "7. Repeat until one half is exhausted, then append the remainder.\n\n" +
    "### Divide-and-Merge Tree for [38, 27, 43, 3]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[38 27 43 3] -->|split| B[38 27]\n" +
    "    A -->|split| C[43 3]\n" +
    "    B -->|split| D[38]\n" +
    "    B -->|split| E[27]\n" +
    "    C -->|split| F[43]\n" +
    "    C -->|split| G[3]\n" +
    "    D & E -->|merge| H[27 38]\n" +
    "    F & G -->|merge| I[3 43]\n" +
    "    H & I -->|merge| J[3 27 38 43]\n" +
    "    style J fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- Base case: single-element arrays `[38]`, `[27]`, `[43]`, `[3]`\n" +
    "- Merge `[38]` and `[27]` → `[27, 38]`\n" +
    "- Merge `[43]` and `[3]` → `[3, 43]`\n" +
    "- Merge `[27, 38]` and `[3, 43]` → `[3, 27, 38, 43]` ✓",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "- **Best Case:** `O(n log n)` — unlike adaptive sorts, Merge Sort always divides and merges regardless of initial order.\n" +
    "- **Average Case:** `O(n log n)` — the recurrence `T(n) = 2T(n/2) + O(n)` always resolves to `O(n log n)` by the Master Theorem.\n" +
    "- **Worst Case:** `O(n log n)` — guaranteed regardless of input; this is its key advantage over Quick Sort.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Requires `O(n)` auxiliary memory for the temporary arrays used during the merge step. This is its main disadvantage compared to in-place sorts.",

  bestAndWorstCase:
    "**Best case** is still `O(n log n)` — Merge Sort performs the same number of operations regardless of whether the input is sorted, reversed, or random. There is no adaptive mechanism.\n\n" +
    "**Worst case** is also `O(n log n)` — this consistency is Merge Sort's defining strength. Quick Sort degrades to `O(n²)` on bad pivots, but Merge Sort never does. The tradeoff is the `O(n)` space requirement for auxiliary arrays during the merge step.",

  realWorldUses: [
    "**External Sorting:** The algorithm of choice when sorting data too large to fit in RAM — disk I/O naturally processes sequential chunks that map to sorted runs.",
    "**Stable Sort Requirement:** Used wherever preserving the order of equal elements is mandatory (e.g., database multi-column sorting, stable ranking).",
    "**Linked List Sorting:** Unlike Quick Sort, Merge Sort does not require random access, making it the natural choice for linked lists.",
    "**Parallel Computing:** The divide step maps perfectly onto multi-threaded and distributed sort architectures.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Guaranteed `O(n log n)`:** Never degrades to quadratic time regardless of input.",
      "**Stable sort:** Equal elements maintain their original relative order.",
      "**Predictable:** Consistent performance makes it reliable for time-critical systems.",
      "**Parallelizable:** Independent subproblem structure enables efficient multi-threaded implementations.",
    ],
    limitations: [
      "**`O(n)` space:** Requires auxiliary arrays for merging — unsuitable for strictly memory-constrained environments.",
      "**Not adaptive:** Performs the same work on already-sorted input as on random input.",
      "**Cache inefficiency:** Accessing non-contiguous memory during merging can cause cache misses at large scale.",
    ],
  },

  whenToUseIt:
    "Use **Merge Sort** when you need a **guaranteed `O(n log n)`** sort, when you need **stability** (preserving equal-element order), or when sorting **linked lists** (where Quick Sort's random access requirement breaks down).\n\nAlso the foundation for **external sorting** when data exceeds available RAM.\n\nAvoid when memory is constrained — the `O(n)` auxiliary space can be prohibitive.",
};
