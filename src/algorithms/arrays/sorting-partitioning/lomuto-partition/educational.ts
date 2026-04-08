import type { EducationalContent } from "@/types";

export const lomutoPartitionEducational: EducationalContent = {
  overview:
    "**Lomuto Partition** is a partition scheme used as the core step in QuickSort. " +
    "It selects the **last element** as the pivot and uses a single boundary pointer to maintain two regions: " +
    "elements less than or equal to the pivot on the left, and elements greater than the pivot on the right. " +
    "After scanning the entire subarray, the pivot is swapped into the boundary position — its final sorted location. " +
    "The algorithm runs in `O(n)` time and `O(1)` space.",

  howItWorks:
    "1. Choose the **last element** as the pivot.\n" +
    "2. Initialize a `boundaryIndex = 0` pointing to where the next small element will land.\n" +
    "3. Scan `scanIndex` from `0` to `n - 2` (excluding the pivot):\n" +
    "   * If `arr[scanIndex] <= pivot`: swap `arr[scanIndex]` with `arr[boundaryIndex]` and advance `boundaryIndex`.\n" +
    "   * Otherwise: skip — the element stays in the right region.\n" +
    "4. After the scan, swap the pivot (`arr[n-1]`) with `arr[boundaryIndex]`.\n" +
    "5. The pivot is now at `boundaryIndex` — everything to its left is `<= pivot`, everything to its right is `> pivot`.\n\n" +
    "### The Key Insight\n\n" +
    "`boundaryIndex` is the cursor separating the two partitions. Each time a small element is found, " +
    "it is compacted to the left boundary, keeping the two regions contiguous at all times.\n\n" +
    "### Walkthrough with `[8, 3, 6, 1, 5, 9, 2, 7]` (pivot = 7)\n\n" +
    "| scanIndex | arr[scan] | <= 7? | Action                   | boundaryIndex |\n" +
    "|-----------|-----------|-------|--------------------------|---------------|\n" +
    "| 0         | 8         | no    | skip                     | 0             |\n" +
    "| 1         | 3         | yes   | swap(0, 1) → [3, 8, ...]  | 1             |\n" +
    "| 2         | 6         | yes   | swap(1, 2) → [3, 6, 8, ...]| 2            |\n" +
    "| 3         | 1         | yes   | swap(2, 3) → [3, 6, 1, 8, ...]| 3         |\n" +
    "| 4         | 5         | yes   | swap(3, 4) → [3, 6, 1, 5, 8, ...]| 4      |\n" +
    "| 5         | 9         | no    | skip                     | 4             |\n" +
    "| 6         | 2         | yes   | swap(4, 6) → [3, 6, 1, 5, 2, 9, 8, ...]| 5 |\n" +
    "| end       | —         | —     | swap pivot(7) with idx 5 | —             |\n\n" +
    "**Result**: `[3, 6, 1, 5, 2, 7, 8, 9]` — pivot 7 is at index 5.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["3"] --> B["6"] --> C["1"] --> D["5"] --> E["2"] --> F["7"] --> G["8"] --> H["9"]\n' +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style C fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#06b6d4,stroke:#0891b2\n" +
    "  style H fill:#06b6d4,stroke:#0891b2\n" +
    '  P["pivot=7\\nfinal pos"] -. placed .-> F\n' +
    "```\n\n" +
    "Green = elements ≤ pivot (left partition), amber = pivot in its final sorted position, cyan = elements > pivot (right partition). " +
    "The pivot will never move again.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** per partition call\n\n" +
    "The scan loop visits every element exactly once. When used recursively in QuickSort:\n" +
    "- **Average case**: `O(n log n)` — balanced pivots split the array roughly in half each level.\n" +
    "- **Worst case**: `O(n²)` — a sorted or reverse-sorted array causes maximally unbalanced splits " +
    "(the pivot is always the smallest or largest element).\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The partition itself uses only a constant number of variables. " +
    "QuickSort as a whole uses `O(log n)` stack space on average and `O(n)` in the worst case due to recursion.",

  bestAndWorstCase:
    "**Best case for a single partition: `O(n)`** — always linear regardless of input.\n\n" +
    "**For QuickSort using Lomuto:**\n\n" +
    "- **Best case `O(n log n)`**: The pivot always lands at the exact midpoint, producing balanced halves.\n" +
    "- **Average case `O(n log n)`**: Random pivots yield roughly balanced splits in expectation.\n" +
    "- **Worst case `O(n²)`**: Already-sorted, reverse-sorted, or all-equal arrays cause one partition " +
    "to always contain zero elements. This is a known weakness of the Lomuto scheme with a fixed-position pivot.\n\n" +
    "### Lomuto vs. Hoare Partition\n\n" +
    "| Property             | Lomuto                     | Hoare                      |\n" +
    "|----------------------|----------------------------|----------------------------|\n" +
    "| Pivot position       | Last element               | First element (or middle)  |\n" +
    "| Pointer count        | One boundary pointer       | Two converging pointers    |\n" +
    "| Swaps on average     | ~3× more swaps             | ~3× fewer swaps            |\n" +
    "| Pivot in final place | Yes, after partition        | No — requires extra care   |\n" +
    "| Implementation ease  | Simpler and more intuitive | More complex               |\n\n" +
    "Hoare's scheme is more efficient in practice (fewer swaps), but Lomuto is easier to teach and implement correctly.",

  realWorldUses: [
    "**QuickSort Partition Step:** Lomuto partition is the textbook implementation of the core QuickSort partition, taught in algorithms courses worldwide.",
    "**Selection Algorithms:** `QuickSelect` (finding the k-th smallest element in `O(n)` average) reuses the partition step directly without full sorting.",
    "**In-place Data Grouping:** Separating items passing a threshold (e.g., transactions above/below a value) into two contiguous groups in one pass.",
    "**Competitive Programming:** A simple, reliable partition for custom sort/selection problems where implementation clarity matters.",
    "**Database Query Engines:** Internal partition operations for in-memory sort routines in query optimizers.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple to implement correctly — a single pointer and a clean invariant.",
      "Puts the pivot in its exact final sorted position after one pass.",
      "Forms the intuitive foundation for understanding QuickSort and QuickSelect.",
      "`O(1)` auxiliary space — the partition is fully in-place.",
      "Works well with random pivot selection strategies to mitigate worst-case input.",
    ],
    limitations: [
      "Performs ~3× more swaps than Hoare's partition scheme on average.",
      "Worst-case `O(n²)` for QuickSort when input is sorted or reverse-sorted with fixed pivot.",
      "Choosing the last element as pivot without shuffling is a poor strategy for nearly-sorted data.",
      "Not stable — relative order of equal elements is not preserved.",
      "The right partition elements are not confirmed sorted — only the pivot's position is settled.",
    ],
  },

  whenToUseIt:
    "Use **Lomuto Partition** when you need a clear, teachable partition implementation or when implementing " +
    "QuickSelect to find order statistics (k-th smallest/largest element) in `O(n)` average time.\n\n" +
    "For production QuickSort, prefer **randomized pivot selection** (shuffle the array first, or pick a random index) " +
    "to avoid worst-case `O(n²)` on sorted inputs.\n\n" +
    "**Consider Hoare's partition** when minimizing swap count matters — it performs roughly 3× fewer swaps " +
    "at the cost of added implementation complexity.\n\n" +
    "**Do not use** when sort stability is required — merge sort or TimSort are the right choices then.",
};
