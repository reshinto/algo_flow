import type { EducationalContent } from "@/types";

export const subtreeOfAnotherTreeEducational: EducationalContent = {
  overview:
    "**Subtree of Another Tree** determines whether one binary tree (subTree) appears as a contiguous subtree somewhere within another binary tree (mainTree). The subtree must match exactly — same structure and same values.\n\nThis problem combines tree traversal with tree equality checking as a subroutine.",

  howItWorks:
    "The algorithm visits every node in the main tree and checks for a match:\n\n" +
    "1. **Base cases** — if `subTree` is null, return `true` (empty tree is always a subtree); if `mainTree` is null, return `false`.\n" +
    "2. **Check match** — at every node of `mainTree`, call `isSameTree(mainTree, subTree)`. If it returns `true`, the subtree is found.\n" +
    "3. **Recurse** — if no match at the current node, recursively check `mainTree.left` and `mainTree.right`.\n\n" +
    "The `isSameTree` helper uses the standard recursive same-tree comparison. For the default input (main tree: 1–7, subtree: left subtree rooted at 2), the algorithm finds a match at node 2.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  subgraph Sub [SubTree — searching for]\n" +
    "    P((2)) --> Q((1))\n" +
    "    P --> R((3))\n" +
    "  end\n" +
    "  subgraph Main [Main Tree]\n" +
    "    A((4)) --> B((2))\n" +
    "    A --> C((6))\n" +
    "    B --> D((1))\n" +
    "    B --> E((3))\n" +
    "    C --> F((5))\n" +
    "    C --> G((7))\n" +
    "  end\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style P fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "The subtree rooted at 2 (with children 1 and 3) is found within the main tree. `isSameTree` is called at each main-tree node until node 2 produces a full match.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`** where `n` is the main tree size and `m` is the subtree size\n\n" +
    "In the worst case, `isSameTree` is called at every node of the main tree and runs in `O(m)` time each time.\n\n" +
    "**Space Complexity: `O(h₁ + h₂)`** where `h₁` and `h₂` are the heights of the two trees\n\n" +
    "The combined call stack depth is at most `h₁` (main tree recursion) + `h₂` (isSameTree recursion).",

  bestAndWorstCase:
    "**Best case** — subTree root value matches the main tree root and both trees are identical — `O(m)` time (single match at root).\n\n" +
    "**Worst case** — identical values throughout and subtree matches only at the last leaf position — `O(n × m)` time.",

  realWorldUses: [
    "**Code analysis** — Check whether a code pattern (AST subtree) appears in a larger AST.",
    "**DOM inspection** — Detect if a specific HTML subtree appears within a document tree.",
    "**Data validation** — Verify that a required schema subtree is present in a data tree.",
    "**Duplicate detection** — Find repeated subtrees in parse trees or expression trees.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple recursive implementation reusing isSameTree as a helper.",
      "Early termination on first match — often faster than worst case in practice.",
      "Naturally extends to check for multiple subtrees or collect all matching positions.",
    ],
    limitations: [
      "`O(n × m)` worst-case time — a Merkle hash approach can reduce this to `O(n + m)`.",
      "Recursive — may stack overflow for very deep trees.",
      "Does not support partial matching — the subtree must match exactly.",
    ],
  },

  whenToUseIt:
    "Use subtree-of-another-tree for simple containment checks where the trees are not excessively large. For performance-critical applications, use a hashing-based approach to achieve `O(n + m)` time. The iterative variant is safer for deep trees.",
};
