import type { EducationalContent } from "@/types";

export const bstIteratorEducational: EducationalContent = {
  overview:
    "**BST Iterator** provides an on-demand, sorted iteration interface over a BST using `hasNext()` and `next()` methods. Instead of producing all values upfront, it lazily yields one value at a time by maintaining a controlled in-order traversal state in a stack.\n\nThis is the foundation for Java's `TreeSet` iterator and Python's generator-based BST iteration.",

  howItWorks:
    "**Constructor:** Push all left-spine nodes from the root onto the stack.\n\n**next():**\n1. Pop the top node — this is the current smallest unvisited node.\n2. Push the left-spine of the popped node's right child.\n3. Return the node's value.\n\n**hasNext():** Stack is non-empty.\n\nThe key insight: the stack always holds the path to the next in-order node without pre-computing the entire traversal.",

  timeAndSpaceComplexity:
    "**Time per `next()`: Amortized `O(1)`** — over all `n` calls, each node is pushed and popped exactly once.\n\n**Space: `O(h)`** — stack holds at most `h` nodes (the leftmost path).",

  bestAndWorstCase:
    "**Best case:** Complete iteration of a balanced tree — O(1) amortized per call.\n\n**Worst case:** Right-skewed tree — each `next()` pushes the full right spine, but amortized cost remains O(1).",

  realWorldUses: [
    "**Database cursors:** BST iterators power range scan cursors in database indexes.",
    "**Java TreeSet/TreeMap:** `Iterator<E>` is implemented this way.",
    "**Lazy evaluation:** Produce only as many values as needed without full traversal.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Amortized O(1) per `next()` — efficient for full traversals.",
      "O(h) space — much less than O(n) if only a few elements are needed.",
      "Supports stopping mid-traversal without wasted work.",
    ],
    limitations: [
      "More complex state management than a full recursive traversal.",
      "Not thread-safe — concurrent modifications require external synchronization.",
    ],
  },

  whenToUseIt:
    "Use when you need to consume BST values one at a time, stop early, or integrate with a for-each loop interface.",
};
