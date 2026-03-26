/**
 * Educational content for Bubble Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Bubble Sort. */
export const bubbleSortEducational: EducationalContent = {
  overview:
    "**Bubble Sort** is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. \n\nThe pass through the list is repeated until the list is sorted. It gets its name because smaller elements iteratively **'bubble'** to the top of the list (or conversely, the largest items sink to the bottom) during each pass.",

  howItWorks:
    "Bubble sort algorithm is incredibly simple but structurally inefficient for large sets.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. Start at index `0` of the array.\n" +
    "2. Compare the element with the adjacent element to its right.\n" +
    "3. **Swap** them if the left element is mathematically strictly greater than the right.\n" +
    "4. Move one position to the right and repeat until the end of the array.\n" +
    "5. After the first complete pass, the largest element is guaranteed to have *bubbled* to the final index.\n" +
    "6. Repeat `n - 1` times for the remaining unsorted portion.\n" +
    "7. **Early Exit Optimization**: If absolutely no swaps occurred during a full pass, the array is strictly sorted and the loop terminates early.\n\n" +
    "### Visualizing a Swap Pass ([5, 3, 8, 1])\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Compare 5 and 3\n" +
    "    A[5] -.->|Swap| B[3]\n" +
    "    end\n" +
    "    subgraph New Array State\n" +
    "    C[3] --- D[5] --- E[8] --- F[1]\n" +
    "    end\n" +
    "    \n" +
    "    style A fill:#7f1d1d,stroke:#ef4444,stroke-width:2px\n" +
    "    style B fill:#1a365d,stroke:#3b82f6\n" +
    "```\n\n" +
    "- **Pass 1:** `[3, 5, 1, 8]` → The `8` bubbles all the way to the end.\n" +
    "- **Pass 2:** `[3, 1, 5, 8]` → The `5` reaches its final locked position.\n" +
    "- **Pass 3:** `[1, 3, 5, 8]` → Fully sorted!",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "- **Best Case:** `O(n)` — when the array is already perfectly sorted, only one pass `(n)` is needed to confirm 0 swaps occurred.\n" +
    "- **Average Case:** `O(n²)` — elements generally need to be compared against almost every other element.\n" +
    "- **Worst Case:** `O(n²)` — the array is in perfectly reversed order and maximum exhaustive swapping must physically take place on every pass.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Strictly performs **in-place** sorting. It only uses a single momentary temporary variable to juggle swapped pairs, requiring virtually zero extra auxiliary heap allocations.",

  bestAndWorstCase:
    "**Best case** occurs when the input array is already sorted `[1, 2, 3, 4, 5]`. The iterator performs exactly one sweeping pass, detects no permutations were necessary, and gracefully yields a linear `O(n)` turnaround.\n\n" +
    "**Worst case** surfaces heavily when inputs arrive severely backward `[5, 4, 3, 2, 1]`. Every consecutive element strictly forces a discrete memory write swap across exhaustive nested loops, hitting terminal bounds `n(n-1)/2` comparisons.",

  realWorldUses: [
    "**Educational Academia:** The definitive baseline algorithm students build from scratch to inherently grasp array manipulation and iterative control flow.",
    "**Diagnostic Systems:** Phenomenally fast `O(n)` validation to instantaneously confirm if a dataset is already pristine.",
    "**Embedded Devices:** Extreme logic simplicity translates exceptionally well onto microcontrollers facing starkly constrained kilobyte constraints over nano-second speed requirements.",
    "**Graphics Pipelines:** Handling Z-index relative re-sorting where objects rarely leapfrog extensively.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Universally simple structural comprehension and trivial implementation difficulty.",
      "**Stable sort:** Guarantees it inherently preserves the absolute original insertion order of matching duplicate elements.",
      "**In-place permutation:** Mandates bare absolute minimum `O(1)` memory overhead.",
      "Hyper-adaptive processing yields early termination speeds seamlessly on nearly-sorted data vectors.",
    ],
    limitations: [
      "Mathematically indefensible `O(n²)` average processing completely disqualifies usage across scaled big-data volumes.",
      "Vastly outclassed globally by native engine sorts like `V8 Timsort`, Merge Sort, or optimized Quick Sort deployments.",
      "Shatters horribly under reversed structural payloads.",
    ],
  },

  whenToUseIt:
    "Deploy **Bubble Sort** only when operating across tightly bounded micro-arrays (Under ~50 discrete elements), actively processing data with high physical likelihood of near-perfection, or when constrained severely by code footprint allowances instead of sheer CPU horsepower.\n\nOtherwise, completely omit in favor of `O(n log n)` paradigms like **Merge Sort**.",
};
