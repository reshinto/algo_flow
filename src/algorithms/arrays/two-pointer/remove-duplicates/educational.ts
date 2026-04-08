import type { EducationalContent } from "@/types";

export const removeDuplicatesEducational: EducationalContent = {
  overview:
    "**Remove Duplicates from Sorted Array** is a classic in-place technique that eliminates consecutive duplicate values from a pre-sorted array, returning the count of unique elements and the de-duplicated prefix.\n\n" +
    "Because the input is sorted, all duplicates are always *adjacent*. A **two-pointer** strategy exploits this: a *write pointer* tracks the boundary of confirmed unique values, and a *read pointer* advances to discover the next distinct element. Only when a new unique value is found does the write pointer advance and accept the new element.",

  howItWorks:
    "1. If the array is empty, return `uniqueCount = 0` immediately.\n" +
    "2. Initialize `writePointer = 0`. The first element is always unique.\n" +
    "3. Scan with `readPointer` from index `1` to the end:\n" +
    "   - If `array[readPointer] !== array[writePointer]`, a **new unique value** has been found.\n" +
    "     * Advance `writePointer` and copy the new value there.\n" +
    "   - If they are equal, the element is a **duplicate** — advance `readPointer` only.\n" +
    "4. The unique count is `writePointer + 1`. The result occupies indices `0` through `writePointer`.\n\n" +
    "### Two-Pointer Trace (`[1, 1, 2, 2, 3]`)\n\n" +
    "```\n" +
    "Start: write=0  [1*, 1, 2, 2, 3]\n" +
    "read=1: arr[1]=1 == arr[0]=1 → duplicate, skip\n" +
    "read=2: arr[2]=2 != arr[0]=1 → unique! write→1, copy 2  [1, 2*, 2, 2, 3]\n" +
    "read=3: arr[3]=2 == arr[1]=2 → duplicate, skip\n" +
    "read=4: arr[4]=3 != arr[1]=2 → unique! write→2, copy 3  [1, 2, 3*, 2, 3]\n" +
    "Result: uniqueCount=3, result=[1, 2, 3]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["1"] --> B["1"] --> C["2"] --> D["2"] --> E["3"]\n' +
    '  A -->|"write=0"| F["1"]\n' +
    '  C -->|"unique → write=1"| G["2"]\n' +
    '  E -->|"unique → write=2"| H["3"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#06b6d4,stroke:#0891b2\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#06b6d4,stroke:#0891b2\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "  style H fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Input `[1, 1, 2, 2, 3]`: cyan elements are unique values accepted by the write pointer; amber elements are duplicates skipped by the read pointer. Green shows the resulting de-duplicated prefix `[1, 2, 3]`.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- **Best / Average / Worst Case:** `O(n)` — The read pointer visits every element exactly once. Even if there are zero duplicates (best case) or all elements are identical (worst case), the single scan always runs in linear time.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The algorithm operates directly on the input array using only two integer pointers. No auxiliary array or hash set is required — the key insight is that sorting guarantees adjacency of duplicates.",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** Every element is unique. The write pointer advances in lock-step with the read pointer, performing a copy at each step — but no extra passes occur.\n\n" +
    "**Worst Case — `O(n)`:** All elements are identical (e.g., `[5, 5, 5, 5, 5]`). The read pointer scans the entire array but the write pointer never moves past index `0`. Comparisons are maximized but the algorithm still runs in `O(n)`.\n\n" +
    "The two-pointer approach is strictly better than nested-loop brute force, which would require `O(n²)` to shift elements after each duplicate removal.",

  realWorldUses: [
    "**Database Query Results:** Deduplicating sorted result sets from an ORDER BY query before rendering or further aggregation.",
    "**Log Deduplication:** Stripping repeated consecutive log lines in sorted log files during post-processing or ingestion pipelines.",
    "**Sorted Set Operations:** Implementing a sorted unique-element collection by deduplicating after a sort — the foundational step for `UNION` and `INTERSECT` operations.",
    "**Version Control Diff:** Identifying unique changed lines in a sorted diff output before computing change summaries.",
    "**Autocomplete Indexes:** Cleaning sorted word lists by removing duplicates before building a trie or binary search index.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time and `O(1)` space — no hash set or extra array required.",
      "Leverages the sorted invariant to detect duplicates via a single adjacency comparison.",
      "Extremely simple implementation — just two pointers and a conditional copy.",
      "In-place modification avoids memory allocation pressure in constrained environments.",
    ],
    limitations: [
      "Requires the input array to be **sorted** — applying this to an unsorted array will miss non-adjacent duplicates.",
      "Modifies the original array in-place; callers must be aware the tail beyond `uniqueCount` contains stale data.",
      "For unsorted arrays, a hash set approach at `O(n)` time / `O(n)` space is needed instead.",
    ],
  },

  whenToUseIt:
    "Use **Remove Duplicates (Sorted)** whenever you have a **sorted** sequence and need to reduce it to its unique elements in `O(1)` extra space. This is the canonical approach for LeetCode #26 and similar in-place deduplication problems.\n\n" +
    "If the array is **unsorted**, sort it first (`O(n log n)`) and then apply this technique — or use a `Set` for a one-pass `O(n)` / `O(n)` solution. If you need to preserve the original array untouched, copy it before deduplication.",
};
