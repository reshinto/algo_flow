import type { EducationalContent } from "@/types";

export const bstRangeSumEducational: EducationalContent = {
  overview:
    "**BST Range Sum (Recursive)** computes the sum of all node values within a given range `[low, high]` by exploiting the BST property to skip entire subtrees that cannot contain values in range.",

  howItWorks:
    "At each node:\n1. If `node === null`, return 0.\n2. If `node.value` is within `[low, high]`, add it to the sum.\n3. If `node.value > low`, the left subtree may have in-range values — recurse left.\n4. If `node.value < high`, the right subtree may have in-range values — recurse right.\n\nSubtrees where all values are guaranteed to be out of range are pruned entirely.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((10)) --> B((5))\n" +
    "  A --> C((20))\n" +
    "  B --> D((3))\n" +
    "  B --> E((7))\n" +
    "  C --> F((15))\n" +
    "  C --> G((25))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Range [7, 15]: node 10 in range (add 10), recurse left since 10>7. Node 5 out of range, recurse right since 5<15. Node 7 in range (add 7). Back up: node 20 out of range, recurse left since 20>7. Node 15 in range (add 15). Total = 32. Nodes 3 and 25 are pruned.",

  timeAndSpaceComplexity:
    "**Time: `O(log n + k)`** for a balanced tree where `k` is the number of in-range nodes (pruning skips out-of-range subtrees).\n\n**Space: `O(h)`** — call stack.",

  bestAndWorstCase:
    "**Best case:** Range covers no nodes — only the root-to-boundary path is traversed.\n\n**Worst case:** Range covers all nodes — all `n` nodes are visited.",

  realWorldUses: [
    "**Financial aggregation:** Sum all transactions in a date range stored in a BST.",
    "**Database range queries:** Sum indexed column values between two bounds.",
    "**Game leaderboards:** Sum scores within a score band.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "BST pruning skips whole subtrees — much faster than a full scan for narrow ranges.",
      "Clean recursive implementation.",
    ],
    limitations: ["Wide ranges that include most nodes degrade to O(n)."],
  },

  whenToUseIt:
    "Use for range aggregation queries on a dynamically maintained BST. For read-heavy workloads, a segment tree or Fenwick tree provides O(log n) range sum.",
};
