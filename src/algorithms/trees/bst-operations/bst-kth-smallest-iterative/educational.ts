import type { EducationalContent } from "@/types";

export const bstKthSmallestIterativeEducational: EducationalContent = {
  overview:
    "**BST Kth Smallest (Iterative)** finds the kth smallest value using a stack-based in-order traversal instead of recursion. A counter increments with each visited node and the algorithm returns as soon as it reaches `k`.",

  howItWorks:
    "Uses an explicit stack simulating in-order traversal:\n1. Push all left nodes onto the stack.\n2. Pop the top — this is the next in-order node. Increment counter.\n3. If counter equals k — return the node's value.\n4. Otherwise, push the right child's leftmost path and continue.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "  A((10)) --> B((5))\n" +
    "  A --> C((20))\n" +
    "  B --> D((3))\n" +
    "  B --> E((7))\n" +
    "  C --> F((15))\n" +
    "  C --> G((25))\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#f59e0b,stroke:#d97706\n" +
    "```\n" +
    "Finding k=3: stack init [10,5,3], pop 3 (count=1), pop 5 (count=2), push 7, pop 7 (count=3) → return 7. The algorithm stops immediately without visiting 10, 15, 20, or 25.",

  timeAndSpaceComplexity:
    "**Time: `O(k + h)`**\n\n**Space: `O(h)`** — stack holds at most `h` nodes.",

  bestAndWorstCase:
    "**Best case:** k = 1 — pop the leftmost leaf immediately.\n\n**Worst case:** k = n — all nodes visited.",

  realWorldUses: [
    "**In-order streaming:** Lazily produce sorted values from a BST without buffering all of them.",
    "**Cursor-based iteration:** BST iterator (next/hasNext) is the direct basis for this approach.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "No recursion — bounded call stack.",
      "Natural extension to a BST iterator pattern.",
    ],
    limitations: ["O(h) stack space — same asymptotic as recursive version."],
  },

  whenToUseIt:
    "Use when you need a BST iterator that can pause after k elements or when recursion is prohibited.",
};
