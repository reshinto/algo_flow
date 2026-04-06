import type { EducationalContent } from "@/types";

export const buildFromLevelOrderEducational: EducationalContent = {
  overview:
    "**Build BST from Level-Order** inserts values from a level-order array into a Binary Search Tree one by one, " +
    "using standard BST insertion for each value. The result is a BST whose level-order traversal matches the input sequence, " +
    "making it useful for reconstructing a BST from its breadth-first representation.",

  howItWorks:
    "The algorithm iterates through the level-order array and performs a standard BST insert for each value:\n\n" +
    "1. **Initialize** — start with an empty tree (root = null).\n" +
    "2. **For each value in level-order:**\n" +
    "   - Compare the value against the current node.\n" +
    "   - Traverse left if the value is smaller, right if larger.\n" +
    "   - When an empty slot is found, create a new node.\n" +
    "3. **Return the root** after all insertions.\n\n" +
    "### Example\n\n" +
    "```\n" +
    "levelOrder = [4, 2, 6, 1, 3, 5, 7]\n\n" +
    "Insert 4 → root\n" +
    "Insert 2 → left of 4\n" +
    "Insert 6 → right of 4\n" +
    "Insert 1 → left of 2\n" +
    "Insert 3 → right of 2\n" +
    "Insert 5 → left of 6\n" +
    "Insert 7 → right of 6\n" +
    "Result: perfectly balanced 7-node BST\n" +
    "```\n\n" +
    "For this to produce a valid BST level-order, the input must already be in BST-compatible level-order " +
    "(i.e., values must honor BST invariants when inserted in sequence).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)` worst case, `O(n log n)` average**\n\n" +
    "Each insertion traverses `O(h)` nodes. For `n` insertions on a balanced tree, total time is `O(n log n)`. " +
    "For a degenerate (sorted input) tree, each insertion costs `O(n)` → `O(n²)` total.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The tree holds `n` nodes. Recursion depth is `O(h)` — `O(log n)` balanced, `O(n)` worst case.",

  bestAndWorstCase:
    "**Best case** is a level-order sequence that produces a balanced BST (e.g., root first, then left/right alternating). " +
    "Each insertion is `O(log n)` → total `O(n log n)`.\n\n" +
    "**Worst case** is a sorted or reverse-sorted sequence, producing a degenerate tree (linked list). " +
    "Each insertion costs `O(n)` → total `O(n²)`.",

  realWorldUses: [
    "**BST reconstruction:** Rebuild a BST from a breadth-first level-order dump for persistence/transmission.",
    "**Database index recovery:** Restore a B-tree or BST index from a level-order snapshot.",
    "**Balanced tree seeding:** Constructing a BST from a level-order sequence that was generated from a balanced tree ensures reconstruction matches the original shape.",
    "**Interview problems:** Classic coding challenge testing understanding of BST insertion and traversal duality.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple, intuitive approach — just repeated BST insertions.",
      "Works for any set of distinct integer values.",
      "Naturally recovers the original BST structure if input was its own level-order traversal.",
    ],
    limitations: [
      "O(n²) worst case for sorted or adversarial input.",
      "Cannot reconstruct an arbitrary binary tree — only BSTs (values must obey BST ordering).",
      "For general binary trees, preorder+inorder or BFS serialization methods are required instead.",
    ],
  },

  whenToUseIt:
    "Use this algorithm when you have a BST's level-order traversal and need to reconstruct the original tree. " +
    "For general binary trees without BST ordering, use the serialize/deserialize approach instead. " +
    "Avoid this method with sorted input — use a balanced insertion strategy to prevent degenerate tree growth.",
};
