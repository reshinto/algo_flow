/**
 * Educational content for Insertion Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Insertion Sort. */
export const insertionSortEducational: EducationalContent = {
  overview:
    "**Insertion Sort** builds the final sorted array one element at a time. It mimics the way most people sort a hand of playing cards — pick up the next card and insert it into the correct position among the already-sorted cards in your hand.\n\nThe left portion of the array is always sorted; for each new element, it is shifted left until it lands in its correct position.",

  howItWorks:
    "Insertion Sort maintains a growing sorted prefix. Each iteration pulls the next element from the unsorted suffix and inserts it.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Begin with the first element — a single-element array is always sorted.\n" +
    "2. Take the next element (`currentValue`) from the unsorted portion.\n" +
    "3. Compare `currentValue` backwards through the sorted portion.\n" +
    "4. Shift each element one position right as long as it is greater than `currentValue`.\n" +
    "5. Insert `currentValue` into the gap created by the shifts.\n" +
    "6. Repeat until all elements are in the sorted portion.\n\n" +
    "### Visualizing Insertion on [5, 3, 4, 1, 2]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Insert 3 into sorted prefix\n" +
    "    A[5] -.->|shift right| B[ ]\n" +
    "    C[3] -.->|insert at index 0| B\n" +
    "    end\n" +
    "    subgraph After pass\n" +
    "    D[3] --- E[5] --- F[4] --- G[1] --- H[2]\n" +
    "    end\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Pass 1:** `3` inserted before `5` → `[3, 5, 4, 1, 2]`\n" +
    "- **Pass 2:** `4` inserted between `3` and `5` → `[3, 4, 5, 1, 2]`\n" +
    "- **Pass 3:** `1` shifted to front → `[1, 3, 4, 5, 2]`\n" +
    "- **Pass 4:** `2` inserted after `1` → `[1, 2, 3, 4, 5]` ✓",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "- **Best Case:** `O(n)` — when the array is already sorted, the inner `while` loop never executes; only one comparison per outer iteration.\n" +
    "- **Average Case:** `O(n²)` — on average, each element is compared with half of the sorted prefix.\n" +
    "- **Worst Case:** `O(n²)` — a reverse-sorted array forces every element to shift all the way to the front.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "In-place algorithm. The only extra storage is the `currentValue` variable holding the element being inserted.",

  bestAndWorstCase:
    "**Best case** `O(n)` is achieved on a pre-sorted or nearly-sorted array. Each element is already in the correct position and the while-loop condition fails immediately after a single comparison, making this the most adaptive simple sort.\n\n" +
    "**Worst case** `O(n²)` occurs with a reverse-sorted input `[n, n-1, ..., 2, 1]`. Every new element must travel the full length of the sorted prefix, resulting in `1 + 2 + 3 + ... + (n-1) = n(n-1)/2` total shifts.",

  realWorldUses: [
    "**Online Sorting:** Can sort data as it arrives stream-by-stream without needing the full collection upfront.",
    "**Hybrid Algorithms:** Used as a base case in Timsort and IntroSort for small subarrays (typically under 16 elements) where its simplicity wins.",
    "**Nearly-Sorted Data:** Outperforms all `O(n log n)` algorithms when few elements are out of place.",
    "**Card Game Engines:** Natural model for hand management in card game simulations and AI.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Adaptive:** `O(n)` best case makes it the fastest simple sort for nearly-sorted input.",
      "**Stable:** Equal elements are never reordered — their original relative order is preserved.",
      "**Online:** Can sort a list as it is being received, element by element.",
      "**In-place:** `O(1)` space, trivial implementation.",
    ],
    limitations: [
      "`O(n²)` average and worst case disqualifies it for large, randomly ordered datasets.",
      "Shift-heavy: each insertion may require shifting many elements, unlike Selection Sort's single swap.",
      "Significantly outperformed by `O(n log n)` algorithms (Merge Sort, Heap Sort) at scale.",
    ],
  },

  whenToUseIt:
    "**Insertion Sort** excels when the dataset is small (under ~32 elements) or is expected to be nearly sorted. It is the algorithm of choice for the small-subarray base case in industrial-strength hybrid sorts like **Timsort** (Python's default) and **IntroSort** (used in C++ STL).\n\nFor large randomly ordered data, prefer Merge Sort or Quick Sort.",
};
