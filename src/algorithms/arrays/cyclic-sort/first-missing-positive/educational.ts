import type { EducationalContent } from "@/types";

export const firstMissingPositiveEducational: EducationalContent = {
  overview:
    "**First Missing Positive** finds the smallest positive integer absent from an unsorted array in **O(n)** time and **O(1)** extra space.\n\n" +
    "The key observation is that the answer must lie in the range `[1, n+1]` — if all of `1..n` are present, the answer is `n+1`. This bounds the search and lets us use the array indices themselves as a presence map, placing each value `v` at index `v-1` through in-place swaps.",

  howItWorks:
    "### Phase 1: Index-as-Value Placement\n\n" +
    "For each index `i`, repeatedly swap `arr[i]` toward its correct index `arr[i] - 1` as long as:\n" +
    "- `1 ≤ arr[i] ≤ n` (value is in the valid range), and\n" +
    "- `arr[arr[i] - 1] ≠ arr[i]` (it is not already in its correct slot).\n\n" +
    "After this phase, every valid value that can be placed is at index `value - 1`.\n\n" +
    "### Phase 2: First Mismatch Scan\n\n" +
    "Scan left to right. The first index `i` where `arr[i] ≠ i + 1` reveals the answer: `i + 1`.\n" +
    "If no mismatch is found, every position `1..n` is filled and the answer is `n + 1`.\n\n" +
    "### Trace on `[3, 4, -1, 1, 7, 5, 2]` (n=7)\n\n" +
    "```\n" +
    "Placement phase:\n" +
    "  i=0: arr[0]=3 → swap to index 2 → [−1, 4, 3, 1, 7, 5, 2]\n" +
    "  i=0: arr[0]=−1 → out of range, stop\n" +
    "  i=1: arr[1]=4 → swap to index 3 → [−1, 1, 3, 4, 7, 5, 2]\n" +
    "  i=1: arr[1]=1 → swap to index 0 → [1, −1, 3, 4, 7, 5, 2]\n" +
    "  i=1: arr[1]=−1 → out of range, stop\n" +
    "  ...(continue for remaining indices)\n" +
    "  Final: [1, 2, 3, 4, 5, 7, −1] (values 1-5 placed, 6 absent, 7 at index 5)\n" +
    "Scan phase:\n" +
    "  i=0..4: match ✓  i=5: 7≠6 → answer = 6\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Phase 1 appears to have a nested loop, but each element is swapped into its correct position at most once. Once an element is in the right slot it is never moved again, so the total number of swaps across the entire phase is bounded by `n`.\n\n" +
    "Phase 2 is a single linear scan.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "All operations are performed in-place on a copy of the input. Only a few scalar variables are used.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — Array is already `[1, 2, 3, ..., n]`. Phase 1 does no swaps; phase 2 confirms all match and returns `n + 1`.\n\n" +
    "**Worst Case: `O(n)`** — Each element requires exactly one swap to reach its correct index (e.g., `[2, 1, 4, 3]`). Despite the inner while loop, total swaps remain bounded by `n`.\n\n" +
    "**Versus Sorting:** Sorting achieves `O(n log n)` time but `O(1)` space; a hash-set achieves `O(n)` time but `O(n)` space. This algorithm achieves both `O(n)` time and `O(1)` space simultaneously.",

  realWorldUses: [
    "**Resource Allocation:** Finding the lowest available ID or port number in a compact integer set.",
    "**Sequence Gap Detection:** Locating the first missing sequence number in a transaction log or message stream.",
    "**Memory Compaction:** Identifying the first free page or block in a bounded address space.",
    "**Competitive Programming:** A classic hard problem (LeetCode #41) testing in-place index manipulation without extra space.",
    "**Embedded Systems:** Minimal-allocation gap finding in resource-constrained schedulers.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Achieves the theoretical optimum: O(n) time and O(1) space simultaneously.",
      "No auxiliary data structures — uses the array itself as the presence map.",
      "The two-phase structure (place then scan) is clean and separable.",
    ],
    limitations: [
      "Mutates the working array — if the original order must be preserved, a copy is needed.",
      "The inner while loop requires careful reasoning about termination to avoid infinite loops (the condition `arr[arr[i]-1] !== arr[i]` prevents cycling on duplicate values).",
      "Only finds the first missing positive — does not enumerate all missing values.",
    ],
  },

  whenToUseIt:
    "**Use First Missing Positive when** you need the smallest absent positive integer with O(1) extra space and can afford to modify a working copy of the array.\n\n" +
    "**Prefer a hash set** when the input contains arbitrary integers (not bounded to some range) or when preserving the original array without copying is critical.\n\n" +
    "**Avoid it** if you need all missing values rather than just the first, or if the values may be non-integer or non-positive.",
};
