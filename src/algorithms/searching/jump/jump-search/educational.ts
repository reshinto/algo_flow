import type { EducationalContent } from "@/types";

export const jumpSearchEducational: EducationalContent = {
  overview:
    "**Jump Search** is a searching algorithm designed for sorted arrays that improves upon linear search by jumping ahead in fixed steps of size √n rather than scanning every element.\n\nAfter locating the block that may contain the target, it performs a backward linear scan within that block to pinpoint the exact position. This two-phase approach achieves O(√n) time complexity — faster than linear search but simpler to implement than binary search.",

  howItWorks:
    "1. Calculate the **block size** as `floor(√n)` where `n` is the array length.\n" +
    "2. **Jump forward** by `blockSize` steps, checking if `array[jumpEnd - 1] >= target`.\n" +
    "3. When a block boundary exceeds or equals the target, **stop jumping** — the target lives in the current block.\n" +
    "4. **Linear scan** backward through the block from `blockStart` to `min(jumpEnd, n)`.\n" +
    "5. If the exact value is found, return its index. Otherwise return `-1`.\n\n" +
    "### Jump Phase Visualization\n\n" +
    "```\n" +
    "Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]  target = 56\n" +
    "blockSize = floor(sqrt(10)) = 3\n\n" +
    "Jump 1: check index 2 (value 8)  → 8 < 56, jump again\n" +
    "Jump 2: check index 5 (value 23) → 23 < 56, jump again\n" +
    "Jump 3: check index 8 (value 72) → 72 >= 56, STOP\n\n" +
    "Linear scan: indices 6, 7 → found 56 at index 7\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["idx=2\\nval=8 < 56"] -->|"jump +3"| B["idx=5\\nval=23 < 56"]\n' +
    '  B -->|"jump +3"| C["idx=8\\nval=72 ≥ 56\\nSTOP"]\n' +
    '  C -->|"linear scan back"| D["idx=6 → 38"]\n' +
    '  D --> E["idx=7 → 56"]\n' +
    '  E --> F["✓ Found at index 7"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Jump phase leaps forward in √n steps; once a block boundary exceeds the target, a short backward linear scan pinpoints the exact position.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(√n)`**\n\n" +
    "- The jump phase performs at most `√n` jumps.\n" +
    "- The linear scan within the block also covers at most `√n` elements.\n" +
    "- Combined: `O(√n) + O(√n) = O(√n)` — better than O(n) linear search.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of index variables are used (`blockStart`, `jumpEnd`, `currentIndex`). No auxiliary data structures are allocated.",

  bestAndWorstCase:
    "**Best Case: `O(1)`** — The target is the first element of the first block checked (index `blockSize - 1` equals the target on the very first jump).\n\n" +
    "**Worst Case: `O(√n)`** — The target is in the last block or not present at all, requiring the maximum number of jumps plus a full block linear scan. For an array of 10,000 elements, this means at most ~200 comparisons total.",

  realWorldUses: [
    "**Sorted log files:** Quickly locating entries by timestamp when binary search overhead is undesirable.",
    "**Database index pages:** Scanning sorted B-tree leaf nodes in blocks that match disk page boundaries.",
    "**Embedded systems:** Where sqrt operations are cheaper than the recursive overhead of binary search implementations.",
    "**Monotone sequences:** Efficiently finding threshold crossings in sensor readings or time-series data.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Outperforms linear search with O(√n) complexity while remaining simpler than binary search to implement.",
      "Works well when jumping is cheap and the cost of revisiting elements (during linear scan) is low.",
      "Excellent cache locality during the linear scan phase since it accesses contiguous memory.",
    ],
    limitations: [
      "Requires the array to be sorted — cannot be used on unsorted data.",
      "Slower than binary search O(log n) for large arrays; the gap widens as n grows.",
      "The optimal block size of √n must be recomputed if the array size changes.",
    ],
  },

  whenToUseIt:
    "Use **Jump Search** when your data is sorted and you want a straightforward implementation that beats linear search without the complexity of binary search. It is particularly effective when the cost of jumping backward is higher than moving forward — making a single backward linear scan more efficient than repeated bisection.\n\nAvoid it when the array is unsorted, when O(log n) performance is required for large datasets, or when you need to handle frequent insertions that would invalidate the sorted order.",
};
