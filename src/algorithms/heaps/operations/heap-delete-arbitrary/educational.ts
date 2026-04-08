import type { EducationalContent } from "@/types";

export const heapDeleteArbitraryEducational: EducationalContent = {
  overview:
    "**Heap Delete Arbitrary** removes a node at any given index from a min-heap while restoring the heap property in `O(log n)` time.\n\nUnlike extracting the root (which is always `O(log n)` and straightforward), deleting an arbitrary node requires careful restoration: replace the target with the heap's last element, shrink the array, then decide whether to sift-up or sift-down based on how the replacement value compares to its parent.",

  howItWorks:
    "The algorithm follows three phases:\n\n" +
    "1. **Replace** — overwrite `array[targetIndex]` with `array[lastIndex]`, then remove the last element.\n" +
    "2. **Decide direction** — compare the replacement value with its parent:\n" +
    "   - If it is smaller than its parent → **sift-up** (the value is out of place upward).\n" +
    "   - Otherwise → **sift-down** (the value may be out of place downward).\n" +
    "3. **Restore** — execute the chosen sift operation until the heap property is satisfied.\n\n" +
    "### Example: Delete index 2 from [1, 3, 5, 7, 9, 8, 6]\n\n" +
    "```\n" +
    "Before:     1\n" +
    "           / \\\n" +
    "          3   5   ← index 2, value 5 is target\n" +
    "         / \\ / \\\n" +
    "        7  9 8  6\n\n" +
    "Replace 5 with last (6), remove last:\n" +
    "          1\n" +
    "         / \\\n" +
    "        3   6\n" +
    "       / \\ /\n" +
    "      7  9 8\n\n" +
    "6 > parent 1 → sift-down: compare 6 with children 8 — 6 is smallest, no swap needed.\n" +
    "Result: [1, 3, 6, 7, 9, 8]\n" +
    "```\n\n" +
    "### After Deleting Index 2: Replacement Node 6 Settled In-Place\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n1((1)) --> n3((3))\n" +
    "    n1 --> n6((6))\n" +
    "    n3 --> n7((7))\n" +
    "    n3 --> n9((9))\n" +
    "    n6 --> n8((8))\n" +
    "    style n1 fill:#14532d,stroke:#22c55e\n" +
    "    style n3 fill:#14532d,stroke:#22c55e\n" +
    "    style n6 fill:#f59e0b,stroke:#d97706\n" +
    "    style n7 fill:#14532d,stroke:#22c55e\n" +
    "    style n9 fill:#14532d,stroke:#22c55e\n" +
    "    style n8 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Amber node (6) is the replacement — it was moved from the last position into the deleted slot at index 2. A sift-down check confirmed it is already smaller than its only child (8), so no swap was needed. All green nodes are settled.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "The replace step is `O(1)`. The subsequent sift-up or sift-down traverses at most the height of the heap, which is `⌊log₂ n⌋` levels.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only a constant number of index and value variables are used during the sift operations. The heap is modified in-place.",

  bestAndWorstCase:
    "**Best case** — the replacement value satisfies the heap property immediately at `targetIndex` (it is ≥ its parent and ≤ both children): no sift is needed beyond the initial bounds check. Effectively `O(1)` after the replace step.\n\n" +
    "**Worst case** — the replacement value must travel the full height of the tree, either sifting up to the root or sifting down to a leaf. This is `O(log n)` comparisons and swaps.",

  realWorldUses: [
    "**Task schedulers:** Remove a cancelled job from the middle of a priority queue without rebuilding the entire structure.",
    "**Graph algorithms:** Dijkstra's and A* sometimes need to invalidate a node already in the open set — delete-arbitrary enables efficient cancellation.",
    "**Event simulation:** Discrete-event simulators occasionally cancel future events that are no longer relevant, requiring mid-heap removal.",
    "**Operating system process management:** Removing a specific process from a priority-ordered run queue when it is killed or paused.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) — far more efficient than rebuilding the heap or shifting elements linearly.",
      "In-place — no auxiliary array needed; modifies the heap array directly.",
      "Handles all positions uniformly — root, leaf, and internal nodes all work correctly.",
    ],
    limitations: [
      "Requires knowing the target index — heaps do not support O(1) lookup by value; finding an element first costs O(n).",
      "Directionality logic — the sift-up vs sift-down decision adds a branch that can be easy to get wrong when implementing from scratch.",
      "Not cache-friendly — non-sequential memory access during sift operations causes cache misses on large heaps.",
    ],
  },

  whenToUseIt:
    "Use heap-delete-arbitrary when you maintain a heap alongside an index map (e.g. a hash map from value to heap position) so that deletions by value remain `O(log n)`. If you only ever delete the minimum (root), prefer the simpler extract-min. If you need full sorted access, use a balanced BST or sorted array instead.",
};
