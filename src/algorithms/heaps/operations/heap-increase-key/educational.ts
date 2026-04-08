import type { EducationalContent } from "@/types";

export const heapIncreaseKeyEducational: EducationalContent = {
  overview:
    "**Heap Increase Key** updates a node's value to a larger value in a min-heap, then restores the heap property by sifting the node downward.\n\nIncreasing a key can only violate the heap property downward — the new larger value might be greater than one or both of its children — so only a sift-down is needed. This operation is the counterpart to decrease-key and is useful when a priority must be raised (i.e., deprioritized) without removing and reinserting the element.",

  howItWorks:
    "The algorithm has two steps:\n\n" +
    "1. **Update** — set `array[targetIndex] = newValue` (where `newValue > array[targetIndex]`).\n" +
    "2. **Sift-down** — push the updated node toward the leaves until the heap property is restored:\n" +
    "   - Find the smallest of the current node and its children.\n" +
    "   - If a child is smaller, swap the current node with that child and continue from the swapped position.\n" +
    "   - Stop when the node is smaller than both children or reaches a leaf.\n\n" +
    "### Example: Increase key at index 1 from 3 to 10 in [1, 3, 5, 7, 9, 8, 6]\n\n" +
    "```\n" +
    "Before:     1\n" +
    "           / \\\n" +
    "          3   5\n" +
    "         / \\ / \\\n" +
    "        7  9 8  6\n\n" +
    "Set index 1 → 10:\n" +
    "          1\n" +
    "         / \\\n" +
    "        10  5\n" +
    "       / \\ / \\\n" +
    "      7  9 8  6\n\n" +
    "Sift-down index 1: children are 7 (idx 3) and 9 (idx 4); smallest is 7; 10 > 7, swap.\n" +
    "          1\n" +
    "         / \\\n" +
    "        7   5\n" +
    "       / \\ / \\\n" +
    "     10  9 8  6\n\n" +
    "Sift-down index 3 (value 10): no children in range; stop.\n" +
    "Result: [1, 7, 5, 10, 9, 8, 6]\n" +
    "```\n\n" +
    "### Diagram: After increasing index 1 from 3 to 10\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    n1((1)) --> n7((7))\n" +
    "    n1 --> n5((5))\n" +
    "    n7 --> n10((10))\n" +
    "    n7 --> n9((9))\n" +
    "    n5 --> n8((8))\n" +
    "    n5 --> n6((6))\n" +
    "    style n1 fill:#06b6d4,stroke:#0891b2\n" +
    "    style n10 fill:#f59e0b,stroke:#d97706\n" +
    "    style n7 fill:#14532d,stroke:#22c55e\n" +
    "    style n5 fill:#14532d,stroke:#22c55e\n" +
    "    style n9 fill:#14532d,stroke:#22c55e\n" +
    "    style n8 fill:#14532d,stroke:#22c55e\n" +
    "    style n6 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The root (cyan, value 1) remains the global minimum. Node 10 (amber) was increased from 3 and sifted down to a leaf — it swapped with its smallest child 7 to restore heap order.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "The update is `O(1)`. The sift-down traverses at most `⌊log₂ n⌋` levels from the updated node to a leaf.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "Only a constant number of index variables are used. The heap is modified in-place.",

  bestAndWorstCase:
    "**Best case** — the new value is still smaller than both children: no swaps occur, the loop exits immediately after the first comparison set. `O(1)` effective work after the update.\n\n" +
    "**Worst case** — the new value is larger than every descendant all the way to a leaf: `O(log n)` swaps as the node sinks from the updated position to a leaf.",

  realWorldUses: [
    "**Lazy priority queues:** Mark an entry as lower-priority (higher key) in a scheduling system without a full removal and reinsertion.",
    "**Graph algorithms:** In some formulations of shortest-path algorithms, a node's cost estimate may need to be raised when a previously assumed shortcut is invalidated.",
    "**Resource management:** Deprioritize a task in an OS scheduler when it consumes excessive CPU time (aging in reverse).",
    "**Cache eviction policies:** Raise the eviction priority of a cache entry that has become stale or less valuable.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log n) — efficient in-place priority update without removing and reinserting.",
      "Only sift-down is needed — increasing a key can never violate upward heap order.",
      "Symmetric counterpart to decrease-key — together they provide full key-update support.",
    ],
    limitations: [
      "Requires knowing the target index — heaps do not support O(1) lookup by value.",
      "Only valid for increasing keys in a min-heap (or decreasing keys in a max-heap).",
      "If both increase and decrease operations are needed frequently, consider a Fibonacci heap for better amortized bounds.",
    ],
  },

  whenToUseIt:
    "Use heap-increase-key when you need to raise the priority (numerically increase the key) of a specific element in a min-heap. Pair it with an auxiliary index map so the target can be located in `O(1)`. For lowering priorities, use heap-decrease-key instead. If you frequently need both, evaluate whether a more sophisticated priority queue structure better fits your workload.",
};
