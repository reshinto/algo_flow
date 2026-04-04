/**
 * Educational content for Spread Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Spread Sort. */
export const spreadSortEducational: EducationalContent = {
  overview:
    "**Spread Sort** is a hybrid distribution sorting algorithm that combines the strengths of bucket-based distribution with insertion sort's efficiency on nearly-sorted data. It was designed to achieve near-linear performance for typical inputs while maintaining predictable behavior for edge cases.\n\nThe key idea is to **spread elements across bins** proportional to their value within the range, sort each bin independently with insertion sort, then concatenate the results.",

  howItWorks:
    "Spread Sort works in three phases:\n\n" +
    "### Phase 1: Distribution\n" +
    "1. Find the minimum and maximum values in the array.\n" +
    "2. Create `binCount = ⌈√n⌉` bins to balance per-bin work.\n" +
    "3. Assign each element to a bin by its normalized position: `binIndex = ⌊(value - min) / range × binCount⌋`.\n" +
    "4. Each bin receives elements from a proportional slice of the value range.\n\n" +
    "### Phase 2: Per-Bin Sorting\n" +
    "5. For each non-empty bin, run insertion sort on its contents.\n" +
    "6. With √n bins and ~√n elements per bin, each bin sorts in `O(√n)` time on average.\n" +
    "7. Total per-bin work: `O(√n × √n) = O(n)` average.\n\n" +
    "### Phase 3: Collection\n" +
    "8. Write each sorted bin sequentially back to the output array.\n" +
    "9. Because bins are ordered by value range, the final array is globally sorted.\n\n" +
    "### Visualizing Spread Sort on [64, 34, 25, 12, 22, 11, 90]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    A[Input: 64 34 25 12 22 11 90] --> B[Distribute into 3 bins]\n" +
    "    B --> C[Bin 0 low: 11 12 25 22 34]\n" +
    "    B --> D[Bin 1 mid: 64]\n" +
    "    B --> E[Bin 2 high: 90]\n" +
    "    C --> F[Sort: 11 12 22 25 34]\n" +
    "    D --> G[Sort: 64]\n" +
    "    E --> H[Sort: 90]\n" +
    "    F --> I[Collect → 11 12 22 25 34 64 90]\n" +
    "    G --> I\n" +
    "    H --> I\n" +
    "```\n\n" +
    "- **Bin 0** (range 11–43): receives 11, 12, 25, 22, 34 → sorted to 11, 12, 22, 25, 34\n" +
    "- **Bin 1** (range 43–66): receives 64 → already sorted\n" +
    "- **Bin 2** (range 66–90): receives 90 → already sorted",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n)` — when elements are uniformly distributed, each bin has ~1 element and insertion sort is trivial.\n" +
    "- **Average Case:** `O(n·k/s + n·s)` where `s` is the bin count and `k` is elements per bin — approximately `O(n)` for uniform distributions with `s = √n`.\n" +
    "- **Worst Case:** `O(n²)` — when all elements fall into one bin, the insertion sort on that bin becomes quadratic.\n\n" +
    "**Space Complexity: `O(n + s)`**\n\n" +
    "The bins collectively hold all `n` elements, and there are `s = ⌈√n⌉` bin lists. Overall space is `O(n)` auxiliary.",

  bestAndWorstCase:
    "**Best case** is a uniformly distributed array: elements spread evenly across all bins, each bin contains roughly one element, and insertion sort completes instantly. Total work is linear.\n\n" +
    "**Worst case** is a highly skewed distribution — for example, all elements between 0 and 1 except one outlier at 1,000,000. All elements cluster in one bin, and insertion sort on that bin takes `O(n²)`. This can also happen with large numbers of duplicate values.\n\n" +
    "Spread Sort shares this distribution-sensitivity with Bucket Sort — both perform excellently on well-spread data but degrade on clustered inputs.",

  realWorldUses: [
    "**Log Aggregation:** Sorting timestamped log entries where timestamps are distributed across a known time window, with √n buckets per time slice.",
    "**Histogram Construction:** Pre-processing step when building histograms from uniformly distributed measurement data.",
    "**Geographic Data:** Sorting geographic coordinates (latitude/longitude) that naturally spread across a bounded range.",
    "**Financial Data:** Sorting transaction amounts within a known price range where uniform distribution is expected.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Near-linear average time:** `O(n)` average for uniformly distributed data with optimal bin count.",
      "**Adaptive bin count:** Using `⌈√n⌉` bins balances distribution and per-bin sort cost automatically.",
      "**Simple implementation:** Straightforward distribution + insertion sort combination without complex data structures.",
    ],
    limitations: [
      "**Distribution-dependent:** Performance degrades dramatically for skewed or clustered inputs.",
      "**Worst case `O(n²)`:** Identical or clustered elements cause all work to fall on one bin.",
      "**Auxiliary space:** Requires `O(n)` extra space for bin storage unlike in-place algorithms.",
      "**Not stable by default:** The collection phase preserves bin order but insertion sort within bins is stable — overall stability depends on careful implementation.",
    ],
  },

  whenToUseIt:
    "Use **Spread Sort** when you have numeric data with a **roughly uniform distribution** and need average-case linear performance with a simpler implementation than Flash Sort. It is especially useful when the value range and element count are known in advance, enabling optimal bin sizing.\n\nAvoid it for data with unknown distribution, many duplicate values, or adversarial inputs. For robust general-purpose sorting, prefer Timsort.",
};
