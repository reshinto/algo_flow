import type { EducationalContent } from "@/types";

export const quickselectEducational: EducationalContent = {
  overview:
    "**Quickselect** finds the K-th smallest element in an unsorted array in `O(n)` average time without fully sorting the array.\n\n" +
    "It applies the same Lomuto partition as Quicksort but recurses on only **one half** — the half that contains the target rank. " +
    "This halving of the problem on each recursion (on average) is why the expected work is `O(n)` rather than the `O(n log n)` of a full sort.",

  howItWorks:
    "1. Choose a **pivot** (the last element in the current range — Lomuto scheme).\n" +
    "2. **Partition** the range: rearrange elements so all values ≤ pivot are to its left, all values > pivot are to its right. " +
    "   The pivot lands at its final sorted position `pivotIndex`.\n" +
    "3. **Compare** `pivotIndex` with `targetIndex = k - 1` (0-based):\n" +
    "   - If equal: `arr[pivotIndex]` is the k-th smallest — done.\n" +
    "   - If `targetIndex < pivotIndex`: recurse on the **left** sub-range `[rangeStart, pivotIndex - 1]`.\n" +
    "   - If `targetIndex > pivotIndex`: recurse on the **right** sub-range `[pivotIndex + 1, rangeEnd]`.\n" +
    "4. Each recursive call processes a strictly smaller range.\n\n" +
    "The Lomuto partition itself scans the range once from left to right, using a `boundaryIndex` to separate elements ≤ pivot from those > pivot.\n\n" +
    "### Example: find 3rd smallest in `[7, 2, 1, 6, 5]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["1"] --> B["2"] --> C["5"] --> D["6"] --> E["7"]\n' +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#06b6d4,stroke:#0891b2\n" +
    "  style E fill:#06b6d4,stroke:#0891b2\n" +
    '  K["k=3 → index 2"] -. target .-> C\n' +
    '  P["pivot lands\\nat index 2"] -. done .-> C\n' +
    "```\n\n" +
    "After one partition pass, pivot `5` lands at index 2 (0-based) — exactly the 3rd smallest. " +
    "Green elements are confirmed smaller; cyan elements are confirmed larger. No further recursion needed.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)` average, `O(n²)` worst**\n\n" +
    "- **Average case:** Each partition roughly halves the remaining range. Total work: `n + n/2 + n/4 + ... = O(2n) = O(n)`.\n" +
    "- **Worst case:** Pivot always lands at one extreme (e.g., already-sorted input with Lomuto). Total work: `n + (n-1) + ... = O(n²)`.\n" +
    "  Median-of-three or random pivot selection makes the worst case extremely unlikely.\n\n" +
    "**Space Complexity: `O(log n)` average** (recursive call stack), **`O(n)` worst** (degenerate recursion depth). " +
    "An iterative implementation achieves true `O(1)` auxiliary space.",

  bestAndWorstCase:
    "**Best case — `O(n)`:** The pivot always lands exactly at `targetIndex`. Only one partition pass of the full array is needed.\n\n" +
    "**Average case — `O(n)`:** With a random or median-of-three pivot, the expected recurrence is `T(n) = T(n/2) + O(n)`, which resolves to `O(n)`.\n\n" +
    "**Worst case — `O(n²)`:** Occurs when the pivot is always the minimum or maximum of the current range (e.g., sorted input with last-element pivot). " +
    "The range shrinks by only 1 each step: `T(n) = T(n-1) + O(n) = O(n²)`. " +
    "Random pivot selection or the Floyd-Rivest algorithm reduces this to an extremely rare event.\n\n" +
    "For guaranteed `O(n)` worst-case, the **Median-of-Medians** algorithm achieves this at the cost of a larger constant factor.",

  realWorldUses: [
    "**Database engines:** Finding the median value for query optimization statistics without a full sort.",
    "**Order statistics:** Efficiently computing percentiles (e.g., P95, P99 latency) in large datasets.",
    "**Machine learning:** Finding the k nearest neighbors by distance rank, or the k-th largest feature value for feature selection.",
    "**Graphics rendering:** Finding the k-th depth value for efficient depth-of-field computation in ray tracing.",
    "**Distributed systems:** Computing approximate global quantiles across partitioned datasets by running Quickselect on sampled data.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Expected `O(n)` time — faster than any sorting-based approach (`O(n log n)`) for single rank queries.",
      "In-place partitioning — `O(1)` auxiliary space (with an iterative implementation).",
      "Conceptually simple: direct adaptation of Quicksort's partition step.",
      "Easily extended to find the top-K smallest or largest elements by recursing into both halves at the boundary.",
    ],
    limitations: [
      "`O(n²)` worst case with a naïve pivot choice — mitigate with random pivot or median-of-three.",
      "Not stable — relative order of equal elements is not preserved.",
      "Modifies the input array in place; a copy must be made if the original order must be preserved.",
      "Median-of-Medians achieves guaranteed `O(n)` but with a large constant — in practice Quickselect with random pivot is preferred.",
    ],
  },

  whenToUseIt:
    "Use Quickselect when you need the **k-th smallest (or largest) element** from an unsorted collection and do not need the collection to be fully sorted afterward.\n\n" +
    "Use a **min-heap of size k** instead when you need the top-K elements in sorted order or when the input is a stream. " +
    "Use **Median-of-Medians** when you need a guaranteed `O(n)` worst-case bound (e.g., safety-critical systems). " +
    "Use a full sort only when you need the entire sorted sequence — not just a single rank.",
};
