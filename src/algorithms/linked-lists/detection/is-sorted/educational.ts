import type { EducationalContent } from "@/types";

export const isSortedEducational: EducationalContent = {
  overview:
    "**Check if Sorted** verifies whether a linked list is sorted in non-decreasing order (each node's value ≤ the next node's value). It returns `true` if sorted, `false` otherwise.\n\nThe algorithm uses a single pointer that marches through adjacent pairs of nodes, comparing their values, and stops immediately if an out-of-order pair is found.",

  howItWorks:
    "The algorithm maintains a single `current` pointer and walks through the list:\n\n" +
    "1. **Initialize** `current = head`.\n" +
    "2. **Loop** while `current` is not null and `current.next` is not null:\n" +
    "   - Compare `current.value` with `current.next.value`.\n" +
    "   - If `current.value > current.next.value`, the list is **not sorted** — return `false`.\n" +
    "   - Advance `current` to the next node.\n" +
    "3. **Return** `true` if the loop completes without finding an out-of-order pair.\n\n" +
    "### Example: Checking [1 → 3 → 5 → 7]\n\n" +
    "```\n" +
    "Step 1:      Compare 1 and 3 (1 ≤ 3) ✓\n" +
    "Step 2:      Compare 3 and 5 (3 ≤ 5) ✓\n" +
    "Step 3:      Compare 5 and 7 (5 ≤ 7) ✓\n" +
    "Result:      Sorted = true\n" +
    "```\n\n" +
    "### Example: Checking [1 → 5 → 3 → 7]\n\n" +
    "```\n" +
    "Step 1:      Compare 1 and 5 (1 ≤ 5) ✓\n" +
    "Step 2:      Compare 5 and 3 (5 > 3) ✗ — not sorted!\n" +
    "Result:      Sorted = false\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)` best, worst, and average**\n\n" +
    "In the worst case (sorted list), every node must be visited to confirm no out-of-order pair exists. In the best case (unsorted at the beginning), only two comparisons occur before returning `false`. On average, the algorithm visits many nodes.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single pointer variable (`current`) is used. No additional data structures are allocated regardless of list size.",

  bestAndWorstCase:
    "**Best case** is when the list is **not sorted** near the head — the algorithm detects a violation in the first comparison and returns `false` immediately in `O(1)` comparisons (e.g., [5 → 2 → 3]).\n\n" +
    "**Worst case** is a **sorted list** — every adjacent pair must be compared, requiring `n-1` comparisons and `O(n)` time. All nodes must be visited to guarantee the list is sorted.\n\n" +
    "There is no early exit for sorted lists; all cases that return `true` require visiting the entire list.",

  realWorldUses: [
    "**Data validation:** Verify that imported or received data is pre-sorted before using sorting-dependent algorithms.",
    "**Integrity checks:** Ensure a linked list structure maintains its sorted invariant after bulk operations.",
    "**Optimization guards:** Before applying optimizations that assume sorted order, confirm the list is sorted.",
    "**Testing and debugging:** Validate that sorting algorithms produce correct results.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — uses only a pointer variable, no extra memory.",
      "Early exit on unsorted lists — returns false immediately upon finding an out-of-order pair.",
      "Simple and straightforward — easy to understand and implement.",
      "Linear time — visits each node at most once.",
    ],
    limitations: [
      "No early exit for sorted lists — must visit all nodes to return true.",
      "Single pass only — cannot parallelize or optimize using caching without restructuring.",
      "Order matters — returns false on strict decreasing order; requires ≤ logic.",
    ],
  },

  whenToUseIt:
    "Use Check if Sorted when you need to verify that a linked list is sorted in non-decreasing order. This is useful for validating data integrity, confirming preconditions before running sorting-dependent algorithms, or testing the correctness of sorting implementations. For very long lists where the sorted property is guaranteed by invariant, consider storing the sorted state as metadata instead of rechecking.",
};
