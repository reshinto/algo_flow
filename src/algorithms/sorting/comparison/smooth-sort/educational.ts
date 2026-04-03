/**
 * Educational content for Smooth Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Smooth Sort. */
export const smoothSortEducational: EducationalContent = {
  overview:
    "**Smooth Sort** is an adaptive comparison-based sorting algorithm invented by Edsger Dijkstra in 1981. It is a variant of Heap Sort that achieves **O(n) performance on nearly-sorted data** while maintaining O(n log n) worst-case behavior.\n\nInstead of a binary heap, Smooth Sort maintains a forest of **Leonardo heaps** — trees whose sizes follow the Leonardo number sequence (1, 1, 3, 5, 9, 15, 25, …). This structure naturally degrades gracefully as data approaches sorted order, unlike traditional Heap Sort which is always O(n log n).",

  howItWorks:
    "Smooth Sort operates in two phases: **build** and **extract**.\n\n" +
    "### Leonardo Numbers\n" +
    "Leonardo numbers are defined as: `L(0) = 1`, `L(1) = 1`, `L(n) = L(n-1) + L(n-2) + 1`. The first several are: 1, 1, 3, 5, 9, 15, 25, 41, …\n\n" +
    "### Phase 1: Build (Add elements to heap forest)\n" +
    "1. Add each element, merging adjacent same-sized Leonardo trees when possible.\n" +
    "2. Each tree satisfies the heap property: the root is the maximum.\n" +
    "3. After each insertion, **trinkle** ensures the new root is correctly positioned among all heap roots.\n\n" +
    "### Phase 2: Extract (Remove elements in sorted order)\n" +
    "1. The rightmost root is the overall maximum — already in its correct sorted position.\n" +
    "2. Split its tree back into two subtrees and reheap each.\n" +
    "3. Repeat until the array is sorted.\n\n" +
    "### Visualizing Smooth Sort on [5, 3, 1, 4, 2]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Build Phase\n" +
    "    A[5] --> B[5,3] --> C[L3: root=5]\n" +
    "    end\n" +
    "    subgraph Extract Phase\n" +
    "    D[Extract 5] --> E[Extract 4] --> F[1,2,3,4,5]\n" +
    "    end\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- The forest structure adapts to input order — on a sorted input, no trinkle swaps are needed.",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "- **Best Case: `O(n)`** — on an already-sorted array, the build phase requires no swaps and the extract phase confirms positions trivially.\n" +
    "- **Average Case: `O(n log n)`** — typical unsorted input requires full heapify and extract passes.\n" +
    "- **Worst Case: `O(n log n)`** — reverse-sorted input triggers maximum comparisons and swaps.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Smooth Sort sorts entirely in-place. The heap forest is maintained using only index tracking (no auxiliary arrays). Only a handful of integer variables track the current Leonardo tree orders.",

  bestAndWorstCase:
    "**Best Case (`O(n)`):** A fully sorted array requires only one pass through the build phase with no trinkle swaps, since each new element is already larger than all heap roots. The extract phase confirms order with no repositioning needed.\n\n" +
    "**Worst Case (`O(n log n)`):** A reverse-sorted array forces maximum work in both phases. Every insertion triggers full trinkle traversal, and every extraction requires full sifting. The log factor comes from the depth of the Leonardo trees, which is O(log n).",

  realWorldUses: [
    "**Nearly-sorted datasets:** Database records that are almost in order (e.g., time-series data with a few out-of-order entries) benefit from the O(n) best case.",
    "**Systems programming:** Dijkstra designed it for theoretical interest in adaptive sorting with minimal memory overhead.",
    "**Embedded systems:** The O(1) space guarantee combined with adaptive performance makes it suitable for memory-constrained environments.",
    "**Educational use:** Smooth Sort is an elegant example of how data structure choice (Leonardo heaps vs. binary heaps) dramatically affects adaptive behavior.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Adaptive:** Degrades gracefully from O(n) on sorted data to O(n log n) on random data.",
      "**In-place:** Only O(1) auxiliary space required.",
      "**Theoretically elegant:** Demonstrates how number sequences (Leonardo numbers) can underpin practical data structures.",
    ],
    limitations: [
      "**Complex implementation:** The trinkle and sift operations with Leonardo number bookkeeping are significantly harder to implement correctly than Heap Sort or Merge Sort.",
      "**Cache-unfriendly:** Non-sequential memory access patterns in the heap forest can hurt performance on modern hardware.",
      "**Not stable:** Equal elements may be reordered during heap operations.",
      "**Rarely used in practice:** Tim Sort is preferred for real-world adaptive sorting due to its stability and better cache behavior.",
    ],
  },

  whenToUseIt:
    "Use **Smooth Sort** when you need an in-place adaptive sort and your data is expected to be nearly sorted in many real-world executions. It offers the theoretical guarantee of O(n) on sorted data with O(1) space, which no comparison sort using a standard binary heap can match.\n\nAvoid it when stability is required, when data is randomly distributed (Tim Sort will outperform it in practice), or when implementation simplicity is a priority.",
};
