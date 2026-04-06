import type { EducationalContent } from "@/types";

export const bstKthSmallestIterativeEducational: EducationalContent = {
  overview:
    "**BST Kth Smallest (Iterative)** finds the kth smallest value using a stack-based in-order traversal instead of recursion. A counter increments with each visited node and the algorithm returns as soon as it reaches `k`.",

  howItWorks:
    "Uses an explicit stack simulating in-order traversal:\n1. Push all left nodes onto the stack.\n2. Pop the top — this is the next in-order node. Increment counter.\n3. If counter equals k — return the node's value.\n4. Otherwise, push the right child's leftmost path and continue.",

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
