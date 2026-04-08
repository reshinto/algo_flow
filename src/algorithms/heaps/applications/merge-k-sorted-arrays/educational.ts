import type { EducationalContent } from "@/types";

export const mergeKSortedArraysEducational: EducationalContent = {
  overview:
    "**Merge K Sorted Arrays** combines `k` individually sorted arrays into a single sorted array. A naive approach would concatenate all arrays and sort — `O(N log N)` — but maintaining a min-heap of exactly `k` active pointers reduces this to `O(N log k)`, where `N` is the total number of elements.\n\n" +
    "Since `k` is typically much smaller than `N`, this is a significant improvement for large inputs — and it works as a streaming algorithm, able to handle arrays that don't all fit in memory at once.",

  howItWorks:
    "The algorithm uses a min-heap to always find the globally smallest element across all k arrays in `O(log k)` time:\n\n" +
    "**Phase 1 — Initialize:** Insert the first element of each array into the min-heap as a `(value, arrayIndex, elementIndex)` triple. This takes `O(k log k)`.\n\n" +
    "**Phase 2 — Extract and advance:**\n" +
    "1. Extract the minimum from the heap (the globally smallest remaining element).\n" +
    "2. Append it to the result.\n" +
    "3. If the extracted element's array has a next element, insert that element into the heap and sift down.\n" +
    "4. If the array is exhausted, remove the heap entry and sift down.\n" +
    "5. Repeat until the heap is empty.\n\n" +
    "Each of the `N` total elements is inserted and extracted exactly once, each in `O(log k)` time.\n\n" +
    "### Example: [[1,4,7], [2,5,8], [3,6,9]]\n\n" +
    "```\n" +
    "Initial heap: [(1,arr0,0), (2,arr1,0), (3,arr2,0)]\n\n" +
    "Extract 1 → insert 4 → heap: [(2,arr1,0),(4,arr0,1),(3,arr2,0)]\n" +
    "                           → sift: [(2,arr1,0),(4,arr0,1),(3,arr2,0)]\n" +
    "Extract 2 → insert 5 → heap: [(3,arr2,0),(4,arr0,1),(5,arr1,1)]\n" +
    "Extract 3 → insert 6 → heap: [(4,arr0,1),(6,arr2,1),(5,arr1,1)]\n" +
    "Extract 4 → insert 7 → ...\n\n" +
    "Result: [1, 2, 3, 4, 5, 6, 7, 8, 9]\n" +
    "```\n\n" +
    "### Min-Heap — After Extracting 1 and Inserting 4\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    v2("2\\narr1[0]") --> v4("4\\narr0[1]")\n' +
    '    v2 --> v3("3\\narr2[0]")\n' +
    "    style v2 fill:#06b6d4,stroke:#0891b2\n" +
    "    style v3 fill:#14532d,stroke:#22c55e\n" +
    "    style v4 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "The root (cyan) is value 2 from array 1 — the globally smallest remaining element. The amber node (4) was just advanced from array 0 after extracting 1. Each leaf represents the current front of a different source array.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(N log k)`**\n\n" +
    "Where `N` is the total number of elements across all arrays and `k` is the number of arrays. Initial heap construction is `O(k log k)`. Each of the `N` extract-insert cycles costs `O(log k)` for sift operations. Total: `O(k log k + N log k) = O(N log k)`.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The heap holds at most `k` entries at any time — one per array. The output array of size `N` is not counted as extra space since it is the return value.",

  bestAndWorstCase:
    "**Best case — `O(N)`:** When `k = 1`, there is only one array. The heap has one entry throughout and the sift is instantaneous — result is just a copy.\n\n" +
    "**Typical case — `O(N log k)`:** With multiple arrays of comparable sizes, each element triggers one extract and at most one insert, each costing `O(log k)`.\n\n" +
    "**Worst case — `O(N log k)`:** All `N` elements must be processed. When `k = N` (each array has one element), this becomes `O(N log N)` — equivalent to a sort, which is optimal for a comparison-based merge.",

  realWorldUses: [
    "**External merge sort:** When sorting data too large for RAM, split into sorted runs on disk and merge them with a k-way heap merge.",
    "**Database query merging:** Merge multiple sorted result sets from distributed database shards into a single sorted response.",
    "**Log aggregation:** Combine time-ordered log streams from multiple servers into a single chronological event stream.",
    "**Distributed search:** Merge ranked result lists from multiple search index shards into one globally ranked list.",
    "**Streaming data pipelines:** Merge multiple time-series data streams (stock ticks, sensor readings) maintaining overall sorted order.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(N log k) time — dramatically faster than O(N log N) sort when k ≪ N.",
      "O(k) heap space — memory usage is bounded by the number of arrays, not total elements.",
      "Streaming-friendly — can process one element at a time without loading all arrays into memory.",
    ],
    limitations: [
      "Requires all individual arrays to be pre-sorted — unsorted input produces incorrect results.",
      "The heap adds overhead compared to a simple two-way merge when k = 2; use a direct merge then.",
      "Equal elements from different arrays may emerge in arbitrary relative order (not stable across arrays).",
    ],
  },

  whenToUseIt:
    "Use merge k sorted arrays whenever you have multiple pre-sorted data sources that must be combined into a single sorted output. It is the core technique in external sorting, distributed systems data aggregation, and multi-source streaming pipelines. If you have only two arrays to merge, a simple linear two-pointer merge is simpler and equally fast. If the arrays are not pre-sorted, sort each one first or use a full sort on the concatenated data.",
};
