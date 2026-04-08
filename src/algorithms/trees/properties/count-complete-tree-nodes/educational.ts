import type { EducationalContent } from "@/types";

export const countCompleteTreeNodesEducational: EducationalContent = {
  overview:
    "**Count Complete Tree Nodes** exploits the structure of complete binary trees to count nodes " +
    "faster than `O(n)`. In a complete binary tree, every level except possibly the last is fully filled, " +
    "and all nodes are as far left as possible.",

  howItWorks:
    "At each node:\n\n" +
    "1. Compute the **leftmost height** (always follow left children).\n" +
    "2. Compute the **rightmost height** (always follow right children).\n" +
    "3. If equal, the subtree is a **perfect binary tree** with `2^h - 1` nodes — return immediately.\n" +
    "4. If not equal, recurse on both subtrees and sum their counts.\n\n" +
    "The key insight is that in a complete binary tree, at least one of the two subtrees is always perfect.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((1)):::root --> B((2)):::visited\n" +
    "  A --> C((3)):::visited\n" +
    "  B --> D((4)):::visited\n" +
    "  B --> E((5)):::visited\n" +
    "  C --> F((6)):::current\n" +
    "  classDef root fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef visited fill:#14532d,stroke:#22c55e\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Left subtree (root 2) has leftmost height 2 and rightmost height 2 — perfect, so count = `2^2 - 1` = 3. Right subtree (root 3) has leftmost height 2 but rightmost height 1 — not perfect, so recurse. Total = 3 + 2 + 1 = 6.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log² n)`** — height computation is `O(log n)` and there are `O(log n)` recursive calls.\n\n" +
    "**Space Complexity: `O(log n)`** — call stack depth equals tree height.",

  bestAndWorstCase:
    "**Best case** is a perfect binary tree — returns `2^h - 1` after a single height comparison.\n\n" +
    "**Worst case** is still `O(log² n)`, much better than a naive `O(n)` count.",

  realWorldUses: [
    "**Heap size computation:** Binary heaps are complete trees; counting nodes efficiently is useful in heap algorithms.",
    "**Segment tree validation:** Verifying that a segment tree has the expected node count.",
    "**Proof of completeness:** Confirming that insertion followed the complete-tree property.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(log² n) time — significantly faster than visiting every node.",
      "Exploits the complete tree invariant for a guaranteed optimization.",
    ],
    limitations: [
      "Only works correctly on complete binary trees — gives wrong results for arbitrary trees.",
      "More complex than a simple `O(n)` DFS count.",
    ],
  },

  whenToUseIt:
    "Use only when the input is guaranteed to be a complete binary tree, such as a binary heap. " +
    "For arbitrary binary trees, a simple DFS count is correct and simpler.",
};
