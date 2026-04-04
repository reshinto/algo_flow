/**
 * Educational content for Binary Insertion Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Binary Insertion Sort. */
export const binaryInsertionSortEducational: EducationalContent = {
  overview:
    "**Binary Insertion Sort** is an optimized variant of Insertion Sort that uses **binary search** to find the correct position for each element in the already-sorted prefix, rather than scanning linearly.\n\nThis cuts the number of comparisons from `O(n)` per element down to `O(log n)` per element — giving an overall comparison count of `O(n log n)`. However, shifting elements to make room still requires `O(n)` moves per pass, so the total time complexity remains `O(n²)` in practice.",

  howItWorks:
    "Binary Insertion Sort processes the array from left to right, maintaining a sorted prefix.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Start with the first element as a sorted prefix of length 1.\n" +
    "2. For each subsequent element, perform **binary search** on the sorted prefix to find the correct insertion index.\n" +
    "3. **Shift** all elements between the insertion index and the current position one slot to the right.\n" +
    "4. Insert the current element into the now-open slot.\n" +
    "5. The sorted prefix grows by one; repeat until all elements are placed.\n\n" +
    "### Visualizing Binary Insertion Sort on [64, 34, 25, 12]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Step 1 - Insert 34\n" +
    "    A[64] -.->|binary search → pos 0| B[34]\n" +
    "    end\n" +
    "    subgraph Result\n" +
    "    C[34] --- D[64] --- E[25] --- F[12]\n" +
    "    end\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Pass 1:** `34` → binary search finds position 0, shift `64` right → `[34, 64, 25, 12]`\n" +
    "- **Pass 2:** `25` → binary search finds position 0, shift `34, 64` right → `[25, 34, 64, 12]`\n" +
    "- **Pass 3:** `12` → binary search finds position 0, shift all right → `[12, 25, 34, 64]`",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n log n)` comparisons, `O(n)` shifts — already-sorted input still requires binary searches but zero useful shifts.\n" +
    "- **Average Case:** `O(n²)` — `O(n log n)` comparisons + `O(n²)` shifts dominate.\n" +
    "- **Worst Case:** `O(n²)` — reverse-sorted input causes maximum shifting at every step.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Operates entirely in-place. The binary search uses only a constant number of index variables.",

  bestAndWorstCase:
    "**Best case** is a nearly-sorted or sorted array: binary search quickly confirms each element belongs at the current end of the sorted prefix, reducing shifts to near zero. Comparisons are still `O(n log n)`.\n\n" +
    "**Worst case** is a reverse-sorted array: every element must be inserted at position 0, requiring `O(n)` shifts per pass — `O(n²)` total shifts. The binary search advantage is overshadowed by the shifting cost.",

  realWorldUses: [
    "**Small sorted arrays with occasional insertions:** Efficiently finds the insertion point when the array is nearly sorted.",
    "**Libraries using hybrid sort strategies:** TimSort uses insertion sort (optionally binary) for small runs before merging.",
    "**Embedded systems with slow comparisons:** When element comparison is expensive (e.g., string comparison), the `O(n log n)` comparisons save meaningful time over standard insertion sort.",
    "**Educational use:** Demonstrates the impact of algorithmic optimization on one sub-operation while the overall complexity stays the same.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Fewer comparisons:** `O(n log n)` comparisons vs. `O(n²)` for standard Insertion Sort.",
      "**Stable sort:** Maintains the relative order of equal elements.",
      "**In-place:** Requires only `O(1)` auxiliary space.",
      "**Adaptive:** Performs well on nearly-sorted input.",
    ],
    limitations: [
      "Still `O(n²)` due to element shifting — binary search only optimizes the comparison phase.",
      "Not suitable for large random arrays where `O(n log n)` sorts like Merge Sort or Heap Sort are far faster.",
      "Shifting cost makes it poor for linked-list-based storage (no random access).",
    ],
  },

  whenToUseIt:
    "Use **Binary Insertion Sort** when comparisons are expensive and the array is small (under ~64 elements) or nearly sorted. It is commonly embedded inside hybrid sorts (like TimSort) to handle small sub-arrays efficiently.\n\nAvoid it for large unsorted datasets — the `O(n²)` shift cost will dominate regardless of the comparison savings.",
};
