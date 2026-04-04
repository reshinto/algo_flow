/**
 * Educational content for Bucket Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Bucket Sort. */
export const bucketSortEducational: EducationalContent = {
  overview:
    "**Bucket Sort** is a distribution sorting algorithm that divides the input range into a fixed number of equally-sized buckets, distributes each element into the appropriate bucket, sorts each bucket individually, and then concatenates the buckets to produce the final sorted output.\n\nIt achieves linear average-case performance when input is uniformly distributed across the range.",

  howItWorks:
    "Bucket Sort operates in four distinct phases:\n\n" +
    "### Phase 1 — Initialize\n" +
    "Determine the value range and create `n` empty buckets, each representing a sub-range of values.\n\n" +
    "### Phase 2 — Distribute\n" +
    "Map each element to a bucket using its normalized position: `bucket = floor((value - min) / range * n)`.\n\n" +
    "### Phase 3 — Sort Buckets\n" +
    "Apply insertion sort (or any stable sort) within each bucket. Buckets are small when input is uniform.\n\n" +
    "### Phase 4 — Collect\n" +
    "Concatenate all buckets in order to produce the sorted array.\n\n" +
    "### Visualizing Bucket Sort on [64, 34, 25, 12, 22, 11, 90]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    A[11 12 22 25 34 64 90] -->|distribute| B0[bucket 0: 11 12]\n" +
    "    A -->|distribute| B1[bucket 1: 22 25]\n" +
    "    A -->|distribute| B2[bucket 2: 34]\n" +
    "    A -->|distribute| B3[bucket 3: 64]\n" +
    "    A -->|distribute| B4[bucket 4: 90]\n" +
    "    B0 --> C[11 12 22 25 34 64 90]\n" +
    "    B1 --> C\n" +
    "    B2 --> C\n" +
    "    B3 --> C\n" +
    "    B4 --> C\n" +
    "    style C fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n + k)` — when elements are uniformly distributed and each bucket has exactly one element.\n" +
    "- **Average Case:** `O(n + k)` — holds for uniformly distributed inputs across `n` buckets.\n" +
    "- **Worst Case:** `O(n²)` — when all elements fall into a single bucket, degrading to the inner sort's complexity.\n\n" +
    "Where `k` = number of buckets (typically `n`).\n\n" +
    "**Space Complexity: `O(n + k)`**\n\n" +
    "The buckets collectively store all `n` elements plus `k` bucket list overhead.",

  bestAndWorstCase:
    "**Best case** is `O(n + k)` when input is uniformly distributed. Each of the `n` buckets receives exactly one element, so the inner sort is `O(1)` per bucket and total time is linear.\n\n" +
    "**Worst case** is `O(n²)` when all elements cluster in one bucket — for example, when all input values are equal. In this case, the single bucket contains all `n` elements and insertion sort on it takes `O(n²)`. Choosing a better inner sort (e.g., merge sort) elevates the worst case to `O(n log n)`.",

  realWorldUses: [
    "**Uniform floating-point distributions:** Sorting numbers in `[0, 1)` with known uniform distribution achieves `O(n)` average time.",
    "**Histogram construction:** Bucketing values into ranges is equivalent to building a histogram for data visualization.",
    "**External sorting:** Data too large for RAM can be partitioned into buckets that fit in memory, sorted independently, then merged.",
    "**Parallel sorting:** Each bucket can be sorted independently on a separate processor, achieving near-linear parallel performance.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Linear average time** for uniformly distributed inputs — better than any comparison sort.",
      "**Naturally parallelizable** — each bucket is independent and can be sorted concurrently.",
      "**Flexible inner sort** — choose insertion sort for small buckets, merge sort for large ones.",
    ],
    limitations: [
      "**Worst-case `O(n²)`** if input clusters in one bucket — distribution quality is critical.",
      "Requires knowledge of value range to allocate buckets efficiently.",
      "**Not in-place:** Bucket arrays consume `O(n + k)` additional memory.",
    ],
  },

  whenToUseIt:
    "Use **Bucket Sort** when input values are uniformly (or near-uniformly) distributed over a known, bounded range. It is especially effective for floating-point numbers in `[0, 1)` and integer arrays where the distribution is predictable.\n\nAvoid it when the distribution is heavily skewed (many elements in the same bucket), when the range is unknown, or when memory is tightly constrained.",
};
