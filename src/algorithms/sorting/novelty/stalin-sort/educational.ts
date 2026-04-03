/**
 * Educational content for Stalin Sort.
 */
import type { EducationalContent } from "@/types";

export const stalinSortEducational: EducationalContent = {
  overview:
    "**Stalin Sort** is a satirical sorting algorithm that achieves `O(n)` time by simply eliminating any element that is out of order rather than moving it. Named after Joseph Stalin's infamous purges, it 'solves' the sorting problem by reducing the dataset until the remaining elements are already sorted.\n\nThe output is shorter than the input — this is not a traditional sort. It is a filter that keeps only the longest non-decreasing prefix of element-by-element maxima.",

  howItWorks:
    "### The Algorithm\n" +
    "1. Keep the first element (it always survives).\n" +
    "2. For each subsequent element:\n" +
    "   - If it is ≥ the current maximum: **keep it** (update maximum).\n" +
    "   - If it is < the current maximum: **eliminate it** (discard from output).\n" +
    "3. Return only the surviving elements.\n\n" +
    "### Example: Stalin Sort on [3, 1, 2]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["3"] -->|"Keep (max=3)"| B["1"]\n' +
    '    B -->|"1 < 3 → Eliminate"| C["2"]\n' +
    '    C -->|"2 < 3 → Eliminate"| D["Result: [3]"]\n' +
    "    style A fill:#14532d,stroke:#22c55e\n" +
    "    style B fill:#7f1d1d,stroke:#ef4444\n" +
    "    style C fill:#7f1d1d,stroke:#ef4444\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- Start: max = 3 (keep 3)\n" +
    "- 1 < 3 → eliminated\n" +
    "- 2 < 3 → eliminated\n" +
    "- Result: `[3]` — a sorted array of length 1!",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- A single linear pass through the array.\n" +
    "- **Best Case:** `O(n)` — even a pre-sorted array requires a full pass.\n" +
    "- **Average Case:** `O(n)` — always a single scan.\n" +
    "- **Worst Case:** `O(n)` — constant regardless of input order.\n\n" +
    "**Space Complexity: `O(n)`** — for the output array of surviving elements.",

  bestAndWorstCase:
    "**Best case for output size:** `O(n)` surviving elements — when the input is already sorted, all elements survive.\n\n" +
    "**Worst case for output size:** `O(1)` surviving elements — a reverse-sorted array like `[5, 4, 3, 2, 1]` produces only `[5]`; every element after the first is smaller than the maximum.\n\n" +
    "The algorithm is always `O(n)` in time regardless of output size — the elimination happens in a single pass.",

  realWorldUses: [
    "**Streaming data filtering:** The core concept (keep elements that maintain monotonic order) is used in real streaming algorithms that track running maximums.",
    "**Online algorithms:** Variants of this pattern appear in algorithms that process data one element at a time without revisiting.",
    "**Satirical education:** Teaches that 'sorting' can be trivially solved if you are willing to delete inconvenient data.",
    "**Data quality pipelines:** Monotonic filter passes are used in sensor data smoothing.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**O(n) time:** Fastest possible single-pass sort-like operation.",
      "**Simple implementation:** One loop, one comparison, one decision.",
      "**Streaming compatible:** Can sort a stream without buffering the entire input.",
    ],
    limitations: [
      "**Destroys data:** Eliminates elements rather than reordering them — produces a shorter array.",
      "**Not a real sort:** The output is not a permutation of the input.",
      "**Worst case output:** A reverse-sorted array reduces to a single element.",
    ],
  },

  whenToUseIt:
    "Use the Stalin Sort concept when you need to filter a sequence to only keep elements that maintain monotonic ordering — for example, extracting a non-decreasing subsequence from streaming sensor data.\n\nDo not use it when you need all input elements to appear in the output. For actual sorting, use any standard `O(n log n)` algorithm.",
};
