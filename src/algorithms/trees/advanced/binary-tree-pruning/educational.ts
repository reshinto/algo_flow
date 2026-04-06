import type { EducationalContent } from "@/types";

export const binaryTreePruningEducational: EducationalContent = {
  overview:
    "**Binary Tree Pruning** removes every subtree from a binary tree that does not contain the value **1**. Node values are either 0 or 1. The algorithm uses **post-order traversal** — children are processed before their parent — so a parent can safely decide whether to prune itself based on its (already pruned) children.",

  howItWorks:
    "The recursive algorithm works bottom-up:\n\n" +
    "1. Recurse into the **left** subtree — prune it, potentially returning `null`.\n" +
    "2. Recurse into the **right** subtree — prune it, potentially returning `null`.\n" +
    "3. If the current node has **value 0** and **both children are null** (leaf with no 1s), return `null` (prune this node).\n" +
    "4. Otherwise, return the current node (keep it).\n\n" +
    "Because post-order processes leaves first, entire subtrees collapse upward as they are found to contain no 1s.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`** — every node is visited exactly once.\n\n" +
    "**Space Complexity: `O(h)`** — recursion stack depth equals tree height.",

  bestAndWorstCase:
    "**Best case:** The root has value 1 — no nodes are pruned, minimal work.\n\n" +
    "**Worst case:** Every node has value 0 — the entire tree is pruned bottom-up, visiting all `n` nodes.",

  realWorldUses: [
    "**Decision tree cleanup:** Prune branches in a decision tree that lead to trivial outcomes.",
    "**Trie pruning:** Remove unreachable or unused paths from tries after bulk deletions.",
    "**DOM tree cleanup:** Remove empty subtrees from a document object model.",
    "**Game tree pruning:** Remove game branches where no winning moves exist.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "In-place mutation — no new tree allocation needed.",
      "Simple, elegant post-order recursion.",
      "Easily extended to prune based on any predicate, not just value 0.",
    ],
    limitations: [
      "Mutates the original tree — not safe if the original needs to be preserved.",
      "Recursive — stack overflow possible on very deep trees.",
      "Specific to binary trees with 0/1 values; generalization requires changing the leaf predicate.",
    ],
  },

  whenToUseIt:
    "Use binary tree pruning when you need to remove subtrees that don't satisfy a condition and the original tree can be modified in-place. For non-destructive pruning, build a new tree instead.",
};
