import type { EducationalContent } from "@/types";

export const bstKthSmallestEducational: EducationalContent = {
  overview:
    "**BST Kth Smallest (Recursive)** finds the kth smallest value in a BST by performing an in-order traversal (which yields values in ascending order) and stopping as soon as a counter reaches `k`.\n\nNo sorting is needed — the BST property guarantees that in-order traversal naturally visits values from smallest to largest.",

  howItWorks:
    "1. Recurse left (smaller values first).\n" +
    "2. Increment a counter when visiting each node.\n" +
    "3. When `counter === k`, record the current value and stop further recursion.\n" +
    "4. Return the recorded value.\n\n" +
    "The algorithm stops early once found, avoiding unnecessary traversal of the right subtree.",

  timeAndSpaceComplexity:
    "**Time: `O(k + h)`** — visits `k` in-order nodes plus the path to reach the first.\n\n**Space: `O(h)`** — call stack.",

  bestAndWorstCase:
    "**Best case:** k = 1 — the leftmost leaf is found after traversing one root-to-leaf path.\n\n**Worst case:** k = n — all nodes are visited.",

  realWorldUses: [
    "**Percentile ranking:** Find the kth element in a dynamically maintained ordered set.",
    "**Database ORDER BY with LIMIT:** BST in-order traversal stopping at row k.",
    "**Statistical medians:** With k = n/2, find the median element.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Leverages the BST property — no explicit sorting needed.",
      "Stops early once the kth element is found.",
    ],
    limitations: [
      "Repeated queries for different k values each require an O(k) traversal.",
      "An augmented BST (storing subtree sizes) can answer kth-smallest in O(log n).",
    ],
  },

  whenToUseIt:
    "Use for occasional rank queries on an existing BST. For frequent rank queries, augment the BST with subtree size counters.",
};
