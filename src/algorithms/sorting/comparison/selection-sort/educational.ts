/**
 * Educational content for Selection Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Selection Sort. */
export const selectionSortEducational: EducationalContent = {
  overview:
    "**Selection Sort** is an in-place comparison-based sorting algorithm. It divides the input list into two parts: a sorted sublist built up from left to right, and an unsorted sublist of the remaining elements.\n\nOn each pass, it **selects the minimum element** from the unsorted portion and swaps it into the correct position at the boundary, growing the sorted region by one element per pass.",

  howItWorks:
    "Selection Sort makes exactly `n - 1` passes regardless of input order.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Start with the full array as unsorted.\n" +
    "2. Scan the entire unsorted portion to find the minimum element.\n" +
    "3. Swap that minimum with the first element of the unsorted portion.\n" +
    "4. The sorted boundary advances one position to the right.\n" +
    "5. Repeat until only one unsorted element remains — it is already in place.\n\n" +
    "### Visualizing Selection Sort on [64, 25, 12, 22, 11]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Pass 1 - find min=11\n" +
    "    A[64] -.->|swap| B[11]\n" +
    "    end\n" +
    "    subgraph Result\n" +
    "    C[11] --- D[25] --- E[12] --- F[22] --- G[64]\n" +
    "    end\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "    style A fill:#7f1d1d,stroke:#ef4444\n" +
    "```\n\n" +
    "- **Pass 1:** Find `11`, swap with `64` → `[11, 25, 12, 22, 64]`\n" +
    "- **Pass 2:** Find `12`, swap with `25` → `[11, 12, 25, 22, 64]`\n" +
    "- **Pass 3:** Find `22`, swap with `25` → `[11, 12, 22, 25, 64]`\n" +
    "- **Pass 4:** `25` is already minimum → `[11, 12, 22, 25, 64]` ✓",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "- **Best Case:** `O(n²)` — unlike Bubble Sort, Selection Sort always scans the full unsorted portion regardless of existing order.\n" +
    "- **Average Case:** `O(n²)` — `n(n-1)/2` comparisons are made unconditionally.\n" +
    "- **Worst Case:** `O(n²)` — identical to best case; the comparison count never changes.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Performs sorting entirely in-place using only a constant amount of extra storage for the minimum index tracker and temporary swap variable.",

  bestAndWorstCase:
    "**Best case** for Selection Sort is still `O(n²)` — it always performs exactly `n(n-1)/2` comparisons because it must fully scan every remaining unsorted element to confirm the minimum. There is no early-exit optimization possible.\n\n" +
    "**Worst case** is also `O(n²)` for comparisons. The only difference in worst case (a reversed array) is that every pass will also perform a swap, whereas best case (already sorted) performs zero swaps but still `O(n²)` comparisons. This makes Selection Sort unique: **exactly `n - 1` swaps** in the worst case, which is fewer swaps than Bubble Sort.",

  realWorldUses: [
    "**Embedded Systems:** Minimal write operations — at most `n - 1` swaps makes it ideal for flash memory where writes are expensive.",
    "**Small Datasets:** Outperforms more complex algorithms on arrays under ~10 elements due to zero overhead.",
    "**Visualization Tools:** Extremely predictable step count makes it ideal for educational algorithm animation.",
    "**Hardware Sorting Circuits:** Simple comparison structure maps well onto fixed-function digital logic.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Minimal swaps:** Performs at most `n - 1` swaps, ideal when write operations are costly.",
      "**Simple implementation:** Straightforward two-loop structure with no complex data structures.",
      "**In-place:** Requires only `O(1)` auxiliary space.",
    ],
    limitations: [
      "Always `O(n²)` comparisons — cannot short-circuit even on a sorted array.",
      "**Not stable:** May reorder equal elements since swaps can jump elements over each other.",
      "Outperformed by Insertion Sort on nearly-sorted data and by `O(n log n)` algorithms at scale.",
    ],
  },

  whenToUseIt:
    "Use **Selection Sort** when write/swap operations are extremely expensive (e.g., writing to flash memory or EEPROM) and the array is small enough that `O(n²)` comparisons are tolerable. Its guarantee of at most `n - 1` swaps is its key differentiator.\n\nAvoid it for large datasets or when stability (preserving order of equal elements) is required.",
};
