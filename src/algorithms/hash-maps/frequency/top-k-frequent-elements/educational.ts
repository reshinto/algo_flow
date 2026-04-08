import type { EducationalContent } from "@/types";

export const topKFrequentElementsEducational: EducationalContent = {
  overview:
    "**Top K Frequent Elements** returns the `k` elements that appear most often in an array. A brute-force sort of all elements by frequency costs `O(n log n)`, but combining a **frequency map** with **bucket sort** achieves `O(n)` time.\n\nFirst build a count for every element, then use the count as an index into a bucket array. Iterating the buckets from highest to lowest collects the top `k` without ever sorting.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Phase 1 — Build frequency map**\n" +
    "Iterate every number and increment its count in a hash map. Each update is `O(1)`, so the phase is `O(n)` total.\n\n" +
    "**Phase 2 — Bucket sort extraction**\n" +
    "Create a `buckets` array of size `n + 1` where `buckets[freq]` holds all numbers that appeared exactly `freq` times. Scan from `buckets[n]` down to `buckets[1]`, appending numbers to the result until `k` are collected.\n\n" +
    "### Example: `numbers = [1, 1, 1, 2, 2, 3]`, `k = 2`\n\n" +
    "```\n" +
    "freq_map: { 1: 3, 2: 2, 3: 1 }\n" +
    "buckets:  [[], [], [3], [2], [], [], [1]]\n" +
    "          idx: 0   1    2    3   4   5   6\n" +
    "scan from bucket[6] → collect 1, bucket[3] → collect 2, done\n" +
    "result: [1, 2]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["[1,1,1,2,2,3] k=2"]:::input --> B["freq: {1:3, 2:2, 3:1}"]\n' +
    '  B --> C["buckets[3] ← 1"]:::checking\n' +
    '  B --> D["buckets[2] ← 2"]:::checking\n' +
    '  B --> E["buckets[1] ← 3"]:::checking\n' +
    '  C --> F["collect 1 (1 of 2)"]:::found\n' +
    '  D --> G["collect 2 (2 of 2) → done"]:::found\n' +
    '  F --> H["result: [1, 2]"]:::found\n' +
    "  G --> H\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706\n" +
    "  classDef found fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Scanning buckets from the highest index down collects results in descending frequency order. Extraction stops as soon as `k` elements are gathered, so the scan rarely reaches `buckets[1]`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Building the frequency map is one linear pass. Filling and scanning the bucket array (size `n + 1`) is also `O(n)`. No sorting is needed.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The frequency map holds at most `n` entries, and the bucket array has `n + 1` slots.",

  bestAndWorstCase:
    "**Best case** — all elements are identical: the frequency map has one entry and the bucket array is scanned once in `O(n)` time.\n\n" +
    "**Worst case** — all elements are distinct: the frequency map has `n` entries, each with count 1, all packed into `buckets[1]`. Scanning still finishes in `O(n)` time, so the bucket-sort approach has no pathological worst case.",

  realWorldUses: [
    "**Analytics dashboards:** Surfacing the top-k most visited pages, most-used features, or busiest time slots from event logs.",
    "**Search autocomplete:** Ranking candidate completions by query frequency to show the most relevant suggestions first.",
    "**Recommendation systems:** Identifying the k items most frequently co-purchased or co-viewed with a seed item.",
    "**Log analysis:** Quickly spotting the k most common error codes or IP addresses in large log files.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — faster than sorting-based approaches for large inputs.",
      "Two-phase structure is easy to reason about and implement correctly.",
      "Bucket sort avoids comparison overhead and handles duplicate frequencies naturally.",
    ],
    limitations: [
      "O(n) extra space for the frequency map and bucket array.",
      "Requires the input to fit in memory — streaming variants need different data structures.",
      "When k is very small and n is large, a min-heap approach may use less space (O(k) vs O(n)).",
    ],
  },

  whenToUseIt:
    "Use the frequency map + bucket sort pattern when you need the top-k elements and `O(n)` time matters more than `O(n)` space. If `k` is much smaller than `n` and space is at a premium, a min-heap of size `k` achieves `O(n log k)` time with only `O(k)` extra space.",
};
