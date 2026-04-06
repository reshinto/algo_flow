import type { EducationalContent } from "@/types";

export const bstSearchEducational: EducationalContent = {
  overview:
    "**BST Search (Recursive)** exploits the BST property — all values in the left subtree are smaller and all in the right subtree are larger — to eliminate half of the remaining candidates at every step.\n\nAt each node, the algorithm compares the target to the current node's value and recursively searches only the relevant subtree.",

  howItWorks:
    "1. **Base case:** If the current node is `null`, the target does not exist — return `null`.\n" +
    "2. **Match:** If the current node's value equals the target — return the node.\n" +
    "3. **Go left:** If target is smaller than the current value — recurse into the left subtree.\n" +
    "4. **Go right:** If target is larger — recurse into the right subtree.\n\n" +
    "Each comparison halves the search space in a balanced BST, mirroring binary search on a sorted array.",

  timeAndSpaceComplexity:
    "**Time: `O(log n)` average, `O(n)` worst case**\n\nFor a balanced BST the height `h = log n`, so the path to any node spans at most `log n` comparisons. A degenerate (linear) BST degrades to `O(n)`.\n\n**Space: `O(h)` call stack**\n\nOne stack frame per level of recursion.",

  bestAndWorstCase:
    "**Best case:** Target is the root — returns immediately in `O(1)`.\n\n**Worst case:** Degenerate BST (all nodes inserted in sorted order forming a linked list) — every node must be visited, giving `O(n)`.",

  realWorldUses: [
    "**Database index lookups:** B-tree search follows this same compare-and-branch pattern.",
    "**Symbol tables:** Compilers store identifiers in BSTs for efficient lookup during parsing.",
    "**Auto-completion:** Dictionary prefix lookups descend a BST (or trie) by character comparison.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple recursive structure that mirrors the mathematical definition of a BST.",
      "O(log n) on balanced trees — efficient for large datasets.",
      "No auxiliary data structures needed.",
    ],
    limitations: [
      "Degrades to O(n) on unbalanced trees — an AVL tree or red-black tree maintains balance automatically.",
      "Recursive call stack consumes O(h) space — the iterative variant uses O(1) space.",
    ],
  },

  whenToUseIt:
    "Use BST Search when you need dynamic ordered data with fast lookup. Prefer the iterative version when stack depth could be an issue on very tall trees.",
};
