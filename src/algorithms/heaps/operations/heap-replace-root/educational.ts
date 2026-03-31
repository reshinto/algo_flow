import type { EducationalContent } from "@/types";

export const heapReplaceRootEducational: EducationalContent = {
  overview:
    "**Heap Replace Root** replaces the minimum element (root) of a min-heap with a new value and restores the heap property via a single sift-down pass.\n\nThis is more efficient than the naive approach of extracting the root and then inserting the new value separately, which would require two `O(log n)` operations. Replace-root does it in one sift-down pass, saving the upward traversal of an insert while reusing the downward traversal of an extract.",

  howItWorks:
    "The algorithm executes in two steps:\n\n" +
    "1. **Replace** — record the old root value as `replacedValue`, then set `array[0] = newValue`.\n" +
    "2. **Sift-down from root** — push `newValue` downward until the heap property is restored:\n" +
    "   - At each level, find the smallest of the current node and its children.\n" +
    "   - If a child is smaller, swap them and continue from the child's position.\n" +
    "   - Stop when the current node is ≤ both children or has no children.\n\n" +
    "### Example: Replace root with 10 in [1, 3, 5, 7, 9, 8, 6]\n\n" +
    "```\n" +
    "Before:     1   ← root (replaced value = 1)\n" +
    "           / \\\n" +
    "          3   5\n" +
    "         / \\ / \\\n" +
    "        7  9 8  6\n\n" +
    "Set root → 10:\n" +
    "         10\n" +
    "         / \\\n" +
    "        3   5\n" +
    "       / \\ / \\\n" +
    "      7  9 8  6\n\n" +
    "Sift-down from root: children 3 and 5; smallest is 3; 10 > 3, swap.\n" +
    "          3\n" +
    "         / \\\n" +
    "        10  5\n" +
    "       / \\ / \\\n" +
    "      7  9 8  6\n\n" +
    "Sift-down index 1 (value 10): children 7 and 9; smallest is 7; 10 > 7, swap.\n" +
    "          3\n" +
    "         / \\\n" +
    "        7   5\n" +
    "       / \\ / \\\n" +
    "     10  9 8  6\n\n" +
    "Index 3 (value 10): no children in range; stop.\n" +
    "Result: replacedValue=1, newHeap=[3, 7, 5, 10, 9, 8, 6]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "The replacement step is `O(1)`. The sift-down traverses at most `⌊log₂ n⌋` levels. Crucially, this is the same complexity as extract-min alone, making replace-root strictly better than extract-min followed by insert.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only a constant number of index and value variables are used. The heap is modified in-place.",

  bestAndWorstCase:
    "**Best case** — the new value is smaller than both children of the root: no swaps occur, the sift-down terminates immediately. `O(1)` effective work.\n\n" +
    "**Worst case** — the new value is larger than every element in the heap: it sinks all the way from the root to a leaf, performing `O(log n)` swaps.",

  realWorldUses: [
    "**Streaming k-th largest/smallest:** Maintain a fixed-size min-heap of the k largest elements seen; when a new element exceeds the root, replace-root in O(log k).",
    "**Tournament replacement:** In external merge-sort, replace the just-output minimum with the next record from the same run — one sift-down restores the tournament tree.",
    "**Real-time scheduling:** Swap out the highest-priority (lowest-key) task with an incoming task in one operation when the CPU becomes free.",
    "**Sliding window minimum:** Replace the expiring minimum with the new element entering the window without a full rebuild.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single O(log n) pass — avoids the double traversal of extract-min + insert.",
      "In-place — no auxiliary memory beyond a constant number of variables.",
      "Returns the replaced (old root) value, so callers can process it before moving on.",
    ],
    limitations: [
      "Only replaces the root — cannot target arbitrary indices (use heap-increase-key or heap-delete-arbitrary for that).",
      "If the new value is smaller than the current root, the heap property is trivially satisfied but the old root is lost — callers must handle this case if that is unintended.",
      "Not suitable when the heap size must change; use extract-min for shrinking or insert for growing.",
    ],
  },

  whenToUseIt:
    "Use heap-replace-root whenever you need to atomically swap out the minimum element and introduce a new one — streaming top-k problems and external sort are the canonical use cases. If you only need to remove the minimum without inserting, use extract-min. If you only need to insert without removing, use heap-insert.",
};
