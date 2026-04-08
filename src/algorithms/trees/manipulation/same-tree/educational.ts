import type { EducationalContent } from "@/types";

export const sameTreeEducational: EducationalContent = {
  overview:
    "**Same Tree** determines whether two binary trees are structurally identical and have the same node values at every position. Two null trees are considered the same; a null and a non-null tree are not.\n\nThis is a fundamental tree comparison algorithm used as a building block for subtree checks, tree equality assertions, and structural validation.",

  howItWorks:
    "The recursive algorithm compares two trees simultaneously:\n\n" +
    "1. **Both null** — return `true` (two empty trees are identical).\n" +
    "2. **One null** — return `false` (different structure).\n" +
    "3. **Different values** — return `false`.\n" +
    "4. **Recurse left** — check if left subtrees are the same.\n" +
    "5. **Recurse right** — check if right subtrees are the same.\n" +
    "6. **Return** — `leftMatch && rightMatch`.\n\n" +
    "The algorithm short-circuits on the first mismatch, so it runs faster in practice on dissimilar trees.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  subgraph TreeB [Tree B — different]\n" +
    "    P((4)) --> Q((2))\n" +
    "    P --> R((9))\n" +
    "    Q --> S((1))\n" +
    "    Q --> T((3))\n" +
    "  end\n" +
    "  subgraph TreeA [Tree A]\n" +
    "    A((4)) --> B((2))\n" +
    "    A --> C((6))\n" +
    "    B --> D((1))\n" +
    "    B --> E((3))\n" +
    "  end\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style P fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style R fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style S fill:#14532d,stroke:#22c55e\n" +
    "```\n" +
    "Tree A and Tree B differ at the right child of the root (6 vs 9). The recursion short-circuits at that node and returns `false` without visiting deeper nodes.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(min(n, m))`** where `n` and `m` are the sizes of the two trees\n\n" +
    "The comparison stops at the first mismatch, but must visit all nodes in the worst case (identical trees).\n\n" +
    "**Space Complexity: `O(min(h₁, h₂))`** where `h₁` and `h₂` are the heights of the two trees\n\n" +
    "The recursion stack depth is bounded by the height of the shallower tree.",

  bestAndWorstCase:
    "**Best case** — root values differ: returns `false` after comparing only the roots — `O(1)` time.\n\n" +
    "**Worst case** — identical trees or trees that differ only at the deepest leaf: every node is visited — `O(n)` time.",

  realWorldUses: [
    "**Version control** — Compare two versions of a syntax tree to detect changes.",
    "**Test assertions** — Verify that a tree transformation produced the expected result.",
    "**Subtree detection** — Used as a helper in subtree-of-another-tree algorithms.",
    "**Memoized tree hashing** — Detect duplicate subtrees in DP tree problems.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple and direct — the recursive structure mirrors the problem definition.",
      "Short-circuits on first mismatch, making it fast in practice for different trees.",
      "Easily extended to compare trees with additional node attributes.",
    ],
    limitations: [
      "Recursive — may stack overflow for very deep trees.",
      "Cannot compare trees with cycles without cycle detection.",
      "For comparing large trees frequently, a hash-based approach is more efficient.",
    ],
  },

  whenToUseIt:
    "Use same-tree whenever you need exact structural and value equality between two binary trees. For checking if one tree contains another as a subtree, combine same-tree with a pre-order traversal of the larger tree. Use the iterative variant for deep trees.",
};
